from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os


app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

frontend_folder = os.path.join(os.getcwd(), '..', 'frontend_react')
dist_folder = os.path.join(frontend_folder, 'dist')

# serve static files from dist folder under frontend_react directory
@app.route('/', defaults={'filename':''})
@app.route('/<path:filename>')
def index(filename):
    if not filename:
        filename = 'index.html'
    return send_from_directory(dist_folder, filename)

# api routes
import routes

with app.app_context():
    # Create the database and tables if they don't exist
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)