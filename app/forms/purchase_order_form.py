from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class PurchaseOrderForm(FlaskForm):
    itemId1 = IntegerField('itemId1', validators=[DataRequired()])
    quantity1 = IntegerField('quantity1', validators=[DataRequired()])
    itemId2 = IntegerField('itemId2')
    quantity2 = IntegerField('quantity2')
    itemId3 = IntegerField('itemId3')
    quantity3 = IntegerField('quantity3')
