from flask_sqlalchemy import SQLAlchemy


def init_db(app):
    db = SQLAlchemy(app)
    if db is not None:
        print('Connected to Postgres')
        return db
    else:
        print('Error to connect Postgres')
        raise Exception('Postgres Error')
