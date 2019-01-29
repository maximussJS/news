from aiohttp.web import View, RouteTableDef
from aiohttp_cors import CorsViewMixin
from utils.responses import success_response, failure_response , server_error_response


login = RouteTableDef()


@login.view('/login')
class Login(View, CorsViewMixin):
    async def get(self):
        return success_response(200, 'OK')

    async def post(self):
        form = await self.request.json()
        print(form)
        return success_response(200, 'OK')


