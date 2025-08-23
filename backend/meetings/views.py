import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView

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
