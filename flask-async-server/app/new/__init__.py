from flask import Blueprint
from ..models.news import New
from ..utils import success_response, server_error_response

new = Blueprint('News', __name__)


@new.route('/', methods=['GET'])
async def get_news():
    try:
        n = await New.query.all()
        return success_response(n, 'OK', 200)
    except SystemError:
        return server_error_response()


@new.route('/<url>', methods=['GET'])
async def get_new_by_url(url):
    try:
        n = await New.query.filter(New.url == url).first()
        return success_response((n, n.tags), 'OK', 200)
    except SystemError:
        return server_error_response()
