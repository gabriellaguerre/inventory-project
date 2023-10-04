from .db import db, environment, SCHEMA, add_prefix_for_prod
from .request_item import RequestItems
from datetime import datetime


class Request(db.Model):
    __tablename__ = 'requests'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    voided = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    # quantities = db.relationship("Quantity", secondary=request_items, back_populates = 'requests')
    # requests = db.relationship('Request', secondary=supplier_items, back_populates = 'items')
    items = db.relationship('RequestItems', back_populates = 'request')
    user = db.relationship('User', back_populates = 'requests')

    def to_dict(self):
        return {
            'id': self.id,
            'voided': self.voided,
            'image': self.image,
            'userId': self.userId,
            'createdAt': self.createdAt.strftime("%b %d %Y"),
            'updatedAt': self.updatedAt.strftime("%b %d %Y"),
        }
