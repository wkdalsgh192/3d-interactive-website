from ..src.db_engine import DBEngine

db = DBEngine()

# Create an index
btree = db.build_index("countries", "countryCode")
db.save_index(btree, "countries", "countryCode")

btree_loaded = db.load_index("countries", "countryCode")
print(btree == btree_loaded)
print(btree.find("ZWE"))

# Search by indexed column
# print(db.search_rows("countries", {"countryCode": "ZWE"}))         # uses index

# Search by brute-force scan
# print(db.search_rows("countries", {"id": "217"}))             # falls back to scan
# print(db.search_rows("countries", {"countryCode": "ZWE", "id": "217"}))  # indexed + additional check
