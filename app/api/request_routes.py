from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, Item, db
from app.forms import RequestForm
from datetime import datetime

request_routes = Blueprint('requests', __name__)

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
@request_routes.route('/')
# @login_required
def get_requests():
    requests = Request.query.all()
    return {'requests': [request.to_dict() for request in requests]}


#------------------------------CREATE REQUEST------------------------
@request_routes.route('', methods=['POST'])
# @login_required
def create_request():

    request_form = RequestForm()
    request_form['csrf_token'].data = request.cookies['csrf_token']

    if request_form.validate_on_submit():
        request1 = Request(voided = False,
                           applied = True,
                           userId = current_user.id)

        itemId = request_form.data['itemId']
        quantity = request_form.data['quantity']

        db.session.add(request1)
        db.session.commit()

        all_requests = Request.query.all()
        recent_request = all_requests[len(all_requests)-1]

        item = Item.query.get(itemId)
        item.req_quantity = quantity
        current_quantity = item.quantity
        item.quantity = current_quantity - quantity
        item.requestId = recent_request.id

        print(request1.to_dict(), 'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
        print(item.to_dict(), 'IIIIIIIIIIIIIIIIIIIIIIII')

    #   db.session.add(request)
    #   db.session.commit()
    #     return request.to_dict()
    #     # return {'message': 'successfully created item'}
    # return validation_errors_to_error_messages(request_form.errors)
        return {'message': 'success'}

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
