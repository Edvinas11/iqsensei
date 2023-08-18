from django.db import models




class Role(models.Model):
    # Courses
    

    title = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    pass