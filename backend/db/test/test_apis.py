# test_api.py
import requests

# POST /visit
for _ in range(100):
    requests.post('http://localhost:5000/visit')

# GET /count
res2 = requests.get('http://localhost:5000/count')
print("GET /count response:", res2.json())