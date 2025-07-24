from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('meetings/', views.CreateMeeting.as_view(), name='create-meeting'),
    path('meetings/<uuid:meeting_id>/', views.MeetingDetailView.as_view(), name='meeting-detail'),
    path('meetings/<uuid:meeting_id>/availability/', views.SubmitAvailabilityView.as_view(), name='submit-availability'),
]
