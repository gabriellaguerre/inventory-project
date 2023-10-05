from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Item, Request, PurchaseOrder, db
from app.forms import ItemForm
from datetime import datetime

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
@item_routes.route('/<int:i>')
# @login_required
def get_items(i):
    items = Item.query.all()
    # print(i, 'iiiiiiiiiiiiiiiiiiii')
    limit = 5
    offset = ((i + 1) * limit)

    startIndex = i * 5
    # print(startIndex, 'TTTTTTTTTTTTTTTT')

    # print(items[startIndex:offset], len(items), 'LLLLLLLLLLLLLLLLLLLLLLLLL')

    return {'items': [item.to_dict() for item in items[startIndex:offset]]}


# ------------------------------CREATE ITEM------------------------
@item_routes.route('', methods=['POST'])
# @login_required
def create_item():
    item_form = ItemForm()
    item_form['csrf_token'].data = request.cookies['csrf_token']

    if item_form.validate_on_submit():
        item = Item(code = item_form.data['code'],
                    description = item_form.data['description'],
                    item_type = item_form.data['item_type'],
                    quantity = item_form.data['quantity'],
                    unit_cost = item_form.data['unit_cost'],
                    total_value = item_form.data['quantity']*item_form.data['unit_cost'],
                    manufacturer = item_form.data['manufacturer'],
                    deleted = False,
                    userId = current_user.id)


        db.session.add(item)
        db.session.commit()
        return item.to_dict()
        # return {'message': 'successfully created item'}
    return {'errors':validation_errors_to_error_messages(item_form.errors)}

#------------------------------EDIT ITEMS OF A PO (RECEIVE PO)------------------------
@item_routes.route('/po_edit/<int:itemId>/<int:quantity>', methods=['PUT'])
# @login_required
def edit_quantity_of_an_item(itemId, quantity):

    item = Item.query.get(itemId)
    item.quantity = item.quantity + quantity
    item.total_value = item.quantity*item.unit_cost
    item.updatedAt = datetime.now()

    db.session.commit()
    return item.to_dict()

# ------------------------------------EDIT REQITEM------------------------
@item_routes.route('/<int:itemId>/<int:quantity>', methods=['PUT'])
# @login_required
def reqitem_edit(itemId, quantity):

        item = Item.query.get(itemId)
        item.quantity += quantity
        item.updatedAt = datetime.now()

        db.session.commit()
        return item.to_dict()



# ------------------------------------EDIT ITEM------------------------
@item_routes.route('/<int:itemId>', methods=['PUT'])
# @login_required
def edit_item(itemId):
    item_form = ItemForm()
    item_form['csrf_token'].data = request.cookies['csrf_token']
    if item_form.validate_on_submit():

        item = Item.query.get(itemId)

        item.code = item_form.data['code']
        item.description = item_form.data['description']
        item.item_type = item_form.data['item_type']
        item.quantity = item_form.data['quantity']
        item.unit_cost = item_form.data['unit_cost']
        item.total_value = item.quantity*item.unit_cost
        item.manufacturer = item_form.data['manufacturer']
        item.updatedAt = datetime.now()

        db.session.commit()
        return item.to_dict()
        # return {'message': 'successfully created item'}
    return validation_errors_to_error_messages(item_form.errors)






# ------------------------------GET ITEMS OF A PO------------------------
@item_routes.route('/<int:posId>')
# @login_required
def get_items_of_a_po(posId):
    po = PurchaseOrder.query.get(posId)
    items = po.items
    return {'items': [item.to_dict() for item in items]}



# ------------------------------------DELETE ITEM --------------------------------------
@item_routes.route('/delete/<int:itemId>', methods=['PUT'])
@login_required
def delete_item(itemId):
    item = Item.query.get(itemId)
    item.deleted = True

    db.session.commit()
    return item.to_dict()
