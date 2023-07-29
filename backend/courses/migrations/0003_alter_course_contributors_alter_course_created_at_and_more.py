# Generated by Django 4.2.1 on 2023-07-29 19:42

from django.conf import settings
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('courses', '0002_alter_course_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='contributors',
            field=models.ManyToManyField(null=True, related_name='contributed_courses', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='course',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='updated_at',
            field=models.DateTimeField(null=True),
        ),
    ]