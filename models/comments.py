from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI


engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class Comment(base):
    __tablename__ = 'comments'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    text = Column(String(500))
    post_title = Column(String(20))
    author = Column(String(20))
    email = Column(String(20))
    created = Column(DateTime, default=datetime.now())

    def __init__(self, title, text, author, email):
        self.text = text
        self.author = author
        self.email = email
        self.post_title = title
        self.created = datetime.now()

    def __repr__(self):
        return f'<Comment author={self.author}>'

    def to_json(self):
        return dict(text=self.text, email=self.email, title=self.post_title,
                    id=self.id, author=self.author, created=str(self.created)[:-7])


base.metadata.create_all(engine)
