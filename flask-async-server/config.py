class Config(object):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:12345678@localhost:5432/news'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
