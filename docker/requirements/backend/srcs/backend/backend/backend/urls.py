"""userapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from userapp.views import  getUserInfo, test, intralogin
from userapp import views
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("admin/", admin.site.urls), 
    path("api/test/", test.as_view(), name="test"),
    path("api/getuserinfo/", getUserInfo.as_view(), name="getuserinfo"),
    path("api/intralogin/", intralogin, name="intralogin"),
    path(
        "api/intralogincomplete/",
        views.IntraLoginComplete.as_view(),
        name="intralogincomplete",
    ),
    path("api/login/", views.LoginUser.as_view(), name="login"),
    path("api/logout/", views.LogoutUser.as_view(), name="login"),
    path("api/getuserinfo/", views.GetUserInfo.as_view(), name="getuserinfo"),
    path("api/register/", views.RegisterNewUser.as_view(), name="register"),
    path("api/updateuser/", views.UpdateUser.as_view(), name="updateuser"),
    path("api/updatepassword/", views.UpdatePassword.as_view(), name="updatepassword"),
    path("api/resetpassword/", views.ResetPassword.as_view(), name="resetpassword"),
    path("api/addfriend/", views.AddFriend.as_view(), name="addfriend"),
    path("api/listallusers/", views.ListAllUsers.as_view(), name="listallusers"),
    path("api/listfriends/", views.ListFriends.as_view(), name="listfriends"),
    path(
        "api/listnonfriends/",
        views.ListUsersNotAlreadyFriends.as_view(),
        name="listnonfriends",
    ),
    path("api/deletefriend/", views.DeleteFriend.as_view(), name="deletefriend"),
    path(
        "api/getonlinestatus/", views.GetOnlineStatus.as_view(), name="getonlinestatus"
    ),
    # Calls to gameapp API
    path(
        "api/get_all_scores/", views.GetAllScoresAPICall.as_view(), name="getallscores"
    ),
    path("api/add_match/", views.AddMatchAPICall.as_view()),
    path("api/get_player_scores/", views.GetPlayerScoresAPICall.as_view()),
    path("api/get_tournament_info/", views.TournamentsWonInfoAPICall.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
