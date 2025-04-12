from ..src.db_engine import DBEngine

schema = [
    { "name": "id", "type": "INT" },
    { "name": "code", "type": "TEXT", "length": 3 },
    { "name": "population", "type": "JSON" }
]

row = {
    "id": 1,
    "code": "ZWE",
    "population": {"YR2020": 15526888, "YR2021": 16236923}
}

db = DBEngine()

serialized = db.serialize_tuple(row, schema)
print(serialized)

print(db.deserialize_tuple(serialized, schema))