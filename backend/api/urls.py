from django.urls import path
from .views import (
    TodoListAPIView, 
    TodoDetailAPIView, 
    TimeRecordsListAPIView, 
    TimeRecordsDetailAPIView
)

urlpatterns = [
    # Todo URLs
    path('todo/', TodoListAPIView.as_view(), name='todo-list'),
    path('todo/<int:pk>/', TodoDetailAPIView.as_view(), name='todo-detail'),
    
    # Time Records URLs
    path('timerecords/', TimeRecordsListAPIView.as_view(), name='timerecords-list'),
    path('timerecords/<int:pk>/', TimeRecordsDetailAPIView.as_view(), name='timerecords-detail'),
]
