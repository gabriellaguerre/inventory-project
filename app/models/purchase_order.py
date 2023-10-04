from .db import db, environment, SCHEMA, add_prefix_for_prod
from .purchase_order_item import PurchaseOrderItems
from datetime import datetime


class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_orders'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    received = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())


    items = db.relationship("PurchaseOrderItems", back_populates = 'purchase_order')
    user = db.relationship('User', back_populates = 'purchase_orders')


    def to_dict(self):
        return {
            'id': self.id,
            'received': self.received,
            'image': self.image,
            'userId': self.userId,
            'createdAt': self.createdAt.strftime("%b %d %Y"),
            'updatedAt': self.updatedAt.strftime("%b %d %Y")
        }
