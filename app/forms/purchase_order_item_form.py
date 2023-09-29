from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired
from wtforms import IntegerField
from wtforms.validators import DataRequired



class PurchaseOrderItemForm(FlaskForm):
   quantity = IntegerField('quantity', validatotors=[DataRequired()])
   image = FileField("Image File", validators=[FileRequired()])
