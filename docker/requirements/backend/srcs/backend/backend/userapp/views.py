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
from .serializers import IntraUserSerializer, UserSerializer, AvatarSerializer
from .permissions import IsAuthenticatedCustom
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from .models import IntraUser, userAvatar
from random import randint, randrange
from django.core.files.storage import FileSystemStorage
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status



def index(request):
	json = {"message": "This is index view!!!"}
	return JsonResponse(json)
	# return HttpResponse("This is index view")


INTRA_AUTH_URL = 'https://api.intra.42.fr/oauth/authorize?client_id=' + os.environ.get('API_CLIENT_ID') + '&redirect_uri=' + os.environ.get('API_REDIRECT_URI') + '&response_type=code'

def intralogin(request):
	return redirect(INTRA_AUTH_URL)

def intralogout(request):
    logout(request)
    return redirect('/index')

@login_required(login_url='/intralogin')
def get_authenticated_user(request):
	user = request.user
	return JsonResponse({
		"id": user.intra_id, 
		"login": user.login, 
		"email": user.email, 
		"first_name": user.first_name, 
		"last_name": user.last_name, 
		"display_name": user.display_name, 
		"image_url": user.image_url
		})

def get_user_info(code):
	newdata = {
				"grant_type": "authorization_code",
				"client_id": os.environ.get('API_CLIENT_ID'), 
				"client_secret": os.environ.get('API_CLIENT_SECRET'),
				"redirect_uri": os.environ.get('API_REDIRECT_URI'),
				"code" :	code,
			}
	new_user_access_token = requests.post('https://api.intra.42.fr/oauth/token', data=newdata)
	headers = { 'Authorization': 'Bearer ' + new_user_access_token.json()['access_token'] }
	user_info_url = 'https://api.intra.42.fr/v2/me'
	user_info = requests.get(user_info_url, headers=headers)
	return user_info.json()

class intraLoginSuccess(View):
	def get(self, request):
		if request.GET.get('code'):
			code = request.GET.get('code')
			user_info = get_user_info(code)
			intra_user = authenticate(request, user=user_info)
			login(request, intra_user)
			return redirect('/auth/user')
		else:
			return render(request, 'authView.html')
	def post(self, request):
		return HttpResponse("This is post request")


#get user info from intra
class getUserInfo(APIView):
	permission_classes = [IsAuthenticatedCustom]
	def get(self, request):
		user = request.user
		if hasattr(user,'intra_id'):
			serializer = IntraUserSerializer(user, many=False)
		else:
			serializer = UserSerializer(user, many=False)
		return Response(serializer.data)

class loginNonIntra(APIView):
	permission_classes = [AllowAny]
	def post(self, request):
		user = authenticate(request, username=request.data.get('username') , password=request.data.get('password'))
		if user is not None:
			login(request, user)
			return JsonResponse({"message": "success"})
		else:
			return JsonResponse({"message": "failed"})

class test(APIView):
	permission_classes = [IsAuthenticated]
	def get(self, request):
		return JsonResponse({"message": "success!})"})
	

def input_validation(*args):
	not_allowed = ['<', '>', '\'', '"', '&']
	for arg in args:
		for na in not_allowed:
			if na in arg:
				return False


