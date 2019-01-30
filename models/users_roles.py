from .users import User
from .roles import Role
from sqlalchemy import Column, Integer, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI


engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class UsersRoles(base):
    __tablename__ = 'users_roles'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    user_id = Column(Integer(), ForeignKey(User.id))
    role_id = Column(Integer(), ForeignKey(Role.id))


base.metadata.create_all(engine)
