from django.contrib.auth import models

class IntraUserOAuthManager(models.UserManager):
	def create_new_intra_user(self, user):
		new_user = self.create(
				intra_id=user['id'],
				login=user['login'],
				email=user['email'],
				first_name=user['first_name'],
				last_name=user['last_name'],
				display_name=user['displayname'],
				image_url=user['image']['versions']['large']
			)
		return new_user