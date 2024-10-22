from .models import IntraUser
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import userAvatar, userFriend

class IntraUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = IntraUser
		exclude = ['id', 'is_staff', 'is_active']

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ['username', 'email', 'first_name', 'last_name']



class AvatarSerializer(serializers.ModelSerializer):

	class Meta:
		model = userAvatar
		fields = ['avatar','user_id']
	


class FriendSerializer(serializers.ModelSerializer):
	friend = UserSerializer(read_only=True)

	class Meta:
		model = userFriend
		fields = ['friend']

class IntraFriendSerializer(serializers.ModelSerializer):
	intra_friend = IntraUserSerializer(read_only=True)

	class Meta:
		model = userFriend
		fields = ['intra_friend']