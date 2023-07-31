# Generated by Django 4.2.1 on 2023-07-31 17:33

import courses.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0007_alter_course_author'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('color_hex', models.CharField(max_length=7)),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='duration',
            field=models.DurationField(null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='image',
            field=models.ImageField(null=True, upload_to=courses.models.Course.course_image_upload_path),
        ),
        migrations.AddField(
            model_name='course',
            name='mode',
            field=models.SmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='course',
            name='short_description',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='course',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='course',
            name='tags',
            field=models.ManyToManyField(related_name='courses', to='courses.tag'),
        ),
    ]