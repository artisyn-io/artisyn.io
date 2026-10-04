"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Clock3, FileText, RefreshCw, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/ToastProvider";
import {
	decideCuratorVerification,
	fetchCuratorVerificationQueue,
	type CuratorVerificationRequest,
} from "@/lib/api/curator";

function formatDate(value: string) {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium", timeStyle: "short",
	}).format(date);
}

export default function CuratorVerificationsPage() {
	const [requests, setRequests] = useState<CuratorVerificationRequest[]>([]);
	const [noteById, setNoteById] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [busyId, setBusyId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const toast = useToast();

	const loadQueue = useCallback(async (refresh = false) => {
		if (refresh) setRefreshing(true);
		setError(null);
		try {
			setRequests(await fetchCuratorVerificationQueue());
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Could not load verification requests.");
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => { void loadQueue(); }, [loadQueue]);

	const decide = async (application: CuratorVerificationRequest, action: "approve" | "reject") => {
		const note = (noteById[application.id] ?? "").trim();
		if (!note) {
			toast.error("Add a decision note before reviewing this application.");
			return;
		}
		setBusyId(application.id);
		try {
			const updated = await decideCuratorVerification({ id: application.id, action, note });
			setRequests((current) => current.map((item) => item.id === updated.id ? updated : item));
			toast.success(action === "approve" ? `${application.fullName} approved.` : `${application.fullName} rejected.`);
		} catch (reason) {
			toast.error(reason instanceof Error ? reason.message : "Could not update this request.");
		} finally {
			setBusyId(null);
		}
	};

	const pendingCount = requests.filter((request) => request.status === "pending").length;

	return (
		<div className="space-y-6">
			<header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
						<ShieldCheck className="h-4 w-4" aria-hidden="true" /> Curator management
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Curator verification queue</h1>
					<p className="mt-1 text-sm text-gray-600">Review applications and record a note with each decision.</p>
				</div>
				<Button variant="outline" size="sm" onClick={() => void loadQueue(true)} disabled={refreshing}>
					<RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Refresh queue
				</Button>
			</header>

			<section className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
				<Clock3 className="h-5 w-5 text-amber-600" aria-hidden="true" />
				<div><p className="text-sm font-semibold text-gray-900">{pendingCount} pending {pendingCount === 1 ? "application" : "applications"}</p>
					<p className="text-xs text-gray-600">{requests.length} total verification requests</p></div>
			</section>

			{error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

			<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
				{loading ? <div className="p-10 text-center text-sm text-gray-500">Loading verification requests…</div> : requests.length === 0 ? (
					<div className="p-10 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" aria-hidden="true" /><p className="mt-3 font-medium text-gray-900">No verification requests yet</p><p className="mt-1 text-sm text-gray-500">New curator applications will appear here.</p></div>
				) : (
					<div className="divide-y divide-gray-100">
						{[...requests].sort((a, b) => Number(b.status === "pending") - Number(a.status === "pending") || b.submittedAt.localeCompare(a.submittedAt)).map((application) => (
							<article key={application.id} className="p-5 sm:p-6">
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div><h2 className="text-base font-semibold text-gray-900">{application.fullName}</h2><p className="mt-0.5 text-sm text-gray-600">{application.email} · {application.specialization}</p></div>
									<span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${application.status === "pending" ? "bg-amber-50 text-amber-700" : application.status === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{application.status}</span>
								</div>
								<dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
									<div><dt className="text-xs font-medium uppercase tracking-wide text-gray-400">Submitted</dt><dd className="mt-1 text-gray-700">{formatDate(application.submittedAt)}</dd></div>
									<div><dt className="text-xs font-medium uppercase tracking-wide text-gray-400">Experience</dt><dd className="mt-1 text-gray-700">{application.experienceYears || "Not provided"} years</dd></div>
									<div><dt className="text-xs font-medium uppercase tracking-wide text-gray-400">Documents</dt><dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-gray-700">{application.documents.length ? application.documents.map((name, index) => <span className="inline-flex items-center gap-1" key={`${name}-${index}`}><FileText className="h-3.5 w-3.5 text-gray-400" />{name}</span>) : "None"}</dd></div>
								</dl>
								{application.statement && <p className="mt-4 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{application.statement}</p>}
								{application.note && <p className="mt-3 rounded-lg border border-gray-100 p-3 text-sm text-gray-600"><span className="font-medium text-gray-800">Decision note:</span> {application.note}</p>}
								{application.status === "pending" && <div className="mt-4 space-y-3">
									<label className="block text-sm font-medium text-gray-700" htmlFor={`note-${application.id}`}>Decision note <span className="text-red-600">*</span></label>
									<textarea id={`note-${application.id}`} rows={2} value={noteById[application.id] ?? ""} onChange={(event) => setNoteById((current) => ({ ...current, [application.id]: event.target.value }))} placeholder="Explain your decision for the audit record…" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" />
									<div className="flex flex-wrap justify-end gap-2">
										<Button variant="outline" size="sm" onClick={() => void decide(application, "reject")} disabled={busyId === application.id}><XCircle className="mr-1.5 h-4 w-4" />Reject</Button>
										<Button size="sm" onClick={() => void decide(application, "approve")} disabled={busyId === application.id} className="bg-emerald-600 text-white hover:bg-emerald-700"><CheckCircle2 className="mr-1.5 h-4 w-4" />Approve</Button>
									</div>
								</div>}
							</article>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
