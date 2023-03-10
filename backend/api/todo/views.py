from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from . import serializers
from .models import Profile, Task, Category, SubTask, Group


class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class ProfileviewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(userProfile=self.request.user)


class ProfileRetrieveView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = (AllowAny,)


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = (AllowAny,)


class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(userProfile=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = (AllowAny,)

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'DELETE method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'message': 'PUT method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer

    def perform_create(self, serializer):
        serializer.save(userTask=self.request.user)


class TaskRetrieveView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    permission_classes = (AllowAny,)


class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer
    permission_classes = (AllowAny,)

class SubTaskViewSet(viewsets.ModelViewSet):
    queryset = SubTask.objects.all()
    serializer_class = serializers.SubTaskSerializer

    def perform_create(self, serializer):
        serializer.save(userSubTask=self.request.user)


class SubTaskRetrieveView(generics.RetrieveAPIView):
    queryset = SubTask.objects.all()
    serializer_class = serializers.SubTaskSerializer
    permission_classes = (AllowAny,)


class SubTaskListView(generics.ListAPIView):
    queryset = SubTask.objects.all()
    serializer_class = serializers.SubTaskSerializer
    permission_classes = (AllowAny,)

class GroupListView(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = (AllowAny,)

class GroupRetrieveView(generics.RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    permission_classes = (AllowAny,)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer

    def perform_create(self, serializer):
        serializer.save(userGroup=self.request.user)


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return JsonResponse(data={"msg": "pass"}, status=200)
