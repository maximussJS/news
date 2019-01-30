from models.users import User


def select_from_users_where_email(email: str) -> str:
    return f"SELECT * FROM users WHERE email = '{email}';"


def select_all_users() -> str:
    return 'SELECT * FROM users;'


def insert_new_user(u: User) -> str:
    print(u.password)
    return f'''INSERT INTO users (name, email, password, age, country, role, gender, active, ava_url)
               VALUES ( '{u.name}', '{u.email}', '{u.password}', {u.age}, '{u.country}',
                        '{u.role}', {u.gender}, {u.active}, '{u.ava_url}' );'''
