from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired
from wtforms import IntegerField
from wtforms.validators import DataRequired



class RequestItemForm(FlaskForm):
       quantity = IntegerField('quantity', validators=[DataRequired()])
