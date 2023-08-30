from .db import db, environment, SCHEMA, add_prefix_for_prod
from .supplier_item import supplier_items
# from .request_item import request_items
# from .purchase_order_item import purchase_order_items
from datetime import datetime


class Item(db.Model):
    __tablename__ = 'items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    item_type = db.Column(db.String(500), nullable=False)
    unit_cost = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    manufacturer = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    requestId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('requests.id')))
    p_orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('purchase_orders.id')))
    # supplierId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('suppliers.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())


    user = db.relationship('User', back_populates = 'items')
    purchase_order = db.relationship('PurchaseOrder', back_populates = 'items')
    request = db.relationship('Request', back_populates = 'items')
    suppliers = db.relationship('Supplier', secondary=supplier_items, back_populates = 'items')
    # quantities = db.relationship("Quantity", secondary=request_items, back_populates = 'items')

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'description': self.description,
            'unit_cost': self.unit_cost,
            'quantity': self.quantity,
            'item_type': self.item_type,
            'manufacturer': self.manufacturer,
            'requestId': self.requestId,
            'p_orderId': self.p_orderId,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
