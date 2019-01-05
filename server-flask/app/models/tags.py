from .. import db
from .news import slugify


class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    url = db.Column(db.String(50))

    def __init__(self, *args, **kwargs):
        super(Tag, self).__init__(*args, **kwargs)
        self.url = slugify(self.name)

    def __repr__(self):
        return 'Tag <id: {}, name: {}'.format(self.id, self.name)
