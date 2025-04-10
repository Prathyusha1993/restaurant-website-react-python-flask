from main import db

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    veg = db.Column(db.Boolean, nullable=False)
    spicy = db.Column(db.Boolean, nullable=False)
    img_url = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(50), nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'veg': self.veg,
            'spicy': self.spicy,
            'imgUrl': self.img_url,
            'description': self.description,
            'category': self.category
        }