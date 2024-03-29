from django.urls import path, include
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('register', views.UserRegister.as_view()),
    path('login', views.UserLogin.as_view()),
    path('token', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    path('home', views.HomeView.as_view(), name="home"),
    path('logout', views.LogoutView.as_view(), name="logout"),
    path('user', views.UserView.as_view(), name='user'),
]
