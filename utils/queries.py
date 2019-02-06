from models.news import New
from models.users import User
from models.comments import Comment


def select_all_users() -> str:
    return 'SELECT * FROM users;'


def select_from_users_where_email(email: str) -> str:
    return f"SELECT * FROM users WHERE email = '{email}';"


def insert_new_user(u: User) -> str:
    return f'''INSERT INTO users (name, email, password, age, country, role, gender, active, ava_url)
               VALUES ( '{u.name}', '{u.email}', '{u.password}', {u.age}, '{u.country}',
                        '{u.role}', {u.gender}, {u.active}, '{u.ava_url}' );'''


def update_users_where_email(u: dict, email: str) -> str:
    return f'''UPDATE users SET name='{u['name']}', email='{u['email']}', password='{u['password']}',
                                age='{u['age']}', country='{u['country']}', gender='{u['gender']}',
                                ava_url='{u['ava_url']}' WHERE email = '{email}' ;'''


def delete_user_by_email(email: str) -> str:
    return f"DELETE FROM users WHERE email = '{email}';"


def select_all_news() -> str:
    return 'SELECT * FROM news;'


def select_from_news_where_title(title: str) -> str:
    return f"SELECT * FROM news WHERE title = '{title}';"


def select_from_news_where_author_and_title(email: str, title: str) -> str:
    return f"SELECT * FROM news WHERE author_email = '{email}' AND title = '{title}';"


def select_from_news_where_url(url: str) -> str:
    return f"SELECT * FROM news WHERE url = '{url}';"


def insert_new_post(n: New) -> str:
    return f'''INSERT INTO news (title, text, url, author_name, author_email, created, image_url)
               VALUES ('{n.title}', '{n.text}', '{n.url}', '{n.author_name}', '{n.author_email}',
                       '{n.created}', '{n.image_url}');'''


def update_news_where_title(n: dict, old_title: str) -> str:
    return f'''UPDATE news SET title='{n['title']}', text='{n['text']}', image_url='{n['image']}'
               WHERE title = '{old_title}' ;'''


def delete_new_by_title(title: str) -> str:
    return f"DELETE FROM news WHERE title = '{title}' ;"


def select_comments_where_title(title: str) -> str:
    return f"SELECT * FROM comments WHERE post_title = '{title}' ;"


def select_comment_by_id(delete_id: int) -> str:
    return f'SELECT * FROM comments WHERE id = {delete_id} ;'


def insert_new_comment(c: Comment) -> str:
    return f'''INSERT INTO comments (text, post_title, author, email, created)
               VALUES ('{c.text}', '{c.post_title}', '{c.author}', '{c.email}', '{c.created}') ;'''


def delete_comment_by_id(delete_id: int) -> str:
    return f'DELETE FROM comments WHERE id = {delete_id} ;'
