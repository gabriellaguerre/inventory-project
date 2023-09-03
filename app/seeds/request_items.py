from app.models import db, environment, SCHEMA, RequestItems, Request, Item
# db, Item, Supplier, environment,
# from ..models.item import Item
# from app.models.supplier_item import supplier_items
from sqlalchemy.sql import text



def seed_request_items():

    req1 = Request.query.filter(Request.id == 1).first()
    quantity1 = RequestItems(quantity = 4)
    quantity1.item = Item.query.filter(Item.id == 1).first()
    req1.items.append(quantity1)


    quantity2 = RequestItems(quantity = 2)
    quantity2.item = Item.query.filter(Item.id == 2).first()
    req1.items.append(quantity2)

    db.session.commit()



def undo_request_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.request_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM request_items"))

    db.session.commit()
