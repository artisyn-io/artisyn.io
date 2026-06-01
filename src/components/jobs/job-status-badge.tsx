import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type JobStatus =
	| "available"
	| "active"
	| "completed"
	| "disputed"
	| "cancelled";

export type JobStatusBadgeVariant = "soft" | "solid" | "outline";

const statusLabels: Record<JobStatus, string> = {
	available: "Available",
	active: "Active",
	completed: "Completed",
	disputed: "Disputed",
	cancelled: "Cancelled",
};

const statusStyles: Record<JobStatus, Record<JobStatusBadgeVariant, string>> = {
	available: {
		soft: "border-emerald-200 bg-emerald-50 text-emerald-700",
		solid: "border-emerald-600 bg-emerald-600 text-white",
		outline: "border-emerald-300 bg-white text-emerald-700",
	},
	active: {
		soft: "border-blue-200 bg-blue-50 text-blue-700",
		solid: "border-blue-600 bg-blue-600 text-white",
		outline: "border-blue-300 bg-white text-blue-700",
	},
	completed: {
		soft: "border-violet-200 bg-violet-50 text-violet-700",
		solid: "border-violet-600 bg-violet-600 text-white",
		outline: "border-violet-300 bg-white text-violet-700",
	},
	disputed: {
		soft: "border-amber-200 bg-amber-50 text-amber-700",
		solid: "border-amber-500 bg-amber-500 text-white",
		outline: "border-amber-300 bg-white text-amber-700",
	},
	cancelled: {
		soft: "border-rose-200 bg-rose-50 text-rose-700",
		solid: "border-rose-600 bg-rose-600 text-white",
		outline: "border-rose-300 bg-white text-rose-700",
	},
};

const jobStatusBadgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full border font-medium tracking-normal",
	{
		variants: {
			size: {
				sm: "h-5 px-2 text-[11px]",
				md: "h-6 px-2.5 text-xs",
				lg: "h-7 px-3 text-sm",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

export interface JobStatusBadgeProps
	extends ComponentPropsWithoutRef<"span">,
		VariantProps<typeof jobStatusBadgeVariants> {
	status: JobStatus;
	variant?: JobStatusBadgeVariant;
}

export function JobStatusBadge({
	status,
	variant = "soft",
	size,
	className,
	...props
}: JobStatusBadgeProps) {
	return (
		<span
			className={cn(
				jobStatusBadgeVariants({ size }),
				statusStyles[status][variant],
				className,
			)}
			{...props}
		>
			{statusLabels[status]}
		</span>
	);
}
