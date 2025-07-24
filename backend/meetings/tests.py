from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Meeting, TimeOption

class SubmitAvailabilityViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.meeting = Meeting.objects.create(name="Test", description="Test desc")
        self.time_option1 = TimeOption.objects.create(meeting=self.meeting, start_time="2025-07-23T10:00:00Z", end_time="2025-07-23T11:00:00Z")
        self.time_option2 = TimeOption.objects.create(meeting=self.meeting, start_time="2025-07-23T12:00:00Z", end_time="2025-07-23T13:00:00Z")
        self.url = reverse('submit-availability', args=[self.meeting.id])

    def test_successful_submission(self):
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "available_time_option_ids": [self.time_option1.id, self.time_option2.id]
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Availability submitted successfully.", response.data["detail"])

    def test_missing_fields(self):
        payload = {
            "name": "",
            "email": "",
            "available_time_option_ids": []
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, 400)

    def test_invalid_time_option(self):
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "available_time_option_ids": [9999]  # Invalid ID
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, 400)
