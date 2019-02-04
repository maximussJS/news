from sqlalchemy import Column, Integer, String, Boolean, create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI


engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class User(base):
    __tablename__ = 'users'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    name = Column(String(20))
    email = Column(String(20), unique=True)
    password = Column(String(200))
    active = Column(Boolean())
    ava_url = Column(String(150))
    age = Column(Integer())
    country = Column(String(20))
    gender = Column(Boolean())

    def __init__(self, name, email, password, active,  age, country, gender, ava_url='str'):
        self.name = name
        self.email = email
        self.password = password
        self.active = active
        self.ava_url = ava_url
        self.age = age
        self.country = country
        self.gender = gender

    def __repr__(self):
        return f'<User {self.name} , email={self.email}, active={self.active}>'

    def to_json(self):
        return dict(name=self.name, email=self.email, active=self.active, age=self.age,
                    ava_url=self.ava_url, country=self.country, gender=self.gender)


base.metadata.create_all(engine)
