from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

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



