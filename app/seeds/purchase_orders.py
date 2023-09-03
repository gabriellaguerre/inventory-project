from app.models import db, PurchaseOrder, environment, SCHEMA
from sqlalchemy.sql import text

def seed_purchase_orders():
    po1 = PurchaseOrder(
        userId = 2,
        voided = False,
        received = True,
    )

    # po2 = PurchaseOrder(
    #     userId = 3,
    #     voided = False,
    #     received = True,
    # )

    # po3 = PurchaseOrder(
    #     userId = 2,
    #     voided = False,
    #     received = True
    # )

    db.session.add(po1)
    # db.session.add(po2)
    # db.session.add(po3)
    db.session.commit()

def undo_purchase_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchase_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchase_orders"))

    db.session.commit()
