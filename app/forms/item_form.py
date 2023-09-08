from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from app.models import Item

def code_exists(form, field):
    code = field.data
    item = Item.query.filter(Item.code == code).first()
    if item:
        raise ValidationError('This code number cannot be used.  Enter new code')

class ItemForm(FlaskForm):
    code = IntegerField('code', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    item_type = StringField('item_type', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    unit_cost = DecimalField('unit_cost', validators=[DataRequired()])
    manufacturer = StringField('manufacturer', validators=[DataRequired()])
    # supplier = StringField('supplier', validators=[DataRequired()])
