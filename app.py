from aiohttp.web import Application
from aiopg import create_pool
from aiohttp_cors import ResourceOptions, setup as cors_setup
from config import SQLALCHEMY_DATABASE_URI
from views import index
from views.new import new
from views.user import user
from views.comment import comment
from views.login import login
from views.register import register
from views.upload import upload


def setup_routes(app: Application):
    app.add_routes(index)
    app.add_routes(new)
    app.add_routes(user)
    app.add_routes(comment)
    app.add_routes(login)
    app.add_routes(register)
    app.add_routes(upload)
    app.router.add_static('/', path='client/build/', show_index=True, follow_symlinks=True)


async def engine_pool(app: Application):
    app['pool'] = await create_pool(SQLALCHEMY_DATABASE_URI)
    yield
    app['pool'].close()
    await app['pool'].wait_closed()


async def init_app() -> Application:
    app = Application()
    setup_routes(app)
    cors = cors_setup(app, defaults={
        '*': ResourceOptions(
            allow_credentials=True,
            expose_headers=('Content-Type', 'Access-Control-Allow-Origin'),
            allow_headers=('Content-Type', 'Access-Control-Allow-Origin', 'Authorization'),
            allow_methods="*",
        )
    })
    for route in list(app.router.routes()):
        cors.add(route)
    app.cleanup_ctx.append(engine_pool)
    return app
