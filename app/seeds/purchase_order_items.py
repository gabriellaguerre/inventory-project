# from app.models import db, environment, SCHEMA, Item, PurchaseOrder
# # db, Item, Supplier, environment,
# # from ..models.item import Item
# # from app.models.supplier_item import supplier_items
# from sqlalchemy.sql import text



# def seed_purchase_order_items():

#     item1 = Item.query.filter(Item.id == 1).first()
#     pos1 = PurchaseOrder.query.filter(PurchaseOrder.id == 1).first()
#     pos1.items.append(item1)
#     db.session.commit()

#     item2 = Item.query.filter(Item.id == 2).first()
#     pos2 = PurchaseOrder.query.filter(PurchaseOrder.id == 2).first()
#     pos2.items.append(item2)
#     db.session.commit()

#     item3 = Item.query.filter(Item.id == 3).first()
#     pos3 = PurchaseOrder.query.filter(PurchaseOrder.id == 3).first()
#     pos3.items.append(item3)
#     db.session.commit()

#     pos1.items.append(item2)
#     db.session.commit()


# def undo_purchase_order_items():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.purchase_order_items RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM purchase_order_items"))

#     db.session.commit()
