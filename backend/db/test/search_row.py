from ..src.db_engine import DBEngine

db = DBEngine()

# Create an index
index = db.build_index("countries", "countryCode")
db.save_index(index, "countries", "countryCode")

# Search by indexed column
print(db.search_rows("countries", {"countryCode": "ZWE"}))         # uses index

# Search by brute-force scan
print(db.search_rows("countries", {"id": "217"}))             # falls back to scan
print(db.search_rows("countries", {"countryCode": "ZWE", "id": "217"}))  # indexed + additional check
