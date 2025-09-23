import React, { useState } from "react";
import axios from "axios";

function App() {
  const [features, setFeatures] = useState({
    Age: "",
    Gender: "",
    BMI: "",
    Smoking: "",
    GeneticRisk: "",
    PhysicalActivity: "",
    AlcoholIntake: "",
    CancerHistory: "",
  });

  const [result, setResult] = useState(null);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures({ ...features, [name]: value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const featureArray = Object.values(features).map(Number);
      const response = await axios.post("https://cancer-predictor-indol.vercel.app/predict", {
        features: featureArray,
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-6">
      <div className="bg-gray-50 shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-xl lg:text-3xl font-extrabold text-center text-indigo-800 mb-6">
          🩺 Cancer Risk Prediction
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Age (20–80)
            </label>
            <input
              type="number"
              min="20"
              max="80"
              name="Age"
              value={features.Age}
              onChange={handleChange}
              placeholder="Enter Age"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="Gender"
              value={features.Gender}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            >
              <option value="">Select</option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
          </div>

          {/* BMI */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              BMI (15–40)
            </label>
            <input
              type="number"
              step="0.1"
              min="15"
              max="40"
              name="BMI"
              value={features.BMI}
              onChange={handleChange}
              placeholder="Enter BMI"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            />
          </div>

          {/* Smoking */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Smoking
            </label>
            <select
              name="Smoking"
              value={features.Smoking}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            >
              <option value="">Select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Genetic Risk */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Genetic Risk
            </label>
            <select
              name="GeneticRisk"
              value={features.GeneticRisk}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            >
              <option value="">Select</option>
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
            </select>
          </div>

          {/* Physical Activity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Physical Activity (hrs/week, 0–10)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="PhysicalActivity"
              value={features.PhysicalActivity}
              onChange={handleChange}
              placeholder="Hours per week"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            />
          </div>

          {/* Alcohol Intake */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Alcohol Intake (units/week, 0–5)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              name="AlcoholIntake"
              value={features.AlcoholIntake}
              onChange={handleChange}
              placeholder="Units per week"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            />
          </div>

          {/* Cancer History */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cancer History
            </label>
            <select
              name="CancerHistory"
              value={features.CancerHistory}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              required
            >
              <option value="">Select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
            >
              Predict
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-pink-50 border rounded-2xl shadow-inner items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
              Prediction:{" "}
              <span className="text-indigo-600">{(result.prediction==1)?"Cancer is present":"Cancer is not present"}</span>
            </h2>
          </div>
        )}
      </div>
<div className="mt-12 p-6 bg-gray-100 rounded-2xl shadow-md text-center w-full">
  <h3 className="text-lg font-bold mb-2">AI Model Details</h3>
  <p className="text-gray-700 mb-4">
    This cancer risk prediction model is trained on a dataset of <strong>1500 patient records </strong> 
    and achieves an accuracy of <strong>94.6%</strong>.
  </p>
  <div className="flex justify-center">
    <img
      src="./frontend/src/assets/download.png" // replace with your image path
      alt="Confusion Matrix"
      className="w-64 h-64 object-contain rounded-lg shadow-lg"
    />
  </div>
    <p className="text-gray-700 my-4">
    Made by Abhishek.
  </p>
</div>
    </div>
  );
}

export default App;
