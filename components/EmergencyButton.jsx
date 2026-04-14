"use client";

import { useState, useEffect, useRef } from "react";

const COUNTDOWN_SECONDS = 5;

/**
 * EmergencyButton — floating bottom-right button
 * Usage: Add <EmergencyButton userId={session.user.id} /> to your root layout.jsx
 * It will appear on every page as a floating overlay.
 */
export default function EmergencyButton({ userId = "demo-user" }) {
  const [phase, setPhase] = useState("idle"); // idle | countdown | sending | sent | error
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const timerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startCountdown = () => {
    // Try to get location in parallel
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => {} // Silently continue without location
      );
    }

    setPhase("countdown");
    setCountdown(COUNTDOWN_SECONDS);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          sendAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelCountdown = () => {
    clearInterval(timerRef.current);
    // Notify server of cancellation
    fetch("/api/emergency", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action: "cancel" }),
    }).catch(() => {});
    setPhase("idle");
    setCountdown(COUNTDOWN_SECONDS);
  };

  const sendAlert = async () => {
    setPhase("sending");
    try {
      const res = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          latitude: location?.latitude || null,
          longitude: location?.longitude || null,
          address: location
            ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
            : "Location unavailable",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPhase("sent");
      if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
  new Notification("🚨 Emergency Alert Sent", {
    body: "Your emergency alert has been sent. Help is on the way.",
    icon: "/favicon.ico",
  });
}
      // Auto-reset after 8 seconds
      setTimeout(() => setPhase("idle"), 8000);
    } catch (err) {
      setErrorMsg(err.message || "Alert failed. Call 108 directly.");
      setPhase("error");
      setTimeout(() => setPhase("idle"), 6000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Status Toast */}
        {phase === "sent" && (
          <div
            className="rounded-xl px-4 py-3 text-sm font-medium max-w-xs animate-fade-in"
            style={{ backgroundColor: "#001a12", border: "1px solid #00c89655", color: "#00c896" }}
          >
            ✅ Alert sent! Help is on the way.
          </div>
        )}
        {phase === "error" && (
          <div
            className="rounded-xl px-4 py-3 text-sm font-medium max-w-xs"
            style={{ backgroundColor: "#2a0a0a", border: "1px solid #ff6b6b55", color: "#ff6b6b" }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Countdown Panel */}
        {phase === "countdown" && (
          <div
            className="rounded-2xl p-5 text-center"
            style={{ backgroundColor: "#1a0000", border: "2px solid #ff4444", minWidth: "200px" }}
          >
            <p className="text-sm text-red-400 mb-1">Sending alert in</p>
            <p className="text-5xl font-black text-red-500 mb-3">{countdown}</p>
            <button
              onClick={cancelCountdown}
              className="w-full py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: "#2a0a0a", color: "#ff6b6b", border: "1px solid #ff444444" }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* Main Button */}
        {(phase === "idle" || phase === "sending") && (
          <button
            onClick={phase === "idle" ? startCountdown : undefined}
            disabled={phase === "sending"}
            className="relative w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black shadow-2xl transition-transform"
            style={{
              backgroundColor: phase === "sending" ? "#cc0000" : "#ff2222",
              boxShadow: "0 0 30px #ff222244",
              transform: phase === "sending" ? "scale(0.95)" : undefined,
              cursor: phase === "sending" ? "not-allowed" : "pointer",
            }}
            title="Emergency — Click to send alert"
            onMouseEnter={(e) => { if (phase === "idle") e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={(e) => { if (phase === "idle") e.currentTarget.style.transform = "scale(1)"; }}
          >
            {phase === "sending" ? (
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              "🆘"
            )}
          </button>
        )}

        {/* Sent state button */}
        {phase === "sent" && (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl"
            style={{ backgroundColor: "#00c896", boxShadow: "0 0 30px #00c89644" }}
          >
            ✓
          </div>
        )}
      </div>
    </>
  );
}
