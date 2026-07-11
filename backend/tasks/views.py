from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from .auth_middleware import token_required
from .permissions import admin_only
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .notification_service import create_notification

from db import db
from .constants import TASK_COLLECTION

tasks = db[TASK_COLLECTION]
channel_layer = get_channel_layer()


@api_view(["POST"])
@token_required
def create_task(request):

    permission = admin_only(request)

    if permission:
        return permission

    data = request.data

    task = {
        "title": data["title"],
        "description": data["description"],
        "priority": data["priority"],
        "status": "To Do",
        "deadline": data["deadline"],
        "assigned_by": data["assigned_by"],
        "assigned_to": data["assigned_to"],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

    result = tasks.insert_one(task)
    for member in task["assigned_to"]:
        create_notification(
        "New Task Assigned",
        f"You have been assigned '{task['title']}'",
        member
    )
    
    async_to_sync(channel_layer.group_send)(
    "tasks",
    {
        "type": "task_update",
        "message": {
            "event": "task_created",
            "title": task["title"],
            "assigned_to": task["assigned_to"]
        }
    }
)

    return Response({
        "message": "Task Created Successfully",
        "task_id": str(result.inserted_id)
    })
@api_view(["GET"])
@token_required
def get_tasks(request):

    task_list = []

    logged_user = request.user_data

    # Admin -> See all tasks
    if logged_user["role"] == "admin":

        task_cursor = tasks.find()

    # Team Member -> See only assigned tasks
    else:

        task_cursor = tasks.find({
            "assigned_to": logged_user["name"]
        })

    for task in task_cursor:

        task["_id"] = str(task["_id"])

        task_list.append(task)

    return Response(task_list)
from bson import ObjectId

@api_view(["PUT"])
@token_required
def update_task_status(request, task_id):

    data = request.data

    tasks.update_one(
        {"_id": ObjectId(task_id)},
        {
            "$set": {
                "status": data["status"],
                "updated_at": datetime.utcnow()
            }
        }
    )
    async_to_sync(channel_layer.group_send)(
    "tasks",
    {
        "type": "task_update",
        "message": {
            "event": "status_updated",
            "task_id": task_id,
            "status": data["status"]
        }
    }
)

    return Response({
        "message": "Status Updated Successfully"
    })
@api_view(["DELETE"])
@token_required
def delete_task(request, task_id):

    permission = admin_only(request)

    if permission:
        return permission

    tasks.delete_one({
        "_id": ObjectId(task_id)
    })
    async_to_sync(channel_layer.group_send)(
    "tasks",
    {
        "type": "task_update",
        "message": {
            "event": "task_deleted",
            "task_id": task_id
        }
    }
)

    return Response({
        "message": "Task Deleted Successfully"
    })
@api_view(["PUT"])
@token_required
def edit_task(request, task_id):

    permission = admin_only(request)

    if permission:
        return permission

    data = request.data

    tasks.update_one(
        {"_id": ObjectId(task_id)},
        {
            "$set": {
                "title": data["title"],
                "description": data["description"],
                "priority": data["priority"],
                "deadline": data["deadline"],
                "assigned_to": data["assigned_to"],
                "updated_at": datetime.utcnow()
            }
        }
    )
    async_to_sync(channel_layer.group_send)(
    "tasks",
    {
        "type": "task_update",
        "message": {
            "event": "task_updated",
            "task_id": task_id
        }
    }
)

    return Response({
        "message": "Task Updated Successfully"
    })
@api_view(["GET"])
@token_required
def dashboard(request):

    total = tasks.count_documents({})

    completed = tasks.count_documents({
        "status": "Completed"
    })

    progress = tasks.count_documents({
        "status": "In Progress"
    })

    todo = tasks.count_documents({
        "status": "To Do"
    })

    return Response({
        "total_tasks": total,
        "completed": completed,
        "in_progress": progress,
        "todo": todo
    })