from app import (app, db)


@app.route('/', methods=['GET', 'POST'])
def index():
    return '<h1>hello wordls</h1>'
