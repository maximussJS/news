from app import app, db
from views.new import new
from views.tag import tag
from views.auth import auth
from views.role import role
from views.user import user
from views.upload import upload


app.register_blueprint(new, url_prefix='/news')
app.register_blueprint(tag, url_prefix='/tags')
app.register_blueprint(user, url_prefix='/users')
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(role, url_prefix='/roles')
app.register_blueprint(upload, url_prefix='/upload')


if __name__ == '__main__':
    db.create_all()
    app.run()
