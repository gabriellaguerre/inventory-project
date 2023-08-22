from flask import Blueprint
from flask_login import login_required
from app.models import Supplier, Item

supplier_routes = Blueprint('suppliers', __name__)

@supplier_routes.route('/')
# @login_required
def get_suppliers():
    suppliers = Supplier.query.all()
    return {'suppliers': [supplier.to_dict() for supplier in suppliers]}


@supplier_routes.route('/<int:itemId>/')
# @login_required
def get_suppliers_of_an_item(itemId):
    item = Item.query.get(itemId)
    suppliers = item.suppliers
    # print([supplier.to_dict() for supplier in suppliersList], 'OOOOOOOOOOOOOOOOOOOOOOOOOOOO')
    # return suppliers.to_dict()
    return {'suppliers':[supplier.to_dict() for supplier in suppliers]}
