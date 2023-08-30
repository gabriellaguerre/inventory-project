from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .request_item import request_items
from datetime import datetime


class Request(db.Model):
    __tablename__ = 'requests'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    # itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    voided = db.Column(db.Boolean, nullable=False)
    applied = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # quantities = db.relationship("Quantity", secondary=request_items, back_populates = 'requests')
    items = db.relationship('Item', back_populates = 'request')
    user = db.relationship('User', back_populates = 'requests')

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'voided': self.voided,
            'applied': self.applied,
            'itemId': self.itemId,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
