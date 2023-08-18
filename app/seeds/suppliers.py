from app.models import db, Supplier, environment, SCHEMA
from sqlalchemy.sql import text


def seed_suppliers():
    supA = Supplier(
        name='Tampa Armature Works (TAW)',
        address='123 some rd, Tampa FL 00000',
        contact = 'Joe Damon',
        email = 'jdamon@taw.com',
        cell = '555-222-3333',
        itemId = 1,
        userId = 1
    )

    supB = Supplier(
        name='Union Engineering',
        address='123 different rd, 7000 Fredericia, Denmark ',
        contact = 'Lisa Svorsen',
        email = 'lisa@union.com',
        cell = '+45 11 22 33 44',
        itemId = 2,
        userId = 1
    )

    supC = Supplier(
        name='Grainger',
        address='5544 SW 3nd St Bldg 8, Pompano Beach, FL 00000',
        contact = 'Samuel Jones',
        email = 'sam@grainger.com',
        cell = '786-888-9999',
        itemId = 3,
        userId = 1
    )

    db.session.add(supA)
    db.session.add(supB)
    db.session.add(supC)
    db.session.commit()


def undo_suppliers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.suppliers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM suppliers"))

    db.session.commit()
