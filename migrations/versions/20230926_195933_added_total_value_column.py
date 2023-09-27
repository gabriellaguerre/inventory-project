"""added total_value column

Revision ID: 38aa16bc6526
Revises:
Create Date: 2023-09-26 19:59:33.402010

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA') 

# revision identifiers, used by Alembic.
revision = '38aa16bc6526'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employeeID', sa.String(length=40), nullable=False),
    sa.Column('accessLevel', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('employeeID')
    )
    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('code', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('item_type', sa.String(length=500), nullable=False),
    sa.Column('unit_cost', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('total_value', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('manufacturer', sa.String(length=255), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('purchase_orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('received', sa.Boolean(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('voided', sa.Boolean(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('suppliers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('address', sa.String(length=255), nullable=True),
    sa.Column('contact', sa.String(length=255), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('cell', sa.String(length=255), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('purchase_order_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('purchase_orderId', sa.Integer(), nullable=False),
    sa.Column('itemId', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['itemId'], ['items.id'], ),
    sa.ForeignKeyConstraint(['purchase_orderId'], ['purchase_orders.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('request_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('requestId', sa.Integer(), nullable=False),
    sa.Column('itemId', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['itemId'], ['items.id'], ),
    sa.ForeignKeyConstraint(['requestId'], ['requests.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('supplier_items',
    sa.Column('supplier_id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], ),
    sa.ForeignKeyConstraint(['supplier_id'], ['suppliers.id'], ),
    sa.PrimaryKeyConstraint('supplier_id', 'item_id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE items SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE purchase_orders SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE requests SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE suppliers SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE purchase_order_items SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE request_items SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE supplier_items SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('supplier_items')
    op.drop_table('request_items')
    op.drop_table('purchase_order_items')
    op.drop_table('suppliers')
    op.drop_table('requests')
    op.drop_table('purchase_orders')
    op.drop_table('items')
    op.drop_table('users')
    # ### end Alembic commands ###
