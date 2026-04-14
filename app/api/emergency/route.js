/**
 * API ROUTE: /api/emergency
 * POST → create emergency alert, notify hospital/admin
 */

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, latitude, longitude, address, action } = body;

    // Handle cancellation
    if (action === "cancel") {
      // ↓ Update DB record status to cancelled
      // await prisma.emergencyAlert.updateMany({
      //   where: { userId, status: "sent" },
      //   data: { status: "cancelled" },
      // });
      console.log(`[emergency] Alert cancelled for user ${userId}`);
      return NextResponse.json({ success: true, status: "cancelled" });
    }

    // Log the alert
    console.log(`[emergency] ALERT from user ${userId} at ${latitude},${longitude}`);

    // ↓↓↓ Save to DB:
    // const alert = await prisma.emergencyAlert.create({
    //   data: { userId, latitude, longitude, address, status: "sent" },
    // });

    // ↓↓↓ Notify hospital staff (add your notification logic here):
    // - Send email via nodemailer / Resend / SendGrid
    // - Send SMS via Twilio
    // - Push notification via Firebase
    // Example:
    // await sendEmergencyEmail({
    //   to: process.env.EMERGENCY_EMAIL,
    //   subject: "🚨 Emergency Alert",
    //   body: `Patient ${userId} needs help at ${address || `${latitude}, ${longitude}`}`,
    // });

    const mockAlert = {
      id: Date.now().toString(),
      userId,
      latitude,
      longitude,
      address,
      status: "sent",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      alert: mockAlert,
      message: "Emergency alert sent. Help is on the way.",
    });
  } catch (error) {
    console.error("[emergency] Error:", error.message);
    return NextResponse.json(
      { error: "Failed to send emergency alert. Please call 108 directly." },
      { status: 500 }
    );
  }
}
