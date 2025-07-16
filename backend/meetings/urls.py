from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('meetings/', views.CreateMeeting.as_view(), name='create-meeting'),
   
]