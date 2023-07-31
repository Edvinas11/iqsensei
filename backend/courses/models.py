from django.db import models
from api.models import AppUser
from django.utils import timezone
import os

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

    title = models.CharField(max_length=100)

    short_description = models.TextField(default="")
    description = models.TextField(default="")

    mode = models.SmallIntegerField(default=0) # Mode is represented in numbers 1/2/3/...
    duration = models.DurationField(null=True)
    tags = models.ManyToManyField(Tag, related_name="courses")
    

    def course_image_upload_path(instance, filename):
        # Construct the upload path using the course_id
        return os.path.join("courseData/images", f"course_{instance.course_id}", filename)
    image = models.ImageField(upload_to=course_image_upload_path, null=True)

    
    author = models.ForeignKey(AppUser, on_delete=models.SET_NULL, null=True, related_name='courses')
    contributors = models.ManyToManyField(AppUser, related_name='contributed_courses', blank=True)

    rating = models.SmallIntegerField(default=0)
    rating_count = models.IntegerField(default=0)

    price = models.IntegerField()

    created_at = models.DateTimeField(default=timezone.now, editable=False, null=True)

    related_courses = models.ManyToManyField('self', blank=True)

    updated_at = models.DateTimeField(default=timezone.now, null=True)
    updated_count = models.IntegerField(default=0)

    REQUIRED_FIELDS = ['title', 'author', 'price', 'created_at'] # List of fields that are required when creating a course
    objects = CourseManager()

    def __str__(self):
        return self.title


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
