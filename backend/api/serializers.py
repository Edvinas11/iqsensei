from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserDisplay(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ('user', 'age', 'created')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('age', 'created')


class CreateUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('user', 'profile')
