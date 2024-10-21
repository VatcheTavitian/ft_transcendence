from django.contrib.auth.backends import BaseBackend
from .models import IntraUser



class IntraAuthenticationBackend(BaseBackend):
	def authenticate(self, request, user) -> IntraUser:
		find_user = IntraUser.objects.get(intra_id=user['id'])
		if not find_user:
			print("User not found - saving")
			new_user = IntraUser.objects.create_new_intra_user(user)
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
