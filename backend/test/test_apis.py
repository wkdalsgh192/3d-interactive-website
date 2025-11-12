# test_api.py
from app import app
import requests

# POST /visit
def test_visit():
    client = app.test_client()
    response = client.post("/visit")
    assert response.status_code == 200

# GET /count
def test_count():
    client = app.test_client()
    response = client.get("/count")
    assert response.status_code == 200