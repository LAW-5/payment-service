from typing import Optional, Tuple
from locust import HttpUser, LoadTestShape, between, task

CLIENT_ID = "locust"
CLIENT_SECRET = "locust"

PRODUCT_ID = 2
USER_CREDENTIAL = {
    "email": "user@example.com",
    "password": "user",
}

class CreateCli(HttpUser):
    wait_time = between(15, 30)
    token = None

    def on_start(self):
        res = self.client.post("/auth/login", json=USER_CREDENTIAL)
        self.token = res.json()["token"]

    @task()
    def get_all_product(self):
        self.client.get("/payment", headers={"Authorization": f"Bearer {self.token}"})

class StagesShape(LoadTestShape):
    stages = [
        {"time": 3600, "users": 100, "spawn_rate": 50}, # first 3 hours
    ]

    def tick(self) -> Optional[Tuple[int, float]]:
        run_time = self.get_run_time()
        for stage in self.stages:
            if run_time < stage["time"]:
                return stage["users"], stage["spawn_rate"]
        return None