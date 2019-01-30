from .news import slugify
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI


engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class Tag(base):
    __tablename__ = 'tags'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    name = Column(String(50))
    url = Column(String(50))

    def __init__(self, *args, **kwargs):
        super(Tag, self).__init__(*args, **kwargs)
        self.url = slugify(self.name)

    def __repr__(self):
        return 'Tag <id: {}, name: {}'.format(self.id, self.name)

    def to_json(self):
        return dict(name=self.name, url=self.url)


base.metadata.create_all(engine)