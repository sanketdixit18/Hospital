// "use client";

// import { useState, useEffect } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
//   ResponsiveContainer, ReferenceLine,
// } from "recharts";

// const TEAL = "#00c896";

// // ─── Normal ranges for status indicators ─────────────────────────────────────
// const RANGES = {
//   weight: { low: 50, high: 90, unit: "kg" },
//   bp: { systolicHigh: 140, systolicLow: 90, unit: "mmHg" },
//   sugar: { low: 70, high: 140, unit: "mg/dL" },
// };

// function getStatus(value, type) {
//   if (!value) return "unknown";
//   if (type === "weight") {
//     if (value < RANGES.weight.low) return "low";
//     if (value > RANGES.weight.high) return "high";
//     return "normal";
//   }
//   if (type === "sugar") {
//     if (value < RANGES.sugar.low) return "low";
//     if (value > RANGES.sugar.high) return "high";
//     return "normal";
//   }
//   return "normal";
// }

// const STATUS_COLORS = {
//   normal: TEAL,
//   high: "#ff6b6b",
//   low: "#f0a500",
//   unknown: "#555",
// };

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [addMode, setAddMode] = useState(false);
//   const [form, setForm] = useState({ weight: "", bpSystolic: "", bpDiastolic: "", sugar: "" });
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/health?userId=demo-user");
//       const json = await res.json();
//       if (json.success) {
//         setData(
//           json.data.map((d) => ({
//             ...d,
//             date: new Date(d.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
//             bp: d.bpSystolic ? `${d.bpSystolic}/${d.bpDiastolic}` : null,
//           }))
//         );
//       }
//     } catch (err) {
//       console.error("Failed to fetch health data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await fetch("/api/health", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: "demo-user",
//           weight: form.weight ? parseFloat(form.weight) : null,
//           bpSystolic: form.bpSystolic ? parseInt(form.bpSystolic) : null,
//           bpDiastolic: form.bpDiastolic ? parseInt(form.bpDiastolic) : null,
//           sugar: form.sugar ? parseFloat(form.sugar) : null,
//         }),
//       });
//       setForm({ weight: "", bpSystolic: "", bpDiastolic: "", sugar: "" });
//       setAddMode(false);
//       fetchData();
//     } catch (err) {
//       console.error("Save failed:", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const latest = data[data.length - 1] || {};

//   const stats = [
//     {
//       label: "Weight",
//       value: latest.weight ? `${latest.weight} kg` : "—",
//       status: getStatus(latest.weight, "weight"),
//       icon: "⚖️",
//     },
//     {
//       label: "Blood Pressure",
//       value: latest.bp || "—",
//       status: latest.bpSystolic > 140 ? "high" : latest.bpSystolic < 90 ? "low" : "normal",
//       icon: "🫀",
//     },
//     {
//       label: "Blood Sugar",
//       value: latest.sugar ? `${latest.sugar} mg/dL` : "—",
//       status: getStatus(latest.sugar, "sugar"),
//       icon: "🩸",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: TEAL, borderTopColor: "transparent" }} />
//           <p className="text-gray-400 text-sm">Loading health data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-6 md:p-10">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <span style={{ color: TEAL }} className="text-2xl">📊</span>
//               <h1 className="text-2xl font-bold">Health Dashboard</h1>
//             </div>
//             <p className="text-gray-400 text-sm">Track your vitals over time</p>
//           </div>
//           <button
//             onClick={() => setAddMode(!addMode)}
//             className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
//             style={{ backgroundColor: TEAL, color: "#000" }}
//           >
//             {addMode ? "✕ Cancel" : "+ Add Entry"}
//           </button>
//         </div>

//         {/* Add Entry Form */}
//         {addMode && (
//           <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}>
//             <h3 className="font-semibold mb-4">New Health Entry</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//               <FieldInput label="Weight (kg)" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} placeholder="e.g. 72.5" />
//               <FieldInput label="BP Systolic" value={form.bpSystolic} onChange={(v) => setForm({ ...form, bpSystolic: v })} placeholder="e.g. 120" />
//               <FieldInput label="BP Diastolic" value={form.bpDiastolic} onChange={(v) => setForm({ ...form, bpDiastolic: v })} placeholder="e.g. 80" />
//               <FieldInput label="Sugar (mg/dL)" value={form.sugar} onChange={(v) => setForm({ ...form, sugar: v })} placeholder="e.g. 95" />
//             </div>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="px-6 py-2 rounded-lg text-sm font-semibold"
//               style={{ backgroundColor: TEAL, color: "#000", opacity: saving ? 0.7 : 1 }}
//             >
//               {saving ? "Saving..." : "Save Entry"}
//             </button>
//           </div>
//         )}

