# Generated by Django 4.2.1 on 2023-08-26 09:21

import courses.models
import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('short_description', models.TextField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('mode', models.SmallIntegerField(default=1)),
                ('duration', models.DurationField(default=datetime.timedelta(0))),
                ('available_for_everyone', models.BooleanField(default=False)),
                ('available_for_any_subscriber', models.BooleanField(default=False)),
                ('available_for_buyers_only', models.BooleanField(default=True)),
                ('image', models.ImageField(default='courses/images/default.jpg', upload_to=courses.models.upload_to)),
                ('rating', models.FloatField(default=0)),
                ('rating_count', models.IntegerField(default=0)),
                ('price', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_count', models.IntegerField(default=0)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='created_courses', to=settings.AUTH_USER_MODEL)),
                ('contributors', models.ManyToManyField(related_name='contributed_courses', to=settings.AUTH_USER_MODEL)),
                ('related_courses', models.ManyToManyField(blank=True, to='courses.course')),
                ('subscribers', models.ManyToManyField(related_name='subscribed_courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('color_hex', models.CharField(max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='Warning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('detailed_message', models.TextField()),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='warnings', to='courses.course')),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('section_description', models.TextField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='courses.course')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviews', to=settings.AUTH_USER_MODEL)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='courses.course')),
            ],
        ),
        migrations.CreateModel(
            name='CourseCategory',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('courses', models.ManyToManyField(related_name='categories', to='courses.course')),
                ('qualified_users', models.ManyToManyField(related_name='qualified_categories', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='tags',
            field=models.ManyToManyField(blank=True, to='courses.tag'),
        ),
    ]
