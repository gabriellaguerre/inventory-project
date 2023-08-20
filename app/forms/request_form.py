from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
# from app.models import Request


class RequestForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired()])
