from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, Item, RequestItems, db
from app.forms import RequestItemForm
from datetime import datetime

request_items_routes = Blueprint('request_items', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ------------------------------GET REQUEST ITEMS------------------------
@request_items_routes.route('/<int:requestId>')
# @login_required
def get_items_of_a_request(requestId):
    request = Request.query.get(requestId)
    request_items = request.items
    return {'request_items': [request_item.to_dict() for request_item in request_items]}


# ------------------------------GET ONE REQUEST------------------------
# @request_routes.route('/<int:requestId>')
# # @login_required
# def get_a_request(requestId):
#     request = Request.query.get(requestId)
#     return request.to_dict()


# ------------------------------CREATE REQUEST ITEM------------------------
@request_items_routes.route('/<int:itemId>', methods=['POST'])
# @login_required
def create_request_item(itemId):

     all_requests = Request.query.all()
     recent_request = all_requests[len(all_requests)-1]


     request_item_form = RequestItemForm()
     request_item_form['csrf_token'].data = request.cookies['csrf_token']

     if request_item_form.validate_on_submit():

         quantity = request_item_form.data['quantity']

         quantity1 = RequestItems(quantity = quantity)
         quantity1.item = Item.query.filter(Item.id == itemId).first()
         recent_request.items.append(quantity1)
         db.session.commit()

         request1 = Request.query.get(len(all_requests)-1)
         request_items = request1.items

         thisItem = Item.query.get(itemId)
         thisItem.quantity = thisItem.quantity - quantity
         db.session.commit()

         return {'request_items': [request_item.to_dict() for request_item in request_items]}

     return {'errors':validation_errors_to_error_messages(request_item_form.errors)}


# # ------------------------------------EDIT REQUEST------------------------
# @item_routes.route('/<int:itemId>', methods=['PUT'])
# # @login_required
# def edit_item(itemId):
#     item_form = ItemForm()
#     item_form['csrf_token'].data = request.cookies['csrf_token']
#     if item_form.validate_on_submit():

#         item = Item.query.get(itemId)

#         item.code = item_form.data['code']
#         item.description = item_form.data['description']
#         item.item_type = item_form.data['item_type']
#         item.quantity = item_form.data['quantity']
#         item.unit_cost = item_form.data['unit_cost']
#         item.manufacturer = item_form.data['manufacturer']
#         item.updatedAt = datetime.now()

#         db.session.commit()
#         return item.to_dict()
#         # return {'message': 'successfully created item'}
#     return validation_errors_to_error_messages(item_form.errors)
