from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    motor = Item(
        id =1,
        code=123,
        description='ABB 3GBP281220-ADG Product: TEFC, 3-phase, squirrel cage induction motor Product code: 3GBP 281 220-ADG',
        item_type = 'Motor',
        unit_cost = 14980.87,
        quantity = 1,
        total_value = 14980.97,
        manufacturer = 'ABB',
        deleted = False,
        userId = 1
    )

    pt = Item(
        id = 2,
        code=456,
        description='MPM489 pressure transmitter 1bar, 2-wire 4mA~20mA DC, 3-wire 0/1V~5/10V DC and 0.5V~2.5/4.5V DC',
        item_type = 'Pressure Transmitter',
        unit_cost = 149.59,
        quantity = 2,
        total_value = 299.18,
        manufacturer = 'Danfoss',
        deleted = False,
        userId = 1
    )

    tt = Item(
        id = 3,
        code=789,
        description='Temperature Sensor Transmitter 24V DC 4-20mA -50℃ to 200℃',
        item_type = 'Temperature Transmitter',
        unit_cost = 253.43,
        quantity = 5,
        total_value = 1267.15,
        userId = 1,
        deleted = False,
        manufacturer = 'Uxcell',
    )

    gen1 = Item(
        id = 4,
        code=100,
        description= 'Air Filter C18 600kw 246-5010 (LAF5569)',
        item_type = 'Generator Filter',
        unit_cost = 54,
        quantity = 10,
        total_value = 540,
        manufacturer = 'Luber Finer',
        deleted = False,
        userId = 1
    )

    gen2 = Item(
        id = 5,
        code=101,
        description='Fuel/Water Sep C27 750kw/C18 326-1641',
        item_type = 'Generator Filter',
        unit_cost = 23.56,
        quantity = 12,
        total_value = 282.72,
        manufacturer = 'Caterpillar',
        deleted = False,
        userId = 1
    )

    servo = Item(
        id = 6,
        code=102,
        description='Saacke Seavis FSM 025B88 (120)',
        item_type = 'Servo Motor',
        unit_cost = 1245.32,
        quantity = 2,
        total_value = 2490.64,
        manufacturer = 'Saacke',
        deleted = False,
        userId = 1
    )

    seal = Item(
        id = 7,
        code=103,
        description='Kit Shaft Seal BAQE 96306472',
        item_type = 'Pump Shaft Seal',
        unit_cost = 563.20,
        quantity = 4,
        total_value = 2252.80,
        manufacturer = 'Grundfos',
        deleted = False,
        userId = 1
    )

    flow = Item(
        id = 8,
        code=104,
        description='Flow Transmitter VFI-DN100',
        item_type = 'Flow Transmitter',
        unit_cost = 1452.20,
        quantity = 2,
        total_value = 2904.40,
        manufacturer = 'Grundfos',
        deleted = False,
        userId = 1
    )

    pump = Item(
        id = 9,
        code=105,
        description='FBE diesel pompe ¾',
        item_type = 'Pump',
        unit_cost = 1520,
        quantity = 1,
        total_value = 1520,
        manufacturer = 'FBE',
        deleted = False,
        userId = 1
    )


    db.session.add_all([motor,pt,tt,gen1,gen2,servo,seal,flow,pump])
    # db.session.add(pt)
    # db.session.add(tt)
    db.session.commit()


def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
