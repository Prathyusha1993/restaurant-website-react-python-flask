from main import app, db
from flask import jsonify, request
from models import MenuItem

@app.route('/menu', methods=['GET'])
def get_menu():
    menu_items = MenuItem.query.all()
    return jsonify([item.to_json() for item in menu_items])

@app.route('/menu', methods=['POST'])
def add_menu_item():
    try:
        data = request.json
        required_fields = ['name', 'price', 'description', 'category']
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({'error': f'Missing field: {field}'}), 400
        
        name = data.get('name')
        price = data.get('price')
        description = data.get('description')
        category = data.get('category')
        new_item = MenuItem(name=name, price=price, description=description, category=category)
        db.session.add(new_item)
        db.session.commit()
        return jsonify(new_item.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@app.route('/menu/category/<string:category>', methods=['GET'])
def get_menu_by_category(category):
    menu_items = MenuItem.query.filter_by(category=category).all()
    return jsonify([item.to_json() for item in menu_items])