// import { NextResponse } from "next/server";

// const GEMINI_API_URL =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// const SYSTEM_PROMPT = `You are a compassionate mental health support assistant named "MindEase". 

// Your role:
// - ONLY answer questions related to mental health, stress, anxiety, depression, motivation, emotional wellbeing, mindfulness, self-care, and psychological wellness.
// - If the user asks about anything outside these topics, politely decline and redirect: "I'm here specifically to support your mental health and emotional wellbeing. I'm not able to help with that topic, but I'm here if you'd like to talk about how you're feeling."

// Safety rules:
// - NEVER provide medical diagnoses or prescribe medications.
// - If the user expresses thoughts of self-harm or suicide, respond with warmth and urgency: acknowledge their pain, encourage them to reach out to a professional or helpline immediately (e.g., iCall India: 9152987821, Vandrevala Foundation: 1860-2662-345, or international: Crisis Text Line — text HOME to 741741).
// - Never dismiss or minimize someone's feelings.

// Tone:
// - Warm, empathetic, non-judgmental.
// - Use simple, clear language.
// - Keep responses concise (2–4 paragraphs max).
// - Offer actionable coping techniques when appropriate (breathing exercises, grounding techniques, journaling prompts, etc.).`;

// export async function POST(req) {
//   try {
//     const { messages } = await req.json();

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: "Invalid request: messages array required." },
//         { status: 400 }
//       );
//     }

//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       return NextResponse.json(
//         { error: "Server configuration error." },
//         { status: 500 }
//       );
//     }

//     const systemTurn = [
//       {
//         role: "user",
//         parts: [{ text: SYSTEM_PROMPT }],
//       },
//       {
//         role: "model",
//         parts: [
//           {
//             text: "Understood. I am MindEase, a mental health support assistant. I will only discuss mental health related topics with empathy and care.",
//           },
//         ],
//       },
//     ];

//     const conversationTurns = messages.map((msg) => ({
//       role: msg.role === "user" ? "user" : "model",
//       parts: [{ text: msg.content }],
//     }));

//     const contents = [...systemTurn, ...conversationTurns];

//     const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents,
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 512,
//           topP: 0.9,
//         },
//         safetySettings: [
//           {
//             category: "HARM_CATEGORY_DANGEROUS_CONTENT",
//             threshold: "BLOCK_ONLY_HIGH",
//           },
//           {
//             category: "HARM_CATEGORY_HARASSMENT",
//             threshold: "BLOCK_MEDIUM_AND_ABOVE",
//           },
//         ],
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Gemini API error:", errorData);
//       return NextResponse.json(
//         { error: "Failed to get response from AI." },
//         { status: 502 }
//       );
//     }

//     const data = await response.json();
//     const botReply =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "I'm here for you. Could you share a bit more about how you're feeling?";

//     return NextResponse.json({ reply: botReply });
//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json(
//       { error: "An unexpected error occurred. Please try again." },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const SYSTEM_PROMPT = `You are a compassionate mental health support assistant named "MindEase".
// Only answer mental health related queries.`;

// export async function POST(req) {
//   try {
//     const { messages } = await req.json();

//     const apiKey = process.env.GEMINI_API_KEY;
//     const genAI = new GoogleGenerativeAI(apiKey);

//     // const model = genAI.getGenerativeModel({
//     //   model: "gemini-1.5-flash",
//     // });

//         const model = genAI.getGenerativeModel({
//          model: "gemini-1.5-flash-latest"
//         });

//     // Convert messages to simple text
//     const chatHistory = messages
//       .map((m) => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`)
//       .join("\n");

//     const prompt = `${SYSTEM_PROMPT}\n\n${chatHistory}`;

//     const result = await model.generateContent(prompt);
//     const reply = result.response.text();

//     return NextResponse.json({ reply });

//   } catch (error) {
//     console.error("ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to get response from AI" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";

// // gemini-1.5-flash — stable and available on all free-tier keys
// const GEMINI_API_URL =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// const SYSTEM_PROMPT = `You are a compassionate mental health support assistant named "MindEase". 

// Your role:
// - ONLY answer questions related to mental health, stress, anxiety, depression, motivation, emotional wellbeing, mindfulness, self-care, and psychological wellness.
// - If the user asks about anything outside these topics, politely decline and redirect: "I'm here specifically to support your mental health and emotional wellbeing. I'm not able to help with that topic, but I'm here if you'd like to talk about how you're feeling."

