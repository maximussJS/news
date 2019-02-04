from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from utils.queries import select_all_news
from utils.helpers import new_tuple_to_json as to_json
from utils.responses import success_response, server_error_response


index = RouteTableDef()


@index.view('/')
class Index(View, CorsViewMixin):
    async def get(self) -> json_response:
        try:
            pool = self.request.app['pool']
            async with pool.acquire() as conn:
                async with conn.cursor() as c:
                    await c.execute(select_all_news())
                    news = await c.fetchall()
                    return success_response(200, 'OK', data=list(map(lambda n: to_json(n), news)))
        except Exception as e:
            return server_error_response(e)
