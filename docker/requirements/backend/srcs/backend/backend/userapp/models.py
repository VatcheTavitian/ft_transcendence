from django.db import models
from .managers import IntraUserOAuthManager
from django.contrib.auth.models import User
from django.utils import timezone

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
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    intra_user = models.OneToOneField(IntraUser, on_delete=models.CASCADE, null=True)


class userFriend(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="non_intra_user"
    )
    friend = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="non_intra_friend"
    )
    intra_user = models.ForeignKey(
        IntraUser, on_delete=models.CASCADE, null=True, related_name="intra_user"
    )
    intra_friend = models.ForeignKey(
        IntraUser, on_delete=models.CASCADE, null=True, related_name="intra_friend"
    )


class lastActive(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    intrauser = models.OneToOneField(IntraUser, on_delete=models.CASCADE, null=True)
    last_active = models.DateTimeField(auto_now=True)

    def update_last_active(self):
        self.last_active = timezone.now()
        self.save()
