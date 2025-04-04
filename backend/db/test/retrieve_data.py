import requests

BASE_URL = "http://localhost:5000"

# GET /retrieve/<table_name>

res = requests.get(f"{BASE_URL}/retrieve/countries")

print("Status Code:", res.status_code)
print("Response:", res.text)