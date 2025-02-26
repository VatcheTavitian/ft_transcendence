# Generated by Django 3.2.25 on 2024-10-15 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("userapp", "0003_auto_20241015_1136"),
    ]

    operations = [
        migrations.AddField(
            model_name="intrauser",
            name="date_joined",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name="intrauser",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="intrauser",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
    ]
