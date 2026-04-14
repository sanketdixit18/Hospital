import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { symptoms } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one symptom." },
        { status: 400 }
      );
    }

    if (!process.env.ML_API_URL) {
      return NextResponse.json({
        success: true,
        predictions: [{
          disease:    "ML service not connected",
          confidence: 0,
          department: "General Medicine",
          note:       "Add ML_API_URL=http://localhost:5000 to your .env file and run python ml/server.py",
        }],
        symptomsUsed: symptoms,
        timestamp:    new Date().toISOString(),
        isMock:       true,
      });
    }

    const { predictDisease } = await import("@/lib/ml");
    const result = await predictDisease(symptoms);
    return NextResponse.json({ success: true, ...result });

  } catch (error) {
    console.error("[predict] Error:", error.message);

    if (error.message?.includes("fetch") || error.message?.includes("ECONNREFUSED")) {
      return NextResponse.json(
        { error: "ML server is not running. Start it with: python ml/server.py" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Prediction failed." },
      { status: 500 }
    );
  }
}