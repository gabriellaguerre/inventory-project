from .db import db, environment, SCHEMA, add_prefix_for_prod


class PurchaseOrderItems(db.Model):
        __tablename__ = 'purchase_order_items'

        if environment == 'production':
         __table_args__ = {'schema': SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        purchase_orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('purchase_orders.id')), nullable=False)
        itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
        quantity = db.Column(db.Integer)

        item = db.relationship('Item', back_populates = 'purchase_orders')
        purchase_order = db.relationship('PurchaseOrder', back_populates = 'items')

        def to_dict(self):
             return {
                  'id': self.id,
                  'purchase_orderId': self.purchase_orderId,
                  'itemId': self.itemId,
                  'quantity': self.quantity,
                #   'createdAt': self.createdAt,
                #   'updatedAt': self.updatedAt
        }

#--------------------------------------------------------------------------------
# purchase_order_items = db.Table("purchase_order_items", db.Model.metadata,
#                 db.Column("purchase_order_id", db.Integer, db.ForeignKey(add_prefix_for_prod("purchase_orders.id")), primary_key=True),
#                 db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True))

# if environment == 'production':
#         purchase_order_items.schema = SCHEMA
