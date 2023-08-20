from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    # email = field.data
    employeeID = field.data
    user = User.query.filter(User.employeeID == employeeID).first()
    if not user:
        raise ValidationError('EmployeeID provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    # email = form.data['email']
    employeeID = form.data['employeeID']
    user = User.query.filter(User.employeeID == employeeID).first()
    if not user:
        raise ValidationError('No such employee exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    # email = StringField('email', validators=[DataRequired(), user_exists])
    employeeID = StringField('employeeID', validators=[DataRequired(), user_exists])
    # accessLevel = StringField('accessLevel', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired(), password_matches])
