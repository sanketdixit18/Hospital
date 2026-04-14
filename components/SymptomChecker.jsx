// "use client";

// import { useState, useMemo } from "react";
// import { getSymptomOptions } from "@/lib/symptomMapping";

// // ─── Teal accent consistent with existing design ───────────────────────────
// const TEAL = "#00c896";

// export default function SymptomChecker() {
//   const [query, setQuery] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const allSymptoms = useMemo(() => getSymptomOptions(), []);
//   const filtered = useMemo(
//     () =>
//       allSymptoms.filter(
//         (s) =>
//           s.label.toLowerCase().includes(query.toLowerCase()) &&
//           !selected.find((sel) => sel.value === s.value)
//       ),
//     [query, selected, allSymptoms]
//   );

//   const addSymptom = (symptom) => {
//     if (selected.length >= 20) return;
//     setSelected((prev) => [...prev, symptom]);
//     setQuery("");
//   };

//   const removeSymptom = (value) => {
//     setSelected((prev) => prev.filter((s) => s.value !== value));
//   };

//   const handlePredict = async () => {
//     if (selected.length === 0) return;
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const res = await fetch("/api/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symptoms: selected.map((s) => s.value) }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Prediction failed");
//       setResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const topPrediction = result?.predictions?.[0];

//   return (
//     <div className="min-h-screen bg-black text-white p-6 md:p-10">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <span style={{ color: TEAL }} className="text-2xl">🧠</span>
//             <h1 className="text-2xl font-bold">AI Symptom Checker</h1>
//           </div>
//           <p className="text-gray-400 text-sm">
//             Select your symptoms and our AI will suggest possible conditions.
//             This is not a medical diagnosis — always consult a doctor.
//           </p>
//         </div>

//         {/* Symptom Search */}
//         <div
//           className="rounded-xl p-5 mb-5"
//           style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}
//         >
//           <label className="block text-sm font-medium text-gray-300 mb-3">
//             Search & select symptoms ({selected.length}/20)
//           </label>

//           {/* Selected chips */}
//           {selected.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-3">
//               {selected.map((s) => (
//                 <span
//                   key={s.value}
//                   className="flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium cursor-pointer transition-opacity hover:opacity-80"
//                   style={{ backgroundColor: "#00c89622", color: TEAL, border: `1px solid ${TEAL}44` }}
//                   onClick={() => removeSymptom(s.value)}
//                 >
//                   {s.label}
//                   <span className="text-gray-400 hover:text-white">×</span>
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Search input */}
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Type symptom name e.g. headache, fever..."
//             className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-600 border-b pb-2 mb-3"
//             style={{ borderColor: "#2a2a2a" }}
//           />

//           {/* Dropdown */}
//           {query.length > 0 && (
//             <div
//               className="max-h-52 overflow-y-auto rounded-lg"
//               style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
//             >
//               {filtered.length === 0 ? (
//                 <p className="text-gray-500 text-sm p-3">No symptoms found</p>
//               ) : (
//                 filtered.slice(0, 15).map((s) => (
//                   <button
//                     key={s.value}
//                     onClick={() => addSymptom(s)}
//                     className="w-full text-left text-sm px-4 py-2 text-gray-300 transition-colors"
//                     style={{ cursor: "pointer" }}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00c89611")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//                   >
//                     {s.label}
//                   </button>
//                 ))
//               )}
//             </div>
//           )}

