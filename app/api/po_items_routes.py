from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import PurchaseOrder, Item, PurchaseOrderItems, db
from app.forms import RequestItemForm, PurchaseOrderItemForm
from datetime import datetime

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
def create_request_item(itemId):

     all_purchase_orders = PurchaseOrder.query.all()
     recent_purchase_order = all_purchase_orders[len(all_purchase_orders)-1]


     purchase_order_item_form = PurchaseOrderItemForm()
     purchase_order_item_form['csrf_token'].data = request.cookies['csrf_token']

     if purchase_order_item_form.validate_on_submit():

         quantity = purchase_order_item_form.data['quantity']

         quantity1 = PurchaseOrderItems(quantity = quantity)
         quantity1.item = Item.query.filter(Item.id == itemId).first()
         recent_purchase_order.items.append(quantity1)
         db.session.commit()

         purchase_order1 = PurchaseOrder.query.get(len(all_purchase_orders)-1)
         purchase_order_items = purchase_order1.items

        #  thisItem = Item.query.get(itemId)
        #  thisItem.quantity = thisItem.quantity + quantity
        #  db.session.commit()

         return {'purchase_order_items': [purchase_order_item.to_dict() for purchase_order_item in purchase_order_items]}


    #  return {'message': 'successful'}

     return validation_errors_to_error_messages(purchase_order_item_form.errors)
