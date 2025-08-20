from rest_framework import serializers
from .models import Meeting, TimeOption, AvailabilityResponse, AvailabilityEntry, StudentProfessionalPair


class TimeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeOption
        fields = ['id', 'start_time', 'end_time']


class MeetingSerializer(serializers.ModelSerializer):
    time_options = TimeOptionSerializer(many=True, write_only=True)

    class Meta:
        model = Meeting
        fields = ['id', 'name', 'created_at', 'time_options']

    def create(self, validated_data):
        time_options_data = validated_data.pop('time_options')
        meeting = Meeting.objects.create(**validated_data)
        for option in time_options_data:
            TimeOption.objects.create(
                meeting=meeting,
                start_time=option['start_time'],
                end_time=option['end_time']
            )
        return meeting


class MeetingDetailSerializer(serializers.ModelSerializer):
    time_options = TimeOptionSerializer(many=True)

    class Meta:
        model = Meeting
        fields = ['name', 'time_options']


class AvailabilityEntrySerializer(serializers.ModelSerializer):
    time_option = TimeOptionSerializer()

    class Meta:
        model = AvailabilityEntry
        fields = ['time_option']


class AvailabilityResponseSerializer(serializers.ModelSerializer):
    entries = AvailabilityEntrySerializer(many=True)
    participant_name = serializers.CharField()
    email = serializers.EmailField()
    role = serializers.CharField(required=True)


 class Meta:
     model = AvailabilityResponse
     fields = ['id', 'participant_name', 'email', 'role', 'entries']
     extra_kwargs = {
            'role': {'required': True},
        }


class StudentProfessionalPairSerializer(serializers.ModelSerializer):
    student = AvailabilityResponseSerializer(read_only=True)
    professional = AvailabilityResponseSerializer(read_only=True)
    time_option = TimeOptionSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    professional_id = serializers.IntegerField(write_only=True)
    time_option_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = StudentProfessionalPair
        fields = ['id', 'student', 'professional', 'time_option', 'student_id', 'professional_id', 'time_option_id', 'created_at']
        
    def validate(self, data):
        # Validate that student has 'student' role
        try:
            student = AvailabilityResponse.objects.get(id=data['student_id'])
            if student.role != 'student':
                raise serializers.ValidationError("Selected participant must be a student.")
        except AvailabilityResponse.DoesNotExist:
            raise serializers.ValidationError("Student not found.")
            
        # Validate that professional has 'professional' role
        try:
            professional = AvailabilityResponse.objects.get(id=data['professional_id'])
            if professional.role != 'professional':
                raise serializers.ValidationError("Selected participant must be a professional.")
        except AvailabilityResponse.DoesNotExist:
            raise serializers.ValidationError("Professional not found.")
            
        # Validate that both participants are available for the selected time
        try:
            time_option = TimeOption.objects.get(id=data['time_option_id'])
        except TimeOption.DoesNotExist:
            raise serializers.ValidationError("Time option not found.")
            
        # Check if student is available for this time
        if not AvailabilityEntry.objects.filter(availability_response=student, time_option=time_option).exists():
            raise serializers.ValidationError("Student is not available for the selected time.")
            
        # Check if professional is available for this time
        if not AvailabilityEntry.objects.filter(availability_response=professional, time_option=time_option).exists():
            raise serializers.ValidationError("Professional is not available for the selected time.")
            
        return data