//           {/* Quick picks */}
//           {query.length === 0 && selected.length === 0 && (
//             <div>
//               <p className="text-xs text-gray-600 mb-2">Common symptoms:</p>
//               <div className="flex flex-wrap gap-2">
//                 {["Fever", "Headache", "Cough", "Fatigue", "Nausea", "Vomiting", "Chest pain", "Dizziness"].map((label) => {
//                   const found = allSymptoms.find((s) => s.label === label);
//                   return found ? (
//                     <button
//                       key={label}
//                       onClick={() => addSymptom(found)}
//                       className="text-xs px-3 py-1 rounded-full transition-colors"
//                       style={{ backgroundColor: "#1a1a1a", color: "#aaa", border: "1px solid #2a2a2a" }}
//                       onMouseEnter={(e) => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.color = TEAL; }}
//                       onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#aaa"; }}
//                     >
//                       + {label}
//                     </button>
//                   ) : null;
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Predict Button */}
//         <button
//           onClick={handlePredict}
//           disabled={selected.length === 0 || loading}
//           className="w-full py-3 rounded-xl font-semibold text-sm transition-all mb-6"
//           style={{
//             backgroundColor: selected.length === 0 || loading ? "#1a1a1a" : TEAL,
//             color: selected.length === 0 || loading ? "#555" : "#000",
//             cursor: selected.length === 0 || loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <SpinnerIcon /> Analyzing symptoms...
//             </span>
//           ) : (
//             "🔍 Predict Condition"
//           )}
//         </button>

//         {/* Error */}
//         {error && (
//           <div
//             className="rounded-xl p-4 mb-6 text-sm"
//             style={{ backgroundColor: "#2a0a0a", border: "1px solid #5a1a1a", color: "#ff6b6b" }}
//           >
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Results */}
//         {result && (
//           <div className="space-y-4">
//             {result.isMock && (
//               <div
//                 className="text-xs px-3 py-2 rounded-lg"
//                 style={{ backgroundColor: "#1a1400", color: "#f0a500", border: "1px solid #3a2e00" }}
//               >
//                 ⚡ Demo mode: Set ML_API_URL in .env to use your trained model.pkl
//               </div>
//             )}

//             <h2 className="text-lg font-semibold" style={{ color: TEAL }}>
//               Prediction Results
//             </h2>

//             {result.predictions.map((pred, i) => (
//               <PredictionCard key={i} prediction={pred} isTop={i === 0} />
//             ))}

//             {/* Book Appointment CTA */}
//             {topPrediction && (
//               <div
//                 className="rounded-xl p-5 mt-4"
//                 style={{ backgroundColor: "#00c89611", border: `1px solid ${TEAL}33` }}
//               >
//                 <p className="text-sm text-gray-300 mb-1">
//                   Based on your symptoms, we recommend visiting:
//                 </p>
//                 <p className="text-xl font-bold mb-3" style={{ color: TEAL }}>
//                   {topPrediction.department}
//                 </p>
//                 <a
//                   href={`/doctors?specialty=${encodeURIComponent(topPrediction.department)}`}
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: TEAL, color: "#000" }}
//                 >
//                   📅 Book Appointment →
//                 </a>
//               </div>
//             )}

