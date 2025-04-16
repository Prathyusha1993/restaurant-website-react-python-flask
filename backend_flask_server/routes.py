from main import app, db
from flask import jsonify, request
from models import MenuItem
from pdf_generator import generate_menu_pdf

@app.route('/menu', methods=['GET'])
def get_menu():
    menu_items = MenuItem.query.all()
    return jsonify([item.to_json() for item in menu_items])

@app.route('/menu', methods=['POST'])
def add_menu_item():
    try:
        data = request.json
        required_fields = ['name', 'price', 'description', 'veg', 'spicy', 'img_url', 'category']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400
        
        name = data.get('name')
        price = data.get('price')
        description = data.get('description')
        veg = data.get('veg')
        spicy = data.get('spicy')
        img_url = data.get('img_url')
        category = data.get('category')
        new_item = MenuItem(name=name, price=price, description=description, veg=veg, spicy=spicy, img_url=img_url, category=category)
        db.session.add(new_item)
        db.session.commit()

        generate_menu_pdf()  # Call the PDF generation function after adding the item

        return jsonify(new_item.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@app.route('/menu/category/<string:category>', methods=['GET'])
def get_menu_by_category(category):
    menu_items = MenuItem.query.filter_by(category=category).all()
    return jsonify([item.to_json() for item in menu_items])


@app.route('/menu/<int:id>', methods=['GET'])
def get_menu_item_id(id):
    item = MenuItem.query.get_or_404(id)
    if item is None:
        return jsonify({'error': 'Item not found'}), 404
    return jsonify({'id': item.id, 'name': item.name, 'price': item.price, 'description': item.description, 'veg': item.veg, 'spicy':item.spicy, 'img_url':item.img_url, 'category': item.category})


@app.route('/menu/<int:id>', methods=['PATCH'])
def update_menu_item(id):
    try:
        item = MenuItem.query.get_or_404(id)
        if item is None:
            return jsonify({'error': 'Item not found.'}), 404
        
        data = request.json
        item.name = data.get('name', item.name)
        item.price = data.get('price', item.price)
        item.description = data.get('description', item.description)
        item.veg = data.get('veg', item.veg)
        item.spicy = data.get('spicy', item.spicy)
        item.img_url = data.get('imgUrl', item.img_url)
        item.category = data.get('category', item.category)
        db.session.commit()

        generate_menu_pdf()

        return jsonify(item.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@app.route('/menu/<int:id>', methods=['DELETE'])
def delete_menu_item(id):
    try:
        item = MenuItem.query.get_or_404(id)
        if item is None:
            return jsonify({'error': 'Item not found.'}), 404
        
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'menu item deleted succesfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@app.route('/menu/search', methods=['GET'])
def search_menu_items():
    query = request.args.get('q', '')    #get the searchquery from query parameter
    if not query:
        return jsonify({'error': 'Search query is required'}), 400
    
    menu_items = MenuItem.query.filter(MenuItem.name.ilike(f'%{query}%')).all()
    return jsonify([item.to_json() for item in menu_items])


@app.route('/generate-pdf')
def generate_pdf_route():
    generate_menu_pdf()
    return jsonify({'message': 'PDF generated successfully'}), 200