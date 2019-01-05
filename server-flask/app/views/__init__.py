from .. import app
from flask import request
from ..models.users import User
from ..utils import success_response, server_error_response, failure_response, verify_password_hash


@app.route('/login', methods=['GET', 'POST'])
async def login():
    try:
        if request.method == 'GET':
            return success_response(None, 'OK', 200)
        else:
            form = request.get_json()
            if form['login'] is None:
                return failure_response('You did not enter login', 401)
            if form['password'] is None:
                return failure_response('You did not enter password', 401)
            user = await User.query.filter(User.email == form['login']).first()
            if user is None and verify_password_hash(user.password, form['password']):
                return failure_response('Invalid login or password', 401)
            else:
                # todo create token
                token = user
                return success_response(token, 'Ok', 200)
    except SystemError:
        return server_error_response()


@app.route('/register', methods=['GET', 'POST'])
async def register():
    try:
        if request.method == 'GET':
            return success_response(None, 'Ok', 200)
        else:
            # todo register
            print('register')
    except SystemError:
        return server_error_response()