// Safety rules:
// - NEVER provide medical diagnoses or prescribe medications.
// - If the user expresses thoughts of self-harm or suicide, respond with warmth and urgency: acknowledge their pain, encourage them to reach out to a professional or helpline immediately (e.g., iCall India: 9152987821, Vandrevala Foundation: 1860-2662-345, or international: Crisis Text Line — text HOME to 741741).
// - Never dismiss or minimize someone's feelings.

// Tone:
// - Warm, empathetic, non-judgmental.
// - Use simple, clear language.
// - Keep responses concise (2–4 paragraphs max).
// - Offer actionable coping techniques when appropriate (breathing exercises, grounding techniques, journaling prompts, etc.).`;

// export async function POST(req) {
//   try {
//     const { messages } = await req.json();

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: "Invalid request: messages array required." },
//         { status: 400 }
//       );
//     }

//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       console.error("❌ GEMINI_API_KEY is missing from environment variables.");
//       return NextResponse.json(
//         { error: "Server configuration error: API key not found." },
//         { status: 500 }
//       );
//     }

//     const systemTurn = [
//       {
//         role: "user",
//         parts: [{ text: SYSTEM_PROMPT }],
//       },
//       {
//         role: "model",
//         parts: [
//           {
//             text: "Understood. I am MindEase, a mental health support assistant. I will only discuss mental health related topics with empathy and care.",
//           },
//         ],
//       },
//     ];

//     const conversationTurns = messages.map((msg) => ({
//       role: msg.role === "user" ? "user" : "model",
//       parts: [{ text: msg.content }],
//     }));

//     const contents = [...systemTurn, ...conversationTurns];

//     const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents,
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 512,
//           topP: 0.9,
//         },
//         safetySettings: [
//           {
//             category: "HARM_CATEGORY_DANGEROUS_CONTENT",
//             threshold: "BLOCK_ONLY_HIGH",
//           },
//           {
//             category: "HARM_CATEGORY_HARASSMENT",
//             threshold: "BLOCK_MEDIUM_AND_ABOVE",
//           },
//         ],
//       }),
//     });

//     const data = await response.json();

//     // Log full Gemini response to terminal for debugging
//     console.log("Gemini status:", response.status);
//     console.log("Gemini body:", JSON.stringify(data, null, 2));

//     if (!response.ok) {
//       const geminiError = data?.error?.message || "Unknown Gemini error";
//       console.error("Gemini API error:", geminiError);
//       return NextResponse.json(
//         { error: `AI error: ${geminiError}` },
//         { status: 502 }
//       );
//     }

//     const botReply =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "I'm here for you. Could you share a bit more about how you're feeling?";

//     return NextResponse.json({ reply: botReply });
//   } catch (error) {
//     console.error("Chat API unexpected error:", error);
//     return NextResponse.json(
//       { error: `Unexpected error: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";

// ✅ gemini-2.0-flash — confirmed working on v1beta with API key
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_PROMPT = `You are a compassionate mental health support assistant named "MindEase".

Your role:
- ONLY answer questions related to mental health, stress, anxiety, depression, motivation, emotional wellbeing, mindfulness, self-care, and psychological wellness.
- If the user asks about anything outside these topics, politely decline and redirect: "I'm here specifically to support your mental health and emotional wellbeing. I'm not able to help with that topic, but I'm here if you'd like to talk about how you're feeling."

Safety rules:
- NEVER provide medical diagnoses or prescribe medications.
- If the user expresses thoughts of self-harm or suicide, respond with warmth and urgency: acknowledge their pain, encourage them to reach out to a professional or helpline immediately (e.g., iCall India: 9152987821, Vandrevala Foundation: 1860-2662-345, or international: Crisis Text Line — text HOME to 741741).
- Never dismiss or minimize someone's feelings.

Tone:
- Warm, empathetic, non-judgmental.
- Use simple, clear language.
- Keep responses concise (2–4 paragraphs max).
- Offer actionable coping techniques when appropriate (breathing exercises, grounding techniques, journaling prompts, etc.).`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY is missing.");
      return NextResponse.json(
        { error: "Server configuration error: API key not found." },
        { status: 500 }
      );
    }

    // ✅ Use system_instruction field — correct way for Gemini API
    // ✅ Only user/model roles in contents (no fake system turns)
    const contents = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const requestBody = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
        topP: 0.9,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      const geminiError = data?.error?.message || "Unknown Gemini error";
      console.error("Gemini API error:", geminiError);
      return NextResponse.json(
        { error: `AI error: ${geminiError}` },
        { status: 502 }
      );
    }

    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here for you. Could you share a bit more about how you're feeling?";

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error("Chat API unexpected error:", error);
    return NextResponse.json(
      { error: `Unexpected error: ${error.message}` },
      { status: 500 }
    );
  }
}