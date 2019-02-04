from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from models.news import New as New_Model
from utils.decorators import authorize
from utils.helpers import get_user_from_token, new_tuple_to_json
from utils.responses import success_response, failure_response, server_error_response
from utils.queries import select_from_news_where_title, select_from_users_where_email, insert_new_post, \
                          select_from_news_where_url, select_from_news_where_author_and_title as find, \
                          delete_new_by_title, update_news_where_title


new = RouteTableDef()


@new.view('/new')
class New(View, CorsViewMixin):

    @authorize
    async def get(self) -> json_response:
        try:
            url = self.request.rel_url.query['url']
            if url is not None:
                if 60 > len(url) < 4:
                    return failure_response(400, 'Invalid url length')
                pool = self.request.app['pool']
                async with pool.acquire() as conn:
                    async with conn.cursor() as c:
                        await c.execute(select_from_news_where_url(url))
                        n = await c.fetchone()
                        if n is not None:
                            return success_response(200, 'OK', data=new_tuple_to_json(n))
                        return failure_response(400, f"No such post on url : '{url}'")
            return failure_response(400, 'No url param')
        except Exception as e:
            server_error_response(e)

    @authorize
    async def post(self) -> json_response:
        try:
            form = await self.request.json()
            if form['title'] is None or 4 > len(form['title']) > 60:
                return failure_response(400, 'Invalid title length')
            if form['text'] is None or len(form['text']) < 15:
                return failure_response(400, 'Invalid text length')
            if form['url'] is None or 5 > len(form['url']) < 60:
                return failure_response(400, 'Invalid url')
            user = get_user_from_token(self.request.headers['Authorization'])
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
                            print(f"New {post.title} was created by {user['email']}")
                            return success_response(201, f'New {post.title} was created!')
                        return failure_response(400, f"New with title {form['title']} already exist")
                    return failure_response(401, 'No such user')
        except Exception as e:
            return server_error_response(e)

    @authorize
    async def put(self) -> json_response:
        try:
            form = await self.request.json()
            if len(form['obj'].items()) == 0:
                return failure_response(400, 'Nothing to edit')
            if form['old'] is None or 4 > len(form['old']) > 60:
                return failure_response(400, 'Error')
            user = get_user_from_token(self.request.headers['Authorization'])
            pool = self.request.app['pool']
            async with pool.acquire() as conn:
                async with conn.cursor() as c:
                    await c.execute(find(user['email'], form['old']))
                    n = await c.fetchone()
                    if n is not None:
                        new_post = new_tuple_to_json(n)
                        new_post.update(form['obj'])
                        await c.execute(update_news_where_title(new_post, form['old']))
                        return success_response(200, 'OK')
                    return failure_response(400, f"No such post with title {form['old']}")
        except Exception as e:
            return server_error_response(e)

    @authorize
    async def delete(self) -> json_response:
        try:
            title = self.request.rel_url.query['title']
            if title is not None:
                if len(title) < 4:
                    return failure_response(400, 'Invalid title length')
                user = get_user_from_token(self.request.headers['Authorization'])
                pool = self.request.app['pool']
                async with pool.acquire() as conn:
                    async with conn.cursor() as c:
                        await c.execute(find(user['email'], title))
                        n = await c.fetchone()
                        if n is not None:
                            await c.execute(delete_new_by_title(title))
                            return success_response(200, f'NewPage {title} was deleted')
                        return failure_response(400, f"No such post with title : {title}")
            return failure_response(400, 'No title parameter')
        except Exception as e:
            return server_error_response(e)
