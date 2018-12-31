from .utils import init_db
from flask import Flask
from flask_sslify import SSLify
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

sslify = SSLify(app)

db = init_db(app)

