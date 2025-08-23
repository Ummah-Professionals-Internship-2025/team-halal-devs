from django.db import models
import uuid
from django.utils import timezone


class Meeting(models.Model):
   id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
   name = models.CharField(max_length=255,default="Default Name")
   prof_note = models.TextField(null=True, blank=True)
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




class Student(models.Model):
    id = models.AutoField(primary_key=True)
    meeting = models.ForeignKey(Meeting, related_name="students", on_delete=models.CASCADE)
    participant_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    industry = models.CharField(max_length=100, null=True, blank=True)
    academic_year = models.CharField(max_length=20, null=True, blank=True)
    seeking_service = models.CharField(max_length=20, null=True, blank=True)
    resume_upload = models.FileField(upload_to='resumes/', null=True, blank=True)
    hear_about = models.CharField(max_length=100, null=True, blank=True)
    optional_info = models.TextField(null=True, blank=True)
    send_to_email = models.BooleanField(default=False)
    prof_assigned = models.BooleanField(default=False, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.participant_name} ({self.id})"
    



class Professional(models.Model):
    id = models.AutoField(primary_key=True)
    meeting = models.ForeignKey(Meeting, related_name="professionals", on_delete=models.SET_NULL, null=True, blank=True)
    prof_assigned = models.BooleanField(default=False)
    prof_link = models.UUIDField(null=True, blank=True)
    prof_name = models.CharField(max_length=255, null=True, blank=True)
    prof_email = models.EmailField(null=True, blank=True)
    prof_phone = models.CharField(max_length=15, null=True, blank=True)
    prof_industry = models.CharField(max_length=100, null=True, blank=True)
    prof_role = models.CharField(max_length=255, null=True, blank=True)
    prof_more_about = models.TextField(null=True, blank=True)
    prof_selected_time = models.DateTimeField(null=True, blank=True)
    prof_note = models.TextField(null=True, blank=True) 
    prof_assigned = models.BooleanField(default=False, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.prof_name} ({self.id})"