from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views import View
import requests
import os
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsNotAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    IntraUserSerializer,
    UserSerializer,
    AvatarSerializer,
    FriendSerializer,
    IntraFriendSerializer,
)
from .permissions import IsAuthenticatedCustom
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from .models import IntraUser, userAvatar, userFriend, lastActive
from random import randint, randrange
from django.core.files.storage import FileSystemStorage
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
import requests
from .helpers import (
    input_validation,
    sanitize_input,
    password_policy,
    generate_random_filename,
)

INTRA_AUTH_URL = (
    "https://api.intra.42.fr/oauth/authorize?client_id="
    + os.environ.get("API_CLIENT_ID")
    + "&redirect_uri="
    + os.environ.get("API_REDIRECT_URI")
    + "&response_type=code"
)

def intralogin(request):
    return redirect(INTRA_AUTH_URL)

class test(APIView):
     def get(self, request):
        return JsonResponse({"message": "success from django backend!})"})

def update_last_active(request):
    if hasattr(request.user, "intra_id"):
        lastActive.objects.get(intrauser=request.user).update_last_active()
    else:
        lastActive.objects.get(user=request.user).update_last_active()


def get_user_info(code):
    newdata = {
        "grant_type": "authorization_code",
        "client_id": os.environ.get("API_CLIENT_ID"),
        "client_secret": os.environ.get("API_CLIENT_SECRET"),
        "redirect_uri": os.environ.get("API_REDIRECT_URI"),
        "code": code,
    }
    new_user_access_token = requests.post(
        "https://api.intra.42.fr/oauth/token", data=newdata
    )
    headers = {
        "Authorization": "Bearer " + new_user_access_token.json()["access_token"]
    }
    user_info_url = "https://api.intra.42.fr/v2/me"
    user_info = requests.get(user_info_url, headers=headers)
    return user_info.json()


class IntraLoginComplete(View):
    def get(self, request):
        if request.GET.get("code"):
            code = request.GET.get("code")
            user_info = get_user_info(code)
            intra_user = authenticate(request, user=user_info)
            login(request, intra_user)
            if lastActive.objects.filter(intrauser=intra_user).exists() == False:
                lastActive.objects.create(intrauser=intra_user)
            return redirect("https://localhost/main")
        else:
            return JsonResponse({"error": "login unable to continue"})


