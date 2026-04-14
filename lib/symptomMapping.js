/**
 * SYMPTOM MAPPING UTILITY
 * 
 * This file defines the canonical symptom list used for ML model input.
 * The ORDER of symptoms MUST match the order used during model training.
 * 
 * When you plug in your model.pkl:
 *   - Ensure the feature order here matches your training data columns
 *   - Update SYMPTOM_LIST if your training used different symptom names
 */

export const SYMPTOM_LIST = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering",
  "chills", "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue",
  "muscle_wasting", "vomiting", "burning_micturition", "spotting_urination", "fatigue",
  "weight_gain", "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss",
  "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level", "cough",
  "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration",
  "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea",
  "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain",
  "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure",
  "fluid_overload", "swelling_of_stomach", "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision",
  "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose",
  "congestion", "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_motions",
  "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness",
  "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels",
  "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "excessive_hunger",
  "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech", "knee_pain", "hip_joint_pain",
  "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness", "spinning_movements",
  "loss_of_balance", "unsteadiness", "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort",
  "foul_smell_of_urine", "continuous_feel_of_urine", "passage_of_gases", "internal_itching", "toxic_look_(typhos)",
  "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
  "belly_pain", "abnormal_menstruation", "dischromic_patches", "watering_from_eyes", "increased_appetite",
  "polyuria", "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration",
  "visual_disturbances", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding",
  "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload", "blood_in_sputum", "prominent_veins_on_calf",
  "palpitations", "painful_walking", "pus_filled_pimples", "blackheads", "scurring",
  "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails", "blister",
  "red_sore_around_nose", "yellow_crust_ooze"
];

/**
 * Friendly display labels for symptoms shown in the UI
 */
export const SYMPTOM_LABELS = {
  itching: "Itching",
  skin_rash: "Skin Rash",
  continuous_sneezing: "Continuous Sneezing",
  shivering: "Shivering",
  chills: "Chills",
  joint_pain: "Joint Pain",
  stomach_pain: "Stomach Pain",
  fatigue: "Fatigue",
  vomiting: "Vomiting",
  high_fever: "High Fever",
  headache: "Headache",
  nausea: "Nausea",
  loss_of_appetite: "Loss of Appetite",
  back_pain: "Back Pain",
  constipation: "Constipation",
  abdominal_pain: "Abdominal Pain",
  diarrhoea: "Diarrhoea",
  mild_fever: "Mild Fever",
  chest_pain: "Chest Pain",
  dizziness: "Dizziness",
  cough: "Cough",
  breathlessness: "Breathlessness",
  sweating: "Sweating",
  dehydration: "Dehydration",
  indigestion: "Indigestion",
  yellowish_skin: "Yellowish Skin",
  dark_urine: "Dark Urine",
  weight_loss: "Weight Loss",
  weight_gain: "Weight Gain",
  anxiety: "Anxiety",
  mood_swings: "Mood Swings",
  restlessness: "Restlessness",
  lethargy: "Lethargy",
  muscle_pain: "Muscle Pain",
  neck_pain: "Neck Pain",
  knee_pain: "Knee Pain",
  hip_joint_pain: "Hip Joint Pain",
  swelling_joints: "Swelling Joints",
  muscle_weakness: "Muscle Weakness",
  stiff_neck: "Stiff Neck",
  depression: "Depression",
  irritability: "Irritability",
  fast_heart_rate: "Fast Heart Rate",
  palpitations: "Palpitations",
  runny_nose: "Runny Nose",
  congestion: "Congestion",
  throat_irritation: "Throat Irritation",
  phlegm: "Phlegm",
  loss_of_smell: "Loss of Smell",
  blurred_and_distorted_vision: "Blurred Vision",
  redness_of_eyes: "Redness of Eyes",
  watering_from_eyes: "Watering Eyes",
  excessive_hunger: "Excessive Hunger",
  increased_appetite: "Increased Appetite",
  polyuria: "Frequent Urination",
  irregular_sugar_level: "Irregular Sugar Level",
  obesity: "Obesity",
  swollen_legs: "Swollen Legs",
  bruising: "Bruising",
  skin_peeling: "Skin Peeling",
  blister: "Blisters",
  pus_filled_pimples: "Pus-filled Pimples",
  blackheads: "Blackheads",
};

/**
 * Department recommendations based on disease predictions
 * Add more mappings as needed to match your model's output classes
 */
export const DISEASE_TO_DEPARTMENT = {
  "Fungal infection": "Dermatology",
  "Allergy": "General Medicine",
  "GERD": "Gastroenterology",
  "Chronic cholestasis": "Gastroenterology",
  "Drug Reaction": "General Medicine",
  "Peptic ulcer diseae": "Gastroenterology",
  "AIDS": "General Medicine",
  "Diabetes": "Endocrinology",
  "Gastroenteritis": "Gastroenterology",
  "Bronchial Asthma": "Pulmonology",
  "Hypertension": "Cardiology",
  "Migraine": "Neurology",
  "Cervical spondylosis": "Orthopedics",
  "Paralysis (brain hemorrhage)": "Neurology",
  "Jaundice": "Gastroenterology",
  "Malaria": "General Medicine",
  "Chicken pox": "General Medicine",
  "Dengue": "General Medicine",
  "Typhoid": "General Medicine",
  "hepatitis A": "Gastroenterology",
  "Hepatitis B": "Gastroenterology",
  "Hepatitis C": "Gastroenterology",
  "Hepatitis D": "Gastroenterology",
  "Hepatitis E": "Gastroenterology",
  "Alcoholic hepatitis": "Gastroenterology",
  "Tuberculosis": "Pulmonology",
  "Common Cold": "General Medicine",
  "Pneumonia": "Pulmonology",
  "Dimorphic hemmorhoids(piles)": "General Medicine",
  "Heart attack": "Cardiology",
  "Varicose veins": "Cardiology",
  "Hypothyroidism": "Endocrinology",
  "Hyperthyroidism": "Endocrinology",
  "Hypoglycemia": "Endocrinology",
  "Osteoarthristis": "Orthopedics",
  "Arthritis": "Orthopedics",
  "(vertigo) Paroymsal Positional Vertigo": "Neurology",
  "Acne": "Dermatology",
  "Urinary tract infection": "General Medicine",
  "Psoriasis": "Dermatology",
  "Impetigo": "Dermatology",
};

/**
 * Convert selected symptom names to a binary feature vector
 * @param {string[]} selectedSymptoms - Array of symptom keys
 * @returns {number[]} Binary array in the same order as SYMPTOM_LIST
 */
export function symptomsToBinaryVector(selectedSymptoms) {
  const selectedSet = new Set(selectedSymptoms);
  return SYMPTOM_LIST.map((symptom) => (selectedSet.has(symptom) ? 1 : 0));
}

/**
 * Get department for a given disease
 * @param {string} disease
 * @returns {string}
 */
export function getDepartmentForDisease(disease) {
  return DISEASE_TO_DEPARTMENT[disease] || "General Medicine";
}

/**
 * Returns searchable list for the symptom selector UI
 */
export function getSymptomOptions() {
  return Object.entries(SYMPTOM_LABELS).map(([value, label]) => ({ value, label }));
}
