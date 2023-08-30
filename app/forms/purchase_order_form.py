from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class PurchaseOrderForm(FlaskForm):
    item_code = IntegerField('item_code', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
