/**
 * OCR UTILITY
 * Uses Tesseract.js for client-side image-to-text extraction
 * Medicine keyword detection runs after extraction
 */

// Common medicine / drug keywords for detection
const MEDICINE_KEYWORDS = [
  // Antibiotics
  "amoxicillin", "azithromycin", "ciprofloxacin", "doxycycline", "metronidazole",
  "penicillin", "cephalexin", "clindamycin", "tetracycline", "erythromycin",
  // Pain / Fever
  "paracetamol", "ibuprofen", "aspirin", "naproxen", "diclofenac",
  "acetaminophen", "tramadol", "codeine", "morphine", "oxycodone",
  // Cardiac
  "atenolol", "metoprolol", "amlodipine", "ramipril", "lisinopril",
  "atorvastatin", "rosuvastatin", "digoxin", "warfarin", "clopidogrel",
  // Diabetes
  "metformin", "glibenclamide", "glipizide", "insulin", "sitagliptin",
  "empagliflozin", "dapagliflozin",
  // Respiratory
  "salbutamol", "budesonide", "fluticasone", "montelukast", "theophylline",
  "tiotropium", "ipratropium",
  // GI
  "omeprazole", "pantoprazole", "ranitidine", "domperidone", "ondansetron",
  "loperamide", "lactulose",
  // Mental Health
  "sertraline", "fluoxetine", "amitriptyline", "alprazolam", "diazepam",
  "clonazepam", "quetiapine", "risperidone",
  // Vitamins / Supplements
  "vitamin", "calcium", "iron", "folic acid", "zinc", "magnesium",
  // Common brand names
  "crocin", "combiflam", "disprin", "augmentin", "zithromax", "norflox",
  "pan", "nexium", "rantac", "voini", "metpure",
];

/**
 * Extract text from an image file using Tesseract.js (browser-side)
 * Call this from the frontend component directly
 * 
 * @param {File} imageFile 
 * @param {Function} onProgress - progress callback (0-100)
 * @returns {Promise<string>} Extracted text
 */
export async function extractTextFromImage(imageFile, onProgress) {
  // Tesseract.js is loaded dynamically to avoid SSR issues
  const { createWorker } = await import("tesseract.js");

  const worker = await createWorker("eng", 1, {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  const { data: { text } } = await worker.recognize(imageFile);
  await worker.terminate();

  return text.trim();
}

/**
 * Detect medicine names from extracted OCR text
 * @param {string} text - Raw OCR text
 * @returns {{ medicines: string[], count: number }}
 */
export function detectMedicines(text) {
  const lowerText = text.toLowerCase();
  const found = [];

  for (const med of MEDICINE_KEYWORDS) {
    // Use word-boundary-like matching
    const regex = new RegExp(`\\b${med}\\b`, "i");
    if (regex.test(lowerText) && !found.includes(med)) {
      found.push(med);
    }
  }

  return {
    medicines: found,
    count: found.length,
  };
}

/**
 * Clean and format raw OCR text for display
 * @param {string} rawText
 * @returns {string}
 */
export function cleanOCRText(rawText) {
  return rawText
    .replace(/\n{3,}/g, "\n\n") // Collapse excessive newlines
    .replace(/[ \t]+/g, " ")    // Normalize spaces
    .trim();
}
