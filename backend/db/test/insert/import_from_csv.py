import sys, os, tempfile
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

from db_engine import DBEngine

CSV_PATH = 'backend/db/test/data/countries.csv'
with tempfile.TemporaryDirectory() as tmpdir:
    print("Temporary path:", tmpdir)
    test_engine = DBEngine(tmpdir)

    # Create a test schema
    schema = {
        "test_table": {
            "columns": [
                { "name": "id", "type": "INT", "auto_increment": True },
                { "name": "countryName", "type": "TEXT", "length": 12 },
                { "name": "countryCode", "type": "JSON" }
            ],
            "meta": {}
        }
    }
    test_engine.save_schemas(schema)

    inserted_rows, _ = test_engine.import_csv_to_table('test_table', CSV_PATH, ';')

    schema = test_engine.load_schema()['test_table']
    if inserted_rows == schema['meta']['last_inserted_id']:
        print(f"Success: {inserted_rows} rows imported from a csv file")
    