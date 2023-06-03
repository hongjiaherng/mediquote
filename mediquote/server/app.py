from flask import Flask, request, jsonify
import joblib
import json
import torch
import numpy as np


app = Flask(__name__)

scaler = joblib.load("./models/standard_scaler.joblib")
models = {
  "decision-tree": joblib.load("./models/decision_tree.joblib"),
  "random-forest": joblib.load("./models/random_forest.joblib"),
  "mlp": torch.load("./models/mlp.pt")
}

# Set the model to evaluation mode
models["mlp"].eval()  

# Define the expected fields (order matters)
expected_fields = [
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

@app.route("/")
def index():
  return "Hello from MediQuote!"

@app.route("/predict/<model_name>", methods=["POST"])
def predict(model_name):
  if not request.is_json:
    return jsonify({"error": "Invalid request: Must pass in JSON"}), 400
  
  try:
    # Get the JSON payload from the request
    data = json.loads(request.get_json())

    # Check for missing or extra fields
    missing_fields = set(expected_fields) - set(data.keys())
    extra_fields = set(data.keys()) - set(expected_fields)
    if missing_fields:
      raise KeyError(f"Missing field(s), {missing_fields}")
    if extra_fields:
      raise KeyError(f"Found invalid field(s), {extra_fields}")
    
    # Extract the features from the JSON payload
    features = [data[field] for field in expected_fields]

    # Convert the features to a numpy array
    features = np.array(features, dtype=np.float32).reshape(1, -1)

    # Scale the features
    features = scaler.transform(features)

    # Make the prediction
    model = models.get(model_name, None)
    if model is None:
      return jsonify({"error": f"Invalid model name: {model_name}"}), 400
    
    if isinstance(model, torch.nn.Module):
      with torch.no_grad():
        features = torch.tensor(features, dtype=torch.float32).view(1, -1)
        prediction = model(features).item()
    else:
      prediction = model.predict(features)[0]

    return jsonify({"prediction": prediction})

  except KeyError as e:
    return jsonify({"error": f"Invalid request: {str(e.args[0])}"}), 400
  except (ValueError, TypeError):
    return jsonify({"error": "Invalid request: Please provide valid numeric values for all features."}), 400
  except Exception as e:
    return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
  app.run(debug=True, port=5000)
