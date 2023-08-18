from .db import db, environment, SCHEMA, add_prefix_for_prod


class Request(db.Model):
    __tablename__ = 'requests'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    itemId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.Date)
    updatedAt = db.Column(db.Date)

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'itemId': self.itemId,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
