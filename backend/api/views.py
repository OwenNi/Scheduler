from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import Todolist
from .serializers import TodolistSerializer

class TodoViewSet(ModelViewSet):
    queryset = Todolist.objects.all()
    serializer_class = TodolistSerializer
