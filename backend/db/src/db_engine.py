import os
import json
from datetime import datetime

DB_DIR = 'data'
SCHEMA_DIR = os.path.join(DB_DIR, 'schema.json')

def load_schema():
    if not os.path.exists(SCHEMA_DIR):
        return {}
    with open(SCHEMA_DIR, 'r') as f:
        return json.load(f)
    
def save_schemas(schema_data):
    with open(SCHEMA_DIR, 'w') as f:
        json.dump(schema_data, f)

def create_tables(table_name, columns):
    os.makedirs(DB_DIR, exist_ok=True)

    schemas = load_schema()

    if table_name in schemas:
        return f"Table '{table_name}' already exsits"
    
    schemas[table_name] = {
        "columns": columns
    }

    data_path = os.path.join(DB_DIR, f"{table_name}.jsonl")
    open(data_path, 'a').close()

    save_schemas(schemas)

    return f"Table '{table_name}' created successfully"

def update_table_metadata(table_name, schema, data_filename=''):
    data_path = os.path.join(DB_DIR, data_filename)

    try:
        with open(data_path, 'rb') as f:
            byte_size = len(f.read())

    except FileNotFoundError:
        byte_size = 0

    try:
        with open(data_path, 'r') as f:
            row_count = sum(1 for _ in f)
    except FileNotFoundError:
        row_count = 0

    schema[table_name]['meta'] = {
        "row_count": row_count,
        "byte_size": byte_size,
        "created_at": schema[table_name].get('meta', {}).get('created_at', datetime.utcnow().isoformat() + 'Z'),
        "updated_at": datetime.utcnow().isoformat() + 'Z'
    }

    save_schemas(schema)
