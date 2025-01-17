from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Todolist, TimeRecords
from .serializers import TodolistSerializer, TimeRecordsSerializer

class TodoListAPIView(APIView):
    def get(self, request):
        todos = Todolist.objects.all()
        serializer = TodolistSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TodolistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            todo = Todolist.objects.get(pk=pk)
        except Todolist.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TodolistSerializer(todo)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            todo = Todolist.objects.get(pk=pk)
        except Todolist.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        # newdata = {
        #     'job': request.data['job'],
        #     'ddl' : request.data['ddl'],
        #     'status': request.data['status'],
        #     'count' : request.data['count'],
        # }
        serializer = TodolistSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            todo = Todolist.objects.get(pk=pk)
        except Todolist.DoesNotExist:
            return Response({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
        
        todo.delete()
        return Response({'message': 'Todo deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class TimeRecordsListAPIView(APIView):
    def get(self, request):
        records = TimeRecords.objects.all()
        serializer = TimeRecordsSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TimeRecordsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimeRecordsDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            record = TimeRecords.objects.get(pk=pk)
        except TimeRecords.DoesNotExist:
            return Response({'error': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TimeRecordsSerializer(record)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            record = TimeRecords.objects.get(pk=pk)
        except TimeRecords.DoesNotExist:
            return Response({'error': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TimeRecordsSerializer(record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            record = TimeRecords.objects.get(pk=pk)
        except TimeRecords.DoesNotExist:
            return Response({'error': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)
        
        record.delete()
        return Response({'message': 'Record deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
