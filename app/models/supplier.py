from .db import db, environment, SCHEMA, add_prefix_for_prod


class Supplier(db.Model):
    __tablename__ = 'suppliers'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    contact = db.Column(db.String(255))
    email = db.Column(db.String(255))
    cell = db.Column(db.String(255))
    itemId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.Date)
    updatedAt = db.Column(db.Date)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'contact': self.contact,
            'email': self.email,
            'cell': self.cell,
            'itemId': self.itemId,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
