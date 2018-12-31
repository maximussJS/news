from flask import Blueprint
from ..models.tags import Tag
from ..utils import success_response, server_error_response

tag = Blueprint('Tag', __name__)


@tag.route('/<url>')
async def get_tag_by_url(url):
    try:
        t = await Tag.query.filter(Tag.url == url).first()
        return success_response((t, t.news.all()), 'Ok', 200)
    except SystemError:
        return server_error_response()
