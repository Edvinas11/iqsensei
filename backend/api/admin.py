from django.contrib import admin
from .models import UserProfile

"""
class UsersAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'password')
"""

admin.site.register(UserProfile)