//             <p className="text-xs text-gray-600 pt-2">
//               ⚠️ This AI analysis is for informational purposes only. Always consult a qualified healthcare professional for medical advice.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function PredictionCard({ prediction, isTop }) {
//   const TEAL = "#00c896";
//   return (
//     <div
//       className="rounded-xl p-5 transition-all"
//       style={{
//         backgroundColor: isTop ? "#001a12" : "#0d0d0d",
//         border: `1px solid ${isTop ? TEAL + "55" : "#1f1f1f"}`,
//       }}
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           {isTop && (
//             <span
//               className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
//               style={{ backgroundColor: TEAL + "22", color: TEAL }}
//             >
//               TOP MATCH
//             </span>
//           )}
//           <h3 className="font-semibold text-white">{prediction.disease}</h3>
//           <p className="text-xs text-gray-500 mt-0.5">{prediction.department}</p>
//         </div>
//         <div className="text-right">
//           <span className="text-2xl font-bold" style={{ color: isTop ? TEAL : "#666" }}>
//             {prediction.confidence}%
//           </span>
//           <p className="text-xs text-gray-600">confidence</p>
//         </div>
//       </div>

//       {/* Confidence bar */}
//       <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1f1f1f" }}>
//         <div
//           className="h-full rounded-full transition-all duration-700"
//           style={{
//             width: `${prediction.confidence}%`,
//             backgroundColor: isTop ? TEAL : "#444",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// function SpinnerIcon() {
//   return (
//     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//     </svg>
//   );
// }



"use client";

import { useState, useMemo, useRef } from "react";
import { getSymptomOptions } from "@/lib/symptomMapping";
import Link from "next/link";

const TEAL = "#00c896";

// All symptoms a user might type that aren't in the dataset —
// we map them to the closest dataset column
const ALIAS_MAP = {
  "shortness of breath"   : "breathlessness",
  "short of breath"       : "breathlessness",
  "difficulty breathing"  : "breathlessness",
  "can't breathe"         : "breathlessness",
  "hard to breathe"       : "breathlessness",
  "breathless"            : "breathlessness",
  "chest tightness"       : "chest_pain",
  "chest discomfort"      : "chest_pain",
  "heart pain"            : "chest_pain",
  "fever"                 : "high_fever",
  "temperature"           : "high_fever",
  "low fever"             : "mild_fever",
  "slight fever"          : "mild_fever",
  "throwing up"           : "vomiting",
  "feel sick"             : "nausea",
  "stomach ache"          : "stomach_pain",
  "tummy pain"            : "abdominal_pain",
  "loose motion"          : "diarrhoea",
  "loose motions"         : "diarrhoea",
  "loose stool"           : "diarrhoea",
  "runny stool"           : "diarrhoea",
  "motions"               : "diarrhoea",
  "tired"                 : "fatigue",
  "tiredness"             : "fatigue",
  "weakness"              : "fatigue",
  "body ache"             : "muscle_pain",
  "body pain"             : "muscle_pain",
  "body aches"            : "muscle_pain",
  "sore throat"           : "throat_irritation",
  "throat pain"           : "throat_irritation",
  "sneezing"              : "continuous_sneezing",
  "blocked nose"          : "congestion",
  "stuffy nose"           : "congestion",
  "nose block"            : "congestion",
  "watery eyes"           : "watering_from_eyes",
  "red eyes"              : "redness_of_eyes",
  "yellow eyes"           : "yellowing_of_eyes",
  "yellow skin"           : "yellowish_skin",
  "jaundice"              : "yellowish_skin",
  "dark pee"              : "dark_urine",
  "pain while urinating"  : "burning_micturition",
  "painful urination"     : "burning_micturition",
  "frequent urination"    : "polyuria",
  "frequent pee"          : "polyuria",
  "sugar"                 : "irregular_sugar_level",
  "blood sugar"           : "irregular_sugar_level",
  "acne"                  : "pus_filled_pimples",
  "pimples"               : "pus_filled_pimples",
  "rash"                  : "skin_rash",
  "hives"                 : "skin_rash",
  "itchy skin"            : "itching",
  "itchy"                 : "itching",
  "back ache"             : "back_pain",
  "lower back pain"       : "back_pain",
  "knee ache"             : "knee_pain",
  "joint ache"            : "joint_pain",
  "shoulder pain"         : "joint_pain",
  "neck stiffness"        : "stiff_neck",
  "anxiety"               : "anxiety",
  "stress"                : "anxiety",
  "panic"                 : "anxiety",
  "depression"            : "depression",
  "sad"                   : "depression",
  "mood"                  : "mood_swings",
  "vertigo"               : "spinning_movements",
  "loss of smell"         : "loss_of_smell",
  "no smell"              : "loss_of_smell",
  "blurry vision"         : "blurred_and_distorted_vision",
  "blurred vision"        : "blurred_and_distorted_vision",
  "phlegm"                : "phlegm",
  "mucus"                 : "phlegm",
  "coughing blood"        : "blood_in_sputum",
  "blood in cough"        : "blood_in_sputum",
  "palpitation"           : "palpitations",
  "irregular heartbeat"   : "palpitations",
  "heart racing"          : "fast_heart_rate",
  "rapid heart"           : "fast_heart_rate",
  "swollen legs"          : "swollen_legs",
  "leg swelling"          : "swollen_legs",
  "ankle swelling"        : "swollen_legs",
  "cold feet"             : "cold_hands_and_feets",
  "cold hands"            : "cold_hands_and_feets",
  "weight gain"           : "weight_gain",
  "gaining weight"        : "weight_gain",
  "weight loss"           : "weight_loss",
  "losing weight"         : "weight_loss",
  "hair loss"             : "skin_peeling",
  "dandruff"              : "skin_peeling",
  "blood in urine"        : "spotting_urination",
  "urine infection"       : "burning_micturition",
  "uti"                   : "burning_micturition",
};

const QUICK_PICKS = [
  { value: "high_fever",      label: "Fever" },
  { value: "headache",        label: "Headache" },
  { value: "cough",           label: "Cough" },
  { value: "fatigue",         label: "Fatigue" },
  { value: "nausea",          label: "Nausea" },
  { value: "vomiting",        label: "Vomiting" },
  { value: "chest_pain",      label: "Chest Pain" },
  { value: "sweating",        label: "Sweating" },
  { value: "breathlessness",  label: "Shortness of Breath" },
  { value: "dizziness",       label: "Dizziness" },
  { value: "skin_rash",       label: "Skin Rash" },
  { value: "joint_pain",      label: "Joint Pain" },
  { value: "stomach_pain",    label: "Stomach Pain" },
  { value: "diarrhoea",       label: "Diarrhoea" },
  { value: "back_pain",       label: "Back Pain" },
  { value: "anxiety",         label: "Anxiety" },
];

export default function SymptomChecker() {
  const [query, setQuery]     = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);
  const inputRef              = useRef(null);

  const allSymptoms = useMemo(() => getSymptomOptions(), []);

  // Resolve alias → canonical symptom key
  const resolveAlias = (text) => {
    const lower = text.toLowerCase().trim();
    if (ALIAS_MAP[lower]) return ALIAS_MAP[lower];
    // Partial alias match
    for (const [alias, key] of Object.entries(ALIAS_MAP)) {
      if (lower.includes(alias) || alias.includes(lower)) return key;
    }
    return null;
  };

  const filtered = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return allSymptoms.filter(
      (s) =>
        (s.label.toLowerCase().includes(q) ||
          s.value.toLowerCase().includes(q)) &&
        !selected.find((sel) => sel.value === s.value)
    );
  }, [query, selected, allSymptoms]);

  const addSymptom = (symptom) => {
    if (selected.find((s) => s.value === symptom.value)) return;
    setSelected((prev) => [...prev, symptom]);
    setQuery("");
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      // Try alias resolution first
      const resolved = resolveAlias(query);
      if (resolved) {
        const found = allSymptoms.find((s) => s.value === resolved);
        if (found) { addSymptom(found); return; }
      }
      // Try direct match from filtered list
      if (filtered.length > 0) {
        addSymptom(filtered[0]);
        return;
      }
      // Unknown symptom — add as custom so user knows it was received
      // but map to closest known symptom
      const closest = allSymptoms.find((s) =>
        s.label.toLowerCase().includes(query.toLowerCase())
      );
      if (closest) addSymptom(closest);
    }
    if (e.key === "Backspace" && !query && selected.length > 0) {
      setSelected((prev) => prev.slice(0, -1));
    }
  };

  const removeSymptom = (value) =>
    setSelected((prev) => prev.filter((s) => s.value !== value));

  const handlePredict = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selected.map((s) => s.value) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Prediction failed");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const topPrediction = result?.predictions?.[0];
  const hasNoMatch =
    result?.predictions?.length === 1 &&
    result.predictions[0].confidence === 0;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span style={{ color: TEAL }} className="text-2xl">🧠</span>
            <h1 className="text-2xl font-bold">AI Symptom Checker</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Type any symptom in plain English — e.g. "shortness of breath",
            "chest tightness", "loose motion". Press Enter or select from
            the dropdown. No limit on symptoms.
          </p>
        </div>

        {/* Input Box */}
        <div
          className="rounded-xl p-4 mb-5"
          style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Selected chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {selected.map((s) => (
              <span
                key={s.value}
                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: "#00c89622",
                  color: TEAL,
                  border: `1px solid ${TEAL}44`,
                }}
              >
                {s.label}
                <button
                  onClick={(e) => { e.stopPropagation(); removeSymptom(s.value); }}
                  className="ml-1 hover:text-white transition-colors"
                  style={{ color: "#00c89699" }}
                >
                  ×
                </button>
              </span>
            ))}

            {/* Text input inline */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={
                selected.length === 0
                  ? 'Type symptom e.g. "chest pain", "loose motion", "breathless"...'
                  : "Add more symptoms..."
              }
              className="flex-1 min-w-48 bg-transparent outline-none text-sm text-white placeholder-gray-600"
              style={{ minWidth: "200px" }}
            />
          </div>

          {/* Dropdown */}
          {query.length > 0 && (
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: "1px solid #2a2a2a", backgroundColor: "#1a1a1a" }}
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-3">
                  <p className="text-gray-500 text-sm mb-1">
                    No exact match for "{query}"
                  </p>
                  {resolveAlias(query) && (() => {
                    const resolved = allSymptoms.find(
                      (s) => s.value === resolveAlias(query)
                    );
                    return resolved ? (
                      <button
                        onClick={() => addSymptom(resolved)}
                        className="text-xs px-3 py-1.5 rounded-lg"
                        style={{
                          backgroundColor: "#00c89622",
                          color: TEAL,
                          border: `1px solid ${TEAL}44`,
                        }}
                      >
                        ✓ Did you mean: {resolved.label}?
                      </button>
                    ) : null;
                  })()}
                </div>
              ) : (
                <div className="max-h-56 overflow-y-auto">
                  {filtered.slice(0, 20).map((s) => (
                    <button
                      key={s.value}
                      onClick={() => addSymptom(s)}
                      className="w-full text-left text-sm px-4 py-2.5 text-gray-300 transition-colors flex items-center gap-2"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#00c89611")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <span style={{ color: TEAL }}>+</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick picks */}
          {query.length === 0 && (
            <div className="mt-1">
              <p className="text-xs text-gray-600 mb-2">Quick picks:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PICKS.filter(
                  (q) => !selected.find((s) => s.value === q.value)
                ).map((s) => (
                  <button
                    key={s.value}
                    onClick={() => addSymptom(s)}
                    className="text-xs px-3 py-1 rounded-full transition-all"
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "#888",
                      border: "1px solid #2a2a2a",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = TEAL;
                      e.currentTarget.style.color = TEAL;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#2a2a2a";
                      e.currentTarget.style.color = "#888";
                    }}
                  >
                    + {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected count */}
        {selected.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-gray-500">
              {selected.length} symptom{selected.length > 1 ? "s" : ""} selected
            </p>
            <button
              onClick={() => setSelected([])}
              className="text-xs text-gray-600 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={selected.length === 0 || loading}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-all mb-6"
          style={{
            backgroundColor:
              selected.length === 0 || loading ? "#1a1a1a" : TEAL,
            color: selected.length === 0 || loading ? "#555" : "#000",
            cursor:
              selected.length === 0 || loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <SpinnerIcon />
              Analyzing {selected.length} symptom{selected.length > 1 ? "s" : ""}...
            </span>
          ) : (
            `🔍 Predict Condition${selected.length > 0 ? ` (${selected.length} symptoms)` : ""}`
          )}
        </button>

        {/* Error */}
        {error && (
          <div
            className="rounded-xl p-4 mb-6 text-sm"
            style={{
              backgroundColor: "#2a0a0a",
              border: "1px solid #5a1a1a",
              color: "#ff6b6b",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Mock mode warning */}
            {result.isMock && (
              <div
                className="text-xs px-3 py-2 rounded-lg flex items-center gap-2"
                style={{
                  backgroundColor: "#1a1400",
                  color: "#f0a500",
                  border: "1px solid #3a2e00",
                }}
              >
                ⚡ Running in demo mode. Train your model and set ML_API_URL for real predictions.
              </div>
            )}

            {/* No match found */}
            {hasNoMatch ? (
              <div
                className="rounded-xl p-6 text-center"
                style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}
              >
                <p className="text-4xl mb-3">🤔</p>
                <p className="font-semibold text-white mb-2">
                  Symptoms don't match a clear pattern
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Try adding more specific symptoms or rephrase them.
                </p>
                <button
                  onClick={() => { setResult(null); setSelected([]); inputRef.current?.focus(); }}
                  className="text-sm px-4 py-2 rounded-lg"
                  style={{ backgroundColor: TEAL, color: "#000" }}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold" style={{ color: TEAL }}>
                  Prediction Results
                </h2>

                {result.predictions.map((pred, i) => (
                  <PredictionCard key={i} prediction={pred} isTop={i === 0} />
                ))}

                {/* Book Appointment CTA */}
                {topPrediction && topPrediction.confidence > 0 && (
                  <div
                    className="rounded-xl p-5 mt-2"
                    style={{
                      backgroundColor: "#00c89611",
                      border: `1px solid ${TEAL}33`,
                    }}
                  >
                    {/* <p className="text-sm text-gray-300 mb-1">
                      Recommended department:
                    </p>
                    <p className="text-xl font-bold mb-3" style={{ color: TEAL }}>
                      {topPrediction.department}
                    </p> */}
                    <p className="text-sm text-gray-300 mb-1">
                  Based on your symptoms, we recommend visiting:
                </p>
                <p className="text-xl font-bold mb-3" style={{ color: TEAL }}>
                  {topPrediction.department}
                </p>
                    <Link
                    href={`/doctors?specialty=${encodeURIComponent(topPrediction.department)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: TEAL, color: "#000" }}
                  >
                    📅 Book Appointment →
                  </Link>
                                    </div>
                                  )}
                                </>
                              )}

            <p className="text-xs text-gray-600 pt-1">
              ⚠️ For informational purposes only. Always consult a qualified
              doctor for medical advice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// function PredictionCard({ prediction, isTop }) {
//   const TEAL = "#00c896";
//   return (
//     <div
//       className="rounded-xl p-5"
//       style={{
//         backgroundColor: isTop ? "#001a12" : "#0d0d0d",
//         border: `1px solid ${isTop ? TEAL + "55" : "#1f1f1f"}`,
//       }}
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           {isTop && (
//             <span
//               className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
//               style={{ backgroundColor: TEAL + "22", color: TEAL }}
//             >
//               TOP MATCH
//             </span>
//           )}
//           <h3 className="font-semibold text-white text-base">
//             {prediction.disease}
//           </h3>
//           <p className="text-xs text-gray-500 mt-0.5">{prediction.department}</p>
//           {prediction.note && (
//             <p className="text-xs text-yellow-500 mt-1">{prediction.note}</p>
//           )}
//         </div>
//         <div className="text-right ml-4">
//           <span
//             className="text-2xl font-bold"
//             style={{ color: isTop ? TEAL : "#666" }}
//           >
//             {prediction.confidence}%
//           </span>
//           <p className="text-xs text-gray-600">confidence</p>
//         </div>
//       </div>
//       <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1f1f1f" }}>
//         <div
//           className="h-full rounded-full transition-all duration-700"
//           style={{
//             width: `${prediction.confidence}%`,
//             backgroundColor: isTop ? TEAL : "#444",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// Find this in your SymptomChecker.jsx and replace it:

function PredictionCard({ prediction, isTop }) {
  const TEAL = "#00c896";
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: isTop ? "#001a12" : "#0d0d0d",
        border: `1px solid ${isTop ? TEAL + "55" : "#1f1f1f"}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {isTop && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
              style={{ backgroundColor: TEAL + "22", color: TEAL }}
            >
              TOP MATCH
            </span>
          )}
          <h3 className="font-semibold text-white text-base">
            {prediction.disease}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{prediction.department}</p>

          {/* AI Reason — shown when Claude provides it */}
          {prediction.reason && (
            <p className="text-xs mt-2 italic" style={{ color: "#888" }}>
              💡 {prediction.reason}
            </p>
          )}

          {prediction.note && (
            <p className="text-xs text-yellow-500 mt-1">{prediction.note}</p>
          )}
        </div>
        <div className="text-right ml-4">
          <span
            className="text-2xl font-bold"
            style={{ color: isTop ? TEAL : "#666" }}
          >
            {prediction.confidence}%
          </span>
          <p className="text-xs text-gray-600">confidence</p>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1f1f1f" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${prediction.confidence}%`,
            backgroundColor: isTop ? TEAL : "#444",
          }}
        />
      </div>
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}