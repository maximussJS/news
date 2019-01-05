from .. import db
from .users import User
from.roles import Role


class UsersRoles(db.Model):
    __tablename__ = 'users_roles'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    role_id = db.Column(db.Integer, db.ForeignKey(Role.id))
