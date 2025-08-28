import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view

from .models import Meeting, TimeOption, Student, Professional
from .serializers import (
    MeetingSerializer,
    MeetingDetailSerializer,
    TimeOptionSerializer,
    StudentSerializer,
    ProfessionalSerializer,
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
# Time options endpoints
# -----------------------
class TimeOptionListView(ListAPIView):
    serializer_class = TimeOptionSerializer

    def get_queryset(self):
        meeting_id = self.kwargs['meeting_id']
        return TimeOption.objects.filter(meeting_id=meeting_id)

# -----------------------
# Student endpoints
# -----------------------
@method_decorator(csrf_exempt, name='dispatch')
class StudentCreateView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save()
            return Response(
                {"message": "Student submission received", "student_id": student.id},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentListView(ListAPIView):
    queryset = Student.objects.all().order_by('-created_at')
    serializer_class = StudentSerializer

# -----------------------
# Professional endpoints
# -----------------------
class ProfessionalListView(ListAPIView):
    queryset = Professional.objects.all().order_by('-created_at')
    serializer_class = ProfessionalSerializer

@method_decorator(csrf_exempt, name='dispatch')
class AssignProfessionalView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, student_id):
        student = get_object_or_404(Student, id=student_id)
        student.prof_assigned = True
        student.save()

        prof_data = request.data
        prof_serializer = ProfessionalSerializer(data={
            "meeting": student.meeting.id,
            "prof_name": prof_data.get("prof_name"),
            "prof_email": prof_data.get("prof_email"),
            "prof_phone": prof_data.get("prof_phone"),
            "prof_industry": prof_data.get("prof_industry"),
            "prof_role": prof_data.get("prof_role"),
            "prof_more_about": prof_data.get("prof_more_about"),
            "prof_link": uuid.uuid4(),
        })

        if prof_serializer.is_valid():
            professional = prof_serializer.save()
            return Response({
                "message": "Professional assigned",
                "professional_link": str(professional.prof_link)
            }, status=status.HTTP_200_OK)
        return Response(prof_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class ProfessionalUpdateView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, prof_link):
        professional = get_object_or_404(Professional, prof_link=prof_link)
        professional.prof_selected_time = request.data.get("prof_selected_time")
        professional.save()
        return Response({"message": "Professional time selection submitted"}, status=status.HTTP_200_OK)




class StudentWithMeetingCreate(APIView):
    def post(self, request):
        # student fields
        participant_name = request.data.get("participant_name")
        email = request.data.get("email")
        phone_number = request.data.get("phone_number")
        industry = request.data.get("industry")
        academic_year = request.data.get("academic_year")
        seeking_service = request.data.get("seeking_service")
        resume_upload = request.data.get("resume_upload")
        hear_about = request.data.get("hear_about")
        optional_info = request.data.get("optional_info")
        send_to_email = request.data.get("send_to_email")

        # meeting fields
        meeting_date = request.data.get("meetingDate")
        time_options = request.data.get("time_options", [])

        # create meeting
        meeting = Meeting.objects.create(
            name=f"Meeting for {participant_name}",
        )

        # create time options if provided
        for option in time_options:
            start_time = option.get("start_time")
            end_time = option.get("end_time")
            if start_time and end_time:
                TimeOption.objects.create(
                    meeting=meeting,
                    start_time=start_time,
                    end_time=end_time,
                )

        # create student linked to this meeting
        student = Student.objects.create(
            meeting=meeting,
            participant_name=participant_name,
            email=email,
            phone_number=phone_number,
            industry=industry,
            academic_year=academic_year,
            seeking_service=seeking_service,
            resume_upload=resume_upload,
            hear_about=hear_about,
            optional_info=optional_info,
            send_to_email=send_to_email,
        )

        return Response({
            "student_id": student.id,
            "meeting_id": str(meeting.id),
            "participant_name": student.participant_name,
        }, status=status.HTTP_201_CREATED)
    
@api_view(['PATCH'])
def mark_meeting_completed(request, pk):
    try:
        submission = Meeting.objects.get(pk=pk)
        submission.meeting_completed_at = timezone.now()
        submission.save()
        return Response({'status': 'completed'})
    except Meeting.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
    


@api_view(['GET'])
def professionals_list(request):
    professionals = Professional.objects.all()
    serializer = ProfessionalSerializer(professionals, many=True)
    return Response(serializer.data)