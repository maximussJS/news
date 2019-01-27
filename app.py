from flask import Flask
from flask_cors import CORS
from flask_sslify import SSLify
from flask_bcrypt import Bcrypt
from database import init_db
from config import Config


app = Flask(__name__)
app.config.from_object(Config)

sslify = SSLify(app)

bcrypt = Bcrypt(app)

cors = CORS(app)

db = init_db(app)

if db is not None:
    from admin import create_admin
    admin = create_admin(app, db)


