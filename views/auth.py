from flask import request
from flask import Blueprint
from models.users import User
from utils.helpers import verify_password_hash, generate_token, crypt_password
from utils.responses import success_response, failure_response, server_error_response


auth = Blueprint('Auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return success_response('OK', 200)
    form = request.get_json()
    if form['email'] is None or 8 > len(form['email']) > 20:
        return failure_response('Invalid email length', 400)
    if form['password'] is None or 8 > len(form['password']) > 20:
        return failure_response('Invalid password length', 400)
    try:
        user = User.query.filter(User.email == form['email']).first()
        if user is not None and verify_password_hash(user.password, form['password']):
            token = generate_token(dict(user=user.to_json(), password=form['password']))
            return success_response('OK', 200, token=token)
        return failure_response('Invalid email or password', 400)
    except Exception as e:
        return server_error_response(e)


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return success_response('OK', 200)
    form = request.get_json()
    if form['name'] is None or 8 > len(form['name']) > 20:
        return failure_response('Invalid name length', 400)
    if form['email'] is None or 8 > len(form['email']) > 20:
        return failure_response('Invalid email length', 400)
    if form['password'] is None or 8 > len(form['password']) > 20:
        return failure_response('Invalid password length', 400)
    if form['country'] is None or 3 > len(form['country']) > 15:
        return failure_response('Invalid country length', 400)
    if not isinstance(form['gender'], bool):
        return failure_response('Invalid gender', 400)
    if form['age'] is None or 6 > int(form['age']) > 65:
        return failure_response('Invalid age', 400)
    try:
        user = User.query.filter(User.email == form['email']).first()
        if user is None:
            password_hash = crypt_password(form['password'])
            new_user = User(name=form['name'], email=form['email'], password=password_hash, active=True,
                            age=form['age'], country=form['country'], gender=form['gender'], role='User')
            new_user.save()
            return success_response(f'User {new_user.name} was created!', 201)
        return failure_response(f"User with email {form['email']} is already exists", 400)
    except Exception as e:
        return server_error_response(e)
