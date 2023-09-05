from .db import db, environment, SCHEMA, add_prefix_for_prod
from .supplier_item import supplier_items
from .request_item import RequestItems
from .purchase_order_item import PurchaseOrderItems
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
    deleted = db.Column(db.Boolean, default=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())


    user = db.relationship('User', back_populates = 'items')
    purchase_orders = db.relationship('PurchaseOrderItems', back_populates = 'item')
    requests = db.relationship('RequestItems', back_populates = 'item')
    suppliers = db.relationship('Supplier', secondary=supplier_items, back_populates = 'items')


    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'description': self.description,
            'unit_cost': self.unit_cost,
            'quantity': self.quantity,
            'item_type': self.item_type,
            'manufacturer': self.manufacturer,
            'deleted': self.deleted,
            'userId': self.userId,
            'createdAt': self.createdAt.strftime("%b %d %Y"),
            'updatedAt': self.updatedAt.strftime("%b %d %Y")
        }
