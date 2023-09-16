from rest_framework import serializers
from .models import Course, Section, Review, Warning, CourseCategory
from api.serializers import UserPublicSerializer
from django.core import validators as nativeValidators
from . import validators

MODE_CHOICES = [
    (1, "Easy"),
    (2, "Medium"),
    (3, "Hard")
]


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

class DetailCourseSerializer(serializers.ModelSerializer):
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

class ListCourseSerializer(serializers.ModelSerializer):
    detailed_url = serializers.HyperlinkedIdentityField(view_name='course-detail')

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
                "detailed_url",
                "tags")
        
class CreateCourseSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True, validators=[validators.validate_title])
    short_description = serializers.CharField(required=True)
    description = serializers.CharField(required=True, validators=[nativeValidators.MinLengthValidator(300)])
    mode = serializers.ChoiceField(choices=MODE_CHOICES, required=True)
    duration = serializers.DurationField(required=True)
    available_for_everyone = serializers.BooleanField(required=True)
    available_for_any_subscriber = serializers.BooleanField(required=True)
    available_for_buyers_only = serializers.BooleanField(required=True)
    image = serializers.ImageField(required=True)
    price = serializers.FloatField(validators = [], required=True)


    class Meta:
        model = Course
        fields = (
            "title", 
            "short_description",
            "description",
            "mode",
            "duration",
            "tags",
            "available_for_everyone",
            "available_for_any_subscriber",
            "available_for_buyers_only",
            "image",
            "price",
            "related_courses"
        )


    def create(self, validated_data):
        # if sum(
        #     [validated_data['available_for_everyone'],
        #     validated_data['available_for_any_subscriber'],
        #     validated_data['available_for_buyers_only']
        #     ]) > 1:
        #     raise serializers.ValidationError({"availability_status":"Only one option of availability status can be chosen"})
        # # Check if at least one has been chosen

        request = self.context.get('request')
        if request is None:
            return None
        validated_data['author'] = request.user
        return super().create(validated_data)






class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"

class CourseCreateSerializer(serializers.ModelSerializer):
    categories = CourseCategorySerializer(many=True)
    class Meta:
        model = Course
        exclude = ["author"]
        #fields = "__all__"

