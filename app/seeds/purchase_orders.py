from app.models import db, PurchaseOrder, environment, SCHEMA
from sqlalchemy.sql import text

def seed_purchase_orders():
    po1 = PurchaseOrder(
        quantity = 1,
        itemId = 1,
        userId = 2
    )

    po2 = PurchaseOrder(
        quantity = 5,
        itemId = 2,
        userId = 3
    )

    po3 = PurchaseOrder(
        quantity = 10,
        itemId = 3,
        userId = 2
    )

    db.session.add(po1)
    db.session.add(po2)
    db.session.add(po3)
    db.session.commit()

def undo_purchase_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchase_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchase_orders"))

    db.session.commit()
