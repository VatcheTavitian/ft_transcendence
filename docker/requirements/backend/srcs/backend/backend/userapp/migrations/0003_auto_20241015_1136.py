# Generated by Django 3.2.25 on 2024-10-15 11:36

from django.db import migrations, models
import userapp.managers


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0002_alter_intrauser_id'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='intrauser',
            managers=[
                ('objects', userapp.managers.IntraUserOAuthManager()),
            ],
        ),
        migrations.AddField(
            model_name='intrauser',
            name='last_login',
            field=models.DateTimeField(null=True),
        ),
    ]
