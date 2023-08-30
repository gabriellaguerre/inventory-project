# from app.models import db, environment, SCHEMA, Item, Request, request_items
# # db, Item, Supplier, environment,
# # from ..models.item import Item
# # from app.models.supplier_item import supplier_items
# from sqlalchemy.sql import text



# def seed_request_items():

    # item1 = Item.query.filter(Item.id == 1).first()
    # req1 = Request.query.filter(Request.id == 1).first()
    # req1.items.append(item1)
    # db.session.commit()



    # item2 = Item.query.filter(Item.id == 2).first()
    # req2 = Request.query.filter(Request.id == 2).first()

    # req2.items.append(item2)
    # db.session.commit()

    # item3 = Item.query.filter(Item.id == 3).first()
    # req3 = Request.query.filter(Request.id == 3).first()

    # req3.items.append(item3)
    # db.session.commit()

    # req1.items.append(item2)
    # req1.quantities.append(qty3)
    # db.session.commit()
# def add_quantity_to_request_items():
#     qty = db.session.request_items.query.get(1)
#     qty.quantity = 5
#     db.session.add(qty)
#     db.session.commit()


# def undo_request_items():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.request_items RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM request_items"))

#     db.session.commit()
