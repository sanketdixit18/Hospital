"use client";

import { useState, useRef, useEffect } from "react";

const MAX_MESSAGES = 10;

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "bot",
  content:
    "Hi, I'm MindEase 💚 — your mental health support companion. I'm here to listen and support you through stress, anxiety, low moods, or anything weighing on your mind. How are you feeling today?",
  timestamp: new Date(),
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && !isLoading) {
      inputRef.current?.focus();
    }
  }, [isOpen, isLoading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage].slice(-MAX_MESSAGES);
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = updatedMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage].slice(-MAX_MESSAGES));
    } catch (err) {
      setError(err.message || "Unable to reach the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open mental health chat"}
        className={`
          fixed bottom-6 left-16 z-50
          w-14 h-14 rounded-full
          bg-teal-500 hover:bg-teal-400
          text-white shadow-lg
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900
          ${isOpen ? "rotate-45 scale-95" : "rotate-0 scale-100"}
        `}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.862 9.862 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`
          fixed bottom-24 right-6 z-50
          w-[360px] max-w-[calc(100vw-24px)]
          bg-gray-900 border border-gray-700
          rounded-2xl shadow-2xl
          flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out origin-bottom-right
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
          }
        `}
        style={{ height: "480px" }}
        role="dialog"
        aria-label="MindEase mental health chat"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 border-b border-gray-700 shrink-0">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
            <span className="text-teal-400 text-base">🧠</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm leading-tight">MindEase</p>
            <p className="text-teal-400 text-xs leading-tight">Mental Health Support</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-gray-400 text-xs">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#374151 transparent" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0 mb-1">
                  <span className="text-xs">🧠</span>
                </div>
              )}
              <div className={`flex flex-col gap-0.5 max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`
                    px-3 py-2 rounded-2xl text-sm leading-relaxed
                    ${msg.role === "user"
                      ? "bg-teal-500 text-white rounded-br-sm"
                      : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-sm"
                    }
                  `}
                >
                  {msg.content}
                </div>
                <span className="text-gray-500 text-[10px] px-1">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
                <span className="text-xs">🧠</span>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-2.5">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mx-2 px-3 py-2 bg-red-900/30 border border-red-700/50 rounded-xl">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-gray-700 bg-gray-800/50 shrink-0">
          <div className="flex items-center gap-2 bg-gray-800 rounded-xl border border-gray-700 px-3 py-2 focus-within:border-teal-500/60 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={isLoading ? "MindEase is typing..." : "Share how you're feeling..."}
              className="flex-1 bg-transparent text-gray-100 text-sm placeholder-gray-500 outline-none disabled:opacity-50 min-w-0"
              maxLength={500}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="
                w-8 h-8 rounded-lg shrink-0
                bg-teal-500 hover:bg-teal-400
                disabled:bg-gray-700 disabled:cursor-not-allowed
                flex items-center justify-center
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-teal-500
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-[10px] text-center mt-1.5">
            Not a substitute for professional mental health care.
          </p>
        </div>
      </div>
    </>
  );
}
