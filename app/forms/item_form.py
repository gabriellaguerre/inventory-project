from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Item


class ItemForm(FlaskForm):
    code = IntegerField('code', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    item_type = StringField('item_type', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    unit_cost = IntegerField('unit_cost', validators=[DataRequired()])
    manufacturer = StringField('manufacturer', validators=[DataRequired()])
    supplier = StringField('supplier', validators=[DataRequired()])
