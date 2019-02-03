from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from aiojobs.aiohttp import atomic
from utils.helpers import generate_token, compare, user_tuple_to_json
from utils.queries import select_from_users_where_email
from utils.responses import success_response, failure_response, server_error_response


login = RouteTableDef()


@login.view('/login')
class Login(View, CorsViewMixin):

    @atomic
    async def post(self) -> json_response:
        try:
            form = await self.request.json()
            if form['email'] is None or 8 > len(form['email']) > 20:
                return failure_response(400, 'Invalid email length')
            if form['password'] is None or 8 > len(form['password']) > 20:
                return failure_response(400, 'Invalid password length')
            pool = self.request.app['pool']
            async with pool.acquire() as conn:
                async with conn.cursor() as c:
                    await c.execute(select_from_users_where_email(form['email']))
                    user = await c.fetchone()
                    if user is not None and compare(user[3], form['password']):
                        token = generate_token(dict(user=user_tuple_to_json(user),
                                                    password=form['password']))
                        return success_response(200, 'OK', token=token)
                    return failure_response(400, 'Invalid email or password')
        except Exception as e:
            return server_error_response(e)
