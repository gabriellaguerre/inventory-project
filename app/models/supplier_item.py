from .db import db, environment, SCHEMA, add_prefix_for_prod


# class Supplier_Item(db.Model):
#     __tablename__ = 'supplier_items2'
#     # __table_args__ = {'extend_existing': True}

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     itemId = db.Column(db.Integer)
#     supplierId = db.Column(db.Integer)


#     def to_dict(self):
#         return {
#             'id': self.id,
#             'itemId': self.itemId,
#             'supplierId': self.supplierId
#         }

supplier_items = db.Table("supplier_items", db.Model.metadata,
                db.Column("supplier_id", db.Integer, db.ForeignKey(add_prefix_for_prod("suppliers.id")), primary_key=True),
                db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True))

if environment == 'production':
        supplier_items.schema = SCHEMA
