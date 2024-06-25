import os
from flask import Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

# Patch flask_cors to use collections.abc.Iterable
import collections
if not hasattr(collections, 'Iterable'):
    collections.Iterable = collections.abc.Iterable

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './folder'
cors = CORS(app)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    # Get the file from the request
    file = request.files['file']
    # Chech if the file is empty
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    # Check if the file is allowed
    if file and allowed_file(file.filename):
        # Remove special characters from the filename and save then filename
        filename = secure_filename(file.filename)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)  # Ensure the folder exists
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({"message": "File uploaded successfully", "filename": filename}), 200
    
    return jsonify({"error": "File type not allowed"}), 400

if __name__ == '__main__':  
    app.run()
