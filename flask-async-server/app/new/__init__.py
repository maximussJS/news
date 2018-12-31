from flask import Blueprint
from flask import request
from .. import db
from ..models.news import New
from ..utils import success_response, server_error_response

new = Blueprint('News', __name__)


@new.route('/', methods=['GET'])
async def get_news():
    try:
        q = request.args.get('q')
        if q:
            n = await New.query.filter(New.title.contains(q) | New.text.contains(q)).all()
        else:
            n = await New.query.order_by(New.created.desc())
        return success_response(n, 'OK', 200)
    except SystemError:
        return server_error_response()


@new.route('/create', method=['POST', 'GET'])
async def create_new():
    try:
        if request.method == 'POST':
            title = request.form['title']
            text = request.form['text']
            n = New(title=title, text=text)
            db.session.add(n)
            await db.commit()
            return success_response(n, 'Ok', 200)
        return success_response(None, 'Ok', 200)
    except SystemError:
        return server_error_response()


@new.route('/<url>', methods=['GET'])
async def get_new_by_url(url):
    try:
        n = await New.query.filter(New.url == url).first()
        return success_response((n, n.tags), 'OK', 200)
    except SystemError:
        return server_error_response()
