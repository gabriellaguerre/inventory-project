from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    motor = Item(
        code=123,
        description='ABB 3GBP281220-ADG Product: TEFC, 3-phase, squirrel cage induction motor Product code: 3GBP 281 220-ADG',
        item_type = 'Motor',
        unit_cost = 14980,
        quantity = 1,
        manufacturer = 'ABB',
        deleted = False,
        userId = 1
    )

    pt = Item(
        code=456,
        description='MPM489 pressure transmitter 1bar, 2-wire 4mA~20mA DC, 3-wire 0/1V~5/10V DC and 0.5V~2.5/4.5V DC',
        item_type = 'Pressure Transmitter',
        unit_cost = 149,
        quantity = 2,
        manufacturer = 'Danfoss',
        deleted = False,
        userId = 1
    )

    tt = Item(
        code=789,
        description='Temperature Sensor Transmitter 24V DC 4-20mA -50℃ to 200℃',
        item_type = 'Temperature Transmitter',
        unit_cost = 253,
        quantity = 5,
        userId = 1,
        deleted = False,
        manufacturer = 'Uxcell',
    )

    db.session.add(motor)
    db.session.add(pt)
    db.session.add(tt)
    db.session.commit()


def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
