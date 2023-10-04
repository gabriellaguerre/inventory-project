import base64
import io
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, PurchaseOrder, db
from app.forms import PurchaseOrderItemForm
from datetime import datetime
from app.api.aws_helper_sig import upload_file_to_s3, get_unique_filename

po_routes = Blueprint('purchase_orders', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ------------------------------GET PURCHASE ORDERS------------------------
@po_routes.route('/')
# @login_required
def get_purchase_orders():
    purchase_orders = PurchaseOrder.query.all()
    return {'purchase_orders': [purchase_order.to_dict() for purchase_order in purchase_orders]}


#------------------------------CREATE PURCHASE ORDER------------------------
@po_routes.route('', methods=['POST'])
# @login_required
def create_purchase_order():

        # Get the image data as a base64 string
         image_data = request.form['image']

         if (image_data):
            #Decode the base64-encoded image data into bytes
            image_bytes = base64.b64decode(image_data)

            # Generate a unique filename for the image
            filename = get_unique_filename('image.png')

            # Create a file-like object from the image bytes
            image_file = io.BytesIO(image_bytes)
            image_file.filename = filename
            image_file.content_type = 'image/png'

            # Upload the image to S3
            upload = upload_file_to_s3(image_file)

            if "url" not in upload:
                return validation_errors_to_error_messages(upload)

            url = upload["url"]
            purchase_order = PurchaseOrder(received = False,
                                           userId = current_user.id,
                                           image = url)
            db.session.add(purchase_order)
            db.session.commit()


            return purchase_order.to_dict()
         return {'message': 'something went wrong'}


#------------------------------EDIT PURCHASE ORDER------------------------
@po_routes.route('/<int:posId>', methods=['PUT'])
# @login_required
def edit_purchase_order(posId):
     purchase_order = PurchaseOrder.query.get(posId)
     purchase_order.received = True
     purchase_order.updatedAt = datetime.now()
     db.session.commit()

     return purchase_order.to_dict()
