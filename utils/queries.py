from models.users import User
from models.news import New


def select_all_users() -> str:
    return 'SELECT * FROM users;'


def select_from_users_where_email(email: str) -> str:
    return f"SELECT * FROM users WHERE email = '{email}';"


def insert_new_user(u: User) -> str:
    return f'''INSERT INTO users (name, email, password, age, country, role, gender, active, ava_url)
               VALUES ( '{u.name}', '{u.email}', '{u.password}', {u.age}, '{u.country}',
                        '{u.role}', {u.gender}, {u.active}, '{u.ava_url}' );'''


def select_all_news() -> str:
    return 'SELECT * FROM news;'


def select_from_news_where_title(title: str) -> str:
    return f"SELECT * FROM news WHERE title = '{title}';"


def insert_new_post(n: New) -> str:
    return f'''INSERT INTO news (title, text, url, author_name, author_email, created, image_url)
               VALUES ('{n.title}', '{n.text}', '{n.url}', '{n.author_name}', '{n.author_email}',
                       '{n.created}', '{n.image_url}');'''
