from datetime import datetime
from sqlalchemy import Integer, Column, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from utils.helpers import slugify
from config import SQLALCHEMY_DATABASE_URI, DEBUG


engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=DEBUG)
base = declarative_base()


class New(base):
    __tablename__ = 'news'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    title = Column(String(60))
    url = Column(String(60), unique=True)
    text = Column(String(1000))
    author_name = Column(String(20))
    author_email = Column(String(20))
    created = Column(DateTime, default=datetime.now())
    image_url = Column(String(100))
    tags = Column(String(10))
    # tags = db.relationship('Tag', secondary='news_tags', backref=db.backref('news', lazy='dynamic'))

    def __init__(self, title, text, name, email, image_url='str'):
        self.title = title
        self.text = text
        self.author_name = name
        self.author_email = email
        self.image_url = image_url
        self.generate_url()
        self.created = datetime.now()
        self.tags = ['tag']

    def generate_url(self):
        if self.title:
            self.url = slugify(self.title)
        else:
            self.url = slugify(self.author_email)

    def __repr__(self):
        return f'<New title "{self.title}" written by {self.author_name}>'

    def to_json(self):
        return dict(title=self.title, text=self.text, name=self.author_name, email=self.author_email,
                    url=self.url, tags=self.tags, created=self.created, image_url=self.image_url)


base.metadata.create_all(engine)
