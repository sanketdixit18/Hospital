/**
 * API ROUTE: /api/ocr
 * 
 * Receives extracted text from frontend Tesseract.js OCR,
 * runs medicine detection, and optionally saves the report.
 * 
 * Note: The actual OCR (image → text) is done client-side in OCRUploader.jsx
 * using Tesseract.js to avoid heavy server-side processing.
 * This route handles post-processing and persistence.
 */

import { NextResponse } from "next/server";
import { detectMedicines, cleanOCRText } from "@/lib/ocr";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, fileName, userId, save } = body;

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        { error: "Extracted text is too short or empty. Please upload a clearer image." },
        { status: 400 }
      );
    }

    // Clean and process text
    const cleanedText = cleanOCRText(text);

    // Detect medicines
    const { medicines } = detectMedicines(cleanedText);

    // Optional: Save to database
    // Uncomment once Prisma schema is migrated:
    //
    // if (save && userId) {
    //   const { prisma } = await import("@/lib/prisma");
    //   await prisma.report.create({
    //     data: {
    //       userId,
    //       text: cleanedText,
    //       medicines: JSON.stringify(medicines),
    //       fileName: fileName || null,
    //     },
    //   });
    // }

    return NextResponse.json({
      success: true,
      text: cleanedText,
      medicines,
      medicineCount: medicines.length,
      wordCount: cleanedText.split(/\s+/).filter(Boolean).length,
      savedAt: save ? new Date().toISOString() : null,
    });
  } catch (error) {
    console.error("[ocr] Error:", error.message);
    return NextResponse.json(
      { error: "Report processing failed. Please try again." },
      { status: 500 }
    );
  }
}
