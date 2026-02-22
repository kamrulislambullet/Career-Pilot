import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/dbConnect";


// ─── PATCH  /api/applications/[id]/status ─────────────────────────────────
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid application ID" }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["interview", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'interview' or 'rejected'" },
        { status: 400 }
      );
    }

    const applicationsCollection = await dbConnect(collections.APPLICATIONS);

    const result = await applicationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (err) {
    console.error("PATCH /api/applications/[appId]/status error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}