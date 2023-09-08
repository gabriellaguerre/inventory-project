from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Supplier
import re


def email_validate(form, field):
    email = field.data
    email_pattern = r"^\S+@\S+\.\S+$"
    if re.match(email_pattern, email):
        return True
    else:
        raise ValidationError('Enter a valid email')


class SupplierForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    contact = StringField('contact', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), email_validate])
    cell = StringField('cell', validators=[DataRequired()])
