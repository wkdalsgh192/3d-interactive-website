import requests


BASE_URL = "http://localhost:5000"

# POST /create-table
payload = {
    "table": "profile",
        "columns": [
            {"name": "firstName", "type": "TEXT"},
            {"name": "lastName", "type": "TEXT"},
            {"name": "email", "type": "VARCHAR"}
        ]
}

res = requests.post(f"{BASE_URL}/create-table", json=payload)

print("Status Code:", res.status_code)
print("Response:", res.text)

# PORT /create-table
payload= {
    "table": "countries",
    "columns": [
        { "name": "countryName", "type": "TEXT" },
        { "name": "image", "type": "TEXT" },
        { "name": "landmass", "type": "INT" },
        { "name": "zone", "type": "INT" },
        { "name": "area", "type": "INT" },
        { "name": "population", "type": "INT" },
        { "name": "language", "type": "INT" },
        { "name": "religion", "type": "INT" }
    ]
}

res = requests.post(f"{BASE_URL}/create-table", json=payload)

print("Status Code:", res.status_code)
print("Response:", res.text)


# POST /import-csv
payload = {
    "table": "profile",
    "file_path": "test/data/profile.csv"
}

res = requests.post(f"{BASE_URL}/import-csv", json=payload)
print("Status Code:", res.status_code)
print("Response:", res.text)


# POST /import-csv
payload = {
    "table": "countries",
    "file_path": "test/data/flags.csv"
}

res = requests.post(f"{BASE_URL}/import-csv", json=payload)
print("Status Code:", res.status_code)
print("Response:", res.text)