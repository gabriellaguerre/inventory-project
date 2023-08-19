from flask import Blueprint
from flask_login import login_required
from app.models import Item

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
# @login_required
def get_items():
    items = Item.query.all()
    return {'items': [item.to_dict() for item in items]}
