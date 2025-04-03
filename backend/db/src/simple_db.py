import json
import threading
from datetime import datetime

class SimpleDB:
    def __init__(self, filename='visitors.db'):
        self.filename = filename
        self.lock = threading.Lock()

    def log_visit(self, ip, user_agent):
        visit_record = {
            "timestamp": datetime.utcnow().isoformat() + 'Z',
            "ip": ip,
            "user_agent": user_agent
        }

        with self.lock:
            with open(self.filename, 'a') as f:
                f.write(json.dumps(visit_record) + "\n")
        return visit_record
    
    def get_total_visits(self):
        with self.lock:
            try:
                with open(self.filename, 'r') as f:
                    return sum(1 for _ in f)
            except FileNotFoundError:
                return 0