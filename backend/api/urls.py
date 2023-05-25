from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListView.as_view()),
    path('create-user/', views.CreateUserView.as_view())
]
