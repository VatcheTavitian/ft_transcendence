from django.contrib.auth.backends import BaseBackend
from .models import IntraUser, userAvatar
from django.contrib.auth.models import User



class IntraAuthenticationBackend(BaseBackend):
	def authenticate(self, request, user) -> IntraUser:
		find_user = IntraUser.objects.filter(intra_id=user['id']).first()
		if not find_user:
			print("User not found - saving")
			new_user = IntraUser.objects.create_new_intra_user(user)
			userAvatar.objects.create(intra_user=new_user, avatar=new_user.image_url)
			if User.objects.filter(username=new_user.login).first():
				new_user.username = new_user.username + str(new_user.intra_id)
				new_user.save()
			return new_user
		else:
			return find_user

	def get_user(self, user_id):
		try:
			return IntraUser.objects.get(pk=user_id)
		except IntraUser.DoesNotExist:
			return None
		

# class CsrfExemptSessionAuthentication(SessionAuthentication):

#     def enforce_csrf(self, request):
#         return  # To not perform the csrf check previously happening
