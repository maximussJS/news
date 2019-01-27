from app import db
from .news import New
from .tags import Tag


class NewsTags(db.Model):
    __tablename__ = 'news_tags'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    new_id = db.Column(db.Integer, db.ForeignKey(New.id))
    tag_id = db.Column(db.Integer, db.ForeignKey(Tag.id))

    def __init__(self, new_id, tag_id):
        self.new_id = new_id,
        self.tag_id = tag_id

    def to_json(self):
        return dict(id=self.id, new_id=self.new_id, tag=self.tag_id)
