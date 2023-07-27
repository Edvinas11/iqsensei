from django.db import models
from api.models import AppUser
from django.utils import timezone


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
    description = models.TextField()
    
    author = models.ForeignKey(AppUser, on_delete=models.SET_NULL, null=True, related_name='courses')
    contributors = models.ManyToManyField(AppUser, related_name='contributed_courses')

    rating = models.SmallIntegerField(default=0)
    rating_count = models.IntegerField(default=0)

    price = models.FloatField()

    created_at = models.DateTimeField()

    updated_at = models.DateTimeField()
    updated_count = models.IntegerField(default=0)

    REQUIRED_FIELDS = ['title', 'author', 'price', 'created_at'] # List of fields that are required when creating a course
    objects = CourseManager()

    def __str__(self):
        return self.title
