import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView

from .models import Meeting, TimeOption, AvailabilityResponse, AvailabilityEntry, StudentSubmission
from .serializers import (
    MeetingSerializer, 
    MeetingDetailSerializer, 
    AvailabilityResponseSerializer, 
    StudentSubmissionSerializer
)


# -----------------------
# Root / Home
# -----------------------
def home(request):
    return HttpResponse("Welcome to the API. Visit /admin/ or /api/")


def api_root(request):
    return JsonResponse({"message": "Welcome to the Meetings API!"})


# -----------------------
# Meeting endpoints
# -----------------------
@method_decorator(csrf_exempt, name='dispatch')
class CreateMeeting(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            meeting = serializer.save()
            meeting_id = str(meeting.id)
            shareable_link = f"http://localhost:5173/meeting/{meeting_id}"
            return Response(
                {"meeting_id": meeting_id, "shareable_link": shareable_link},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeetingDetailView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, meeting_id):
        meeting = get_object_or_404(Meeting, pk=meeting_id)
        serializer = MeetingDetailSerializer(meeting)
        return Response(serializer.data)


# -----------------------
# Availability responses
# -----------------------
class AvailabilityResponseListView(ListAPIView):
    serializer_class = AvailabilityResponseSerializer

    def get_queryset(self):
        meeting_id = self.kwargs['meeting_id']
        return AvailabilityResponse.objects.filter(meeting_id=meeting_id)


class AvailabilitySummaryView(APIView):
    def get(self, request, meeting_id):
        meeting = get_object_or_404(Meeting, pk=meeting_id)
        time_options = TimeOption.objects.filter(meeting=meeting)
        summary_data = []
        for option in time_options:
            count = AvailabilityResponse.objects.filter(entries__time_option=option).count()
            summary_data.append({
                "time_option_id": option.id,
                "start_time": option.start_time,
                "end_time": option.end_time,
                "available_count": count
            })
        return Response(summary_data)


# -----------------------
# Student submission endpoints
# -----------------------
class StudentSubmissionCreateView(APIView):
    def post(self, request):
        serializer = StudentSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save()
            return Response(
                {"message": "Submission received", "student_id": str(submission.id)},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminStudentListView(ListAPIView):
    queryset = StudentSubmission.objects.all().order_by('-created_at')
    serializer_class = StudentSubmissionSerializer


class AssignProfessionalView(APIView):
    def post(self, request, student_id):
        submission = get_object_or_404(StudentSubmission, id=student_id)
        submission.professional_name = request.data.get("professional_name")
        submission.professional_email = request.data.get("professional_email")
        submission.professional_phone = request.data.get("professional_phone")
        submission.professional_industry = request.data.get("professional_industry")
        submission.professional_role = request.data.get("professional_role")
        submission.professional_more_about = request.data.get("professional_more_about")
        submission.professional_link = uuid.uuid4()
        submission.professional_assigned = True
        submission.save()
        return Response(
            {"message": "Professional assigned", "professional_link": str(submission.professional_link)},
            status=status.HTTP_200_OK
        )


# -----------------------
# Professional endpoints
# -----------------------
class ProfessionalSubmissionView(APIView):
    def get(self, request, professional_link):
        submission = get_object_or_404(StudentSubmission, professional_link=professional_link)
        serializer = StudentSubmissionSerializer(submission)
        return Response(serializer.data)

    def post(self, request, professional_link):
        submission = get_object_or_404(StudentSubmission, professional_link=professional_link)
        submission.professional_selected_time = request.data.get("professional_selected_time")
        submission.save()
        return Response({"message": "Time selection submitted"}, status=status.HTTP_200_OK)


# -----------------------
# Admin confirms final meeting
# -----------------------
class ConfirmMeetingView(APIView):
    def post(self, request, student_id):
        submission = get_object_or_404(StudentSubmission, id=student_id)
        if not submission.professional_selected_time:
            return Response({"error": "Professional has not selected a time yet"}, status=400)
        submission.save()
        return Response({"message": "Meeting confirmed"}, status=status.HTTP_200_OK)
