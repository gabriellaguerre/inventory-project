from .db import db, environment, SCHEMA, add_prefix_for_prod
from .purchase_order_item import PurchaseOrderItems
from datetime import datetime


class PurchaseOrder(db.Model):
    __tablename__ = 'purchase_orders'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # quantity1 = db.Column(db.Integer, nullable=False)
    # quantity2 = db.Column(db.Integer)
    # quantity3 = db.Column(db.Integer)
    # itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    voided = db.Column(db.Boolean, nullable=False)
    received = db.Column(db.Boolean, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())


    items = db.relationship("PurchaseOrderItems", back_populates = 'purchase_order')
    user = db.relationship('User', back_populates = 'purchase_orders')


    def to_dict(self):
        return {
            'id': self.id,
            'voided': self.voided,
            'received': self.received,
            # 'quantity1': self.quantity1,
            # 'quantity2': self.quantity2,
            # 'quantity3': self.quantity3,
            'userId': self.userId,
            'createdAt': self.createdAt.strftime("%b %d %Y"),
            'updatedAt': self.updatedAt.strftime("%b %d %Y")
        }
