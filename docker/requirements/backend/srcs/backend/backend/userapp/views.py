from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views import View
import requests
import os
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import IntraUserSerializer, UserSerializer
from .permissions import IsAuthenticatedCustom

def index(request):
	json = {"message": "This is index view!!"}
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
