from django.db import models
from .managers import IntraUserOAuthManager
from django.contrib.auth.models import User
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
	username = models.CharField(max_length=255, unique=True)

	def is_authenticated(self):
		return True

class userAvatar(models.Model):
	id = models.AutoField(primary_key=True)
	avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)