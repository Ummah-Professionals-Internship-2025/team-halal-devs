from django.contrib import admin
from .models import Meeting, TimeOption, AvailabilityResponse, AvailabilityEntry, StudentSubmission

@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['name', 'created_at']

@admin.register(TimeOption)
class TimeOptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'meeting', 'start_time', 'end_time']

@admin.register(AvailabilityResponse)
class AvailabilityResponseAdmin(admin.ModelAdmin):
    search_fields = ['participant_name']
    list_display = ['participant_name', 'role', 'email', 'phone_number', 'industry',
        'academic_year', 'seeking_service', 'resume_upload', 'hear_about_service',
        'send_to_email', 'meeting', 'created_at'
    ]
    list_filter = ['role', 'meeting', 'send_to_email']
    search_fields = ['participant_name', 'email', 'industry']

@admin.register(AvailabilityEntry)
class AvailabilityEntryAdmin(admin.ModelAdmin):
    list_display = ['availability_response', 'time_option']

@admin.register(StudentSubmission)
class StudentSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'participant_name', 
        'email', 
        'phone_number',
        'industry', 
        'academic_year', 
        'seeking_service', 
        'resume_upload',  
        'hear_about_service', 
        'optional_information', 
        'professional_assigned',
        'created_at'
    )
    search_fields = ('student_name', 'email')
    list_filter = ('professional_assigned',)