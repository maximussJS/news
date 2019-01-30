from aiohttp.web import Application
from aiopg import create_pool
from aiohttp_cors import ResourceOptions, setup as cors_setup
from aiojobs.aiohttp import setup as job_setup
from config import SQLALCHEMY_DATABASE_URI
from views.login import login
from views.register import register


def setup_routes(app: Application):
    app.add_routes(login)
    app.add_routes(register)


async def engine_pool(app: Application):
    app['pool'] = await create_pool(SQLALCHEMY_DATABASE_URI)
    yield
    app['pool'].close()
    await app['pool'].wait_closed()


async def init_app() -> Application:
    app = Application()
    setup_routes(app)
    cors = cors_setup(app, defaults={
        "*": ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods="*"
        )
    })
    for route in list(app.router.routes()):
        cors.add(route)
    job_setup(app)
    app.cleanup_ctx.append(engine_pool)
    return app
