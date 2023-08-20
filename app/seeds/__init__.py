from flask.cli import AppGroup
from .users import seed_users, undo_users
from .items import seed_items, undo_items
from .suppliers import seed_suppliers, undo_suppliers
from .requests import seed_requests, undo_requests
from .purchase_orders import seed_purchase_orders, undo_purchase_orders
from .supplier_items import seed_supplier_items, undo_supplier_items

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_items()
        undo_suppliers()
        undo_requests()
        undo_purchase_orders()
        undo_supplier_items()
    seed_users()
    seed_items()
    seed_suppliers()
    seed_requests()
    seed_purchase_orders()
    seed_supplier_items()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_items()
    undo_suppliers()
    undo_requests()
    undo_purchase_orders()
    undo_supplier_items()
    # Add other undo functions here
