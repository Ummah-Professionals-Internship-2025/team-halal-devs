from rest_framework import serializers
from .models import Meeting, TimeOption, AvailabilityResponse, AvailabilityEntry


class TimeOptionSerializer(serializers.ModelSerializer):
  
  class Meta:
     model = TimeOption
     fields = ['id', 'start_time', 'end_time']



class MeetingSerializer(serializers.ModelSerializer):
 # For creation: time_options are write_only (sent by client on POST)
 time_options = TimeOptionSerializer(many=True, write_only=True)

 class Meta:
     model = Meeting
     fields = ['id', 'name', 'description', 'created_at', 'time_options']


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
 # For reading: time_options included (no write_only)
 time_options = TimeOptionSerializer(many=True)

 class Meta:
     model = Meeting
     fields = ['name', 'description', 'time_options']



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
     fields = ['participant_name', 'email', 'role', 'entries']
     extra_kwargs = {
            'role': {'required': True},
        }