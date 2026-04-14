
import Link from "next/link";

export const metadata = {
  title: "AI Health Features",
  description: "AI-powered healthcare tools",
};

const features = [
  {
    href: "/symptom-checker",
    icon: "🧠",
    title: "AI Symptom Checker",
    description:
      "Select your symptoms and get AI-powered disease predictions with department recommendations.",
    badge: "Powered by ML",
    color: "#00c896",
  },
  {
    href: "/ocr",
    icon: "📄",
    title: "Medical Report Scanner",
    description:
      "Upload a photo of your prescription or report. We extract text and detect medicines automatically.",
    badge: "OCR + AI",
    color: "#00c896",
  },
  {
    href: "/dashboard",
    icon: "📊",
    title: "Health Dashboard",
    description:
      "Track weight, blood pressure, and sugar levels over time with interactive graphs.",
    badge: "Analytics",
    color: "#00c896",
  },
];

export default function AIFeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block"
            style={{ backgroundColor: "#00c89622", color: "#00c896" }}
          >
            AI-Powered
          </span>
          <h1 className="text-3xl font-bold text-white mb-3">
            Smart Health Features
          </h1>
          <p className="text-gray-400">
            Advanced AI tools to help you understand your health better.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="block rounded-2xl p-6 transition-all duration-200 group"
              style={{
                backgroundColor: "#111",
                border: "1px solid #1f1f1f",
              }}
              className="block rounded-2xl p-6 transition-all duration-200 group hover:border-[#00c89655] hover:bg-[#001a12]"
              // onMouseEnter={(e) => {
              //   e.currentTarget.style.borderColor = "#00c89655";
              //   e.currentTarget.style.backgroundColor = "#001a12";
              // }}
              // onMouseLeave={(e) => {
              //   e.currentTarget.style.borderColor = "#1f1f1f";
              //   e.currentTarget.style.backgroundColor = "#111";
              // }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block"
                style={{
                  backgroundColor: "#00c89622",
                  color: "#00c896",
                }}
              >
                {feature.badge}
              </span>
              <h2 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              <div
                className="mt-5 text-sm font-semibold flex items-center gap-1"
                style={{ color: "#00c896" }}
              >
                Open →
              </div>
            </Link>
          ))}
        </div>

        {/* Emergency note */}
        <div
          className="mt-8 rounded-2xl p-5 flex items-start gap-4"
          style={{ backgroundColor: "#1a0000", border: "1px solid #ff444433" }}
        >
          <span className="text-2xl">🆘</span>
          <div>
            <p className="font-semibold text-white mb-1">Emergency Button</p>
            <p className="text-sm text-gray-400">
              The red 🆘 button is always visible at the bottom-right of every
              page. Click it to send an instant emergency alert with your
              location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
