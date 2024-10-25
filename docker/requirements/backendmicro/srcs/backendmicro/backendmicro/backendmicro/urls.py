"""backendmicro URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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

from django.urls import path
from gameapp import views

urlpatterns = [
	path('test/', views.test),
	
	path('api/add_match/', views.AddMatch.as_view()),
	path('api/get_all_scores/', views.GetAllScores.as_view()),
	path('api/get_player_scores/', views.GetPlayerScores.as_view()),
	path('api/update_player_name/', views.UpdatePlayerName.as_view())
]
