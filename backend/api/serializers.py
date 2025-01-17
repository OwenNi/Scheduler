from rest_framework import serializers
from .models import Todolist, TimeRecords

class TodolistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todolist
        fields = ['id','job', 'add_time', 'ddl', 'status', 'count']

class TimeRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeRecords
        fields = ['id','record','focus_time','occur_time']  # Include all fields from the model
