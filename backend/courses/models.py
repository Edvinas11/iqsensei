from django.db import models
from api.models import AppUser
from django.utils import timezone
from datetime import timedelta

import os

from courses import config


def upload_to(instance, filename):
    return 'courses/images/{filename}'.format(filename=filename)



class Tag(models.Model):
    title = models.CharField(max_length=50)
    color_hex = models.CharField(max_length=7) # pvz #FFFFFF

    def __str__(self):
        return self.title
    


class CourseManager(models.Manager):
    def create_course(self, title, author, price, description="", contributors=None):
        if title is None or title == "":
            raise ValueError('Title is required.')
        if author is None:
            raise ValueError('Author is required.')
        if price is None:
            raise ValueError('Price is required.')


        
        course = self.model(title=title,
                            description=description,
                            author=author,
                            contributors=contributors,
                            price=price,
                            created_at=timezone.now())
        course.save()
        
        return course
    
    def update_course(self, course_id, **kwargs):
        try:
            course = self.get(course_id=course_id)
        except self.model.DoesNotExist:
            raise ValueError(f"Course with ID {course_id} does not exist.")
        

        for field, value in kwargs.items():
            setattr(course, field, value)

        course.updated_at = timezone.now()
        course.updated_count += 1
        course.save()

        return course
    

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)

    title = models.CharField(max_length=100, blank=True, null=False)

    short_description = models.TextField(max_length=50, blank=True, null=False)
    description = models.TextField(max_length=3000, blank=True, null=False)

    mode = models.SmallIntegerField(default=1, null=True) # Mode is represented in numbers 1/2/3/...
    duration = models.DurationField(null=True)
    tags = models.ManyToManyField(Tag, blank=True)

    # Course accessability
    available_for_everyone = models.BooleanField(default=True)
    available_for_any_subscriber = models.BooleanField(default=False)
    available_for_buyers_only = models.BooleanField(default=False)

    image = models.ImageField(upload_to=upload_to, null=True, blank=False)

    
    author = models.ForeignKey(AppUser, on_delete=models.SET_NULL, null=True, related_name='created_courses')
    contributors = models.ManyToManyField(AppUser, related_name='contributed_courses', blank=True)
    subscribers = models.ManyToManyField(AppUser, related_name='subscribed_courses', blank=True)

    rating = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)

    price = models.IntegerField(null=True)

    created_at = models.DateTimeField(default=timezone.now, editable=False)

    related_courses = models.ManyToManyField("self", blank=True)

    updated_at = models.DateTimeField(default=timezone.now)
    updated_count = models.IntegerField(default=0)


    # def save(self, *args, **kwargs):
    #     if not self.short_description:
    #         self.short_description = config.auto_short_decription(self.title)
    #     if not self.description:
    #         self.description = config.auto_summary(self.title)
        
    #     super().save(*args, **kwargs)

    def update(self, *args, **kwargs):
        self.updated_count += 1
        self.updated_at = timezone.now

        super().update(*args, **kwargs)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    objects = CourseManager()

class CourseCategory(models.Model):
    category_id = models.AutoField(primary_key=True)

    title = models.CharField(max_length=100, )

    courses = models.ManyToManyField(Course, related_name='categories')
    qualified_users = models.ManyToManyField(AppUser, related_name="qualified_categories")



class Review(models.Model):
    author = models.ForeignKey(AppUser, on_delete=models.SET_NULL, null=True, related_name='reviews')
    message = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')

class Section(models.Model):
    title = models.CharField(max_length=100)
    section_description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sections')

class Warning(models.Model):
    title = models.CharField(max_length=100)
    detailed_message = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='warnings', null=True)
