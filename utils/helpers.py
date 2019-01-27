from re import sub
from jwt import encode
from app import bcrypt
from config import Config


def slugify(s):
    return sub(r'[^\w+]', '-', s)


def verify_password_hash(password_hash, password):
    return bcrypt.check_password_hash(password_hash, password)


def crypt_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')


def generate_token(payload):
    return encode(payload=payload, key=Config.SECRET_KEY, algorithm='HS256')
