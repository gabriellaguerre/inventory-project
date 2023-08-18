from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Supplier

class SupplierForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    contact = StringField('contact', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    cell = StringField('cell', validators=[DataRequired()])
    
