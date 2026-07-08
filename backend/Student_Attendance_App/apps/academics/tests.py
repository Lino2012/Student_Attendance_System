"""
Mock tests for academics app — Departments, Students, Faculty, Subject CRUD.
Verifies: authentication required, auto-user-creation, role assignment, defaults.
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

from apps.academics.models import Department, Course, Subject, Student, Faculty

User = get_user_model()


def make_admin():
    return User.objects.create_user(
        username='admin_academics',
        email='admin_acs@test.com',
        password='Admin@123',
        role='ADMIN',
        is_active=True,
    )


class DepartmentAPITests(TestCase):
    """CRUD tests for /api/v1/departments/"""

    def setUp(self):
        self.client = APIClient()
        self.admin = make_admin()
        resp = self.client.post('/api/v1/auth/login/', {
            'username': 'admin_academics', 'password': 'Admin@123',
        }, format='json')
        self.token = resp.json()['access']
        self.auth = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

    def test_list_departments_unauthenticated_returns_401(self):
        response = self.client.get('/api/v1/departments/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_department(self):
        """Admin can create a department."""
        response = self.client.post('/api/v1/departments/', {
            'code': 'CS',
            'name': 'Computer Science',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()['code'], 'CS')
        self.assertEqual(response.json()['name'], 'Computer Science')

    def test_list_departments_returns_all(self):
        Department.objects.create(code='MATH', name='Mathematics')
        Department.objects.create(code='PHY', name='Physics')
        response = self.client.get('/api/v1/departments/', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.json()), 2)

    def test_update_department(self):
        dep = Department.objects.create(code='OLD', name='Old Name')
        response = self.client.put(f'/api/v1/departments/{dep.id}/', {
            'code': 'OLD',
            'name': 'New Name',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], 'New Name')

    def test_delete_department(self):
        dep = Department.objects.create(code='DEL', name='To Delete')
        response = self.client.delete(f'/api/v1/departments/{dep.id}/', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Department.objects.filter(id=dep.id).exists())

    def test_create_department_duplicate_code_returns_400(self):
        Department.objects.create(code='DUP', name='Original')
        response = self.client.post('/api/v1/departments/', {
            'code': 'DUP',
            'name': 'Duplicate',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class StudentAPITests(TestCase):
    """Tests for /api/v1/students/ — including auto-user-creation."""

    def setUp(self):
        self.client = APIClient()
        self.admin = make_admin()
        resp = self.client.post('/api/v1/auth/login/', {
            'username': 'admin_academics', 'password': 'Admin@123',
        }, format='json')
        self.token = resp.json()['access']
        self.auth = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

    def test_create_student_auto_creates_user(self):
        """Creating a student must auto-create a linked User with role STUDENT."""
        response = self.client.post('/api/v1/students/', {
            'roll_number': 'R001',
            'email': 'r001@test.com',
            'semester': 2,
            'section': 'B',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Underlying user created
        user = User.objects.get(username='R001')
        self.assertEqual(user.role, 'STUDENT')
        self.assertTrue(user.check_password('R001'),
                        "Student's default password must equal roll_number")

    def test_create_student_uses_default_department_if_missing(self):
        """If department is omitted, a 'GEN' department is created/used."""
        response = self.client.post('/api/v1/students/', {
            'roll_number': 'R002',
            'email': 'r002@test.com',
            'semester': 1,
            'section': 'A',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()['department_name'], 'General Department')

    def test_create_student_missing_roll_number_returns_400(self):
        response = self.client.post('/api/v1/students/', {
            'email': 'noro@test.com',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_student_missing_email_returns_400(self):
        response = self.client.post('/api/v1/students/', {
            'roll_number': 'R003',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_students_requires_auth(self):
        response = self.client.get('/api/v1/students/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_students_returns_created_students(self):
        self.client.post('/api/v1/students/', {
            'roll_number': 'R010', 'email': 'r010@test.com',
            'semester': 1, 'section': 'A',
        }, format='json', **self.auth)
        response = self.client.get('/api/v1/students/', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        roll_numbers = [s['roll_number'] for s in response.json()]
        self.assertIn('R010', roll_numbers)

    def test_created_student_can_login(self):
        """After admin creates student, student must be able to log in."""
        self.client.post('/api/v1/students/', {
            'roll_number': 'LOGINTEST',
            'email': 'login_student@test.com',
            'semester': 1,
            'section': 'A',
        }, format='json', **self.auth)
        # New client — no token
        fresh = APIClient()
        login_resp = fresh.post('/api/v1/auth/login/', {
            'username': 'LOGINTEST',
            'password': 'LOGINTEST',
        }, format='json')
        self.assertEqual(login_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(login_resp.json()['user']['role'], 'STUDENT')

    def test_delete_student(self):
        resp = self.client.post('/api/v1/students/', {
            'roll_number': 'DEL01', 'email': 'del01@test.com',
            'semester': 1, 'section': 'A',
        }, format='json', **self.auth)
        sid = resp.json()['id']
        del_resp = self.client.delete(f'/api/v1/students/{sid}/', **self.auth)
        self.assertEqual(del_resp.status_code, status.HTTP_204_NO_CONTENT)


class FacultyAPITests(TestCase):
    """Tests for /api/v1/faculty/ — including auto-user-creation."""

    def setUp(self):
        self.client = APIClient()
        self.admin = make_admin()
        resp = self.client.post('/api/v1/auth/login/', {
            'username': 'admin_academics', 'password': 'Admin@123',
        }, format='json')
        self.token = resp.json()['access']
        self.auth = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

    def test_create_faculty_auto_creates_user(self):
        response = self.client.post('/api/v1/faculty/', {
            'employee_code': 'EMP001',
            'email': 'emp001@test.com',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username='EMP001')
        self.assertEqual(user.role, 'FACULTY')
        self.assertTrue(user.check_password('EMP001'),
                        "Faculty default password must equal employee_code")

    def test_create_faculty_default_department(self):
        response = self.client.post('/api/v1/faculty/', {
            'employee_code': 'EMP002',
            'email': 'emp002@test.com',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()['department_name'], 'General Department')

    def test_created_faculty_can_login(self):
        self.client.post('/api/v1/faculty/', {
            'employee_code': 'FAC_LOGIN',
            'email': 'fac_login@test.com',
        }, format='json', **self.auth)
        fresh = APIClient()
        login_resp = fresh.post('/api/v1/auth/login/', {
            'username': 'FAC_LOGIN',
            'password': 'FAC_LOGIN',
        }, format='json')
        self.assertEqual(login_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(login_resp.json()['user']['role'], 'FACULTY')

    def test_create_faculty_missing_employee_code_returns_400(self):
        response = self.client.post('/api/v1/faculty/', {
            'email': 'nocode@test.com',
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_faculty_requires_auth(self):
        response = self.client.get('/api/v1/faculty/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class SubjectAPITests(TestCase):
    """Tests for /api/v1/subjects/"""

    def setUp(self):
        self.client = APIClient()
        self.admin = make_admin()
        resp = self.client.post('/api/v1/auth/login/', {
            'username': 'admin_academics', 'password': 'Admin@123',
        }, format='json')
        self.token = resp.json()['access']
        self.auth = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        # Pre-create a department and course
        self.dep = Department.objects.create(code='ECE', name='Electronics')
        self.course = Course.objects.create(
            code='ECE-B', name='ECE Batch', department=self.dep
        )

    def test_create_subject_with_valid_course_id(self):
        response = self.client.post('/api/v1/subjects/', {
            'course': self.course.id,
            'code': 'SUB001',
            'name': 'Digital Electronics',
            'semester': 3,
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()['name'], 'Digital Electronics')

    def test_create_subject_without_valid_course_creates_default(self):
        """If course ID does not exist, a fallback course is created."""
        response = self.client.post('/api/v1/subjects/', {
            'course': 9999,  # non-existent
            'code': 'SUB002',
            'name': 'Mock Subject',
            'semester': 1,
        }, format='json', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_subjects_returns_created(self):
        Subject.objects.create(
            course=self.course, code='SUB010', name='Test Subject', semester=1
        )
        response = self.client.get('/api/v1/subjects/', **self.auth)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        names = [s['name'] for s in response.json()]
        self.assertIn('Test Subject', names)

    def test_delete_subject(self):
        sub = Subject.objects.create(
            course=self.course, code='DEL01', name='To Delete', semester=2
        )
        resp = self.client.delete(f'/api/v1/subjects/{sub.id}/', **self.auth)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
