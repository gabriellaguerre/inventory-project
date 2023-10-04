from .db import db, environment, SCHEMA

class Signature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)

    def to_dict(self):
             return {
                  'id': self.id,
                  'filename': self.filename,
            }
