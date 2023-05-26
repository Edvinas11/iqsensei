from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.serializers import CreateUserSerializer, UserDisplay
from .models import UserProfile

class UserListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserDisplay


class CreateUserView(APIView):
    serializer_class = CreateUserSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(serializer.data)
            name = serializer.data.get("user")['username']
            password = serializer.data.get("user")['password']
            email = serializer.data.get("user")['email']
            age = serializer.data.get("profile")['age']
            
            user = User(username=name, email=email)
            user.set_password(password)
            user.save()
            
            
            all_users = UserProfile.objects.all()
            for usr in all_users:
                if usr.user.username == name:
                    return Response({"error": "Account with this name already exists."}, status=status.HTTP_400_BAD_REQUEST)
            
            
            profile = UserProfile(user=user, age=age)
            profile.save()
            return Response(UserDisplay(profile).data, status=status.HTTP_200_OK)
        
        response_data = {'status': 'error', 'errors': serializer.errors}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

