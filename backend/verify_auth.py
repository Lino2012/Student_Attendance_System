import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()

from apps.accounts.models import User
from django.contrib.auth import authenticate

print('DB_ENGINE', os.environ.get('DJANGO_SETTINGS_MODULE'))
print('USER_COUNT', User.objects.count())
for u in User.objects.values_list('email', 'role', 'is_active')[:10]:
    print(u)

for email, password in [('admin@example.com', 'Admin@123'), ('faculty@example.com', 'Faculty@123'), ('student@example.com', 'Student@123')]:
    user = authenticate(email=email, password=password)
    print(email, '=>', user.email if user else None, 'role=', getattr(user, 'role', None) if user else None)
