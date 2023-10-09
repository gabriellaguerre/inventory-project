from app.models import db, environment, SCHEMA, RequestItems, Request, Item
# db, Item, Supplier, environment,
# from ..models.item import Item
from app.models.request_item import RequestItems
from sqlalchemy.sql import text



def seed_request_items():

    # req1 = Request.query.filter(Request.id == 1).first()
    # quantity1 = RequestItems(quantity = 4)
    # quantity1.item = Item.query.filter(Item.id == 1).first()
    # req1.items.append(quantity1)


    # quantity2 = RequestItems(quantity = 2)
    # quantity2.item = Item.query.filter(Item.id == 2).first()
    # req1.items.append(quantity2)
    ri1 = RequestItems(id = 1, requestId = 1, itemId = 1, quantity = 4)
    ri2 = RequestItems(id = 2, requestId = 1, itemId = 2, quantity = 2)

    db.session.add_all([ri1, ri2])
    db.session.commit()



def undo_request_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.request_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM request_items"))

    db.session.commit()
