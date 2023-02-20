from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django.core.validators import MinValueValidator
import uuid


def uuid4():
    return uuid.uuid4().hex


def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.userProfile.id)+str(instance.name)+str(".")+str(ext)])


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('email is must')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(primary_key=True, default=uuid4,
                          editable=False, max_length=33, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Profile(models.Model):
    id = models.CharField(primary_key=True, default=uuid4,
                          editable=False, max_length=33, unique=True)
    userProfile = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='userProfile',
        on_delete=models.CASCADE
    )
    name = models.CharField(verbose_name='名前', max_length=50)
    description = models.TextField(
        verbose_name='概要', max_length=1000, blank=True, null=True)
    img = models.ImageField(verbose_name='画像', blank=True,
                            null=True, upload_to=upload_avatar_path, default='media/avatars/default.png')
    created_at = models.DateTimeField(verbose_name='作成日', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日', auto_now=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    item = models.CharField(max_length=100)

    def __str__(self):
        return self.item


class Task(models.Model):
    STATES = (
        ('1', 'Not started'),
        ('2', 'On going'),
        ('3', 'Done'),
    )
    ACCESS = (
        ('1', 'public'),
        ('2', 'private'),
    )
    id = models.CharField(primary_key=True, default=uuid4,
                          editable=False, max_length=33, unique=True)
    userTask = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userTask',
        on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name='タイトル', max_length=50)
    description = models.TextField(
        verbose_name='概要', max_length=1000, blank=True, null=True)
    status = models.CharField(max_length=40, choices=STATES, default='1')
    access = models.CharField(max_length=40, choices=ACCESS, default='1')
    estimate = models.IntegerField(validators=[MinValueValidator(0)], default=1)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(verbose_name='作成日', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日', auto_now=True)

    def __str__(self):
        return self.title

class SubTask(models.Model):
    STATES = (
        ('1', 'Not started'),
        ('2', 'On going'),
        ('3', 'Done'),
    )
    ACCESS = (
        ('1', 'public'),
        ('2', 'private'),
    )
    id = models.CharField(primary_key=True, default=uuid4,
                          editable=False, max_length=33, unique=True)
    userSubTask = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userSubTask',
        on_delete=models.CASCADE
    )
    subTaskInTask = models.ForeignKey(
        Task, related_name='subTaskInTask',
        on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name='タイトル', max_length=50)
    description = models.TextField(
        verbose_name='概要', max_length=1000, blank=True, null=True)
    status = models.CharField(max_length=40, choices=STATES, default='1')
    access = models.CharField(max_length=40, choices=ACCESS, default='1')
    estimate = models.IntegerField(validators=[MinValueValidator(0)], default=1)
    subTaskOwner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subTaskOwner')
    subTaskResponsible = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subTaskResponsible')
    created_at = models.DateTimeField(verbose_name='作成日', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日', auto_now=True)

    def __str__(self):
        return self.title

class Group(models.Model):
    taskGroup = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='taskGroup')
    userGroup = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='userGroup')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.userGroup.email