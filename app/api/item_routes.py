from flask import Blueprint, request
from flask_login import login_required
from app.models import Item, db
from app.forms import ItemForm

item_routes = Blueprint('items', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ------------------------------GET ITEMS------------------------
@item_routes.route('/')
# @login_required
def get_items():
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}


# @item_routes.route('/<int:itemId>/suppliers')
# # @login_required
# def get_suppliers_of_an_item(itemId):
#     item = Item.query.get(itemId)
#     suppliers = item.suppliers
#     return {'suppliers':[supplier.to_dict() for supplier in suppliers]}

# ------------------------------CREATE ITEM------------------------
@item_routes.route('/>', methods=['POST'])
@login_required
def create_item():
    item_form = ItemForm()
    item_form['csrf_token'].data = request.cookies['csrf_token']

    if item_form.validate_on_submit():
        item = Item(code = item_form.data['code'],
                    description = item_form['description'],
                    item_type=item_form.data['item_type'],
                    quantity=item_form.data['quantity'],
                    unit_cost=item_form.data['unit_cost'],
                    manufacturer=item_form.data['manufacturer'])

        db.session.add(item)
        db.session.commit()

        return {'item': item.to_dict()}

    return validation_errors_to_error_messages(item_form.errors)
