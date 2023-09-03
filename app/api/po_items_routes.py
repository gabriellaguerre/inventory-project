from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import PurchaseOrder, Item, PurchaseOrderItems, db
from app.forms import RequestItemForm
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
