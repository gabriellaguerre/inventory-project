from flask import Blueprint
from flask_login import login_required
from app.models import Item

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
# @login_required
def get_items():
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}


@item_routes.route('/<int:itemId>/suppliers')
# @login_required
def get_suppliers_of_an_item(itemId):
    item = Item.query.get(itemId)
    suppliers = item.suppliers
    # print([supplier.to_dict() for supplier in suppliersList], 'OOOOOOOOOOOOOOOOOOOOOOOOOOOO')

    return {'suppliers':[supplier.to_dict() for supplier in suppliers]}
