from .. import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(20))
    email = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(200))
    active = db.Column(db.Boolean())
    ava_url = db.Column(db.String(50))
    age = db.Column(db.Integer())
    country = db.Column(db.String(20))
    gender = db.Column(db.Boolean())
    role = db.relationship('Role', secondary='users_roles', backref=db.backref('users', lazy='dynamic'))



