from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics


from .models import Meeting, AvailabilityResponse, TimeOption, AvailabilityEntry
from .serializers import MeetingSerializer, MeetingDetailSerializer, AvailabilityResponseSerializer


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
          return JsonResponse(
              {"detail": "Meeting not found."},
              status=status.HTTP_404_NOT_FOUND
          )

      serializer = MeetingDetailSerializer(meeting)
      return Response(serializer.data)



class AvailabilityResponseListView(generics.ListAPIView):
   serializer_class = AvailabilityResponseSerializer


   def get_queryset(self):
       # This filters AvailabilityResponse based on the meeting_id passed in the URL
       meeting_id = self.kwargs['meeting_id']

        # Log the meeting_id to verify the correct one is being passed
       print(f"Trying to fetch meeting with ID: {meeting_id}")
       
        # Try to fetch the meeting object
       try:
            meeting = Meeting.objects.get(id=meeting_id)
       except Meeting.DoesNotExist:
            print(f"Meeting with ID {meeting_id} not found!")
            # If meeting doesn't exist, return a 404 response with a message
            return JsonResponse(
                {"detail": "Meeting not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # If the meeting exists, return all availability responses for that meeting
       return AvailabilityResponse.objects.filter(meeting_id=meeting_id)


class AvailabilityResponseCreate(APIView):
   def post(self, request, meeting_id):
       # Get the meeting object
       try:
           meeting = Meeting.objects.get(id=meeting_id)
       except Meeting.DoesNotExist:
           return JsonResponse({"detail": "Meeting not found."}, status=status.HTTP_404_NOT_FOUND, content_type="application/json")

       # Get the data from the request
       participant_name = request.data.get('participant_name')
       email = request.data.get('email')
       time_option_ids = request.data.get('time_option_ids')

       # Create AvailabilityResponse object
       availability_response = AvailabilityResponse.objects.create(
           meeting=meeting,
           participant_name=participant_name,
           email=email
       )

       # Now, create AvailabilityEntry objects
       for time_option_id in time_option_ids:
           try:
               time_option = TimeOption.objects.get(id=time_option_id)
               AvailabilityEntry.objects.create(
                   availability_response=availability_response,
                   time_option=time_option
               )
           except TimeOption.DoesNotExist:
               return JsonResponse({"detail": "Time option not found."}, status=status.HTTP_404_NOT_FOUND, content_type="application/json")

       return Response(AvailabilityResponseSerializer(availability_response).data, status=status.HTTP_201_CREATED)
