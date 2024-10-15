from .models import IntraUser
from rest_framework import serializers
from django.contrib.auth.models import User

class IntraUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = IntraUser
		exclude = ['id', 'is_staff', 'is_active']

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'email', 'first_name', 'last_name']