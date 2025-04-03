from flask import Flask, jsonify, request
from src.simple_db import SimpleDB
from src.db_engine import create_tables

app = Flask(__name__)
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

if __name__ == "__main__":
    app.run(debug=True)