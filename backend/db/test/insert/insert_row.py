import sys, os, tempfile
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

from db_engine import DBEngine

with tempfile.TemporaryDirectory() as tmpdir:
    print("Temporary path:", tmpdir)
    test_engine = DBEngine(tmpdir)

    # Create a test schema
    schema = {
        "test_table": {
            "columns": [
                { "name": "id", "type": "INT", "auto_increment": True },
                { "name": "countryName", "type": "TEXT", "length": 10 },
                { "name": "countryCode", "type": "JSON" }
            ],
            "meta": {}
        }
    }
    test_engine.save_schemas(schema)

    test_rows = [
        {"countryName": "Afghanistan", "countryCode": "AFG", "population": {"YR2001": 20284307, "YR2005": 24404567, "YR2010": 28284089, "YR2015": 33831764, "YR2020": 39068979, "YR2025": 43844111, "YR2030": 50039402, "YR2035": 56647232, "YR2040": 63347870, "YR2045": 70021200, "YR2050": 76885135}},
        {"countryName": "Albania", "countryCode": "ALB", "population": {"YR2001": 3060173, "YR2005": 3011487, "YR2010": 2913021, "YR2015": 2880703, "YR2020": 2837849, "YR2025": 2703592, "YR2030": 2603241, "YR2035": 2502373, "YR2040": 2391894, "YR2045": 2279432, "YR2050": 2169769}},
        {"countryName": "Algeria", "countryCode": "DZA", "population": {"YR2001": 31331221, "YR2005": 33109249, "YR2010": 36188236, "YR2015": 40019529, "YR2020": 44042091, "YR2025": 47435312, "YR2030": 50154166, "YR2035": 52516789, "YR2040": 54873476, "YR2045": 57290156, "YR2050": 59565554}},
        {"countryName": "American Samoa", "countryCode": "ASM", "population": {"YR2001": 57053, "YR2005": 56617, "YR2010": 55228, "YR2015": 52878, "YR2020": 49761, "YR2025": 46029, "YR2030": 42958, "YR2035": 40843, "YR2040": 39386, "YR2045": 38371, "YR2050": 37545}},
        {"countryName": "Andorra", "countryCode": "AND", "population": {"YR2001": 65852, "YR2005": 77421, "YR2010": 80706, "YR2015": 72174, "YR2020": 77380, "YR2025": 82904, "YR2030": 85681, "YR2035": 86174, "YR2040": 85668, "YR2045": 84294, "YR2050": 82195}}
    ]

    for row in test_rows:
        test_engine.insert_row("test_table", row)

    retrieved_rows = test_engine.get_all_rows("test_table")
    print(retrieved_rows)

