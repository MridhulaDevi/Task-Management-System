from django.urls import path
from .auth_views import register, login, get_users
from .views import (
    create_task,
    get_tasks,
    update_task_status,
    delete_task,
    edit_task,
    dashboard,
)
from .notification_views import get_notifications

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("users/", get_users),

    path("tasks/", create_task),
    path("tasks/all/", get_tasks),
    path("tasks/status/<str:task_id>/", update_task_status),
    path("tasks/delete/<str:task_id>/", delete_task),
    path("tasks/edit/<str:task_id>/", edit_task),

    path("dashboard/", dashboard),
    path("notifications/", get_notifications),
]