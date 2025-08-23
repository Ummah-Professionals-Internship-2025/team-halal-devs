from django.urls import path
from .views import (
    api_root,                         # [backend/meetings/views.py](backend/meetings/views.py)
    CreateMeeting,                    # [backend/meetings/views.py](backend/meetings/views.py)
    MeetingDetailView,                # [backend/meetings/views.py](backend/meetings/views.py)
    TimeOptionListView,               # [backend/meetings/views.py](backend/meetings/views.py)
    StudentCreateView,                # [backend/meetings/views.py](backend/meetings/views.py)
    StudentListView,                  # [backend/meetings/views.py](backend/meetings/views.py)
    ProfessionalListView,             # [backend/meetings/views.py](backend/meetings/views.py)
    AssignProfessionalView,           # [backend/meetings/views.py](backend/meetings/views.py)
    ProfessionalUpdateView,           # [backend/meetings/views.py](backend/meetings/views.py)
)

app_name = "meetings"

urlpatterns = [
    path("", api_root, name="api-root"),

    # Meetings
    path("meetings/", CreateMeeting.as_view(), name="create-meeting"),  # POST
    path("meetings/<uuid:meeting_id>/", MeetingDetailView.as_view(), name="meeting-detail"),  # GET
    path("meetings/<uuid:meeting_id>/time-options/", TimeOptionListView.as_view(), name="time-option-list"),  # GET

    # Students
    path("student/", StudentCreateView.as_view(), name="student-create"),  # POST
    path("admin/students/", StudentListView.as_view(), name="admin-student-list"),  # GET

    # Professionals
    path("admin/professionals/", ProfessionalListView.as_view(), name="admin-professional-list"),  # GET
    path("assign-professional/<int:student_id>/", AssignProfessionalView.as_view(), name="assign-professional"),  # POST
    path("professional/<uuid:prof_link>/update/", ProfessionalUpdateView.as_view(), name="professional-update"),  # POST
]