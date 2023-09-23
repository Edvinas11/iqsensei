from rest_framework import serializers
from .models import Course

def validate_title(value):
    qs = Course.objects.filter(title__iexact=value)
    if qs.exists():
        raise serializers.ValidationError(f'"{qs[0].title}" is already a course title.')
    return value