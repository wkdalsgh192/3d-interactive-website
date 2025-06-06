import os
import json
import csv
import bisect
import struct
from datetime import datetime

class BTreeIndex:
    def __init__(self):
        self.data = []

    def insert(self, key, value):
        bisect.insort(self.data, (key, value))

    def find(self, key):
        results = []
        i = bisect.bisect_left(self.data, (key, -float('inf')))
        while i < len(self.data) and self.data[i][0] == key:
            results.append(self.data[i][1])
            i += 1
        return results

    def to_dict(self):
        results = {}
        for key, value in self.data:
            results.setdefault(key, []).append(value)
        return results

    @classmethod
    def from_dict(cls, data:dict):
        obj = cls()
        for key, values in data.items():
            for value in values:
                obj.insert(key, value)
        return obj


class DBEngine:
    def __init__(self, db_dir='db/data'):
        self.DB_DIR = db_dir
        self.SCHEMA_DIR = os.path.join(self.DB_DIR, 'schema.json')
        return

    def load_schema(self):
        if not os.path.exists(self.SCHEMA_DIR):
            return {}
        with open(self.SCHEMA_DIR, 'r') as f:
            return json.load(f)
        
    def save_schemas(self, schema_data):
        with open(self.SCHEMA_DIR, 'w') as f:
            json.dump(schema_data, f)
    
    def serialize_tuple(self, row:dict, schema:list[dict]) -> bytes:
        buffer = b""

        for col in schema:
            # print(col)
            name = col["name"]
            col_type = col["type"]
            value = row.get(name)

            if col_type == "INT":
                buffer += struct.pack("i", int(value))

            elif col_type == "TEXT":
                length = col.get("length", 12)
                text = str(value).encode('utf-8')
                text = text.ljust(length, b'\x00')
                buffer += struct.pack(f"{length}s", text)

            elif col_type == "JSON":
                json_bytes = json.dumps(value).encode('utf-8')
                buffer += struct.pack("H", len(json_bytes))
                buffer += json_bytes
            
            else:
                raise ValueError(f"Unsupported column type: {col_type}")
            
        return buffer
    
    def deserialize_tuple(self, raw: bytes, schema:list[dict]) -> {dict, int}:
        row = {}
        offset = 0

        for col in schema:
            name = col["name"]
            col_type = col["type"]

            if col_type == "INT":
                row[name] = struct.unpack_from("i", raw, offset)[0]
                offset += 4

            elif col_type == "TEXT":
                length = col.get("length", 12)
                text_bytes = struct.unpack_from(f"{length}s", raw, offset)[0]
                row[name] = text_bytes.decode('utf-8').strip('\x00')
                offset += length
            
            elif col_type == "JSON":
                json_len = struct.unpack_from("H", raw, offset)[0]
                offset += 2
                json_bytes = raw[offset:offset+json_len]
                row[name] = json.loads(json_bytes.decode('utf-8'))
                offset += json_len

            else:
                raise ValueError(f"Unsupported column type: {col_type}")

        return row, offset

    def create_tables(self, table_name, columns):
        os.makedirs(self.DB_DIR, exist_ok=True)

        schemas = self.load_schema()

        if table_name in schemas:
            return f"Table '{table_name}' already exsits"
        
        schemas[table_name] = {
            "columns": columns
        }

        data_path = os.path.join(self.DB_DIR, f"{table_name}.jsonl")
        open(data_path, 'a').close()

        self.save_schemas(schemas)

        return f"Table '{table_name}' created successfully"

    # def insert_row(self, table_name:str, row_data:json):
    #     schemas = self.load_schema()
    #     schema = schemas[table_name]
    #     meta = schema.get("meta", {})
    #     columns = schema["columns"]

    #     for col in columns:
    #         if col.get("auto_increment"):
    #             col_name = col["name"]
    #             last_id = meta.get("last_inserted_id", 0) + 1
    #             row_data[col_name] = last_id
    #             meta["last_inserted_id"] = last_id

    #     data_path = os.path.join(self.DB_DIR, f"{table_name}.jsonl")
    #     with open(data_path, 'a', encoding='utf-8') as f:
    #         f.write(json.dumps(row_data) + '\n')

    #     meta["row_count"] = meta.get("row_count", 0) + 1
    #     meta["last_updated"] = datetime.utcnow().isoformat() + 'Z'
    #     schemas[table_name]["meta"] = meta
    #     self.save_schemas(schemas)

    #     return row_data

    def insert_row(self, table_name:str, row:dict):
        schemas = self.load_schema()
        schema = schemas[table_name]
        columns = schema["columns"]
        meta = schema.get("meta", {})

        for col in columns:
            if col.get("auto_increment"):
                col_name = col["name"]
                last_id = meta.get("last_inserted_id", 0) + 1
                row[col_name] = last_id
                meta["last_inserted_id"] = last_id
        
        binary_data = self.serialize_tuple(row, columns)

        table_path = os.path.join(self.DB_DIR, f"{table_name}.bin")
        with open(table_path, 'ab') as f:
            f.write(binary_data)
        
        # Update metadata
        meta["row_count"] = meta.get("row_count", 0) + 1
        meta["last_updated"] = datetime.utcnow().isoformat() + 'Z'
        schemas[table_name]["meta"] = meta
        self.save_schemas(schemas)

        return meta["row_count"]

    def update_rows(self, table_name:str, conditions, updates):
        data_path = os.path.join(self.DB_DIR, f"{table_name}.jsonl")
        if not os.path.exists(data_path):
            raise FileNotFoundError(f"No data file found for table '{table_name}'")
        
        schemas = self.load_schema()
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
        self.save_schemas(schemas)

        return f"{table_name} has successfully updated {updated} rows"

    def update_table_metadata(self, table_name, schema, data_filename=''):
        data_path = os.path.join(self.DB_DIR, data_filename)

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

        self.save_schemas(schema)

    def import_csv_to_table(self, table_name:str, csv_path:str, delimiter=';', strict=False, row_transform=None, on_error=None):

        schemas = self.load_schema()
        if table_name not in schemas:
            raise Exception(f"Table {table_name} not found in schema")

        schema_columns = [col["name"] for col in schemas[table_name]["columns"]]
        # data_file = os.path.join(self.DB_DIR, f"{table_name}.bin")
        # data_file = os.path.join(self.DB_DIR, f"{table_name}.jsonl")

        inserted_rows = 0
        failed_rows = 0
        errors = []

        with open(csv_path, newline='', encoding='utf-8-sig') as csvfile:
            reader = csv.DictReader(csvfile, delimiter=delimiter)

            try:
                for row in reader:
                    # print(row)
                    cleaned = {col: row[col] for col in schema_columns if col in row}
                    if row_transform:
                        cleaned = row_transform(cleaned)
                    
                    self.insert_row(table_name, cleaned)
                    inserted_rows += 1
            except Exception as e:
                failed_rows += 1
                if on_error:
                    on_error(row, e)
                else:
                    errors.append({"row": row, "error": str(e)})

        return inserted_rows, f"Imported {inserted_rows} rows into '{table_name}' (strict={strict})"

    def build_index(self, table_name, key_column):
        data_path = os.path.join(self.DB_DIR, f"{table_name}.jsonl")
        # index = {}
        index = BTreeIndex()

        with open(data_path, 'r', encoding = 'utf-8') as f:
            for line_number, line in enumerate(f):
                row = json.loads(line.strip())
                key = row.get(key_column)
                if key:
                    # index[key] = line_number
                    index.insert(key, line_number)
        return index

    def save_index(self, index:BTreeIndex, table_name, key_column):
        index_path = os.path.join(self.DB_DIR, "indexes", f"{table_name}_{key_column}_btree_index.json")
        os.makedirs(os.path.dirname(index_path), exist_ok=True)

        with open(index_path, 'w', encoding='utf-8') as f:
            json.dump(index.to_dict(), f, indent=2)

    def load_index(self, table_name, key_column):
        index_path = os.path.join(self.DB_DIR, "indexes", f"{table_name}_{key_column}_btree_index.json")
        
        if not os.path.exists(index_path):
            return None

        data = None
        with open(index_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        return BTreeIndex.from_dict(data)

    def search_rows(self, table_name:str, conditions:iter) -> list:
        data_path = os.path.join(self.DB_DIR, f"{table_name}.jsonl")
        if not os.path.exists(data_path):
            raise FileNotFoundError(f"Table '{table_name}' not found")
        
        indexed_key = None
        index_path = None

        # Find an index we can use
        for col in conditions.keys():
            potential_path = os.path.join(self.DB_DIR, "indexes", f"{table_name}_{col}_btree_index.json")
            if os.path.exists(potential_path):
                indexed_key = col
                index_path = potential_path
                break

        matching_lines = None

        if indexed_key:
            with open(index_path, 'r') as f:
                index = json.load(f)
            
            match_val = str(conditions[indexed_key])
            matching_lines = index.get(match_val)

            if matching_lines is not None and not isinstance(matching_lines, list):
                matching_lines = [matching_lines]

        results = []
        with open(data_path, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f):
                if matching_lines is not None and i not in matching_lines:
                    continue

                row = json.loads(line.strip())

                if all(str(row.get(k)) == str(v) for k, v in conditions.items()):
                    results.append(row)

        return results

    # def get_all_rows(self, table_name:str) -> list:
    #     data_path = os.path.join(self.DB_DIR, f"{table_name}.jsonl")

    #     if not os.path.exists(data_path):
    #         raise FileExistsError(f"No data found for table '{table_name}'")
        
    #     rows = []
    #     with open(data_path, 'r', encoding='utf-8') as f:
    #         for line in f:
    #             line = line.strip()
    #             if line:
    #                 rows.append(json.loads(line))

    #     return rows
    
    def get_all_rows(self, table_name:str) -> list:
        schemas = self.load_schema()
        schema = schemas[table_name]["columns"]
        data_path = os.path.join(self.DB_DIR, f"{table_name}.bin")

        if not os.path.exists(data_path):
            raise FileExistsError(f"No data found for table '{table_name}'")
        
        rows = []
        with open(data_path, 'rb') as f:
            data = f.read()
            offset = 0
            while offset < len(data):
                try:
                    row, size = self.deserialize_tuple(data[offset:], schema)
                    rows.append(row)
                    offset += size
                except Exception as e:
                    print("Deserialization failed", e)
                    break

        return rows