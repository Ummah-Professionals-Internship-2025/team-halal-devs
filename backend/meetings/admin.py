from django.contrib import admin
from .models import Meeting, TimeOption, AvailabilityResponse, AvailabilityEntry

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
    list_display = ['participant_name', 'role', 'meeting', 'created_at']

@admin.register(AvailabilityEntry)
class AvailabilityEntryAdmin(admin.ModelAdmin):
    list_display = ['availability_response', 'time_option']