from django.urls import path
from .views import (
    api_root,                         
    CreateMeeting,                    
    MeetingDetailView,                
    TimeOptionListView,               
    StudentCreateView,                
    StudentListView,                  
    ProfessionalListView,             
    AssignProfessionalView,           
    ProfessionalUpdateView,  
    StudentWithMeetingCreate,
    professionals_list,         
)

app_name = "meetings"

urlpatterns = [
    path("", api_root, name="api-root"),

    # Meetings
    path("meetings/", CreateMeeting.as_view(), name="create-meeting"),  # POST
    path("meetings/<uuid:meeting_id>/", MeetingDetailView.as_view(), name="meeting-detail"),  # GET
    path("meetings/<uuid:meeting_id>/time-options/", TimeOptionListView.as_view(), name="time-option-list"),  # GET

    # Students
    path("student/", StudentCreateView.as_view(), name="student-create"),  # POST. Not working
    path("admin/students/", StudentListView.as_view(), name="admin-student-list"),  # GET. Working!
    path("student-with-meeting/", StudentWithMeetingCreate.as_view(), name="student-with-meeting"),


    # Professionals
    path("admin/professionals/", ProfessionalListView.as_view(), name="admin-professional-list"),  # GET
    path("assign-professional/<int:student_id>/", AssignProfessionalView.as_view(), name="assign-professional"),  # POST
    path("professional/<uuid:prof_link>/update/", ProfessionalUpdateView.as_view(), name="professional-update"),  # POST
    path('professionals-list/', professionals_list, name='professsionals-list'), #GET

]