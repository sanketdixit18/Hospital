// /**
//  * API ROUTE: /api/health
//  * GET  → fetch health data for a user
//  * POST → save new health entry
//  */

// import { NextResponse } from "next/server";

// // Mock data for development — replace with Prisma queries once schema is migrated
// const MOCK_HEALTH_DATA = [
//   { date: "2024-01-01", weight: 72.5, bpSystolic: 120, bpDiastolic: 80, sugar: 95 },
//   { date: "2024-02-01", weight: 73.0, bpSystolic: 122, bpDiastolic: 82, sugar: 98 },
//   { date: "2024-03-01", weight: 71.8, bpSystolic: 118, bpDiastolic: 78, sugar: 92 },
//   { date: "2024-04-01", weight: 72.2, bpSystolic: 125, bpDiastolic: 85, sugar: 105 },
//   { date: "2024-05-01", weight: 71.0, bpSystolic: 119, bpDiastolic: 79, sugar: 97 },
//   { date: "2024-06-01", weight: 70.5, bpSystolic: 117, bpDiastolic: 77, sugar: 94 },
//   { date: "2024-07-01", weight: 70.0, bpSystolic: 115, bpDiastolic: 76, sugar: 90 },
// ];

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get("userId");

//     // ↓↓↓ Replace with real Prisma query:
//     // const data = await prisma.healthData.findMany({
//     //   where: { userId },
//     //   orderBy: { date: "asc" },
//     //   take: 30,
//     // });

//     return NextResponse.json({ success: true, data: MOCK_HEALTH_DATA });
//   } catch (error) {
//     console.error("[health GET] Error:", error.message);
//     return NextResponse.json({ error: "Failed to fetch health data." }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { userId, weight, bpSystolic, bpDiastolic, sugar } = body;

//     // Validate
//     if (!userId) {
//       return NextResponse.json({ error: "User ID required." }, { status: 400 });
//     }

//     // ↓↓↓ Replace with real Prisma create:
//     // const entry = await prisma.healthData.create({
//     //   data: { userId, weight, bpSystolic, bpDiastolic, sugar },
//     // });

//     const mockEntry = {
//       id: Date.now().toString(),
//       userId,
//       weight: weight || null,
//       bpSystolic: bpSystolic || null,
//       bpDiastolic: bpDiastolic || null,
//       sugar: sugar || null,
//       date: new Date().toISOString(),
//     };

//     return NextResponse.json({ success: true, entry: mockEntry });
//   } catch (error) {
//     console.error("[health POST] Error:", error.message);
//     return NextResponse.json({ error: "Failed to save health data." }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.healthData.findMany({
      where: { userId },
      orderBy: { date: "asc" },
      take: 30,
    });

    // Format for Recharts
    const formatted = data.map((d) => ({
      date: new Date(d.date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
      weight:      d.weight      ?? null,
      bpSystolic:  d.bpSystolic  ?? null,
      bpDiastolic: d.bpDiastolic ?? null,
      sugar:       d.sugar       ?? null,
      bp: d.bpSystolic
        ? `${d.bpSystolic}/${d.bpDiastolic}`
        : null,
    }));

    return NextResponse.json({ success: true, data: formatted });

  } catch (error) {
    console.error("[health GET]", error.message);
    return NextResponse.json(
      { error: "Failed to fetch health data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weight, bpSystolic, bpDiastolic, sugar } = body;

    // At least one field must be provided
    if (!weight && !bpSystolic && !sugar) {
      return NextResponse.json(
        { error: "Please fill at least one field." },
        { status: 400 }
      );
    }

    const entry = await db.healthData.create({
      data: {
        userId,
        weight:      weight      ? parseFloat(weight)      : null,
        bpSystolic:  bpSystolic  ? parseInt(bpSystolic)    : null,
        bpDiastolic: bpDiastolic ? parseInt(bpDiastolic)   : null,
        sugar:       sugar       ? parseFloat(sugar)       : null,
      },
    });

    return NextResponse.json({ success: true, entry });

  } catch (error) {
    console.error("[health POST]", error.message);
    return NextResponse.json(
      { error: "Failed to save health data" },
      { status: 500 }
    );
  }
}