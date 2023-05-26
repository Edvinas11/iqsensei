from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    age = models.IntegerField()
    created = models.DateField(auto_now_add=True)


