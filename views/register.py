from aiohttp.web import RouteTableDef, View, json_response
from aiohttp_cors import CorsViewMixin
from models.users import User
from utils.responses import success_response, server_error_response, failure_response
from utils.queries import select_from_users_where_email, insert_new_user
from utils.helpers import crypt_password


register = RouteTableDef()


@register.view('/register')
class Register(View, CorsViewMixin):
    async def post(self) -> json_response:
        try:
            form = await self.request.json()
            if form['name'] is None or 8 > len(form['name']) > 20:
                return failure_response(400, 'Invalid name length')
            if form['email'] is None or 8 > len(form['email']) > 20:
                return failure_response(400, 'Invalid email length')
            if form['password'] is None or 8 > len(form['password']) > 20:
                return failure_response(400, 'Invalid password length')
            if form['country'] is None or 3 > len(form['country']) > 15:
                return failure_response(400, 'Invalid country length')
            if form['age'] is None or 6 > int(form['age']) > 65:
                return failure_response(400, 'Invalid age ')
            if not isinstance(form['gender'], bool):
                return failure_response(400, 'Invalid gender')
            pool = self.request.app['pool']
            async with pool.acquire() as conn:
                async with conn.cursor() as c:
                    await c.execute(select_from_users_where_email(form['email']))
                    usr = await c.fetchone()
                    if usr is None:
                        password_hash = crypt_password(form['password'])
                        user = User(name=form['name'],
                                    email=form['email'],
                                    password=password_hash,
                                    country=form['country'],
                                    age=int(form['age']),
                                    gender=form['gender'],
                                    active=True,
                                    role='User')
                        await c.execute(insert_new_user(user))
                        print(f'Created new user : {user.email}')
                        return success_response(201, f'Created user : {user.email}')
                    return failure_response(400, f"User with email {form['email']} already exists")
        except Exception as e:
            return server_error_response(e)
