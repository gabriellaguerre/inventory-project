from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Supplier, Item, db
from app.forms import SupplierForm
from datetime import datetime

supplier_routes = Blueprint('suppliers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ------------------------------GET SUPPLIERS------------------------
@supplier_routes.route('/')
# @login_required
def get_suppliers():
    suppliers = Supplier.query.all()
    return {'suppliers': [supplier.to_dict() for supplier in suppliers]}



# ------------------------------CREATE SUPPLIERS------------------------
@supplier_routes.route('', methods=['POST'])
# @login_required
def create_supplier():
    supplier_form = SupplierForm()
    supplier_form['csrf_token'].data = request.cookies['csrf_token']

    if supplier_form.validate_on_submit():
        supplier = Supplier(name = supplier_form.data['name'],
                            address = supplier_form.data['address'],
                            contact = supplier_form.data['contact'],
                            email = supplier_form.data['email'],
                            cell = supplier_form.data['cell'],
                            userId = current_user.id)

        db.session.add(supplier)
        db.session.commit()
        return supplier.to_dict()

    return {'errors':validation_errors_to_error_messages(supplier_form.errors)}


# ------------------------------EDIT SUPPLIERS------------------------
@supplier_routes.route('/<int:supplierId>', methods=['PUT'])
# @login_required
def edit_supplier(supplierId):
    supplier_form = SupplierForm()
    supplier_form['csrf_token'].data = request.cookies['csrf_token']

    if supplier_form.validate_on_submit():
        supplier = Supplier.query.get(supplierId)

        supplier.name = supplier_form.data['name']
        supplier.address = supplier_form.data['address']
        supplier.contact = supplier_form.data['contact']
        supplier.email = supplier_form.data['email']
        supplier.cell = supplier_form.data['cell']
        supplier.updatedAt = datetime.now()

        db.session.commit()
        return supplier.to_dict()

    return {'errors': validation_errors_to_error_messages(supplier_form.errors)}


# ------------------------------GET SUPPLIERS OF AN ITEM------------------------
@supplier_routes.route('/<int:itemId>')
# @login_required
def get_suppliers_of_an_item(itemId):
    item = Item.query.get(itemId)
    suppliers = item.suppliers
    return {'suppliers':[supplier.to_dict() for supplier in suppliers]}


# ------------------------------CONNECT SUPPLIER TO ITEM------------------------
@supplier_routes.route('/<int:supplierId>/<int:itemId>')
# @login_required
def connect_supplier_to_item(supplierId, itemId):
    supplier = Supplier.query.get(supplierId)
    item = Item.query.get(itemId)
    supplier.items.append(item)
    db.session.commit()
    return {'message': 'successfully linked'}

# ------------------------------CONNECT SUPPLIER TO NEW ITEM------------------------
@supplier_routes.route('/<int:supplierId>/newItem')
# @login_required
def connect_supplier_to_new_item(supplierId):
    supplier = Supplier.query.get(supplierId)
    itemList = Item.query.all()
    itemId = len(itemList)
    item = Item.query.get(itemId)
    supplier.items.append(item)
    db.session.commit()
    return {'message': 'successfully linked'}


# ------------------------------DELETE SUPPLIER------------------------
@supplier_routes.route('/<int:supplierId>', methods=['DELETE'])
@login_required
def delete_suppier(supplierId):
    supplier = Supplier.query.get(supplierId)
    db.session.delete(supplier)
    db.session.commit()
    return {'message': 'Successfully Deleted'}
