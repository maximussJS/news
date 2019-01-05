class Config(object):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:12345678@localhost:5432'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'maximuss'
    SECURITY_PASSWORD_SALT = 'salt'
    SECURITY_PASSWORD_HASH = 'sha512_crypt'