//         {/* Stat Cards */}
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           {stats.map((stat) => (
//             <div key={stat.label} className="rounded-xl p-5" style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}>
//               <div className="flex items-center justify-between mb-2">
//                 <span>{stat.icon}</span>
//                 <span
//                   className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
//                   style={{
//                     backgroundColor: STATUS_COLORS[stat.status] + "22",
//                     color: STATUS_COLORS[stat.status],
//                   }}
//                 >
//                   {stat.status}
//                 </span>
//               </div>
//               <p className="text-xl font-bold text-white">{stat.value}</p>
//               <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Charts */}
//         <div className="space-y-6">
//           <ChartCard title="Weight (kg)" color={TEAL} data={data} dataKey="weight" refValue={70} unit="kg" />
//           <ChartCard title="Blood Pressure (Systolic)" color="#ff6b6b" data={data} dataKey="bpSystolic" refValue={120} unit="mmHg" />
//           <ChartCard title="Blood Sugar (mg/dL)" color="#f0a500" data={data} dataKey="sugar" refValue={100} unit="mg/dL" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, color, data, dataKey, refValue, unit }) {
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload?.length) {
//       return (
//         <div className="rounded-lg p-3 text-sm" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
//           <p className="text-gray-400 mb-1">{label}</p>
//           <p className="font-bold" style={{ color }}>
//             {payload[0].value} {unit}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="rounded-xl p-6" style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}>
//       <h3 className="font-semibold text-white mb-5">{title}</h3>
//       {data.length === 0 ? (
//         <p className="text-gray-600 text-sm text-center py-8">No data yet. Add your first entry above.</p>
//       ) : (
//         <ResponsiveContainer width="100%" height={200}>
//           <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
//             <XAxis dataKey="date" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
//             <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <ReferenceLine y={refValue} stroke={color + "44"} strokeDasharray="4 4" />
//             <Line
//               type="monotone"
//               dataKey={dataKey}
//               stroke={color}
//               strokeWidth={2}
//               dot={{ fill: color, r: 4 }}
//               activeDot={{ r: 6 }}
//               connectNulls
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }

// function FieldInput({ label, value, onChange, placeholder }) {
//   return (
//     <div>
//       <label className="block text-xs text-gray-500 mb-1">{label}</label>
//       <input
//         type="number"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white outline-none"
//         style={{ borderColor: "#2a2a2a" }}
//         onFocus={(e) => (e.currentTarget.style.borderColor = "#00c896")}
//         onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
//       />
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const TEAL = "#00c896";

const STATUS = {
  weight: { low: 50,  high: 90,  unit: "kg"     },
  sugar:  { low: 70,  high: 140, unit: "mg/dL"  },
  bp:     { low: 90,  high: 140, unit: "mmHg"   },
};

function getStatus(value, type) {
  if (!value) return "unknown";
  const r = STATUS[type];
  if (value < r.low)  return "low";
  if (value > r.high) return "high";
  return "normal";
}

const STATUS_COLOR = {
  normal:  TEAL,
  high:    "#ff6b6b",
  low:     "#f0a500",
  unknown: "#555",
};

export default function Dashboard() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [form,    setForm]    = useState({
    weight: "", bpSystolic: "", bpDiastolic: "", sugar: "",
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/health");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res  = await fetch("/api/health", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setForm({ weight: "", bpSystolic: "", bpDiastolic: "", sugar: "" });
      setAddMode(false);
      fetchData(); // refresh charts
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const latest = data[data.length - 1] || {};

  const stats = [
    {
      label:  "Weight",
      value:  latest.weight ? `${latest.weight} kg` : "—",
      status: getStatus(latest.weight, "weight"),
      icon:   "⚖️",
    },
    {
      label:  "Blood Pressure",
      value:  latest.bp || "—",
      status: getStatus(latest.bpSystolic, "bp"),
      icon:   "🫀",
    },
    {
      label:  "Blood Sugar",
      value:  latest.sugar ? `${latest.sugar} mg/dL` : "—",
      status: getStatus(latest.sugar, "sugar"),
      icon:   "🩸",
    },
  ];

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3"
            style={{ borderColor: TEAL, borderTopColor: "transparent" }}
          />
          <p className="text-gray-400 text-sm">Loading your health data...</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div
          className="rounded-xl p-6 text-center max-w-sm"
          style={{ backgroundColor: "#2a0a0a", border: "1px solid #5a1a1a" }}
        >
          <p className="text-red-400 mb-3">⚠️ {error}</p>
          <button
            onClick={fetchData}
            className="text-sm px-4 py-2 rounded-lg"
            style={{ backgroundColor: TEAL, color: "#000" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span style={{ color: TEAL }} className="text-2xl">📊</span>
              <h1 className="text-2xl font-bold">Health Dashboard</h1>
            </div>
            <p className="text-gray-400 text-sm">
              Track your vitals over time — data saved to your account
            </p>
          </div>
          <button
            onClick={() => setAddMode(!addMode)}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: TEAL, color: "#000" }}
          >
            {addMode ? "✕ Cancel" : "+ Add Entry"}
          </button>
        </div>

        {/* Add Entry Form */}
        {addMode && (
          <div
            className="rounded-xl p-6 mb-6"
            style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}
          >
            <h3 className="font-semibold mb-4 text-white">New Health Entry</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <Field
                label="Weight (kg)"
                value={form.weight}
                onChange={(v) => setForm({ ...form, weight: v })}
                placeholder="e.g. 72.5"
              />
              <Field
                label="BP Systolic"
                value={form.bpSystolic}
                onChange={(v) => setForm({ ...form, bpSystolic: v })}
                placeholder="e.g. 120"
              />
              <Field
                label="BP Diastolic"
                value={form.bpDiastolic}
                onChange={(v) => setForm({ ...form, bpDiastolic: v })}
                placeholder="e.g. 80"
              />
              <Field
                label="Sugar (mg/dL)"
                value={form.sugar}
                onChange={(v) => setForm({ ...form, sugar: v })}
                placeholder="e.g. 95"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-lg text-sm font-semibold"
              style={{
                backgroundColor: TEAL,
                color: "#000",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : "💾 Save Entry"}
            </button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-5"
              style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span>{stat.icon}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                  style={{
                    backgroundColor: STATUS_COLOR[stat.status] + "22",
                    color:           STATUS_COLOR[stat.status],
                  }}
                >
                  {stat.status}
                </span>
              </div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {data.length === 0 ? (
          <div
            className="rounded-xl p-12 text-center"
            style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}
          >
            <p className="text-4xl mb-3">📋</p>
            <p className="font-semibold text-white mb-2">No health data yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Click "+ Add Entry" above to log your first vitals.
            </p>
            <button
              onClick={() => setAddMode(true)}
              className="text-sm px-4 py-2 rounded-lg"
              style={{ backgroundColor: TEAL, color: "#000" }}
            >
              Add First Entry
            </button>
          </div>
        ) : (
          /* Charts */
          <div className="space-y-6">
            <Chart
              title="⚖️ Weight (kg)"
              data={data}
              dataKey="weight"
              color={TEAL}
              refValue={70}
              unit="kg"
            />
            <Chart
              title="🫀 Blood Pressure — Systolic (mmHg)"
              data={data}
              dataKey="bpSystolic"
              color="#ff6b6b"
              refValue={120}
              unit="mmHg"
            />
            <Chart
              title="🩸 Blood Sugar (mg/dL)"
              data={data}
              dataKey="sugar"
              color="#f0a500"
              refValue={100}
              unit="mg/dL"
            />
          </div>
        )}

      </div>
    </div>
  );
}

// ── Chart Component ───────────────────────────────────────
function Chart({ title, data, dataKey, color, refValue, unit }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div
          className="rounded-lg p-3 text-sm"
          style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
        >
          <p className="text-gray-400 mb-1">{label}</p>
          <p className="font-bold" style={{ color }}>
            {payload[0].value} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#111", border: "1px solid #1f1f1f" }}
    >
      <h3 className="font-semibold text-white mb-5">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#555", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#555", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={refValue}
            stroke={color + "44"}
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Input Field ───────────────────────────────────────────
function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white outline-none"
        style={{ borderColor: "#2a2a2a" }}
        onFocus={(e)  => (e.currentTarget.style.borderColor = "#00c896")}
        onBlur={(e)   => (e.currentTarget.style.borderColor = "#2a2a2a")}
      />
    </div>
  );
}
