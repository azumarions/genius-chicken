from dataclasses import fields
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Task, Category, SubTask, Group


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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'item']


class TaskSerializer(serializers.ModelSerializer):
    category_item = serializers.ReadOnlyField(
        source='category.item', read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    status_name = serializers.CharField(
        source='get_status_display', read_only=True)
    access_name = serializers.CharField(
        source='get_access_display', read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'userTask', 'title', 'description', 'status', 'status_name', 'access', 'access_name', 'estimate', 'category', 'category_item',
                  'created_at', 'updated_at')
        extra_kwargs = {'userTask': {'read_only': True}}

class SubTaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    status_name = serializers.CharField(
        source='get_status_display', read_only=True)
    access_name = serializers.CharField(
        source='get_access_display', read_only=True)
    subtask_owner_username = serializers.ReadOnlyField(source='subTaskOwner.username', read_only=True)
    subtask_responsible_username = serializers.ReadOnlyField(source='subTaskResponsible.username', read_only=True)
    parent_task_title = serializers.ReadOnlyField(source='userSubTask.title', read_only=True)
    parent_task_category = serializers.ReadOnlyField(source='userSubTask.category', read_only=True)

    class Meta:
        model = SubTask
        fields = ('id', 'userSubTask', 'subTaskInTask', 'title', 'description', 'status', 'status_name', 'access', 'access_name', 'estimate',
                  'subTaskOwner', 'subTaskResponsible', 'subtask_owner_username', 'subtask_responsible_username', 'parent_task_title', 'parent_task_category', 'created_at', 'updated_at')
        extra_kwargs = {'userTask': {'read_only': True}}

class GroupSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    class Meta:
        model = Group
        fields = ('id', 'userGroup', 'taskGroup', 'created_at')
        extra_kwargs = {'userGroup': {'read_only': True}}