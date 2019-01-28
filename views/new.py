from flask import Blueprint
from flask import request
from config import Cloud
from models.news import New
from models.users import User
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from utils.helpers import verify_password_hash
from utils.responses import success_response, server_error_response, failure_response

new = Blueprint('News', __name__)


@new.route('/', methods=['GET'])
def get_news():
    q = request.args.get('q')
    page = request.args.get('page')
    try:
        if q:
            news = New.query.filter(New.title.contains(q) | New.text.contains(q))
        else:
            news = New.query.order_by(New.created.desc())
        return success_response('OK', 200, data=list(map(lambda n: n.to_json(), news)))
    except Exception as e:
        return server_error_response(e)


@new.route('/create', methods=['POST', 'GET'])
def create_new():
    if request.method == 'GET':
        return success_response('OK', 200)
    form = request.get_json()
    print(request.headers)
    print(request.data)
    print(form)
    if form['title'] is None or 40 < len(form['title']) < 4:
        return failure_response('Invalid title length', 400)
    if form['text'] is None or len(form['text']) < 15:
        return failure_response('Invalid text length', 400)
    if form['name'] is None or 8 > len(form['name']) > 20:
        return failure_response('Invalid name length', 400)
    if form['email'] is None or 8 > len(form['email']) > 20:
        return failure_response('Invalid email length', 400)
    if form['password'] is None or 8 > len(form['password']) > 20:
        return failure_response('Invalid password length', 400)
    if form['image'] is None:
        return failure_response('You cannot write post without image', 400)
    try:
        user = User.query.filter(User.email == form['email']).first()
        if user is not None and verify_password_hash(user.password, form['password']):
            match_new = New.query.filter(New.title == form['title']).first()
            if match_new is None:
                n = New(title=form['title'], text=form['text'], name=user.name, email=user.email)
                n.save()
                return success_response(f"Post {n.title} was created!", 201)
            return failure_response(f"Post with title {form['title']} is already exists", 400)
        return failure_response('Invalid email or password', 400)
    except Exception as e:
        return server_error_response(e)


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


