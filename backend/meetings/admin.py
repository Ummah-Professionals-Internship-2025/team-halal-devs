from django.contrib import admin
from .models import Meeting, TimeOption, Student, Professional

@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['id', 'name', 'prof_note', 'created_at'] # Added id and prof-note

@admin.register(TimeOption)
class TimeOptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'meeting', 'start_time', 'end_time', 'created_at'] # added created_at

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'participant_name', 'email', 'meeting', 'prof_assigned', 'created_at']
    search_fields = ['participant_name', 'email']
    list_filter = ['prof_assigned', 'meeting']

@admin.register(Professional)
class ProfessionalAdmin(admin.ModelAdmin):
    list_display = ['id', 'prof_name', 'prof_email', 'meeting', 'prof_assigned', 'created_at']
    search_fields = ['prof_name', 'prof_email']
    list_filter = ['prof_assigned', 'meeting', 'prof_industry']
