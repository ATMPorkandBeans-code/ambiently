from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import Schema, fields
from config import db, bcrypt
from flask_sqlalchemy import SQLAlchemy

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    sounds = db.relationship('Sound', back_populates='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<user {self.username}'

class Sound(db.Model):
    __tablename__ = 'sounds'

    id = db.Column(db.Integer, primary_key=True)
    freesound_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates="sounds")

    def __repr__(self):
        return f'<Name {self.name} | Id: {self.freesound_id}>'
    
class UserSchema(Schema):
    id = fields.Int()
    username = fields.String()

    sounds = fields.List(fields.Nested(lambda: SoundSchema(exclude=("user",))))

class SoundSchema(Schema):
    id = fields.Int()
    freesound_id = fields.Int()
    name = fields.String()

    user = fields.Nested(UserSchema(exclude=("sounds",)))