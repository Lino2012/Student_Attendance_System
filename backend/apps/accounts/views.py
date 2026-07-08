from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from common.utils import success_response
from .serializers import UserSerializer, LoginSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        user = authenticate(email=email, password=password)
        
        if not user:
            return success_response(message="Invalid email or password", status=401, data=None)
            
        if not user.is_active:
            return success_response(message="User is deactivated", status=401, data=None)
            
        refresh = RefreshToken.for_user(user)
        
        return success_response(data={
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return success_response(message="Logged out successfully")
        except Exception as e:
            return success_response(message="Invalid token", status=400)

class MeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return success_response(data=UserSerializer(request.user).data)
