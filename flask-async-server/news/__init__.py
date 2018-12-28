from flask import Blueprint

news = Blueprint('News', __name__)
from . import view
