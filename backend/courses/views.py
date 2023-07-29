from django.shortcuts import render

from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Course
from api.models import AppUser
from .serializers import CourseSerializer, CourseCreateSerializer

class Courses(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = CourseCreateSerializer(data=request.data)
        if serializer.is_valid():
            author_id = request.data.get('author')
            try:
                author = AppUser.objects.get(user_id=author_id)
            except AppUser.DoesNotExist:
                return Response({"error": "Invalid author ID"}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save(author=author)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request):
        queryset = Course.objects.all()
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        course = Course.objects.get(course_id=pk)
        serializer = CourseCreateSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        course = Course.objects.get(course_id=pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

    

