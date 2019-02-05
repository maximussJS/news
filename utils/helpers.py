from re import sub
from jwt import encode, decode
from bcrypt import checkpw, hashpw, gensalt
from config import SECRET_KEY


def slugify(s: str) -> str:
    return sub(r'[^\w+]', '-', s)


def crypt_password(password: str) -> str:
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')


def compare(password_hash: str, form_password: str) -> bool:
    return checkpw(form_password.encode('utf-8'), password_hash.encode('utf-8'))


def generate_token(payload: dict) -> str:
    return str(encode(payload=payload, key=SECRET_KEY, algorithm='HS256'), 'utf-8')


def is_valid_token(token: str) -> bool:
    try:
        return True if 'password' in decode(token, key=SECRET_KEY, algorithms='HS256') else False
    except Exception:
        return False


def get_user_from_token(token: str) -> dict:
    return decode(token, key=SECRET_KEY, algorithms='HS256')['user']


def get_password_from_token(token: str) -> str:
    return decode(token, key=SECRET_KEY, algorithms='HS256')['password']


def user_tuple_to_json(u: tuple) -> dict:
    return dict(name=u[1], email=u[2], active=u[4], ava_url=u[5],
                age=u[6], country=u[7], gender=u[8], role=u[9])


def new_tuple_to_json(n: tuple) -> dict:
    return dict(title=n[1], url=n[2], text=n[3], name=n[4],
                email=n[5], created=str(n[6])[:-7], image=n[7], tags=n[8])


def comment_tuple_to_json(c: tuple) -> dict:
    return dict(text=c[1], title=c[2], author=c[3], email=c[4], created=str(c[5])[:-7])
