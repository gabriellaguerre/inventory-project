from app.models import db, Request, environment, SCHEMA
from sqlalchemy.sql import text


def seed_requests():
    req1 = Request(
        quantity = 1,
        itemId = 1,
        userId = 2
    )

    req2 = Request(
        quantity = 2,
        itemId = 2,
        userId = 3
    )

    req3 = Request(
        quantity = 4,
        itemId = 3,
        userId = 2
    )

    db.session.add(req1)
    db.session.add(req2)
    db.session.add(req3)
    db.session.commit()

def undo_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM requests"))

    db.session.commit()
