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
    path('', api_root, name='api-root'),
    path('meetings/', CreateMeeting.as_view(), name='create-meeting'),
    path('meetings/<uuid:meeting_id>/', MeetingDetailView.as_view(), name='meeting-detail'),
    path('availability-responses/<uuid:meeting_id>/', AvailabilityResponseListView.as_view(), name='availability-response-list'),
    path('availability-summary/<uuid:meeting_id>/', AvailabilitySummaryView.as_view(), name='availability-summary'),
    path('student/', StudentSubmissionCreateView.as_view(), name='student-create'),
    path('admin/students/', AdminStudentListView.as_view(), name='admin-student-list'),
    path('assign-professional/<uuid:student_id>/', AssignProfessionalView.as_view(), name='assign-professional'),
    path('professional/<uuid:professional_link>/', ProfessionalSubmissionView.as_view(), name='professional-submission'),
    path('confirm-meeting/<uuid:student_id>/', ConfirmMeetingView.as_view(), name='confirm-meeting'),
]
