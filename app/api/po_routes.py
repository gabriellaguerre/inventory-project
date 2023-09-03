from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, PurchaseOrder, db
from app.forms import PurchaseOrderItemForm
from datetime import datetime

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

# ------------------------------GET REQUESTS------------------------
@po_routes.route('/')
# @login_required
def get_purchase_orders():
    purchase_orders = PurchaseOrder.query.all()
    return {'purchase_orders': [purchase_order.to_dict() for purchase_order in purchase_orders]}


#------------------------------CREATE PURCHASE ORDER------------------------
@po_routes.route('', methods=['POST'])
# @login_required
def create_purchase_order():

        purchase_order = PurchaseOrder(voided = False,
                                       received = True,
                                       userId = current_user.id)
        db.session.add(purchase_order)
        db.session.commit()

        # return {'message': 'successfull'}
        return purchase_order.to_dict()
