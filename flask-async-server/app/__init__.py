from .utils import init_db
from flask import Flask
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = init_db(app)
