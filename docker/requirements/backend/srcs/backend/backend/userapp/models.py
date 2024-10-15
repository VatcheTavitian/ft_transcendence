from django.db import models
from .managers import IntraUserOAuthManager

# Create your models here.

class IntraUser(models.Model):
	objects = IntraUserOAuthManager()
	id = models.AutoField(primary_key=True)
	intra_id = models.BigIntegerField()
	login = models.CharField(max_length=255, unique=True)
	email = models.CharField(max_length=255)
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	display_name = models.CharField(max_length=255)
	image_url = models.CharField(max_length=500)
	last_login = models.DateTimeField(null=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True, null=True)

	def is_authenticated(self):
		return True
