from functools import wraps
from utils.responses import failure_response
from utils.helpers import is_valid_token


def authorize(f):
    @wraps(f)
    async def decorator(*args):
        if 'Authorization' in args[0].request.headers:
            token = args[0].request.headers['Authorization']
            if token is not None and is_valid_token(token):
                return await f(*args)
            return failure_response(401, 'Invalid token')
        return failure_response(401, 'Authorize please')
    return decorator
