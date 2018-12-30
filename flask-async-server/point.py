from app import (app, db)

if __name__ == '__main__':
    app.run()
    db.create_all()

