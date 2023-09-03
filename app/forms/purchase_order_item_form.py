from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class PurchaseOrderItemForm(FlaskForm):
   quantity = IntegerField('quantity')
