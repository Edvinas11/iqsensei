from django.urls import path, include
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view()),
    path('login', views.UserLogin.as_view()),
    path('logout', views.UserLogout.as_view()),
    path('user', views.UserView.as_view()),
    path('authenticated', views.UserCheckAuthenticated.as_view()),
]
