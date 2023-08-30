# from .db import db, environment, SCHEMA, add_prefix_for_prod


# purchase_order_items = db.Table("purchase_order_items", db.Model.metadata,
#                 db.Column("purchase_order_id", db.Integer, db.ForeignKey(add_prefix_for_prod("purchase_orders.id")), primary_key=True),
#                 db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True))

# if environment == 'production':
#         purchase_order_items.schema = SCHEMA
