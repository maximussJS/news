from app import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(20))
    email = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(200))
    active = db.Column(db.Boolean())
    ava_url = db.Column(db.String(50))
    age = db.Column(db.Integer())
    country = db.Column(db.String(20))
    gender = db.Column(db.Boolean())
    role = db.Column(db.String(10))
    # role = db.relationship('Role', secondary='users_roles', backref=db.backref('users', lazy='dynamic'))

    def __init__(self, name, email, password, active,  age, country, gender, role, ava_url='str'):
        self.name = name
        self.email = email
        self.password = password
        self.active = active
        self.ava_url = ava_url
        self.age = age
        self.country = country
        self.gender = gender
        self.role = role

    def __repr__(self):
        return f'<User {self.name} , email={self.email}, active={self.active}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def remove(self):
        db.session.delete(self)
        db.session.commit()

    def to_json(self):
        return dict(name=self.name, email=self.email, active=self.active, ava_url=self.ava_url,
                    age=self.age, country=self.country, gender=self.gender, role=self.role)
