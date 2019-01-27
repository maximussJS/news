from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models.news import New
from models.tags import Tag
from models.users import User
from models.roles import Role
from utils.helpers import slugify


def create_admin(app, db):
    admin = Admin(app)
    admin.add_view(ModelView(New, db.session))
    admin.add_view(ModelView(Tag, db.session))
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Role, db.session))
    return admin


class BaseModelView(ModelView):
    def on_model_change(self, form, model, is_created):
        if model.title:
            model.url = slugify(model.title)
        else:
            model.url = slugify(model.name)
        return super(BaseModelView, self).on_model_change(form, model, is_created)
