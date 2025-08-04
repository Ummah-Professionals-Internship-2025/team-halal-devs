from django.urls import path
from . import views


urlpatterns = [
  path('', views.api_root, name='api-root'),
  path('meetings/', views.CreateMeeting.as_view(), name='create-meeting'),
  path('meetings/<uuid:meeting_id>/', views.MeetingDetailView.as_view(), name='meeting-detail'),
  path('meetings/<uuid:meeting_id>/availability-responses/', views.AvailabilityResponseListView.as_view(), name='availability-response-list'),  # GET
  path('meetings/<uuid:meeting_id>/availability-responses/create/', views.AvailabilityResponseCreate.as_view(), name='availability-response-create'),  # POST
  path('meetings/<uuid:meeting_id>/availability-summary/', views.AvailabilitySummaryView.as_view(), name='availability-summary')
]