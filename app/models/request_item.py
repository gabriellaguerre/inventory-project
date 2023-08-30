# from .db import db, environment, SCHEMA, add_prefix_for_prod


# request_items = db.Table("request_items", db.Model.metadata,
#                 db.Column("request_id", db.Integer, db.ForeignKey(add_prefix_for_prod("requests.id")), primary_key=True),
#                 db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), primary_key=True),
#                 db.Column("quantity", db.Integer))


# if environment == 'production':
#         request_items.schema = SCHEMA
