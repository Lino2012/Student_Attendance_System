import os
import sys
import django
import json
import traceback

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

# override ALLOWED_HOSTS for test
from django.conf import settings
settings.ALLOWED_HOSTS = ['*']

from django.test import Client

client = Client(HTTP_HOST='localhost')

try:
    response = client.post('/api/v1/auth/login/', {
        'email': 'admin@example.com',
        'password': 'admin'
    }, content_type='application/json')

    print("Status Code:", response.status_code)
    try:
        print("Response JSON:", response.json())
    except:
        # If it returns HTML (like a 500 error), we can find the Exception value
        content = response.content.decode('utf-8')
        import re
        match = re.search(r'<th>Exception Value:</th>\s*<td><pre>(.*?)</pre></td>', content, re.DOTALL)
        if match:
            print("EXCEPTION VALUE:", match.group(1))
        else:
            match_type = re.search(r'<th>Exception Type:</th>\s*<td>(.*?)</td>', content, re.DOTALL)
            if match_type:
                print("EXCEPTION TYPE:", match_type.group(1))
            print("COULD NOT FIND EXCEPTION IN HTML. First 500 chars:", content[:500])

except Exception as e:
    traceback.print_exc()
