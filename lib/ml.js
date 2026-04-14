import { symptomsToBinaryVector, getDepartmentForDisease } from "./symptomMapping.js";

export async function predictDisease(selectedSymptoms) {
  const binaryVector = symptomsToBinaryVector(selectedSymptoms);

  const response = await fetch(`${process.env.ML_API_URL}/predict`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ symptoms: binaryVector }),
    signal:  AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || `ML error: ${response.status}`);
  }

  const data = await response.json();

  return {
    predictions: (data.top_predictions || []).map((pred) => ({
      disease:    pred.disease,
      confidence: Math.round(pred.confidence * 100),
      department: getDepartmentForDisease(pred.disease),
    })),
    symptomsUsed: selectedSymptoms,
    timestamp:    new Date().toISOString(),
  };
}

export async function mockPredictDisease(selectedSymptoms) {
  return {
    predictions: [{
      disease:    "ML service not running",
      confidence: 0,
      department: "General Medicine",
      note:       "Start python ml/server.py and add ML_API_URL=http://localhost:5000 to .env",
    }],
    symptomsUsed: selectedSymptoms,
    timestamp:    new Date().toISOString(),
    isMock:       true,
  };
}