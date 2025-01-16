from rest_framework import serializers
from .models import Todolist

class TodolistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todolist
        fields = '__all__'  # Include all fields from the model

    def validate_title(self, value):
        if Todolist.objects.filter(job=value).exists():
            raise serializers.ValidationError("This title already exists.")
        return value
