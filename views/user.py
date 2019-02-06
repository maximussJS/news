from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from utils.decorators import authorize
from utils.responses import success_response, failure_response, server_error_response
from utils.queries import select_from_users_where_email, update_users_where_email,\
                          delete_user_by_email
from utils.helpers import user_tuple_to_json, get_user_from_token, generate_token, \
                          get_password_from_token as get_old_pass, crypt_password


user = RouteTableDef()


@user.view('/user')
class User(View, CorsViewMixin):

    @authorize
    async def get(self) -> json_response:
        try:
            email = self.request.rel_url.query['email']
            if email is not None:
                if 20 < len(email) < 8:
                    return failure_response(400, 'Invalid email length')
                pool = self.request.app['pool']
                async with pool.acquire() as conn:
                    async with conn.cursor() as c:
                        await c.execute(select_from_users_where_email(email))
                        u = await c.fetchone()
                        if u is not None:
                            return success_response(200, 'OK', data=user_tuple_to_json(u))
                        return failure_response(400, f"No such email : '{email}'")
            return failure_response(400, 'No email param')
        except Exception as e:
            return server_error_response(e)

    @authorize
    async def put(self) -> json_response:
        try:
            form = await self.request.json()
            if len(form['obj'].items()) == 0:
                return failure_response(400, 'Nothing to edit')
            obj = form['obj']
            token = self.request.headers['Authorization']
            if 'password' in obj:
                if get_old_pass(token) == obj['password']:
                    if obj['newPassword'] is None or 20 < len(obj['newPassword']) < 8:
                        return failure_response(400, 'Invalid length of new password')
                    obj['password'] = crypt_password(obj['newPassword'])
                else:
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
                        if 'password' not in obj:
                            new_user['password'] = u[3]
                        await c.execute(update_users_where_email(new_user, usr['email']))
                        updated = dict((i, new_user[i]) for i in new_user if i != 'password')
                        if 'password' in obj:
                            new_token = generate_token(dict(user=updated,
                                                            password=obj['newPassword']))
                        else:
                            new_token = generate_token(dict(user=updated,
                                                            password=get_old_pass(token)))
                        return success_response(200, 'OK', token=new_token)
                    return failure_response(400, f"No such user with email {usr['email']}")
        except Exception as e:
            return server_error_response(e)

    @authorize
    async def delete(self) -> json_response:
        try:
            usr = get_user_from_token(self.request.headers['Authorization'])
            pool = self.request.app['pool']
            async with pool.acquire() as conn:
                async with conn.cursor() as c:
                    await c.execute(select_from_users_where_email(usr['email']))
                    u = await c.fetchone()
                    if u is not None:
                        await c.execute(delete_user_by_email(usr['email']))
                        return success_response(200, f"Deleted user with email {usr['email']}")
                    return failure_response(400, 'Bad email')
        except Exception as e:
            return server_error_response(e)
