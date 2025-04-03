import requests


BASE_URL = "http://localhost:5000"
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