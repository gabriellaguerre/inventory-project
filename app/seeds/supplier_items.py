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

    item2 = Item.query.filter(Item.id == 2).first()
    sup2 = Supplier.query.filter(Supplier.id == 2).first()
    sup2.items.append(item2)
    db.session.commit()

    item3 = Item.query.filter(Item.id == 3).first()
    sup3 = Supplier.query.filter(Supplier.id == 3).first()
    sup3.items.append(item3)
    db.session.commit()



def undo_supplier_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.supplier_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM supplier_items"))

    db.session.commit()
