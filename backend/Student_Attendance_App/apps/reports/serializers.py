from rest_framework import serializers


class AttendanceReportFilterSerializer(serializers.Serializer):
    department = serializers.UUIDField(required=False)
    course = serializers.UUIDField(required=False)
    subject = serializers.UUIDField(required=False)
    student = serializers.UUIDField(required=False)
    semester = serializers.IntegerField(required=False)
    section = serializers.CharField(required=False)
    from_date = serializers.DateField(required=False)
    to_date = serializers.DateField(required=False)

    def validate(self, attrs):
        from_date = attrs.get("from_date")
        to_date = attrs.get("to_date")

        if from_date and to_date and from_date > to_date:
            raise serializers.ValidationError(
                "From date cannot be greater than to date."
            )

        return attrs


class AttendanceReportSerializer(serializers.Serializer):
    student_id = serializers.UUIDField()
    student_name = serializers.CharField()
    roll_number = serializers.CharField()

    total_classes = serializers.IntegerField()
    present_count = serializers.IntegerField()
    absent_count = serializers.IntegerField()
    late_count = serializers.IntegerField()
    excused_count = serializers.IntegerField()
    attendance_percentage = serializers.FloatField()


class MonthlyReportFilterSerializer(serializers.Serializer):
    month = serializers.IntegerField(min_value=1, max_value=12)
    year = serializers.IntegerField()
    department = serializers.UUIDField(required=False)
    course = serializers.UUIDField(required=False)
    subject = serializers.UUIDField(required=False)
    semester = serializers.IntegerField(required=False)
    section = serializers.CharField(required=False)