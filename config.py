import os

DEBUG = True

SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:12345678@localhost:5432/news'

SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = 'SECRET'

SECURITY_PASSWORD_SALT = 'SALT'

CLOUD_NAME = 'maximuss'

API_KEY = '863136347657491'

API_SECRET = 'TpLS93sQ9CEVSHp7M6d1SbBpud0'

DATABASE = {
    'drivername': 'postgresql',
    'host': 'localhost',
    'username': os.getenv('DATABASE_USERNAME'),
    'password': os.getenv('DATABASE_PASSWORD'),
    'database': os.getenv('DATABASE_NAME')
}