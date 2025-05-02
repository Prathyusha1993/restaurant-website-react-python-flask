from main import db

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    veg = db.Column(db.Boolean, nullable=False, default=False)
    spicy = db.Column(db.Boolean, nullable=False, default=False)
    img_url = db.Column(db.String(200), nullable=False, default='')
    description = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(50), nullable=False)

    def to_json(self):
        # if self.img_url.startswith('http://') or self.img_url.startswith('https://'):
        #     img_url = self.img_url  # already a full URL
        # else:
        #     img_url = f"/static/uploads/{self.img_url.lstrip()}"  # ensure no leading slash

        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'veg': self.veg,
            'spicy': self.spicy,
            # 'imgUrl': img_url,
            'img_url': self.img_url,
            'description': self.description,
            'category': self.category
        }


class InquireForm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    date = db.Column(db.String(100), nullable=False)
    time = db.Column(db.String(100), nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(500), nullable=True)
    

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'date': self.date,
            'time': self.time,
            'number_of_guests': self.number_of_guests,
            'message': self.message
        }

class ContactForm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    message = db.Column(db.String(500), nullable=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'message': self.message
        }