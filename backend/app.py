import os
from flask import Flask, flash, request, redirect, url_for, jsonify, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from process import chat_with_pdf
# Patch flask_cors to use collections.abc.Iterable
import collections
if not hasattr(collections, 'Iterable'):
    collections.Iterable = collections.abc.Iterable

ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './folder'
app.secret_key = 'supersecretkey'  # Needed for session management
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
        
        # Store the filename in the session
        session['filename'] = filename

        return jsonify({"message": "File uploaded successfully", "filename": filename}), 200
    
    return jsonify({"error": "File type not allowed"}), 400


@app.route('/chat', methods=['POST'])
@cross_origin()
def chatbit():
    # if 'filename' not in session:
    #     return jsonify({"error": "No file in session"}), 400
    
    question = request.json['question']
    print(f'question: {question}')
    if 'question' not in request.json:
        return jsonify({"error": "No question provided"}), 400
    # filename = session['filename']
    filename = 'nke-10k-2023.pdf'
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    print(f'file_path: {file_path}')

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404
    

    
    answer, page_context_list, page_context_metadata = chat_with_pdf(file_path, question)
    return jsonify({
        "answer": answer,
        "page_context_list": page_context_list,
        "page_context_metadata": page_context_metadata
    })
if __name__ == '__main__':  
    app.run()
