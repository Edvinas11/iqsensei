from django.contrib import admin
from .models import User

class UsersAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'password')
admin.site.register(User, UsersAdmin)
