from .. import db
from .news import New
from .tags import Tag


class NewsTags(db.Model):
    __tablename__ = 'news_tags'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    new_id = db.Column(db.Integer, db.ForeignKey(New.id))
    tag_id = db.Column(db.Integer, db.ForeignKey(Tag.id))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def remove(self):
        db.session.delete(self)
        db.session.commit()

    def to_json(self):
        return {
            'id': self.id,
            'new_id': self.new_id,
            'tag_id': self.tag_id
        }
