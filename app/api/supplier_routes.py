from flask import Blueprint
from flask_login import login_required
from app.models import Supplier

supplier_routes = Blueprint('suppliers', __name__)

@supplier_routes.route('/')
@login_required
def get_suppliers():
    suppliers = Supplier.query.all()
    return {'suppliers': [supplier.to_dict() for supplier in suppliers]}
