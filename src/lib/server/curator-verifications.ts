import { promises as fs } from "fs";
import path from "path";
import type { CuratorVerificationRequest } from "@/lib/api/curator";

const DATA_FILE = path.join(process.cwd(), "data", "curator-verifications.json");

export async function readCuratorVerifications(): Promise<CuratorVerificationRequest[]> {
	try {
		const content = await fs.readFile(DATA_FILE, "utf8");
		const data: unknown = JSON.parse(content);
		return Array.isArray(data) ? (data as CuratorVerificationRequest[]) : [];
	} catch {
		return [];
	}
}

export async function writeCuratorVerifications(
	requests: CuratorVerificationRequest[],
): Promise<void> {
	await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
	await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2), "utf8");
}
