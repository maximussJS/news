from app import (app, db)
from app.news import news

app.register_blueprint(news, url_prefix='/news')

if __name__ == '__main__':
    db.create_all()
    app.run()

