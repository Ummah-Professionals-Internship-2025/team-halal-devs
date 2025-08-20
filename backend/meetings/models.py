from django.db import models
import uuid
from django.utils import timezone


class Meeting(models.Model):
   id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
   name = models.CharField(max_length=255,default="Default Name" )
   description = models.TextField()
   created_at = models.DateTimeField(default=timezone.now)
   def __str__(self):
       return self.name




class TimeOption(models.Model):
   id = models.AutoField(primary_key=True)
   meeting = models.ForeignKey(Meeting, related_name='time_options', on_delete=models.CASCADE)
   start_time = models.DateTimeField()
   end_time = models.DateTimeField(null=True, blank=True)
   created_at = models.DateTimeField(default=timezone.now)


   def __str__(self):
       return f"{self.start_time} - {self.end_time or 'TBD'}"




class AvailabilityResponse(models.Model):
   ROLE_CHOICES = [
        ('student', 'Student'),
        ('professional', 'Professional'),
    ]
   
   id = models.AutoField(primary_key=True)
   meeting = models.ForeignKey(Meeting, related_name='availability_responses', on_delete=models.CASCADE)
   participant_name = models.CharField(max_length=255)
   role = models.CharField(max_length=12, choices=ROLE_CHOICES) 
   email = models.EmailField(default='noemail@example.com')
   phone_number = models.CharField(max_length=15, null=True, blank=True)
   industry = models.CharField(max_length=100, null=True, blank=True)
   academic_year = models.CharField(max_length=20, null=True, blank=True)
   seeking_service = models.CharField(max_length=20, null=True, blank=True)
   resume_upload = models.FileField(upload_to='resumes/', null=True, blank=True)
   hear_about_service = models.CharField(max_length=100, null=True, blank=True)
   optional_information = models.TextField(null=True, blank=True)
   send_to_email = models.BooleanField(default=False)
   created_at = models.DateTimeField(default=timezone.now)


   def __str__(self):
        return f"{self.participant_name} ({self.role}) - {self.meeting.name}"




class AvailabilityEntry(models.Model):
   id = models.AutoField(primary_key=True)
   availability_response = models.ForeignKey(AvailabilityResponse, related_name='entries', on_delete=models.CASCADE)
   time_option = models.ForeignKey(TimeOption, related_name='entries', on_delete=models.CASCADE)
  


   def __str__(self):
       return f"{self.availability_response.participant_name} - {self.time_option.start_time}"



class StudentSubmission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    participant_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    industry = models.CharField(max_length=100, null=True, blank=True)
    academic_year = models.CharField(max_length=20, null=True, blank=True)
    seeking_service = models.CharField(max_length=20, null=True, blank=True)
    resume_upload = models.FileField(upload_to='resumes/', null=True, blank=True)
    hear_about_service = models.CharField(max_length=100, null=True, blank=True)
    optional_information = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    # Admin-assigned professional info
    professional_assigned = models.BooleanField(default=False)
    professional_link = models.UUIDField(null=True, blank=True)
    professional_name = models.CharField(max_length=255, null=True, blank=True)
    professional_email = models.EmailField(null=True, blank=True)
    professional_phone = models.CharField(max_length=15, null=True, blank=True)
    professional_industry = models.CharField(max_length=100, null=True, blank=True)
    professional_role = models.CharField(max_length=255, null=True, blank=True)
    professional_more_about = models.TextField(null=True, blank=True)
    professional_selected_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.participant_name} ({self.id})"
