from .db import db, environment, SCHEMA, add_prefix_for_prod
from .supplier_item import supplier_items
from datetime import datetime


class Supplier(db.Model):
    __tablename__ = 'suppliers'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    contact = db.Column(db.String(255))
    email = db.Column(db.String(255))
    cell = db.Column(db.String(255))
    # itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates = 'suppliers')
    items = db.relationship('Item', secondary=supplier_items, back_populates = 'suppliers')



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'contact': self.contact,
            'email': self.email,
            'cell': self.cell,
            'userId': self.userId,
            'createdAt': self.createdAt.strftime("%b %d %Y"),
            'updatedAt': self.updatedAt.strftime("%b %d %Y")
        }
