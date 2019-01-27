from flask import Blueprint
from flask import request
from models.news import New
from utils.responses import success_response, server_error_response, failure_response


new = Blueprint('News', __name__)


@new.route('/', methods=['GET'])
def get_news():
        q = request.args.get('q')
        page = request.args.get('page')
        if page and page.isdigit():
            page = int(page)
        else:
            page = 1
        try:
            if q:
                n = New.query.filter(New.title.contains(q) | New.text.contains(q))
            else:
                n = New.query.order_by(New.created.desc())
            pages = n.paginate(page=page, per_page=9)
            return success_response(pages, 'OK', 200)
        except SystemError:
            return server_error_response()


@new.route('/create', methods=['POST', 'GET'])
def create_new():
        if request.method == 'POST':
            title = request.form['title']
            text = request.form['text']
            try:
                n = New(title=title, text=text)
                n.save()
                return success_response(n, 'Ok', 200)
            except ValueError:
                return server_error_response()


@new.route('/<url>/edit', methods=['POST,GET'])
def new_edit(url):
    try:
        n = New.query.filter(New.url == url).first()
        if request.method == 'POST':
            pass
        else:
            return success_response(n, 'Edited new', 200)
    except ValueError:
        return server_error_response()


@new.route('/<url>', methods=['GET'])
def get_new_by_url(url):
    try:
        n = New.query.filter(New.url == url).first()
        if n is not None:
            return success_response((n, n.tags), 'OK', 200)
        else:
            return failure_response('Error, no such new', 404)
    except ValueError:
        return server_error_response()
