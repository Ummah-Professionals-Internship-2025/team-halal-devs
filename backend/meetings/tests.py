import datetime
from django.utils import timezone
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from .models import Meeting, TimeOption, AvailabilityResponse, AvailabilityEntry


class AvailabilityResponseTests(APITestCase):
  
  def setUp(self):
     # Create a meeting
     self.meeting = Meeting.objects.create(name="Team Meeting")
  
     # Create time options for the meeting
     self.time_option_1 = TimeOption.objects.create(
         meeting=self.meeting,
         start_time=timezone.make_aware(datetime.datetime(2023, 8, 1, 9, 0, 0)),
         end_time=timezone.make_aware(datetime.datetime(2023, 8, 1, 10, 0, 0))
     )
     self.time_option_2 = TimeOption.objects.create(
         meeting=self.meeting,
         start_time=timezone.make_aware(datetime.datetime(2023, 8, 1, 10, 0, 0)),
         end_time=timezone.make_aware(datetime.datetime(2023, 8, 1, 11, 0, 0))
     )
  
     # Create availability responses
     self.response_1 = AvailabilityResponse.objects.create(
         meeting=self.meeting,
         participant_name="John Doe",
         email="john.doe@example.com"  # Added email here
     )
     AvailabilityEntry.objects.create(
         availability_response=self.response_1,
         time_option=self.time_option_1
     )
  
     self.response_2 = AvailabilityResponse.objects.create(
         meeting=self.meeting,
         participant_name="Jane Smith",
         email="jane.smith@example.com"  # Added email here
     )
     AvailabilityEntry.objects.create(
         availability_response=self.response_2,
         time_option=self.time_option_2
     )


  def test_get_availability_responses(self):
     url = f'/api/meetings/{self.meeting.id}/availability-responses/'
     response = self.client.get(url)


     self.assertEqual(response.status_code, 200)
  
     # Ensure email is included in the response
     response_data = response.json()
     self.assertEqual(response_data[0]['email'], "john.doe@example.com")
     self.assertEqual(response_data[1]['email'], "jane.smith@example.com")
  
     # Ensure time_option_ids are included in the response (check the first entry)
     self.assertIn('time_option', response_data[0]['entries'][0])  # Check for time option
     self.assertEqual(response_data[0]['entries'][0]['time_option']['id'], self.time_option_1.id)


     # Check if the second response contains the correct time option
     self.assertEqual(response_data[1]['entries'][0]['time_option']['id'], self.time_option_2.id)


  def test_get_availability_summary(self):
      url = f'/api/meetings/{self.meeting.id}/availability-summary/'
      response = self.client.get(url)
    
      self.assertEqual(response.status_code, 200)
    
      response_data = response.json()
    
      # Ensure the response contains time options
      self.assertEqual(len(response_data), 2)  # There are 2 time options for the meeting


      # Ensure the available count is correct
      self.assertEqual(response_data[0]["available_count"], 1)  # Only one participant available for time_option_1
      self.assertEqual(response_data[1]["available_count"], 1)  # Only one participant available for time_option_2

      # Ensure the time options are correctly listed with start and end times
      self.assertEqual(response_data[0]["time_option_id"], self.time_option_1.id)
      self.assertEqual(response_data[1]["time_option_id"], self.time_option_2.id)

