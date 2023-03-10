from django.urls import path, include
from . import views
from .views import health_check
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('profile', views.ProfileviewSet, basename='profile')
router.register('category', views.CategoryViewSet, basename='category')
router.register('task', views.TaskViewSet, basename='task')
router.register('subtask', views.SubTaskViewSet, basename='subtask')
router.register('group', views.GroupViewSet, basename='group')


urlpatterns = [
     path('register/', views.CreateUserView.as_view(), name='register'),
     path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),

     # profile
     path('profile-list/', views.ProfileListView.as_view(), name='profile-list'),
     path('profile-detail/<slug:pk>/',
          views.ProfileRetrieveView.as_view(), name='profile-detail'),

     # task
     path('task-list/', views.TaskListView.as_view(), name='task-list'),
     path('task-detail/<slug:pk>/',
          views.TaskRetrieveView.as_view(), name='task-detail'),

     # subtask
     path('subtask-list/', views.SubTaskListView.as_view(), name='subtask-list'),
     path('subtask-detail/<slug:pk>/',
          views.SubTaskRetrieveView.as_view(), name='subtask-detail'),

     # group
     path('group-list/', views.GroupListView.as_view(), name='group-list'),
     path('group-detail/<slug:pk>/',
          views.GroupRetrieveView.as_view(), name='group-detail'),

     path('', include(router.urls)),
     # AWS ALBヘルスチェック用のurl
     path("health/", health_check, name="health"),
]
