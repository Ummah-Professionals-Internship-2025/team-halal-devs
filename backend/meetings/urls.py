from django.urls import path
from .views import (
    CreateMeeting,
    MeetingDetailView,
    AvailabilityResponseListView,
    AvailabilitySummaryView,
    StudentSubmissionCreateView,
    AdminStudentListView,
    AssignProfessionalView,
    ProfessionalSubmissionView,
    ConfirmMeetingView,
    api_root
)

urlpatterns = [
  path('', views.api_root, name='api-root'),
  path('meetings/', views.CreateMeeting.as_view(), name='create-meeting'),
  path('meetings/<uuid:meeting_id>/', views.MeetingDetailView.as_view(), name='meeting-detail'),
  path('meetings/<uuid:meeting_id>/availability-responses/', views.AvailabilityResponseListView.as_view(), name='availability-response-list'),  # GET
  path('meetings/<uuid:meeting_id>/availability-responses/create/', views.AvailabilityResponseCreate.as_view(), name='availability-response-create'),  # POST
  path('meetings/<uuid:meeting_id>/availability-summary/', views.AvailabilitySummaryView.as_view(), name='availability-summary'),
  path('meetings/<uuid:meeting_id>/pairs/', views.StudentProfessionalPairListView.as_view(), name='pair-list'),  # GET
  path('meetings/<uuid:meeting_id>/pairs/create/', views.StudentProfessionalPairCreateView.as_view(), name='pair-create'),  # POST
  path('meetings/<uuid:meeting_id>/pairs/<int:id>/', views.StudentProfessionalPairDetailView.as_view(), name='pair-detail'),  # GET, PUT, DELETE
  path('availability-responses/all/', views.AllAvailabilityResponsesView.as_view(), name='all-availability-responses'),
]