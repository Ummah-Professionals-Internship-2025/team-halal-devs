from rest_framework import serializers
from .models import Meeting, TimeOption, Student, Professional


class TimeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeOption
        fields = ["id", "start_time", "end_time", "created_at"]


class MeetingSerializer(serializers.ModelSerializer):
    time_options = TimeOptionSerializer(many=True, write_only=True)

    class Meta:
        model = Meeting
        fields = ["id", "name", "prof_note", "created_at", "time_options"]

    def create(self, validated_data):
        time_options_data = validated_data.pop("time_options")
        meeting = Meeting.objects.create(**validated_data)
        for option in time_options_data:
            TimeOption.objects.create(
                meeting=meeting,
                start_time=option["start_time"],
                end_time=option.get("end_time"),
            )
        return meeting


class MeetingDetailSerializer(serializers.ModelSerializer):
    time_options = TimeOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Meeting
        fields = ["id", "name", "prof_note", "created_at", "time_options"]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "meeting",
            "participant_name",
            "email",
            "phone_number",
            "industry",
            "academic_year",
            "seeking_service",
            "resume_upload",
            "hear_about",
            "optional_info",
            "send_to_email",
            "prof_assigned",
            "created_at",
        ]


class ProfessionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professional
        fields = [
            "id",
            "meeting",
            "prof_assigned",
            "prof_link",
            "prof_name",
            "prof_email",
            "prof_phone",
            "prof_industry",
            "prof_role",
            "prof_more_about",
            "prof_selected_time",
            "prof_note",
            "created_at",
        ]
