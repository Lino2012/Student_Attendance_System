from rest_framework.response import Response

def success_response(data=None, message="Operation completed successfully", status=200):
    """
    Standard success/error response builder based on status code.
    """
    is_success = status < 400
    response_data = {
        "success": is_success,
        "message": message,
        "data": data if data is not None else {}
    }
    return Response(response_data, status=status)
