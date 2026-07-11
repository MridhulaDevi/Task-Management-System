import jwt
import os
from dotenv import load_dotenv
from functools import wraps
from rest_framework.response import Response

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")


def token_required(func):

    @wraps(func)

    def wrapper(request, *args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return Response({"error": "Token Missing"}, status=401)

        try:

            token = token.split(" ")[1]

            decoded = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

            request.user_data = decoded

        except Exception:

            return Response({"error": "Invalid Token"}, status=401)

        return func(request, *args, **kwargs)

    return wrapper