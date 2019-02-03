from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from aiojobs.aiohttp import atomic
from utils.responses import success_response, failure_response, server_error_response
from utils.queries import select_from_users_where_url, select_from_users_where_email, update_users_where
from utils.helpers import user_tuple_to_json, is_valid_token, get_user_from_token, \
                          get_password_from_token as get_old_pass, crypt_password, generate_token


user = RouteTableDef()


@user.view('/user')
class User(View, CorsViewMixin):

    @atomic
    async def get(self) -> json_response:
        try:
            url = self.request.rel_url.query['url']
            if url is not None:
                if 20 < len(url) < 8:
                    return failure_response(400, 'Invalid url length')
                if 'Authorization' in self.request.headers:
                    token = self.request.headers['Authorization']
                    if token is not None and is_valid_token(token):
                        pool = self.request.app['pool']
                        async with pool.acquire() as conn:
                            async with conn.cursor() as c:
                                await c.execute(select_from_users_where_url(url))
                                u = await c.fetchone()
                                if u is not None:
                                    return success_response(200, 'OK', data=user_tuple_to_json(u))
                                return failure_response(400, f"No such user on url : '{url}'")
                    return failure_response(401, 'Authorize please')
                return failure_response(401, 'Authorize please')
            return failure_response(400, 'No url param')
        except Exception as e:
            return server_error_response(e)

    @atomic
    async def put(self):
        try:
            if 'Authorization' in self.request.headers:
                token = self.request.headers['Authorization']
                if token is not None and is_valid_token(token):
                    form = await self.request.json()
                    if len(form['obj'].items()) == 0:
                        return failure_response(400, 'Nothing to edit')
                    obj = form['obj']
                    if 'password' in obj:
                        if get_old_pass(token) == form['password']:
                            if obj['newPassword'] is None or 20 < len(obj['newPassword']) < 8:
                                return failure_response(400, 'Invalid length of new password')
                            obj['password'] = crypt_password(obj['newPassword'])
                        return failure_response(401, 'Invalid password')
                    usr = get_user_from_token(token)
                    pool = self.request.app['pool']
                    async with pool.acquire() as conn:
                        async with conn.cursor() as c:
                            await c.execute(select_from_users_where_email(usr['email']))
                            u = await c.fetchone()
                            if u is not None:
                                new_user = user_tuple_to_json(u)
                                new_user.update(obj)
                                await c.execute(update_users_where(new_user, usr['email']))
                                updated = dict((i, new_user[i]) for i in new_user if i != 'password')
                                if 'password' in obj:
                                    new_token = generate_token(dict(user=updated,
                                                                    password=obj['newPassword']))
                                else:
                                    new_token = generate_token(dict(user=updated,
                                                                    password=get_old_pass(token)))
                                return success_response(200, 'OK', token=new_token)
                            return failure_response(400, f"No such user with email {usr['email']}")
                return failure_response(401, 'Authorize please')
            return failure_response(401, 'Authorize please')
        except Exception as e:
            return server_error_response(e)
