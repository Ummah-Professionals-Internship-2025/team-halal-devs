from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Meeting, TimeOption, AvailabilityResponse, AvailabilityEntry

from .models import Meeting
from .serializers import MeetingSerializer, MeetingDetailSerializer

def home(request):
    return HttpResponse("Welcome to the API. Visit /admin/ or /api/")

def api_root(request):
    return JsonResponse({"message": "Welcome to the Meetings API!"})


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
                {
                    "meeting_id": meeting_id,
                    "shareable_link": shareable_link
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeetingDetailView(APIView):
    authentication_classes = [] 
    permission_classes = []

    def get(self, request, meeting_id):
        try:
            meeting = Meeting.objects.get(pk=meeting_id)
        except Meeting.DoesNotExist:
            return Response(
                {"detail": "Meeting not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MeetingDetailSerializer(meeting)
        return Response(serializer.data)

@method_decorator(csrf_exempt, name='dispatch')
class SubmitAvailabilityView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, meeting_id):
        name = request.data.get("name")
        email = request.data.get("email")
        option_ids = request.data.get("available_time_option_ids")

        # Validate required fields
        if not name or not email or not isinstance(option_ids, list) or not option_ids:
            return Response({"detail": "Missing or invalid fields."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate meeting exists
        meeting = get_object_or_404(Meeting, pk=meeting_id)

        # Validate time option IDs belong to this meeting
        valid_ids = set(TimeOption.objects.filter(meeting=meeting).values_list("id", flat=True))
        if not set(option_ids).issubset(valid_ids):
            return Response({"detail": "One or more time option IDs are invalid for this meeting."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the AvailabilityResponse
        response = AvailabilityResponse.objects.create(
            participant_name=name,
            meeting=meeting
        )

        # Create AvailabilityEntries
        entries = [
            AvailabilityEntry(availability_response=response, time_option_id=option_id)
            for option_id in option_ids
        ]
        AvailabilityEntry.objects.bulk_create(entries)

        return Response({"detail": "Availability submitted successfully."}, status=status.HTTP_200_OK)


