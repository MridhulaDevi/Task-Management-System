from datetime import datetime

from db import db
from .constants import NOTIFICATION_COLLECTION

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

notifications = db[NOTIFICATION_COLLECTION]

channel_layer = get_channel_layer()


def create_notification(title, message, user):

    created_at = datetime.utcnow()

    notification = {
        "title": title,
        "message": message,
        "user": user,
        "read": False,
        "created_at": created_at
    }

    # Save to MongoDB
    notifications.insert_one(notification)

    # Send JSON-safe notification over WebSocket
    async_to_sync(channel_layer.group_send)(
        "tasks",
        {
            "type": "task_update",
            "message": {
                "event": "notification",
                "notification": {
                    "title": title,
                    "message": message,
                    "user": user,
                    "read": False,
                    "created_at": created_at.isoformat()
                }
            }
        }
    )