from django.contrib.auth import get_user_model, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserPublicSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        print(clean_data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid():
            user = serializer.create(clean_data)

            # Generate new access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
	
            if user:
                return Response({"access_token": access_token, "refresh_token": refresh_token}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)


    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.check_user(data)
            login(request, user)

            # Generate new access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response(
                {"access_token": access_token, "refresh_token": refresh_token},
                status=status.HTTP_200_OK,
            )
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	##
	def get(self, request):
		serializer = UserPublicSerializer(request.user)
		return Response({'profile': serializer.data}, status=status.HTTP_200_OK)


class HomeView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        content = {
            "message": "Welcome to the JWT Authentication page using React Js and Django!"
        }
        return Response(content)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
