from django.core.management.base import BaseCommand
from apps.accounts.models import User
from apps.academics.models import Department, Course, Student, Faculty

class Command(BaseCommand):
    help = 'Seed database with initial data (admin, faculty, student)'

    def handle(self, *args, **kwargs):
        # Admin
        if not User.objects.filter(email='admin@example.com').exists():
            admin = User.objects.create_superuser(
                email='admin@example.com',
                password='Admin@123',
                name='Super Admin',
                role=User.Role.ADMIN
            )
            self.stdout.write(self.style.SUCCESS('Successfully created admin@example.com'))
        else:
            self.stdout.write(self.style.WARNING('admin@example.com already exists'))

        # Faculty
        if not User.objects.filter(email='faculty@example.com').exists():
            faculty_user = User.objects.create_user(
                email='faculty@example.com',
                password='Faculty@123',
                name='Demo Faculty',
                role=User.Role.FACULTY
            )
            
            dept, _ = Department.objects.get_or_create(name='Computer Science', code='CS')
            Faculty.objects.create(
                user=faculty_user,
                department=dept,
                employee_code='F-CS-01',
                designation='Assistant Professor'
            )
            self.stdout.write(self.style.SUCCESS('Successfully created faculty@example.com'))
        else:
            self.stdout.write(self.style.WARNING('faculty@example.com already exists'))

        # Student
        if not User.objects.filter(email='student@example.com').exists():
            student_user = User.objects.create_user(
                email='student@example.com',
                password='Student@123',
                name='Demo Student',
                role=User.Role.STUDENT
            )
            
            dept, _ = Department.objects.get_or_create(name='Computer Science', code='CS')
            course, _ = Course.objects.get_or_create(
                department=dept, name='B.Tech CS', code='BTCS',
                duration_years=4, total_semesters=8
            )
            
            Student.objects.create(
                user=student_user,
                department=dept,
                course=course,
                roll_number='CS2023-01',
                semester=1,
                section='A',
                admission_year=2023
            )
            self.stdout.write(self.style.SUCCESS('Successfully created student@example.com'))
        else:
            self.stdout.write(self.style.WARNING('student@example.com already exists'))

        self.stdout.write(self.style.SUCCESS('Seeding complete!'))
