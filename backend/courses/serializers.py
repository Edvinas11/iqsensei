from rest_framework import serializers
from .models import Course
from api.serializers import UserPublicSerializer


class CourseSerializer(serializers.ModelSerializer):
    author = UserPublicSerializer()
    class Meta:
        model = Course
        fields = "__all__"

