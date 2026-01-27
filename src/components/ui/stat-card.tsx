"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
	icon: React.ReactNode;
	label: string;
	value: string | number;
	className?: string;
	trend?: {
		value: number;
		direction: "up" | "down";
	};
}

export function StatCard({
	icon,
	label,
	value,
	className,
	trend,
}: StatCardProps) {
	return (
		<div
			className={cn(
				"bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow",
				className
			)}
		>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<p className="text-sm text-gray-600 mb-2">{label}</p>
					<div className="flex items-baseline gap-2">
						<h3 className="text-2xl font-bold text-gray-900">{value}</h3>
						{trend && (
							<span
								className={cn(
									"text-xs font-medium",
									trend.direction === "up"
										? "text-green-600"
										: "text-red-600"
								)}
							>
								{trend.direction === "up" ? "+" : "-"}
								{trend.value}%
							</span>
						)}
					</div>
				</div>
				<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
					{icon}
				</div>
			</div>
		</div>
	);
}
