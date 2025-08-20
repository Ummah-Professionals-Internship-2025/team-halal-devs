import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from .models import AvailabilityResponse
from .serializers import AvailabilityResponseSerializer



from .models import Meeting, AvailabilityResponse, TimeOption, AvailabilityEntry, StudentProfessionalPair
from .serializers import MeetingSerializer, MeetingDetailSerializer, AvailabilityResponseSerializer, StudentProfessionalPairSerializer




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

class AllAvailabilityResponsesView(ListAPIView):
    serializer_class = AvailabilityResponseSerializer
    queryset = AvailabilityResponse.objects.all()


class StudentProfessionalPairListView(generics.ListAPIView):
    serializer_class = StudentProfessionalPairSerializer
    
    def get_queryset(self):
        meeting_id = self.kwargs['meeting_id']
        return StudentProfessionalPair.objects.filter(meeting_id=meeting_id)


class StudentProfessionalPairCreateView(generics.CreateAPIView):
    serializer_class = StudentProfessionalPairSerializer
    
    def perform_create(self, serializer):
        meeting_id = self.kwargs['meeting_id']
        meeting = Meeting.objects.get(id=meeting_id)
        serializer.save(meeting=meeting)


class StudentProfessionalPairDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentProfessionalPairSerializer
    lookup_field = 'id'
    
    def get_queryset(self):
        meeting_id = self.kwargs['meeting_id']
        return StudentProfessionalPair.objects.filter(meeting_id=meeting_id)