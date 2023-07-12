# standard libs
import os
import datetime
import hashlib
import random

import numpy as np
import pandas as pd

from flask import Flask, request, session
from flask import jsonify, send_from_directory
from flask_session import Session
from flask_cors import CORS

from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from threading import Timer
from pathlib import Path

# local libs
from libs import recieve
from libs import render_html as rhtml

# config flask
app = Flask(__name__, template_folder='static')
app.config['SECRET_KEY'] = 'Area51'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = os.path.join('temp/', 'flask_session')

Session(app)
CORS(app)

allowed_file = lambda filename: '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt', 'csv', 'xlsx'}

@app.route('/')
def hello_world():
    return "hello"

app.add_url_rule('/Dashboard', "dashboard", rhtml.dashboard)

app.add_url_rule('/scripts/<path:path>', "serveScript", lambda path: send_from_directory('static/scripts', path))
app.add_url_rule('/icons/<path:path>', "serveIcons", lambda path: send_from_directory('static/icons', path))
app.add_url_rule('/stylesheets/<path:path>', "serveStylesheets", lambda path: send_from_directory('static/stylesheets', path))

@app.route('/upload', methods=['POST'])
def upload_file():
    # checking errors
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400
    # if no error continue


    if file and allowed_file(file.filename):
    
        session_id = session.sid
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        random_int = random.randint(1000, 9999)   
        file_id = f"{session_id}_{timestamp}_{random_int}_{file.filename}"
        file_id = secure_filename(file_id)

        # Add file to list of files in session
        if 'files' not in session:
            session['files'] = []
        session['files'].append({'filename': file.filename, 'data': file.read()})
        
        try:
            df = pd.read_csv(file) if file_id.endswith('.csv') else pd.read_excel(file)
        except Exception as e:
            return jsonify({"error": f"Error reading file - {str(e)}"}), 400
        # t = Timer(600.0, os.remove, [file_path])  # Setting up a timer to delete the file after 10 minutes
        # t.start()

        info = {
            'filename': file_id,
            'columns': list(map(lambda x: x.strip(), df.columns)),
            'head': df.head().to_dict(),
            'shape': df.shape,
            'missing_data': df.isnull().sum().to_dict()
         }

        return jsonify(info), 200

    else:
        return jsonify({"error": "Allowed file types are txt, csv, xlsx"}), 400
    return jsonify({"error": "try uploading again or try reloading APP"}), 400


if __name__ == "__main__":
    app.run(debug=True)
