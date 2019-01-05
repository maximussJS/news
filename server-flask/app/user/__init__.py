from flask import Blueprint
from ..models.users import User
from ..utils import success_response, server_error_response, failure_response


user = Blueprint('User', __name__)


@user.route('/<url>')
async def get_user_profile_by_url(url):
    try:
        usr = await User.query.filter(User.url == url).first()
        if usr is not None:
            return success_response(usr, 'Ok', 200)
        else:
            return failure_response('Error, no such user', 404)
    except SystemError:
        return server_error_response()
