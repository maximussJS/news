from flask import Blueprint
from ..models.news import New

news = Blueprint('News', __name__)


@news.route('/', methods=['GET'])
async def get_news():
    try:
        result = await New.query.all()
        return result
    except SystemError as e:
        return str(e)


@news.route('/<url>', methods=['GET'])
async def get_new_by_url(url):
    try:
        new = await New.query.filter(New.url==url).first()
        return new
    except SystemError as e:
        return str(e)
