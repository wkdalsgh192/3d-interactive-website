import os
import json
import csv
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

def import_csv_to_table(table_name, csv_path, delimiter=';', strict=False):

    schemas = load_schema()
    if table_name not in schemas:
        raise Exception(f"Table {table_name} not found in schema")

    schema_columns = [col["name"] for col in schemas[table_name]["columns"]]
    print(schema_columns)
    data_file = os.path.join(DB_DIR, f"{table_name}.jsonl")

    inserted_rows = 0

    with open(csv_path, newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=delimiter)

        with open(data_file, 'a', encoding='utf-8') as f:
            for row in reader:
                print(row)
                cleaned = {col: row[col] for col in schema_columns if col in row}
                f.write(json.dumps(cleaned) + '\n')
                inserted_rows += 1

    # update metadata
    meta = schemas[table_name].get("meta", {})
    meta["row_count"] = meta.get("row_count", 0) + inserted_rows
    meta["last_updated"] = datetime.utcnow().isoformat() + 'Z'
    schemas[table_name]["meta"] = meta
    save_schemas(schemas)

    return f"Imported {inserted_rows} rows into '{table_name}' (strict={strict})"

def get_all_rows(table_name:str) -> list:
    data_path = os.path.join(DB_DIR, f"{table_name}.jsonl")

    if not os.path.exists(data_path):
        raise FileExistsError(f"No data found for table '{table_name}'")
    
    rows = []
    with open(data_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line:
                rows.append(json.loads(line))

    return rows




    
