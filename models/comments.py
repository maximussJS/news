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
    created = Column(DateTime, default=datetime.now())

    def __init__(self, title, text, author):
        self.text = text
        self.author = author
        self.post_title = title

    def __repr__(self):
        return f'<Comment author={self.author}>'

    def to_json(self):
        return dict(text=self.text, author=self.author, title=self.post_title, created=self.created)


base.metadata.create_all(engine)