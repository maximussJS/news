from .news import New
from .tags import Tag
from sqlalchemy import Column, Integer, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI


engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class NewsTags(base):
    __tablename__ = 'news_tags'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    new_id = Column(Integer(), ForeignKey(New.id))
    tag_id = Column(Integer(), ForeignKey(Tag.id))

    def __init__(self, new_id, tag_id):
        self.new_id = new_id,
        self.tag_id = tag_id

    def to_json(self):
        return dict(id=self.id, new_id=self.new_id, tag=self.tag_id)


base.metadata.create_all(engine)
