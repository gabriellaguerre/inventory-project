from app.models import db, Request, Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_requests():
    req1 = Request(
        id = 1,
        userId = 2,
        voided = False,

    )



    # req3 = Request(
    #     userId = 2,
    #     voided = False,
    #     applied = True
    # )



    db.session.add(req1)
    # db.session.add(req2)
    # db.session.add(req3)
    db.session.commit()




    db.session.commit()

def undo_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM requests"))

    db.session.commit()
