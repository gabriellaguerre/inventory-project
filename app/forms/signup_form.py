from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    # email = field.data
    employeeID = field.data
    user = User.query.filter(User.employeeID == employeeID).first()
    if user:
        raise ValidationError('Employee ID is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    employeeID = StringField('employeeID', validators=[DataRequired(), user_exists])
    accessLevel = StringField('accessLevel', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
