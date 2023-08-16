from django.db import models

class Config(models.Model):
    # Courses

    #key

    #value
    pass



class Role(models.Model):
    # Courses
    

    title = models.CharField(max_length=30)
    name = models.CharField(max_length=30)

    course_manager = models.BooleanField()
    pass