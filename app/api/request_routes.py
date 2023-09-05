from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, Item, RequestItems, db
from app.forms import RequestItemForm
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


# ------------------------------GET ONE REQUEST------------------------
@request_routes.route('/<int:requestId>')
# @login_required
def get_a_request(requestId):
    request = Request.query.get(requestId)
    return request.to_dict()


#------------------------------CREATE REQUEST------------------------
@request_routes.route('', methods=['POST'])
# @login_required
def create_request():

        request = Request(voided = False,
                          userId = current_user.id)
        db.session.add(request)
        db.session.commit()

        # return {'message': 'successfull'}
        return request.to_dict()

    # return validation_errors_to_error_messages(request_form.errors)


# ------------------------------------EDIT REQUEST------------------------
@request_routes.route('/<int:requestId>', methods=['PUT'])
# @login_required
def edit_request(requestId):
    request = Request.query.get(requestId)
    request.voided = True
    request.updatedAt = datetime.now()
    db.session.commit()

    return request.to_dict()
        # return {'message': 'successfully created item'}
    return validation_errors_to_error_messages(item_form.errors)
