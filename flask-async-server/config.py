import os


class Config(object):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv('REDIS_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
