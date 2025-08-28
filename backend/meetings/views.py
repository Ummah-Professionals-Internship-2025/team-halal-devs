import uuid
import json
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
from datetime import datetime


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
        data = request.data.copy()
        # 1. Create a new meeting
        meeting = Meeting.objects.create()
        data['meeting'] = meeting.id
        # 2. Save student
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            student = serializer.save()
            # 3. Save up to 6 availabilities
            selected_dates = request.data.get("selected_dates")
            time_values = request.data.get("time_values")
            if selected_dates and time_values:
                selected_dates = json.loads(selected_dates)
                time_values = json.loads(time_values)
                count = 0
                for date in selected_dates:
                    times = time_values.get(date, [])
                    for time in times:
                        if count >= 6:
                            break
                        dt_str = f"{date} {time}"
                        try:
                            # Try parsing with AM/PM
                            try:
                                dt = datetime.strptime(dt_str, "%Y-%m-%d %I:%M %p")
                            except ValueError:
                                # Try parsing 24-hour format
                                dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M")
                            TimeOption.objects.create(
                                meeting=meeting,
                                start_time=dt,
                            )
                            count += 1
                        except Exception as e:
                            print(f"Skipping invalid date/time: {dt_str} ({e})")
                    if count >= 6:
                        break
            return Response({
                "message": "Student submission received",
                "meeting_id": meeting.id,
                "student_id": student.id,
                "shareable_link": f"http://yourdomain.com/professional/{meeting.id}"
            }, status=201)
        return Response(serializer.errors, status=400)

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
        prof_id = request.data.get("professional_id")
        if not prof_id:
            return Response({"error": "professional_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            professional = Professional.objects.get(id=prof_id)
        except Professional.DoesNotExist:
            return Response({"error": "Professional not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if this professional already has 3 students
        if professional.students.count() >= 3:
            return Response({"error": "Professional already has 3 students"}, status=status.HTTP_400_BAD_REQUEST)

        # Assign the professional to the student
        student.professional = professional
        student.prof_assigned = True
        student.save()

        return Response({
            "message": "Professional assigned",
            "professional_id": professional.id,
            "professional_name": professional.prof_name,
        }, status=status.HTTP_200_OK)

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


@api_view(['PATCH'])
def pair_student(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        if student.professional:
            return Response({'error': 'Student already paired'}, status=status.HTTP_400_BAD_REQUEST)
        prof_id = request.data.get("professional_id")
        professional = Professional.objects.get(id=prof_id)
        if professional.students.count() >= 3:
            return Response({'error': 'Professional already has 3 students'}, status=status.HTTP_400_BAD_REQUEST)
        student.professional = professional
        student.prof_assigned = True
        student.save()
        return Response({'status': 'paired'})
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    except Professional.DoesNotExist:
        return Response({'error': 'Professional not found'}, status=status.HTTP_404_NOT_FOUND)
    


@api_view(['PATCH'])
def unpair_student(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        student.prof_assigned = False
        student.save()
        return Response({'status': 'unpaired'})
    except Student.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
