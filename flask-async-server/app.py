from flask import Flask
from config import Config
from news import news
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)

app.register_blueprint(news, url_prefix='/news')
