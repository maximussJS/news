import re
from flask_sqlalchemy import SQLAlchemy
from .. import bcrypt


def init_db(app):
    db = SQLAlchemy(app)
    if db is not None:
        print('Connected to Postgres')
        return db
    else:
        print('Error to connect Postgres')
        raise Exception('Postgres Error')


def slugify(s):
    return re.sub(r'[^\w+]', '-', s)


def verify_password_hash(password_hash, password):
    return bcrypt.check_password_hash(password_hash, password)


def crypt_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')


