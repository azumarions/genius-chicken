from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('profile', views.ProfileviewSet, basename='profile')
router.register('category', views.CategoryViewSet, basename='category')
router.register('task', views.TaskViewSet, basename='task')


urlpatterns = [
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('myprofile/', views.MyProfileListView.as_view(), name='myprofile'),
    path('profile-list/', views.ProfileListView.as_view(), name='profile-list'),
    path('profile-detail/<slug:pk>/',
         views.ProfileRetrieveView.as_view(), name='profile-detail'),
    path('task-list/', views.TaskListView.as_view(), name='task-list'),
    path('task-detail/<slug:pk>/',
         views.TaskRetrieveView.as_view(), name='task-detail'),
    path('', include(router.urls))
]
