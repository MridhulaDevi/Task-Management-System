from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
from db import db
from .constants import USER_COLLECTION
import bcrypt
import jwt
import os
from dotenv import load_dotenv
from .auth_middleware import token_required

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")

users = db[USER_COLLECTION]


# ---------------- REGISTER ---------------- #

@api_view(["POST"])
def register(request):
    data = request.data

    if users.find_one({"email": data["email"]}):
        return Response({"error": "Email already exists"}, status=400)

    hashed_password = bcrypt.hashpw(
        data["password"].encode(),
        bcrypt.gensalt()
    )

    user = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password.decode(),
        "role": data.get("role", "team_member"),
        "created_at": datetime.utcnow()
    }

    users.insert_one(user)

    return Response({
        "message": "User Registered Successfully"
    })


# ---------------- LOGIN ---------------- #

@api_view(["POST"])
def login(request):

    data = request.data

    user = users.find_one({"email": data["email"]})

    if not user:
        return Response({"error": "Invalid Email"}, status=401)

    if not bcrypt.checkpw(
        data["password"].encode(),
        user["password"].encode()
    ):
        return Response({"error": "Invalid Password"}, status=401)

    payload = {
        "user_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return Response({
        "message": "Login Successful",
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    })
@api_view(["GET"])
@token_required
def get_users(request):

    user_list = []

    for user in users.find({}, {"password": 0}):

        user["_id"] = str(user["_id"])

        user_list.append(user)

    return Response(user_list)