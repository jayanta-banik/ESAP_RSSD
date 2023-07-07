import datetime
from flask import request, jsonify

def upload_file():
    # checking errors
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400
    # if no error continue
    if file and allowed_file(file.filename):
    
        # ip_addr = request.remote_addr
        dt_string = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        _name = dt_string + str(random.randint(10000, 99999))
        # hash_object = hashlib.md5(f"{dt_string}{ip_addr}".encode())
        # hex_dig = hash_object.hexdigest()

        filename = secure_filename(file.filename)
        file_path = Path('temp/ESAP/') / f"{_name}.{filename.rsplit('.', 1)[1].lower()}"
        file.save(file_path)
        
        try:
            df = pd.read_csv(file) if file.filename.endswith('.csv') else pd.read_excel(file)
        except Exception as e:
            return jsonify({"error": f"Error reading file - {str(e)}"}), 400
        t = Timer(600.0, delete_file, [file_path])  # Setting up a timer to delete the file after 10 minutes
        t.start()

        info = {
            'filename': filename,
            'columns': list(map(lambda x: x.strip(), df.columns)),
            'head': df.head().to_dict(),
            'shape': df.shape,
            'missing_data': df.isnull().sum().to_dict()
         }

        return jsonify(info), 200

    return jsonify({"error": "Allowed file types are txt, csv, xlsx"}), 400

