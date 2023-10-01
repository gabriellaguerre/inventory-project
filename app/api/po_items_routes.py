from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import PurchaseOrder, Item, PurchaseOrderItems, db
from app.forms import RequestItemForm, PurchaseOrderItemForm
from datetime import datetime
from app.api.aws_helper_sig import upload_file_to_s3, get_unique_filename

purchase_order_items_routes = Blueprint('purchase_order_items', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ------------------------------GET PURCHASE-ORDER ITEMS------------------------
@purchase_order_items_routes.route('/<int:purchaseOrderId>')
# @login_required
def get_items_of_a_purchase_order(purchaseOrderId):
    purchase_order = PurchaseOrder.query.get(purchaseOrderId)
    purchase_order_items = purchase_order.items
    return {'purchase_order_items': [purchase_order_item.to_dict() for purchase_order_item in purchase_order_items]}


# ------------------------------CREATE PURCHASE ORDER ITEM------------------------
@purchase_order_items_routes.route('/<int:itemId>', methods=['POST'])
# @login_required
def create_purchase_order_item(itemId):

     all_purchase_orders = PurchaseOrder.query.all()
     recent_purchase_order = all_purchase_orders[len(all_purchase_orders)-1]


     purchase_order_item_form = PurchaseOrderItemForm()
     purchase_order_item_form['csrf_token'].data = request.cookies['csrf_token']
     print(purchase_order_item_form, 'QQQQQQQQQQQQQQQQQQQQ')
    #  image = purchase_order_item_form['image']
    #  quantity = purchase_order_item_form['quantity']
    #  print(image, quantity, 'JJJJJJJJJJJJJJJJJJJJJJJJJJJJ')
     print(purchase_order_item_form.validate_on_submit(), 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
     if purchase_order_item_form.validate_on_submit():

         quantity = purchase_order_item_form.data['quantity']
         image = purchase_order_item_form['image']
         print(quantity, image, 'HHHHHHHHHHHHHHHHHHHHHH')


         image.filename = get_unique_filename(image.filename)
         print(image.filename, 'GGGGGGGGGGGGGGGGGGGGGGGGGGG')

         upload = upload_file_to_s3(image)
        #  print(upload, 'UPLOAD DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')

         if "url" not in upload:
            return validation_errors_to_error_messages(upload)

         url = upload['url']

         quantity1 = PurchaseOrderItems(quantity = quantity, image = url)
         quantity1.item = Item.query.filter(Item.id == itemId).first()
         recent_purchase_order.items.append(quantity1)
         db.session.commit()
#-------------------------------------------------------------------------------------------
        #  purchase_order1 = PurchaseOrder.query.get(len(all_purchase_orders)-1)
        #  purchase_order_items = purchase_order1.items

        #  thisItem = Item.query.get(itemId)
        #  thisItem.quantity = thisItem.quantity + quantity
        #  db.session.commit()

         return {'purchase_order_items': [purchase_order_item.to_dict() for purchase_order_item in purchase_order_items]}


    #  return {'message': 'successful'}

     return validation_errors_to_error_messages(purchase_order_item_form.errors)


#--------------------------EDIT PURCHASE ORDER ITEM-----------------------------------------------
@purchase_order_items_routes.route('/<int:poId>/<int:itemId>', methods=['PUT'])
# @login_required
def edit_purchase_order_item(poId, itemId):

    purchase_order_item_form = PurchaseOrderItemForm()
    purchase_order_item_form['csrf_token'].data = request.cookies['csrf_token']
    if purchase_order_item_form.validate_on_submit():
         quantity = purchase_order_item_form.data['quantity']

         po = PurchaseOrder.query.filter(PurchaseOrder.id == poId).first()

         for poitem in po.items:
             if(poitem.itemId==itemId and poitem.purchase_orderId==poId):
                 thispo = poitem
                 thispo.quantity = quantity
                 db.session.commit()


    return {'message': 'successful'}


#-------------------------- SIGNATURE -----------------------------------------------
# @purchase_order_items_routes.route('/signature')
# # @login_required
# def add_signature():
