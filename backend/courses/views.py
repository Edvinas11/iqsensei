from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response

from .models import Course
from .serializers import CourseSerializer

class AllCourses(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        
        queryset = Course.objects.all()

        serializer = CourseSerializer(queryset, many=True)

        return Response(serializer.data)
