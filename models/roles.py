from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI


engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class Role(base):
    __tablename__ = 'roles'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    name = Column(String(20), unique=True)
    description = Column(String(255))

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return f'<Role {self.name}>'

    def to_json(self):
        return dict(name=self.name, description=self.description)


base.metadata.create_all(engine)
