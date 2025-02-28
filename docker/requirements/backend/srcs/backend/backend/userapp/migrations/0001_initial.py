# Generated by Django 3.2.25 on 2024-10-15 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="IntraUser",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("intra_id", models.BigIntegerField()),
                ("login", models.CharField(max_length=255, unique=True)),
                ("email", models.CharField(max_length=255)),
                ("first_name", models.CharField(max_length=255)),
                ("last_name", models.CharField(max_length=255)),
                ("display_name", models.CharField(max_length=255)),
                ("image_url", models.CharField(max_length=500)),
            ],
        ),
    ]
