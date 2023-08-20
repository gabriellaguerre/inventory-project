from app.models import db, environment, SCHEMA, Item, Supplier
# db, Item, Supplier, environment,
# from ..models.item import Item
# from app.models.supplier_item import supplier_items
from sqlalchemy.sql import text



def seed_supplier_items():

    item1 = Item.query.filter(Item.id == 1).first()
    sup1 = Supplier.query.filter(Supplier.id == 1).first()
    sup1.items.append(item1)
    db.session.commit()

#     supA.items.append(motor)
#     db.session.commit()
    # supItA = Supplier_Item(
    #     supplierId = 1,
    #     itemId = 1
    # )

    # supItB = Supplier_Item(
    #     supplierId = 2,
    #     itemId = 2
    # )

    # supItC = Supplier_Item(
    #     supplierId = 3,
    #     itemId = 3
    # )

    # db.session.add(supItA)
    # db.session.add(supItB)
    # db.session.add(supItC)



def undo_supplier_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.supplier_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM supplier_items"))

    db.session.commit()
