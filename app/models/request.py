from .db import db, environment, SCHEMA, add_prefix_for_prod
from .request_item import RequestItems
from datetime import datetime


class Request(db.Model):
    __tablename__ = 'requests'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # quantity1 = db.Column(db.Integer, nullable=False)
    # quantity2 = db.Column(db.Integer)
    # quantity3 = db.Column(db.Integer)
    # item1 = db.Column(db.Integer)
    # item2 = db.Column(db.Integer)
    # item3 = db.Column(db.Integer)
    voided = db.Column(db.Boolean, nullable=False)
    # applied = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # quantities = db.relationship("Quantity", secondary=request_items, back_populates = 'requests')
    # requests = db.relationship('Request', secondary=supplier_items, back_populates = 'items')
    items = db.relationship('RequestItems', back_populates = 'request')
    user = db.relationship('User', back_populates = 'requests')

    def to_dict(self):
        return {
            'id': self.id,
            # 'quantity1': self.quantity1,
            # 'quantity2': self.quantity2,
            # 'quantity3': self.quantity3,
            # 'item1': self.item1,
            # 'item2': self.item2,
            # 'item3': self.item3,
            'voided': self.voided,
            # 'applied': self.applied,
            # 'itemId': self.itemId,
            'userId': self.userId,
            'createdAt': self.createdAt.strftime("%b %d %Y"),
            'updatedAt': self.updatedAt.strftime("%b %d %Y"),
        }
