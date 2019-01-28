import cloudinary as cloud
from re import sub
from jwt import encode
from app import bcrypt
from config import Config
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url


def upload_image(image):
    cloud.config.update = ({
        'cloud_name': Config.cloud_name,
        'api_key': Config.api_key,
        'api_secret': Config.api_secret
    })
    upload(image)
    cloudinary_url()


def slugify(s):
    return sub(r'[^\w+]', '-', s)


def verify_password_hash(password_hash, password):
    return bcrypt.check_password_hash(password_hash, password)


def crypt_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')


def generate_token(payload):
    return encode(payload=payload, key=Config.SECRET_KEY, algorithm='HS256')
