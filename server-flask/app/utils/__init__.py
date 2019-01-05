import re
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from .. import bcrypt


def init_db(a):
    db = SQLAlchemy(a)
    if db is not None:
        print('Connected to Postgres')
        return db
    else:
        print('Error to connect Postgres')
        raise Exception('Postgres Error')


def slugify(s):
    return re.sub(r'[^\w+]', '-', s)


def verify_password_hash(hash, password):
    return bcrypt.check_password_hash(hash, password)


def crypt_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')


def success_response(data, message, code):
    return jsonify(success=True, data=data, message=message), code


def failure_response(message, code):
    return jsonify(success=False, data=None, message=message), code


def server_error_response():
    return jsonify(success=False, data=None, message='Internal Server Error'), 500