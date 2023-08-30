from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired



class RequestForm(FlaskForm):
    item_code = IntegerField('item_code')
    quantity = IntegerField('quantity')
