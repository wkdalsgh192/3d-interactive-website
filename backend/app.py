from flask import Flask, jsonify, request
from simple_db import SimpleDB

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

if __name__ == "__main__":
    app.run(debug=True)