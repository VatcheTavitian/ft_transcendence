# Generated by Django 3.2.25 on 2024-10-22 10:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("userapp", "0012_auto_20241022_0940"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userfriend",
            name="intra_friend",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="yesintra_friend",
                to="userapp.intrauser",
            ),
        ),
    ]
