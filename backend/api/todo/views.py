from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from . import serializers
from .models import Profile, Task


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
