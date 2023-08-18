from app.models import db, Supplier, environment, SCHEMA
from sqlalchemy.sql import text


def seed_suppliers():
    supA = Supplier(
        name='Tampa Armature Works (TAW)',
        address='ABB 3GBP281220-ADG Product: TEFC, 3-phase, squirrel cage induction motor Product code: 3GBP 281 220-ADG',
        contact = 'Motor',
        email = 14980,
        cell = 'ABB'
    )

    supB = Supplier(
        name='Union Engineering',
        address='ABB 3GBP281220-ADG Product: TEFC, 3-phase, squirrel cage induction motor Product code: 3GBP 281 220-ADG',
        contact = 'Motor',
        email = 14980,
        cell = 'ABB'
    )

    supC = Supplier(
        name='Grainger',
        address='ABB 3GBP281220-ADG Product: TEFC, 3-phase, squirrel cage induction motor Product code: 3GBP 281 220-ADG',
        contact = 'Motor',
        email = 14980,
        cell = 'ABB'
    )

    db.session.add(supA)
    db.session.add(supB)
    db.session.add(supC)
    db.session.commit()


def undo_suppliers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
