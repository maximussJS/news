from asyncio import set_event_loop, get_event_loop
from aiohttp.web import run_app
from uvloop import new_event_loop
from app import init_app


if __name__ == '__main__':
    try:
        uv_loop = new_event_loop()
        set_event_loop(uv_loop)
        loop = get_event_loop()
        app = loop.run_until_complete(init_app())
        print('Server started')
        run_app(app)
        print('Server stopped')
    except Exception as e:
        print(e)
