from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from apps.accounts.models import User
from apps.academics.models import Department, Course, Student

class AcademicsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            email='admin@example.com',
            password='Admin123',
            name='Admin User',
            role='ADMIN'
        )
        self.dept = Department.objects.create(name='Test Dept', code='TD')
        self.course = Course.objects.create(
            department=self.dept, name='Test Course', code='TC',
            duration_years=4, total_semesters=8
        )
        
    def test_create_student_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        student_user = User.objects.create_user(
            email='student@example.com', password='pwd', name='S1', role='STUDENT'
        )
        url = reverse('student-list')
        data = {
            'user': student_user.id,
            'department': self.dept.id,
            'course': self.course.id,
            'roll_number': '12345',
            'semester': 1,
            'section': 'A',
            'admission_year': 2023
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Student.objects.filter(roll_number='12345').exists())
