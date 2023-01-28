from dataclasses import fields
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    # user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'userProfile', 'name', 'description',
                  'img', 'created_at', 'updated_at')
        extra_kwargs = {'userProfile': {'read_only': True}}


class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    status_name = serializers.CharField(
        source='get_status_display', read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'userTask', 'title', 'description', 'status', 'status_name',
                  'created_at', 'updated_at')
        extra_kwargs = {'userTask': {'read_only': True}}
