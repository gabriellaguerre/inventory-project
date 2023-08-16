from .db import db, environment, SCHEMA, add_prefix_for_prod


class Item(db.Model):
    __tablename__ = 'items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Integer, nullable=False, unique=True)
    description = db.Columm(db.String(500), nullable=False)
    item_type = db.Column(db.String(500), nullable=False)
    unit_cost = db.Column(db.Integer, nullable=False)
    manufacturer = db.Column(db.String(255), nullable=False)
    supplier = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'description': self.description,
            'unit_cost': self.unit_cost,
            'manufacturer': self.manufacturer,
            'supplier': self.supplier
        }
