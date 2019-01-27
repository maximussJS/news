from os import getenv


class Config(object):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = getenv('SECRET_KEY')
    SECURITY_PASSWORD_SALT = getenv('salt')
    SECURITY_PASSWORD_HASH = 'sha512_crypt'

