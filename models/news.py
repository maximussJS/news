from datetime import datetime
from app import db
from utils.helpers import slugify


class New(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(140))
    url = db.Column(db.String(140), unique=True)
    text = db.Column(db.Text)
    author_name = db.Column(db.String(20))
    author_email = db.Column(db.String(20))
    created = db.Column(db.DateTime, default=datetime.now())
    image_url = db.Column(db.String(50))
    tags = db.Column(db.String(10))
    # tags = db.relationship('Tag', secondary='news_tags', backref=db.backref('news', lazy='dynamic'))

    def __init__(self, title, text, name, email, image_url='str'):
        self.title = title
        self.text = text
        self.author_name = name
        self.author_email = email
        self.image_url = image_url
        self.generate_url()

    def generate_url(self):
        if self.title:
            self.url = slugify(self.title)
        else:
            self.url = slugify(self.author_email)

    def __repr__(self):
        return f'<New title "{self.title}" written by {self.author_name}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def remove(self):
        db.session.delete(self)
        db.session.commit()

    def to_json(self):
        return dict(title=self.title, text=self.text, name=self.author_name, email=self.author_email,
                    url=self.url, tags=self.tags, created=self.created, image_url=self.image_url)
