from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .app.models.news import New
from .app.models.tags import Tag
from .app.models.users import User
from .app.utils import slugify


def create_admin(app, store):
    admin = Admin(app)
    admin.add_view(ModelView(New, store.session))
    admin.add_view(ModelView(Tag, store.session))
    admin.add_view(ModelView(User, store.session))
    return admin


class BaseModelView(ModelView):
    def on_model_change(self, form, model, is_created):
        if model.title:
            model.url = slugify(model.title)
        else:
            model.url = slugify(model.name)
        return super(BaseModelView, self).on_model_change(form, model, is_created)
