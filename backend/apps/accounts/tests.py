from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.accounts.models import User

class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='Password123',
            name='Test User',
            role='STUDENT'
        )

    def test_login_success(self):
        url = reverse('login')
        data = {'email': 'test@example.com', 'password': 'Password123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['success'])
        self.assertIn('access', response.data['data'])

    def test_login_failure(self):
        url = reverse('login')
        data = {'email': 'test@example.com', 'password': 'WrongPassword'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 401)
        self.assertFalse(response.data['success'])
