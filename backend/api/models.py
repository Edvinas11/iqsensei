from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email, password, is_superuser=False):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')

        email = self.normalize_email(email)
        
        user = self.model(email=email)
        user.set_password(password)
        user.is_superuser = is_superuser
        user.save()
        
        return user
    
    

class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    
    coins = models.IntegerField(default=0)
    xp_points = models.IntegerField(default=0)

    username = models.CharField(max_length=50)
    USERNAME_FIELD = 'email' # The field used for authentication
    REQUIRED_FIELDS = ['username'] # List of fields that are required when creating a user
    objects = AppUserManager()

    # Specify a related_name for the 'groups' field
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='app_users',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    # Specify a related_name for the 'user_permissions' field
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='app_users',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username
