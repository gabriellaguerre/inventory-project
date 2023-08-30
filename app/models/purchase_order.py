from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .purchase_order_item import purchase_order_items
from datetime import datetime


class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_orders'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    # itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    voided = db.Column(db.Boolean, nullable=False)
    received = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())


    items = db.relationship("Item", back_populates = 'purchase_order')
    user = db.relationship('User', back_populates = 'purchase_orders')


    def to_dict(self):
        return {
            'id': self.id,
            # 'quantity': self.quantity,
            'voided': self.voided,
            'received': self.received,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
