from rest_framework.response import Response

def admin_only(request):

    if request.user_data["role"] != "admin":
        return Response(
            {
                "error": "Only Admin can perform this action"
            },
            status=403
        )

    return None