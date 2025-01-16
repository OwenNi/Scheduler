from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

# Create a router and register the ViewSet
router = DefaultRouter()
router.register(r'todo', TodoViewSet, basename='todo')

# Include the router-generated URLs
urlpatterns = [
    path('', include(router.urls)),
]
