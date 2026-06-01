from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class SavedSound(db. Model, SerializerMixin):
    __tablename__ = 'sounds'

    id = db.Column(db.Integer, primary_key=True)
    freesound_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Name {self.name} | Id: {self.freesound_id}>'