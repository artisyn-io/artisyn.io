import { NextRequest, NextResponse } from "next/server";
import { readCuratorVerifications, writeCuratorVerifications } from "@/lib/server/curator-verifications";

export async function GET() {
	const applications = await readCuratorVerifications();
	return NextResponse.json(applications);
}

export async function PATCH(request: NextRequest) {
	let payload: { id?: unknown; action?: unknown; note?: unknown };
	try {
		payload = await request.json();
	} catch {
		return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
	}

	if (
		typeof payload.id !== "string" ||
		(payload.action !== "approve" && payload.action !== "reject") ||
		typeof payload.note !== "string" ||
		!payload.note.trim()
	) {
		return NextResponse.json(
			{ message: "An application, decision, and note are required." },
			{ status: 400 },
		);
	}

	const applications = await readCuratorVerifications();
	const index = applications.findIndex((application) => application.id === payload.id);
	if (index < 0) {
		return NextResponse.json({ message: "Verification request not found." }, { status: 404 });
	}
	if (applications[index].status !== "pending") {
		return NextResponse.json({ message: "This request has already been reviewed." }, { status: 409 });
	}

	const updated = {
		...applications[index],
		status: payload.action === "approve" ? "approved" as const : "rejected" as const,
		note: payload.note.trim(),
		decidedAt: new Date().toISOString(),
	};
	applications[index] = updated;
	await writeCuratorVerifications(applications);
	return NextResponse.json(updated);
}
