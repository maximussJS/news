from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from models.news import New as New_Model
from utils.helpers import is_valid_token, get_user_from_token
from utils.responses import success_response, failure_response, server_error_response
from utils.queries import select_from_news_where_title, select_from_users_where_email, insert_new_post


new = RouteTableDef()


@new.view('/new')
class New(View, CorsViewMixin):
    async def get(self) -> json_response:
        return success_response(200, 'Ok')

    async def post(self) -> json_response:
        try:
            if 'Authorization' in self.request.headers:
                token = self.request.headers['Authorization']
                if token is not None and is_valid_token(token):
                    form = await self.request.json()
                    if form['title'] is None or 4 > len(form['title']) > 60:
                        return failure_response(400, 'Invalid title length')
                    if form['text'] is None or len(form['text']) < 15:
                        return failure_response(400, 'Invalid text length')
                    if form['url'] is None or 5 > len(form['url']) < 60:
                        return failure_response(400, 'Invalid url')
                    user = get_user_from_token(token)
                    pool = self.request.app['pool']
                    async with pool.acquire() as conn:
                        async with conn.cursor() as c:
                            await c.execute(select_from_users_where_email(user['email']))
                            u = await c.fetchone()
                            if u is not None:
                                await c.execute(select_from_news_where_title(form['title']))
                                n = await c.fetchone()
                                if n is None:
                                    post = New_Model(title=form['title'],
                                                     text=form['text'],
                                                     image_url=form['url'],
                                                     name=user['name'],
                                                     email=user['email'])
                                    await c.execute(insert_new_post(post))
                                    print(f"Post {post.title} was created by {user['email']}")
                                    return success_response(201, f'Post {post.title} was created!')
                                return failure_response(400, f"Post with title {form['title']} already exist")
                            return failure_response(401, 'No such user')
        except Exception as e:
            return server_error_response(e)
