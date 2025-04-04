import os
import csv
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from src.simple_db import SimpleDB
from src.db_engine import create_tables, import_csv_to_table, get_all_rows, update_rows

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
db = SimpleDB()

@app.route('/visit', methods=['POST'])
def visit():
    ip = request.remote_addr
    user_agent = request.headers.get('User-Agent', 'Unknown')
    visit_record = db.log_visit(ip, user_agent)
    # total = db.get_total_visits()
    return jsonify({"message": "Success"})

@app.route('/count', methods=['GET'])
def count():
    total = db.get_total_visits()
    return jsonify({"total_visits": total})

@app.route('/create-table', methods=['POST'])
def create_table():
    data = request.get_json()
    table_name = data.get('table')
    columns = data.get('columns')

    if not table_name or not columns:
        return {"error": "Missing table name or columns"}, 400
    
    result = create_tables(table_name, columns)
    return {"message": result}, 201

@app.route('/import-csv', methods=['POST'])
def import_csv():
    data = request.get_json()
    table_name = data.get('table')
    csv_path = data.get('file_path')
    delimiter = data.get('delimiter', ',')

    # Convert to absolute path
    abs_path = os.path.abspath(os.path.join(os.getcwd(), csv_path))
    print("Working dir:", os.getcwd())
    print("Resolved path:", abs_path)

    try:
        result = import_csv_to_table(table_name, abs_path, delimiter)
        return jsonify({"message": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add-population', methods=['POST'])
def update_population():
    data = request.get_json()
    table_name = data.get('table')
    csv_path = data.get('file_path')
    delimiter = data.get('delimiter', ',')

    # Convert to absolute path
    abs_path = os.path.abspath(os.path.join(os.getcwd(), csv_path))
    results = []

    with open(abs_path, newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=delimiter)

        # {{"countryCode": "AF", "population": {"YR2001":2321321, "YR2005": 23892389, "YR2010": 2320123. ...}}}
        for row in reader:
            code = row["countryCode"]
            pop_by_year = {}

            for key, value in row.items():
                if "[YR" in key:
                    # Extract just the year part, e.g., "2001 [YR2001]" → "YR2001"
                    year_key = key.split("[")[-1].replace("]", "").strip()
                    try:
                        pop_by_year[year_key] = int(value)
                    except ValueError:
                        continue  # skip empty or malformed numbers
            results.append({"countryCode": code, "population": pop_by_year})

    try:
        updated = 0
        for res in results:
            update_rows(table_name, {"countryCode": res["countryCode"]}, {"population": res["population"]})
            updated += 1
        return jsonify({"message": f"{updated} rows updated"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



    
@app.route('/api/<table_name>', methods=['GET'])
def get_data(table_name):
    try:
        rows = get_all_rows(table_name)
        return jsonify(rows)
    except FileNotFoundError:
        return jsonify({"error": f"Table '{table_name}' not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)