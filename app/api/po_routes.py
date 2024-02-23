import base64
import io
import math
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, PurchaseOrder, db
from app.forms import PurchaseOrderItemForm
from datetime import datetime, timedelta
from app.api.aws_helper_sig import upload_file_to_s3, get_unique_filename
from sqlalchemy import func, and_, cast, String


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


# ------------------------------GET PURCHASE ORDERS PAGINATION------------------------
@po_routes.route('/<int:page>')
# @login_required
def get_purchase_orders_by_page(page):
    purchase_orders = PurchaseOrder.query.order_by(PurchaseOrder.id).all()
    purchase_orders.reverse()

    limit = 5
    offset = ((page + 1) * limit)
    startIndex = page * 5

    total_pages = math.ceil(len(purchase_orders)/limit)

    return {'purchase_orders': [purchase_order.to_dict() for purchase_order in purchase_orders[startIndex:offset]], 'total_pages': total_pages }

# ------------------------------GET PURCHASE ORDERS------------------------
@po_routes.route('/')
# @login_required
def get_purchase_orders():
    purchase_orders = PurchaseOrder.query.all()
    return {'purchase_orders': [purchase_order.to_dict() for purchase_order in purchase_orders]}

# ------------------------------GET PO'S SEARCH QUERY-----------------------
@po_routes.route('/search')
# @login_required
def search_purchase_orders():
    print("IN SEARCH PURCHASE ORDER")
    query = request.args.get('query')
    filter_type = request.args.get('filter')
    startDate_str = request.args.get('startDate')
    endDate_str = request.args.get('endDate')

    print(startDate_str, endDate_str, "IN BACKEND")

    if (filter_type=='receivedTrue'):
        purchase_orders = PurchaseOrder.query.filter(PurchaseOrder.received==True).all()
    elif(filter_type=='receivedFalse'):
        purchase_orders = PurchaseOrder.query.filter(PurchaseOrder.received==False).all()
    elif(startDate_str and endDate_str):
        start_date = datetime.strptime(startDate_str, "%Y-%m-%d")
        end_date = datetime.strptime(endDate_str, "%Y-%m-%d") + timedelta(days=1) - timedelta(seconds=1)
        purchase_orders = PurchaseOrder.query.filter(PurchaseOrder.createdAt.between(start_date, end_date)).all()
        print(purchase_orders, 'IN START AND END DATE')
    else:
        filters = {'id': PurchaseOrder.id,
               'userId': PurchaseOrder.userId,
               'createdAt': PurchaseOrder.createdAt}

        filter_column = filters[filter_type]


        if isinstance(filter_column.type, db.Integer):
            filter_condition = cast(filter_column, String).ilike(f'%{query}%')
        else:
            filter_condition = filter_column.ilike(f'%{query}%')

        purchase_orders = PurchaseOrder.query.filter(filter_condition).all()


    # return {'message': 'successful'}
    return {'purchase_orders': [purchase_order.to_dict() for purchase_order in purchase_orders], 'total_pages': 'total_pages'}

#------------------------------CREATE PURCHASE ORDER------------------------
@po_routes.route('', methods=['POST'])
# @login_required
def create_purchase_order():

       # Get the image data as a base64 string
         image_data = request.form['image']
        #  print(image_data, 'image_data')

         if (image_data):
            #Decode the base64-encoded image data into bytes
            image_bytes = base64.b64decode(image_data)
            # print(image_bytes, 'image_bytes')

            # Generate a unique filename for the image
            filename = get_unique_filename('image.png')
            # print(filename, 'FILENAMEEEEEEEEEEEEEEEEEEEEEE')

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

            # return {'message': 'successfull'}
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
