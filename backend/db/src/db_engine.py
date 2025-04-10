import os
import json
import csv
from datetime import datetime

DB_DIR = 'db/data'
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

def insert_row(table_name:str, row_data:json):
    schemas = load_schema()
    schema = schemas[table_name]
    meta = schema.get("meta", {})
    columns = schema["columns"]

    for col in columns:
        if col.get("auto_increment"):
            col_name = col["name"]
            last_id = meta.get("last_inserted_id", 0) + 1
            row_data[col_name] = last_id
            meta["last_inserted_id"] = last_id

    data_path = os.path.join(DB_DIR, f"{table_name}.jsonl")
    with open(data_path, 'a', encoding='utf-8') as f:
        f.write(json.dumps(row_data) + '\n')

    meta["row_count"] = meta.get("row_count", 0) + 1
    meta["last_updated"] = datetime.utcnow().isoformat() + 'Z'
    schemas[table_name]["meta"] = meta
    save_schemas(schemas)

    return row_data

def update_rows(table_name:str, conditions, updates):
    data_path = os.path.join(DB_DIR, f"{table_name}.jsonl")
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"No data file found for table '{table_name}'")
    
    schemas = load_schema()
    if table_name not in schemas:
        raise Exception(f"No schema found for table '{table_name}'")
    
    updated = 0
    all_rows = []

    with open(data_path, 'r', encoding='utf-8') as f:
        for line in f:
            row = json.loads(line.strip())
            if all(str(row.get(k)) == str(v) for k, v in conditions.items()):
                for field, value in updates.items():
                    row[field] = value
                updated += 1
            all_rows.append(row)

    with open(data_path, 'w', encoding='utf-8') as f:
        for row in all_rows:
            f.write(json.dumps(row) + '\n')

    schemas[table_name]["meta"]["last_updated"] = datetime.utcnow().isoformat() + 'Z'
    save_schemas(schemas)

    return f"{table_name} has successfully updated {updated} rows"

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

def import_csv_to_table(table_name:str, csv_path:str, delimiter=';', strict=False, row_transform=None, on_error=None):

    schemas = load_schema()
    print(schemas)
    if table_name not in schemas:
        raise Exception(f"Table {table_name} not found in schema")

    schema_columns = [col["name"] for col in schemas[table_name]["columns"]]
    data_file = os.path.join(DB_DIR, f"{table_name}.jsonl")

    inserted_rows = 0
    failed_rows = 0
    errors = []

    with open(csv_path, newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=delimiter)

        with open(data_file, 'a', encoding='utf-8') as f:
            try:
                for row in reader:
                    # print(row)
                    cleaned = {col: row[col] for col in schema_columns if col in row}
                    if row_transform:
                        cleaned = row_transform(cleaned)
                    
                    insert_row(table_name, cleaned)
                    inserted_rows += 1
            except Exception as e:
                failed_rows += 1
                if on_error:
                    on_error(row, e)
                else:
                    errors.append({"row": row, "error": str(e)})

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




    
