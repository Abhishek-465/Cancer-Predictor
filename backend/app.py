from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


# Load model & scaler
model = joblib.load("cancer_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define request schema
class CancerData(BaseModel):
    features: list  # list of feature values

# Init FastAPI
app = FastAPI(title="Cancer Prediction API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this to ["http://localhost:5173"] later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Cancer Prediction API"}

@app.post("/predict")
def predict(data: CancerData):
    # Convert input to numpy array
    X = np.array(data.features).reshape(1, -1)
    
    # Scale features
    X_scaled = scaler.transform(X)
    
    # Predict
    prediction = model.predict(X_scaled)[0]
    
    return {"prediction": str(prediction)}