class LoginUser(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		if request.user.is_authenticated:
			return JsonResponse({"success": "Already logged in"})
		return JsonResponse({"error": "User is not logged in "})
	def post(self, request):
		username = request.POST.get('username')
		password = request.POST.get('password')
		if (input_validation(username, password) == False):
			return JsonResponse({"error": "Invalid input found, characters <, >, ', \", & are not allowed"})
		user = authenticate(request, username=username , password=password)
		if user is not None:
			login(request, user)
			serialized = UserSerializer(user, many=False)
			return Response(serialized.data)
		else:
			return JsonResponse({"error": "Login failed"})
		
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
		user = request.user
		if hasattr(user,'intra_id'):
			serializer = IntraUserSerializer(user, many=False)
		else:
			serializer = UserSerializer(user, many=False)
		return Response(serializer.data)

def generate_random_filename(username, imagename):
	lower_bound = 10 ** 6
	upper_bound = 10 ** 7
	random_suffix = randint(lower_bound,upper_bound)
	last = imagename.rfind(".")
	extension = "" 
	if last != -1:
		extension = imagename[last:]
	return (username + f"{random_suffix}" + extension)

# add/enforce password policy!
class RegisterNewUser(APIView):
	permission_classes = [IsNotAuthenticated]
	def post(self, request):
		username = request.POST.get('username')
		password = request.POST.get('password')
		confirmpassword = request.POST.get('confirm_password')
		if password != confirmpassword:
			return JsonResponse({"error": "Passwords do not match"})
		email = request.POST.get('email')
		first_name = request.POST.get('first_name')
		last_name = request.POST.get('last_name')
		if request.FILES.get('avatar') == None:
			image = "avatars/default.png"
		else:
			image = request.FILES.get('avatar')
			while userAvatar.objects.filter(avatar = ('avatars/' + image.name)).exists() == True:
				image.name = generate_random_filename(username, image.name)
		username_check = User.objects.filter(username=username)
		email_check = User.objects.filter(email=email)

		# Handling duplication
		if username_check.exists():
			return JsonResponse({"error": "username exists"})
		if email_check.exists():
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
		return Response({"success": "User created", "user" : user_serialiser.data, "avatar" : avatar_serialiser.data})


class UpdateUser(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		user = request.user
		user_serialiser = UserSerializer(user, many=False)
		avatar = userAvatar.objects.get(user=user)
		avatar_serialiser = AvatarSerializer(avatar, many=False)
		return Response({"user" : user_serialiser.data, "avatar" : avatar_serialiser.data})
	
	def post(self, request):

		user = request.user
		username = request.POST.get('username')
		password = request.POST.get('password')
		email = request.POST.get('email')
		first_name = request.POST.get('first_name')
		last_name = request.POST.get('last_name')
		image = request.FILES.get('avatar')
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
		# DO ERROR HANDLING FOR IMAGE eg if file missing
		if image != None:
			avatar = userAvatar.objects.filter(user=user).first()
			existing_image = avatar.avatar
			if existing_image != None:
				existing_image.delete()
			image.name = generate_random_filename(username, image.name)
			avatar.avatar = image
			avatar.save()
		else:
			avatar = userAvatar.objects.get(user=user)
		user.save()
		user_serialiser = UserSerializer(user, many=False)
		avatar_serialiser = AvatarSerializer(avatar, many=False)
		return Response({"success": "User updated", "user" : user_serialiser.data, "avatar" : avatar_serialiser.data})
	
# add/enforce password policy!
class UpdatePassword(APIView):
	permission_classes = [IsAuthenticated]
	def post(self, request):
		user = request.user
		old_password = request.POST.get('old_password')
		new_password = request.POST.get('new_password')
		confirm_password = request.POST.get('confirm_password')
		if new_password != confirm_password:
			return JsonResponse({"error": "Passwords do not match"})
		if user.check_password(old_password):
			user.set_password(new_password)
			user.save()
			if not hasattr(user, 'backend'):
				user.backend = 'django.contrib.auth.backends.ModelBackend'
			login(request, user, backend=user.backend)
			return JsonResponse({"success": "Password changed"})
		else:
			return JsonResponse({"error": "Incorrect password"})
		

class ForgotPassword(APIView):
	permission_classes = [AllowAny]
	def post(self, request):
		user = request.user
		old_password = request.POST.get('old_password')
		new_password = request.POST.get('new_password')
		confirm_password = request.POST.get('confirm_password')
		if new_password != confirm_password:
			return JsonResponse({"error": "Passwords do not match"})
		if user.check_password(old_password):
			user.set_password(new_password)
			user.save()
			if not hasattr(user, 'backend'):
				user.backend = 'django.contrib.auth.backends.ModelBackend'
			login(request, user, backend=user.backend)
			return JsonResponse({"success": "Password changed"})
		else:
			return JsonResponse({"error": "Incorrect password"})
		
		from django.contrib.auth.views import PasswordResetView

class ResetPassword(APIView):
	permission_classes = [IsNotAuthenticated]
	def post(self, request, *args, **kwargs):
		email = request.data.get('email')
		if not email:
			return Response({"email": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

		try:
			user = User.objects.get(email=email)
		except User.DoesNotExist:
			return Response({"email": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)

		context = {
		'email': user.email,
		'domain': request.get_host(),
		'site_name': 'PingPong!',
		'uid': urlsafe_base64_encode(force_bytes(user.pk)),
		'user': user,
		'new_password': default_token_generator.make_token(user),
		'protocol': 'https' if request.is_secure() else 'http',
        }
		context['user'].set_password(context['new_password'])		
		context['user'].save()
		subject = "Password Reset Requested"
		email_template_name = 'registration/passwordresetemail.html'
		email_body = render_to_string(email_template_name, context)

		send_mail(subject, email_body, 'noreply@pingpong', [user.email], fail_silently=False)

		return Response({"detail": "Password reset email has been sent."}, status=status.HTTP_200_OK)