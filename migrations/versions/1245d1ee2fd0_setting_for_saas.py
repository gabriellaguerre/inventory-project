"""setting for saas

Revision ID: 1245d1ee2fd0
Revises: 078bcf976e6f
Create Date: 2024-09-03 13:33:25.218406

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')


# revision identifiers, used by Alembic.
revision = '1245d1ee2fd0'
down_revision = '078bcf976e6f'
branch_labels = None
depends_on = None


# def upgrade():
#     # ### commands auto generated by Alembic - please adjust! ###
#     with op.batch_alter_table('purchase_order_items', schema=None) as batch_op:
#         batch_op.add_column(sa.Column('price', sa.Integer(), nullable=True))

#     # ### end Alembic commands ###

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('purchase_order_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Integer(), nullable=True))

    # Apply schema changes if in production environment
    if environment == "production" and SCHEMA:
        op.execute(f"ALTER TABLE purchase_order_items SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('purchase_order_items', schema=None) as batch_op:
        batch_op.drop_column('price')

    # Revert schema changes if necessary
    if environment == "production" and SCHEMA:
        op.execute(f"ALTER TABLE purchase_order_items SET SCHEMA public;")  # or another schema if reverting

    # ### end Alembic commands ###
  
