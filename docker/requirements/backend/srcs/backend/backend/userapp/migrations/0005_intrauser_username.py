# Generated by Django 3.2.25 on 2024-10-19 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("userapp", "0004_auto_20241015_1504"),
    ]

    operations = [
        migrations.AddField(
            model_name="intrauser",
            name="username",
            field=models.CharField(default="notset", max_length=255, unique=True),
            preserve_default=False,
        ),
    ]
