from datetime import datetime
from .. import db
from ..utils import slugify


class New(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(140))
    url = db.Column(db.String(140), unique=True)
    text = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.now())
    image = db.Column(db.String(50))
    tags = db.relationship('Tag', secondary='news_tags', backref=db.backref('news', lazy='dynamic'))

    def __init__(self, *args, **kwargs):
        super(New, self).__init__(*args, **kwargs)
        self.generate_url()

    def generate_url(self):
        if self.title:
            self.url = slugify(self.title)
        else:
            self.url = slugify('asdasd qwe qw')

    def __repr__(self):
        return '<New id: {}, title: {}>'.format(self.id, self.title)



