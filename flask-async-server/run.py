from app import app, db
from app.new import new
from app.tag import tag

app.register_blueprint(new, url_prefix='/new')
app.register_blueprint(tag, url_prefix='/tag')

if __name__ == '__main__':
    db.create_all()
    app.run()

