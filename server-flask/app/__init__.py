from .utils import init_db
from flask import Flask
from flask_sslify import SSLify
from flask_bcrypt import Bcrypt
from ..admin import create_admin
from ..config import Config

app = Flask(__name__)
app.config.from_object(Config)

sslify = SSLify(app)

db = init_db(app)

admin = create_admin(app, db)

bcrypt = Bcrypt(app)
