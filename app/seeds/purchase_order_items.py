from app.models import db, environment, SCHEMA, PurchaseOrderItems, Item, PurchaseOrder
# db, Item, Supplier, environment,
# from ..models.item import Item
from app.models.purchase_order_item import PurchaseOrderItems
from sqlalchemy.sql import text



def seed_purchase_order_items():
    # pos1 = PurchaseOrder.query.filter(PurchaseOrder.id == 1).first()
    # quantity1 = PurchaseOrderItems(quantity = 6)
    # quantity1.item = Item.query.filter(Item.id == 1).first()
    # pos1.items.append(quantity1)

    # quantity2 = PurchaseOrderItems(quantity = 2)
    # quantity2.item = Item.query.filter(Item.id == 2).first()
    # pos1.items.append(quantity2)

    po1 = PurchaseOrderItems(id =1, purchase_orderId = 1, itemId = 1, quantity = 6)
    po2 = PurchaseOrderItems(id =2, purchase_orderId = 1, itemId = 2, quantity = 2)

    db.session.add_all([po1, po2])
    db.session.commit()

    # item2 = Item.query.filter(Item.id == 2).first()
    # pos2 = PurchaseOrder.query.filter(PurchaseOrder.id == 2).first()
    # pos2.items.append(item2)
    # db.session.commit()

    # item3 = Item.query.filter(Item.id == 3).first()
    # pos3 = PurchaseOrder.query.filter(PurchaseOrder.id == 3).first()
    # pos3.items.append(item3)
    # db.session.commit()

    # pos1.items.append(item2)
    # db.session.commit()


def undo_purchase_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchase_order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchase_order_items"))

    db.session.commit()
