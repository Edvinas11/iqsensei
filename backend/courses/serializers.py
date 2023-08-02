from rest_framework import serializers
from .models import Course, Section, Review, Warning
from api.serializers import UserPublicSerializer

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class WarningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warning
        fields = "__all__"

class CourseSerializer(serializers.ModelSerializer):
    author = UserPublicSerializer()
    sections = SectionSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    warnings = WarningSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = (
                "course_id",
                "title", 
                "description",
                "sections",
                "short_description",
                "mode",
                "rating",
                "rating_count",
                "price",
                "duration",
                "related_courses",
                "author",
                "reviews",
                "warnings",
                "image")

class AbstractCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
                "course_id",
                "title",
                "short_description",
                "mode",
                "rating",
                "rating_count",
                "price",
                "duration",
                "image",
                "tags")

class CourseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        #exclude = ["author"] # Taip buvo
        fields = "__all__"

