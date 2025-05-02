from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join('static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.add_url_rule('/static/uploads/<filename>', 'uploaded_file', build_only=True)

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

frontend_folder = os.path.join(os.getcwd(), '..', 'frontend_react')
dist_folder = os.path.join(frontend_folder, 'dist')

# serve static files from dist folder under frontend_react directory
# @app.route('/', defaults={'filename':''})
# @app.route('/<path:filename>')
# def index(filename):
#     if not filename:
#         filename = 'index.html'
#     return send_from_directory(dist_folder, filename)

@app.route('/')
def index():
    return send_from_directory(dist_folder, 'index.html')

# Serve assets from the 'dist/assets' directory
@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(dist_folder, 'assets'), filename)

# Serve images from the 'dist/images' directory
@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(os.path.join(dist_folder, 'images'), filename)

# api routes
import routes

# Catch-all route to serve index.html for SPA client-side routing
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(dist_folder, 'index.html')

with app.app_context():
    # Create the database and tables if they don't exist
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

