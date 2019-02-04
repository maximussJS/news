from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from models.comments import Comment as CommentModel
from utils.decorators import authorize
from utils.helpers import comment_tuple_to_json as to_json, get_user_from_token
from utils.responses import success_response, failure_response, server_error_response
from utils.queries import select_from_news_where_title, select_comments_where_title,\
                          select_from_users_where_email, insert_new_comment


comment = RouteTableDef()


@comment.view('/comments')
class Comment(View, CorsViewMixin):

    @authorize
    async def get(self) -> json_response:
        try:
            title = self.request.rel_url.query['title']
            if title is None:
                return failure_response(400, 'No title param')
            if 60 < len(title) < 4:
                return failure_response(400, 'Invalid title length')
            pool = self.request.app['pool']
            async with pool.acquire() as conn:
                async with conn.cursor() as c:
                    await c.execute(select_from_news_where_title(title))
                    n = await c.fetchone()
                    if n is None:
                        return failure_response(400, f'No post with title {title}')
                    await c.execute(select_comments_where_title(title))
                    comments = await c.fetchall()
                    return success_response(200, 'OK', data=list(map(lambda x: to_json(x), comments)))
        except Exception as e:
            return server_error_response(e)

    @authorize
    async def post(self) -> json_response:
        try:
            form = await self.request.json()
            if form['title'] is None or 60 < len(form['title']) < 4:
                return failure_response(400, 'Invalid title')
            if form['text'] is None or len(form['text']) > 500:
                return failure_response(400, 'Invalid text')
            user = get_user_from_token(self.request.headers['Authorization'])
            pool = self.request.app['pool']
            async with pool.acquire() as conn:
                async with conn.cursor() as c:
                    await c.execute(select_from_users_where_email(user['email']))
                    u = await c.fetchone()
                    if u is None:
                        return failure_response(401, 'No such user')
                    await c.execute(select_from_news_where_title(form['title']))
                    n = await c.fetchone()
                    if n is None:
                        return failure_response(400, f"No such post with title {form['title']}")
                    com = CommentModel(text=form['text'], title=form['title'], author=user['email'])
                    await c.execute(insert_new_comment(com))
                    return success_response(201, f'New comment at {com.created}')
        except Exception as e:
            return server_error_response(e)
