from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import User
from api.serializers import UserSerializer, CreateUserSerializer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class CreateUserView(APIView):
    serializer_class = CreateUserSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get("name")
            password = serializer.data.get("password")
            age = serializer.data.get("age")
            
            newUser = User(name=name, password=password, age=age)
            newUser.save()
            return Response(UserSerializer(newUser).data, status=status.HTTP_200_OK)

