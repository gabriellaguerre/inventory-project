from .db import db, environment, SCHEMA, add_prefix_for_prod



class RequestItems(db.Model):
        __tablename__ = 'request_items'

        if environment == 'production':
                __table_args__ = {'schema': SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        requestId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('requests.id')), nullable=False)
        itemId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
        quantity = db.Column(db.Integer)

        item = db.relationship('Item', back_populates = 'requests')
        request = db.relationship('Request', back_populates = 'items')

        def to_dict(self):
             return {
                  'id': self.id,
                  'requestId': self.requestId,
                  'itemId': self.itemId,
                  'quantity': self.quantity,
                #   'createdAt': self.createdAt,
                #   'updatedAt': self.updatedAt
        }
# ------------------------------------------------------------------------------------------
# request_items = db.Table("request_items", db.Model.metadata,
#                 db.Column("request_id", db.Integer, db.ForeignKey(add_prefix_for_prod("requests.id")), primary_key=True),
#                 db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True),
#                 db.Column("quantity", db.Integer))


# if environment == 'production':
#         request_items.schema = SCHEMA
