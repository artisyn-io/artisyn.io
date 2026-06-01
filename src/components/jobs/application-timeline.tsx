import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Check, Clock, RotateCcw, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type ApplicationStatus =
	| "pending"
	| "accepted"
	| "rejected"
	| "withdrawn";

export type ApplicationTimelineStep = {
	status: ApplicationStatus;
	timestamp: string;
	description?: ReactNode;
};

type StatusTone = {
	label: string;
	icon: typeof Clock;
	current: string;
	complete: string;
	upcoming: string;
};

const statusTones: Record<ApplicationStatus, StatusTone> = {
	pending: {
		label: "Pending",
		icon: Clock,
		current: "border-amber-500 bg-amber-500 text-white ring-4 ring-amber-100",
		complete: "border-amber-500 bg-amber-500 text-white",
		upcoming: "border-amber-200 bg-amber-50 text-amber-600",
	},
	accepted: {
		label: "Accepted",
		icon: Check,
		current:
			"border-emerald-600 bg-emerald-600 text-white ring-4 ring-emerald-100",
		complete: "border-emerald-600 bg-emerald-600 text-white",
		upcoming: "border-emerald-200 bg-emerald-50 text-emerald-600",
	},
	rejected: {
		label: "Rejected",
		icon: X,
		current: "border-rose-600 bg-rose-600 text-white ring-4 ring-rose-100",
		complete: "border-rose-600 bg-rose-600 text-white",
		upcoming: "border-rose-200 bg-rose-50 text-rose-600",
	},
	withdrawn: {
		label: "Withdrawn",
		icon: RotateCcw,
		current: "border-slate-600 bg-slate-600 text-white ring-4 ring-slate-100",
		complete: "border-slate-600 bg-slate-600 text-white",
		upcoming: "border-slate-200 bg-slate-50 text-slate-600",
	},
};

export interface ApplicationTimelineProps
	extends ComponentPropsWithoutRef<"ol"> {
	steps: ApplicationTimelineStep[];
	currentStatus?: ApplicationStatus;
}

export function ApplicationTimeline({
	steps,
	currentStatus,
	className,
	...props
}: ApplicationTimelineProps) {
	const currentStepIndex = currentStatus
		? steps.findIndex((step) => step.status === currentStatus)
		: steps.length - 1;

	return (
		<ol className={cn("space-y-0", className)} {...props}>
			{steps.map((step, index) => {
				const tone = statusTones[step.status];
				const Icon = tone.icon;
				const isCurrent = index === currentStepIndex;
				const isComplete = currentStepIndex >= 0 && index < currentStepIndex;

				return (
					<li
						key={`${step.status}-${index}`}
						className="relative grid grid-cols-[2rem_1fr] gap-3 pb-6 last:pb-0"
						aria-current={isCurrent ? "step" : undefined}
					>
						{index < steps.length - 1 && (
							<span
								className={cn(
									"absolute left-4 top-8 h-[calc(100%-2rem)] w-px -translate-x-1/2",
									isComplete ? "bg-[#605DEC]" : "bg-gray-200",
								)}
								aria-hidden="true"
							/>
						)}

						<span
							className={cn(
								"z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
								isCurrent
									? tone.current
									: isComplete
										? tone.complete
										: tone.upcoming,
							)}
						>
							<Icon className="h-4 w-4" aria-hidden="true" />
						</span>

						<div
							className={cn(
								"min-w-0 rounded-md border bg-white px-3 py-2",
								isCurrent
									? "border-[#605DEC] shadow-sm"
									: "border-gray-200",
							)}
						>
							<div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
								<p
									className={cn(
										"text-sm font-semibold",
										isCurrent ? "text-[#605DEC]" : "text-gray-900",
									)}
								>
									{tone.label}
								</p>
								<time className="text-xs font-medium text-gray-500">
									{step.timestamp}
								</time>
							</div>

							{step.description && (
								<div className="mt-1 text-sm text-gray-600">
									{step.description}
								</div>
							)}
						</div>
					</li>
				);
			})}
		</ol>
	);
}
