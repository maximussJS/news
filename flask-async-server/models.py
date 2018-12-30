import re
from .app import db
from datetime import datetime


def slugify(s):
    return re.sub(r'[^\w+]', '-', s)


class New(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    url = db.Column(db.String(140), unique=True)
    text = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.now())
    image = db.Column(db.String(50))

    def __init__(self, *args, **kwargs):
        super(New, self).__init__(*args, **kwargs)
        self.generate_url()

    def generate_url(self):
        if self.title:
            self.url = slugify(self.title)

    def __repr__(self):
        return '<New id: {}, title: {}>'.format(self.id, self.title)
