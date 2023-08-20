# Generated by Django 4.2.1 on 2023-08-01 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0009_alter_course_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, related_name='courses', to='courses.tag'),
        ),
    ]