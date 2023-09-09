from app.models import db, Supplier, environment, SCHEMA
from sqlalchemy.sql import text


def seed_suppliers():
    supA = Supplier(
        name='Tampa Armature Works (TAW)',
        address='123 some rd, Tampa FL 00000',
        contact = 'Joe Damon',
        email = 'jdamon@taw.com',
        cell = 5552223333,
        # itemId = 1,
        userId = 1
    )

    supB = Supplier(
        name='Union Engineering',
        address='123 different rd, 7000 Fredericia, Denmark ',
        contact = 'Lisa Svorsen',
        email = 'lisa@union.com',
        cell = 4511223344,
        # itemId = 2,
        userId = 1
    )

    supC = Supplier(
        name='Grainger',
        address='5544 SW 3nd St Bldg 8, Pompano Beach, FL 00000',
        contact = 'Samuel Jones',
        email = 'sam@grainger.com',
        cell = 7868889999,
        # itemId = 3,
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