# get user info from intra
class getUserInfo(APIView):
    permission_classes = [IsAuthenticatedCustom]

    def get(self, request):
        try:
            user = request.user
            if hasattr(user, "intra_id"):
                serializer = IntraUserSerializer(user, many=False)
            else:
                serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class LoginUser(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            if request.user.is_authenticated:
                return JsonResponse({"success": "Already logged in"})
            return JsonResponse({"error": "User is not logged in "})
        except:
            return JsonResponse({"error": "User is not logged in "})

    def post(self, request):
        try:
            username = sanitize_input(request.POST.get("username"))
            password = request.POST.get("password")
            if input_validation(username) == False:
                return JsonResponse(
                    {
                        "error": "Invalid characters found in username, characters <, >, ', \", & are not allowed"
                    }
                )
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                if lastActive.objects.filter(user=user).exists() == False:
                    lastActive.objects.create(user=user)
                serialized = UserSerializer(user, many=False)
                return Response(serialized.data)
            else:
                return JsonResponse({"error": "Login failed"})
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class LogoutUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return JsonResponse({"success": "Logged out"})

    def post(self, request):
        logout(request)
        return JsonResponse({"success": "Logged out"})


class GetUserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            user = request.user
            if hasattr(user, "intra_id"):
                serializer = IntraUserSerializer(user, many=False)
            else:
                serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class RegisterNewUser(APIView):
    permission_classes = [IsNotAuthenticated]

    def post(self, request):
        try:
            username = sanitize_input(request.POST.get("username"))
            password = request.POST.get("password")
            confirmpassword = request.POST.get("confirm_password")
            if password != confirmpassword:
                return JsonResponse({"error": "Passwords do not match"})
            if password_policy(password) == False:
                return JsonResponse(
                    {
                        "error": "Password must be at least 8 characters long, with min 1 uppercase, 1 lowercase, 1 number and 1 special character"
                    },
                    status=400,
                )
            email = request.POST.get("email")
            first_name = sanitize_input(request.POST.get("first_name"))
            last_name = sanitize_input(request.POST.get("last_name"))
            if request.FILES.get("avatar") == None:
                image = "avatars/default.png"
            else:
                image = request.FILES.get("avatar")
                while (
                    userAvatar.objects.filter(avatar=("avatars/" + image.name)).exists()
                    == True
                ):
                    image.name = generate_random_filename(username, image.name)
            username_check = User.objects.filter(username=username)
            intra_username_check = IntraUser.objects.filter(username=username)
            email_check = User.objects.filter(email=email)
            intra_email_check = IntraUser.objects.filter(email=email)

            # Handling duplication
            if username_check.exists() or intra_username_check.exists():
                return JsonResponse({"error": "username exists"})
            if email_check.exists() or intra_email_check.exists():
                return JsonResponse({"error": "email exists"})

            user = User(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
            )
            user.set_password(password)
            user.is_staff = False
            user.is_superuser = False
            avatar = userAvatar(avatar=image, user=user)
            user.save()
            avatar.save()
            user_serialiser = UserSerializer(user, many=False)
            avatar_serialiser = AvatarSerializer(avatar, many=False)
            return Response(
                {
                    "success": "User created!",
                    "user": user_serialiser.data,
                    "avatar": avatar_serialiser.data,
                }
            )
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class UpdateUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            user = request.user
            if hasattr(user, "intra_id"):
                user_serialiser = IntraUserSerializer(user, many=False)
                avatar = userAvatar.objects.get(intra_user=user)
            else:
                user_serialiser = UserSerializer(user, many=False)
                avatar = userAvatar.objects.get(user=user)
            avatar_serialiser = AvatarSerializer(avatar, many=False)
            return Response(
                {"user": user_serialiser.data, "avatar": avatar_serialiser.data}
            )
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)

    def post(self, request):
        try:
            update_last_active(request)
            user = request.user

            player = user.username
            username = sanitize_input(request.POST.get("username"))
            password = request.POST.get("password")
            email = request.POST.get("email")
            first_name = sanitize_input(request.POST.get("first_name"))
            last_name = sanitize_input(request.POST.get("last_name"))
            image = request.FILES.get("avatar")
            username_check = User.objects.filter(username=username)
            email_check = User.objects.filter(email=email)
            if user.username != username:
                if username_check.exists():
                    return JsonResponse({"error": "username exists"})
            if user.email != email:
                if email_check.exists():
                    return JsonResponse({"error": "email exists"})
            user.username = username
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            if image != None:
                if hasattr(user, "intra_id"):
                    avatar = userAvatar.objects.filter(intra_user=user).first()
                else:
                    avatar = userAvatar.objects.filter(user=user).first()
                existing_image = avatar.avatar
                if existing_image != None and existing_image != "avatars/default.png":
                    existing_image.delete()
                image.name = generate_random_filename(username, image.name)
                avatar.avatar = image
                avatar.save()
            else:
                if hasattr(user, "intra_id"):
                    avatar = userAvatar.objects.get(intra_user=user)
                else:
                    avatar = userAvatar.objects.get(user=user)
            payload = {"player": player, "new_name": username}
            r = requests.post(
                "https://backendmicro:8009/api/update_player_name/",
                data=payload,
                verify=False,
            )
            if r.status_code != 200:
                return JsonResponse(
                    {"error": "Failed to update MatchHistory with new username"}
                )
            user_serialiser = UserSerializer(user, many=False)
            avatar_serialiser = AvatarSerializer(avatar, many=False)
            return Response(
                {
                    "success": "User updated",
                    "user": user_serialiser.data,
                    "avatar": avatar_serialiser.data,
                }
            )
        except:
            return JsonResponse({"error": "Internal Server Error!"}, status=500)


class UpdatePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            update_last_active(request)
            user = request.user
            old_password = request.POST.get("old_password")
            new_password = request.POST.get("new_password")
            confirm_password = request.POST.get("confirm_password")
            if new_password != confirm_password:
                return JsonResponse({"error": "Passwords do not match"})
            if password_policy(new_password) == False:
                return JsonResponse(
                    {
                        "error": "Password must be at least 8 characters long, with min 1 uppercase, 1 lowercase, 1 number and 1 special character"
                    },
                    status=400,
                )
            if user.check_password(old_password):
                user.set_password(new_password)
                user.save()
                if not hasattr(user, "backend"):
                    user.backend = "django.contrib.auth.backends.ModelBackend"
                login(request, user, backend=user.backend)
                return JsonResponse({"success": "Password changed"})
            else:
                return JsonResponse({"error": "Incorrect password"})
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class ResetPassword(APIView):
    permission_classes = [IsNotAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get("email")
            if not email:
                return Response(
                    {"email": "This field is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {"email": "User with this email does not exist."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            context = {
                "email": user.email,
                "domain": request.get_host(),
                "site_name": "PingPong!",
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "user": user,
                "new_password": default_token_generator.make_token(user),
                "protocol": "https" if request.is_secure() else "http",
            }
            context["user"].set_password(context["new_password"])
            context["user"].save()
            subject = "Password Reset Requested"
            email_template_name = "registration/passwordresetemail.html"
            email_body = render_to_string(email_template_name, context)

            send_mail(
                subject,
                email_body,
                "noreply@pingpong",
                [user.email],
                fail_silently=False,
            )

            return Response(
                {"detail": "Password reset email has been sent."},
                status=status.HTTP_200_OK,
            )
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class AddFriend(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            update_last_active(request)
            user = request.user
            friend_name = request.POST.get("username")
            if hasattr(user, "intra_id"):
                if User.objects.filter(username=friend_name).exists() == True:
                    friend_object = User.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        intra_user=user, friend=friend_object
                    ).exists():
                        return Response({"error": "Friend already exists"})
                    user_friend = userFriend(intra_user=user, friend=friend_object)
                    user_friend.save()
                else:
                    friend_object = IntraUser.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        intra_user=user, intra_friend=friend_object
                    ).exists():
                        return Response({"error": "Friend already exists"})
                    user_friend = userFriend(
                        intra_user=user, intra_friend=friend_object
                    )
                    user_friend.save()
                return Response({"success": "Friend added"})
            else:
                if User.objects.filter(username=friend_name).exists() == True:
                    friend_object = User.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        user=user, friend=friend_object
                    ).exists():
                        return Response({"error": "Friend already exists"})
                    user_friend = userFriend(user=user, friend=friend_object)
                    user_friend.save()
                else:
                    friend_object = IntraUser.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        user=user, intra_friend=friend_object
                    ).exists():
                        return Response({"error": "Friend already exists"})
                    user_friend = userFriend(user=user, intra_friend=friend_object)
                    user_friend.save()
                return Response({"success": "Friend added"})
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class ListAllUsers(APIView):  # Lists all users except for the user who you logged in as
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            users = User.objects.all().exclude(id=request.user.id)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class ListUsersNotAlreadyFriends(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            if hasattr(request.user, "intra_id"):
                intra_users = IntraUser.objects.all().exclude(id=request.user.id)
                intra_friends = userFriend.objects.filter(intra_user=request.user)
                intra_friends_with_intra_friends = intra_friends.values_list(
                    "intra_friend_id", flat=True
                ).exclude(intra_friend_id__isnull=True)
                possible_intra_friends = intra_users.exclude(
                    id__in=intra_friends_with_intra_friends
                )
                intra_serializer = IntraUserSerializer(
                    possible_intra_friends, many=True
                )
                users = User.objects.all()
                friends = (
                    userFriend.objects.all()
                    .filter(intra_user=request.user)
                    .values_list("friend", flat=True)
                    .exclude(friend_id__isnull=True)
                )
                possible_friends = users.exclude(id__in=friends)
                intra_serializer = IntraUserSerializer(
                    possible_intra_friends, many=True
                )
                serializer = UserSerializer(possible_friends, many=True)
                return Response(
                    {
                        "intrafriends": intra_serializer.data,
                        "nonintrafriends": serializer.data,
                    }
                )
            else:
                intra_users = IntraUser.objects.all()
                all_friends = userFriend.objects.filter(user=request.user)
                intra_friends = all_friends.values_list(
                    "intra_friend_id", flat=True
                ).exclude(intra_friend_id__isnull=True)
                possible_intra_friends = intra_users.exclude(id__in=intra_friends)
                users = User.objects.all().exclude(id=request.user.id)
                friends = (
                    userFriend.objects.all()
                    .filter(user=request.user)
                    .values_list("friend", flat=True)
                    .exclude(friend_id__isnull=True)
                )
                intra_serializer = IntraUserSerializer(
                    possible_intra_friends, many=True
                )
                possible_friends = users.exclude(id__in=friends)
                serializer = UserSerializer(possible_friends, many=True)
                return Response(
                    {
                        "intrafriends": intra_serializer.data,
                        "nonintrafriends": serializer.data,
                    }
                )
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class ListFriends(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            user = request.user
            if hasattr(user, "intra_id"):
                users = userFriend.objects.filter(intra_user=user)
                other_users = userFriend.objects.filter(intra_user=user)
            else:
                users = userFriend.objects.filter(user=user)
                other_users = userFriend.objects.filter(user=user)

            intra_serializer = IntraFriendSerializer(other_users, many=True)
            serializer = FriendSerializer(users, many=True)
            return Response(
                {
                    "intrafriends": intra_serializer.data,
                    "nonintrafriends": serializer.data,
                }
            )
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class DeleteFriend(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            update_last_active(request)
            user = request.user
            friend_name = sanitize_input(request.POST.get("friend"))
            if hasattr(user, "intra_id"):
                if User.objects.filter(username=friend_name).exists() == True:
                    friend_object = User.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        intra_user=user, friend=friend_object
                    ).exists():
                        user_friend = userFriend.objects.get(
                            intra_user=user, friend=friend_object
                        )
                        user_friend.delete()
                else:
                    friend_object = IntraUser.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        intra_user=user, intra_friend=friend_object
                    ).exists():
                        user_friend = userFriend.objects.get(
                            intra_user=user, intra_friend=friend_object
                        )
                        user_friend.delete()
                return Response({"success": "Friend deleted"})
            else:
                if User.objects.filter(username=friend_name).exists() == True:
                    friend_object = User.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        user=user, friend=friend_object
                    ).exists():
                        user_friend = userFriend.objects.get(
                            user=user, friend=friend_object
                        )
                        user_friend.delete()
                        return Response({"success": "Friend deleted"})
                else:
                    friend_object = IntraUser.objects.get(username=friend_name)
                    if userFriend.objects.filter(
                        user=user, intra_friend=friend_object
                    ).exists():
                        user_friend = userFriend.objects.get(
                            user=user, intra_friend=friend_object
                        )
                        user_friend.delete()
                        return Response({"success": "Friend deleted"})
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


