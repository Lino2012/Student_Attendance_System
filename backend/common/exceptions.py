from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError
from django.core.exceptions import ValidationError as DjangoValidationError

def custom_exception_handler(exc, context):
    """
    Custom exception handler that maps DRF/Django exceptions to the required JSON envelope:
    { "success": false, "message": "...", "data": { "errors": {} } }
    """
    response = exception_handler(exc, context)

    if isinstance(exc, DjangoValidationError):
        exc = ValidationError(exc.message_dict if hasattr(exc, 'message_dict') else {'detail': exc.messages})
        response = exception_handler(exc, context)

    if response is not None:
        custom_response_data = {
            'success': False,
            'message': 'Validation error' if isinstance(exc, ValidationError) else response.reason_phrase,
            'data': {}
        }

        if isinstance(exc, ValidationError):
            custom_response_data['data']['errors'] = response.data
        else:
            custom_response_data['data']['errors'] = {'detail': response.data.get('detail', str(exc))}
            if 'detail' in response.data:
                custom_response_data['message'] = response.data['detail']

        response.data = custom_response_data

    return response
