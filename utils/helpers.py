from re import sub
from jwt import encode
from bcrypt import checkpw, hashpw, gensalt
from config import SECRET_KEY


def slugify(s: str) -> str:
    return sub(r'[^\w+]', '-', s)


def crypt_password(password: str) -> str:
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')


def compare(password_hash: str, form_password: str) -> bool:
    return checkpw(form_password.encode('utf-8'), password_hash.encode('utf-8'))


def generate_token(payload: dict) -> str:
    return encode(payload=payload, key=SECRET_KEY, algorithm='HS256')


def user_tuple_to_json(u: tuple) -> dict:
    return dict(name=u[1], email=u[2], active=u[4], ava_url=u[5],
                age=u[6], country=u[7], gender=u[8], role=u[9])
