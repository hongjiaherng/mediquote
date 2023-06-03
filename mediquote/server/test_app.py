import pandas as pd
import requests
import json

model_names = ["decision-tree", "random-forest", "mlp"]

df = pd.read_csv("../../model_dev/data/medicalpremium.csv")
data = (
    df.sample(n=1)
    .iloc[0]
    .loc[
        [
            "Age",
            "Diabetes",
            "BloodPressureProblems",
            "AnyTransplants",
            "AnyChronicDiseases",
            "Height",
            "Weight",
            "KnownAllergies",
            "HistoryOfCancerInFamily",
            "NumberOfMajorSurgeries",
        ]
    ]
).to_json()

for model_name in model_names:
    print("Testing model:", model_name)

    # Passing the right data
    req = requests.post(f"http://localhost:5000/predict/{model_name}", json=data)
    print(req.status_code, req.reason, req.text)

    # Error handling tests
    # Passing non-json data
    req = requests.post(f"http://localhost:5000/predict/{model_name}", data="abc")
    print(req.status_code, req.reason, req.text)

    # Passing json data with wrong keys
    bad_json = json.loads(data)
    del bad_json["NumberOfMajorSurgeries"]
    bad_json = json.dumps(bad_json)
    req = requests.post(f"http://localhost:5000/predict/{model_name}", json=bad_json)
    print(req.status_code, req.reason, req.text)

    bad_json = json.loads(data)
    bad_json["BadEntry"] = 2
    bad_json = json.dumps(bad_json)
    req = requests.post(f"http://localhost:5000/predict/{model_name}", json=bad_json)
    print(req.status_code, req.reason, req.text)

    bad_json = json.loads(data)
    bad_json["height"] = bad_json.pop("Height")
    bad_json = json.dumps(bad_json)
    req = requests.post(f"http://localhost:5000/predict/{model_name}", json=bad_json)
    print(req.status_code, req.reason, req.text)

    # Passing json data with wrong value types
    bad_json = json.loads(data)
    bad_json["Height"] = "abc"
    bad_json = json.dumps(bad_json)
    req = requests.post(f"http://localhost:5000/predict/{model_name}", json=bad_json)
    print(req.status_code, req.reason, req.text)