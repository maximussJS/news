from app import app, db
from views.new import new
from views.tag import tag
from views.auth import auth
from views.role import role
from views.user import user


app.register_blueprint(new, url_prefix='/news')
app.register_blueprint(tag, url_prefix='/tags')
app.register_blueprint(user, url_prefix='/users')
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(role, url_prefix='/roles')

if __name__ == '__main__':
    db.create_all()
    app.run()

