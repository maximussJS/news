from re import sub
from jwt import encode
from bcrypt import checkpw, hashpw, gensalt
from config import SECRET_KEY


def slugify(s: str) -> str:
    return sub(r'[^\w+]', '-', s)


def verify_password_hash(password_hash: bin, password: str) -> bool:
    return checkpw(password, password_hash)


def crypt_password(password: str) -> str:
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')


def generate_token(payload: dict) -> str:
    return encode(payload=payload, key=SECRET_KEY, algorithm='HS256').decode('utf-8')
