from rest_framework.decorators import api_view
from rest_framework.response import Response

from db import db
from .constants import NOTIFICATION_COLLECTION
from .auth_middleware import token_required

notifications = db[NOTIFICATION_COLLECTION]


@api_view(["GET"])
@token_required
def get_notifications(request):

    logged_user = request.user_data

    if logged_user["role"] == "admin":

        notification_cursor = notifications.find().sort("created_at", -1)

    else:

        notification_cursor = notifications.find({
            "user": logged_user["name"]
        }).sort("created_at", -1)

    notification_list = []

    for notification in notification_cursor:

        notification["_id"] = str(notification["_id"])

        notification_list.append(notification)

    return Response(notification_list)