class GetOnlineStatus(APIView):
    PermissionClasses = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            if hasattr(request.user, "intra_id"):
                users = userFriend.objects.all().filter(intra_user=request.user)
            else:
                users = userFriend.objects.all().filter(user=request.user)
            status = {}
            for x in users:
                if x and x.intra_friend:
                    if lastActive.objects.filter(intrauser=x.intra_friend).exists():
                        online = lastActive.objects.get(
                            intrauser=x.intra_friend
                        ).last_active
                        if online and online > timezone.now() - timedelta(minutes=5):
                            status[x.intra_friend.username] = True
                        else:
                            status[x.intra_friend.username] = False
                    else:
                        status[x.intra_friend.username] = False
                if x and x.friend:
                    if lastActive.objects.filter(user=x.friend).exists():
                        online = lastActive.objects.get(user=x.friend).last_active
                        if online and online > timezone.now() - timedelta(minutes=5):
                            status[x.friend.username] = True
                        else:
                            status[x.friend.username] = False
                    else:
                        status[x.friend.username] = False
            return Response(status)
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


# These are the API calls for the backendmicro microservice which handles all game related data
class GetAllScoresAPICall(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            r = requests.get(
                "https://backendmicro:8009/api/get_all_scores/", verify=False
            )
            if r.status_code != 200:
                return JsonResponse(
                    {"error": "Internal Server Error while getting all scores"},
                    status=500,
                )
            return Response(r.json())
        except:
            return JsonResponse({"error": "Internal Server Error"}, status=500)


@method_decorator(csrf_exempt, name="dispatch")
class AddMatchAPICall(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            update_last_active(request)
            player1 = sanitize_input(request.user.username)
            player2 = sanitize_input(request.POST.get("player2"))
            player1_score = sanitize_input(request.POST.get("player1_score"))
            player2_score = sanitize_input(request.POST.get("player2_score"))
            if (
                player1 == None
                or player2 == None
                or int(player1_score) < 0
                or int(player2_score) < 0
            ):
                return Response({"error": "Invalid data"})
            payload = {
                "player1": player1,
                "player2": player2,
                "player1_score": player1_score,
                "player2_score": player2_score,
            }
            r = requests.post(
                "https://backendmicro:8009/api/add_match/", data=payload, verify=False
            )
            if r.status_code != 200:
                return JsonResponse(
                    {"error": "Internal Server Error while adding match"}, status
                )
            return Response(r.json())
        except:
            return JsonResponse({"error": "Internal Server Error!"}, status=500)


class GetPlayerScoresAPICall(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            update_last_active(request)
            player = sanitize_input(request.user.username)
            payload = {"player": player}
            r = requests.get(
                "https://backendmicro:8009/api/get_player_scores/",
                params=payload,
                verify=False,
            )
            if r.status_code != 200:
                return JsonResponse(
                    {"error": "Internal Server Error while getting player scores"},
                    status=500,
                )
            return Response(r.json())
        except:
            return JsonResponse({"error": "Internal Server Error!"}, status=500)


class TournamentsWonInfoAPICall(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            player = sanitize_input(request.user.username)
            payload = {"player": player}
            r = requests.get(
                "https://backendmicro:8009/api/get_tournament_info/",
                params=payload,
                verify=False,
            )
            if r.status_code != 200:
                return JsonResponse(
                    {
                        "error": "Internal Server Error while getting tournament info for player"
                    },
                    status=500,
                )
            return Response(r.json())
        except:
            return JsonResponse({"error": "Internal Server Error!"}, status=500)

    def post(self, request):
        try:
            player = sanitize_input(request.user.username)
            payload = {"player": player}
            r = requests.post(
                "https://backendmicro:8009/api/get_tournament_info/",
                data=payload,
                verify=False,
            )
            if r.status_code != 200:
                return JsonResponse(
                    {
                        "error": "Internal Server Error while getting tournament info for player"
                    },
                    status=500,
                )
            return Response(r.json())
        except:
            return JsonResponse({"error": "Internal Server Error!"}, status=500)
