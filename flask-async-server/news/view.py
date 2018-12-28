from . import news


@news.route('/')
def index():
    return '<h1>HELLO NEW</h1>'
