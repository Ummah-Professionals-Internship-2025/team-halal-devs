from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Meeting
from .serializers import MeetingSerializer
def home(request):
    return HttpResponse("Welcome to the API. Visit /admin/ or /api/")
def api_root(request):
    return JsonResponse({"message": "Welcome to the Meetings API!"})

@method_decorator(csrf_exempt, name='dispatch')
class CreateMeeting(APIView):
    def post(self, request):
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

