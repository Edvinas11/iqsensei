# Generated by Django 4.2.1 on 2023-08-01 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_tag_course_duration_course_image_course_mode_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='tags',
            field=models.ManyToManyField(null=True, related_name='courses', to='courses.tag'),
        ),
    ]