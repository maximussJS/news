from flask import Flask
from .config import Config
from .news import news


app = Flask(__name__)
app.config.from_object(Config)


app.register_blueprint(news, url_prefix='/news')
