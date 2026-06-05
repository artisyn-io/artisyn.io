"use client";

import { useMemo, useState } from "react";
import { Star, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReviewReportModal } from "./review-report-modal";
import { ReviewResponseComposer } from "./review-response-composer";

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface Review {
	id: string;
	rating: ReviewRating;
	comment: string;
	createdAt: string | Date;
	reviewerName: string;
}

export interface ReviewListProps {
	reviews: Review[] | undefined;
	isLoading?: boolean;
	pageSize?: number;
	className?: string;
	emptyMessage?: string;
	isCurator?: boolean;
}

function clampNumber(value: number, min: number, max: number) {
	if (Number.isNaN(value)) return min;
	return Math.min(max, Math.max(min, value));
}

function formatDate(value: string | Date) {
	const date = typeof value === "string" ? new Date(value) : value;
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(date);
}

function initials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	const first = parts[0]?.[0] ?? "?";
	const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
	return (first + last).toUpperCase();
}

function Stars({ rating }: { rating: ReviewRating }) {
	return (
		<div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
			{Array.from({ length: 5 }).map((_, i) => {
				const filled = i + 1 <= rating;
				return (
					<Star
						key={i}
						className={cn(
							"h-4 w-4",
							filled ? "fill-yellow-500 text-yellow-500" : "text-slate-300"
						)}
						aria-hidden="true"
					/>
				);
			})}
		</div>
	);
}

function ReviewCard({ review, isCurator }: { review: Review; isCurator?: boolean }) {
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);

	return (
		<article className="rounded-lg border border-slate-200 bg-white p-5">
			<header className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
						{initials(review.reviewerName)}
					</div>
					<div className="min-w-0">
						<div className="truncate font-medium text-slate-900">
							{review.reviewerName}
						</div>
						<div className="text-xs text-slate-500">
							{formatDate(review.createdAt)}
						</div>
					</div>
				</div>

				<Stars rating={review.rating} />
			</header>

			<p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
				{review.comment}
			</p>

			<ReviewResponseComposer reviewId={review.id} isCurator={isCurator ?? false} />

			<div className="mt-4 flex justify-end">
				<button
					onClick={() => setIsReportModalOpen(true)}
					className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
					aria-label="Report review"
				>
					<Flag className="h-3 w-3" />
					Report
				</button>
			</div>

			<ReviewReportModal
				isOpen={isReportModalOpen}
				onClose={() => setIsReportModalOpen(false)}
				reviewId={review.id}
			/>
		</article>
	);
}

function ReviewCardSkeleton() {
	return (
		<div className="rounded-lg border border-slate-200 bg-white p-5">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="h-10 w-10 rounded-full bg-slate-200" />
					<div className="space-y-2">
						<div className="h-4 w-40 rounded bg-slate-200" />
						<div className="h-3 w-24 rounded bg-slate-200" />
					</div>
				</div>
				<div className="h-4 w-24 rounded bg-slate-200" />
			</div>
			<div className="mt-4 space-y-2">
				<div className="h-3 w-full rounded bg-slate-200" />
				<div className="h-3 w-11/12 rounded bg-slate-200" />
				<div className="h-3 w-8/12 rounded bg-slate-200" />
			</div>
		</div>
	);
}

export function ReviewList({
	reviews,
	isLoading,
	pageSize = 5,
	className,
	emptyMessage = "No reviews yet.",
	isCurator = false,
}: ReviewListProps) {
	const safePageSize = clampNumber(pageSize, 1, 50);
	const items = useMemo(() => reviews ?? [], [reviews]);

	const [page, setPage] = useState(1);
	const totalPages = Math.max(1, Math.ceil(items.length / safePageSize));
	const currentPage = clampNumber(page, 1, totalPages);

	const paged = useMemo(() => {
		const start = (currentPage - 1) * safePageSize;
		return items.slice(start, start + safePageSize);
	}, [currentPage, items, safePageSize]);

	if (isLoading) {
		return (
			<section
				className={cn("space-y-4", className)}
				aria-busy="true"
				aria-live="polite"
			>
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="animate-pulse">
						<ReviewCardSkeleton />
					</div>
				))}
			</section>
		);
	}

	if (items.length === 0) {
		return (
			<section className={cn("rounded-lg border border-slate-200 bg-white p-6", className)}>
				<p className="text-sm text-slate-600">{emptyMessage}</p>
			</section>
		);
	}

	return (
		<section className={cn("space-y-4", className)}>
			{paged.map((review) => (
				<ReviewCard key={review.id} review={review} isCurator={isCurator} />
			))}

			{totalPages > 1 && (
				<div className="flex items-center justify-between gap-3 pt-2">
					<Button
						variant="outline"
						onClick={() => setPage(Math.max(1, currentPage - 1))}
						disabled={currentPage <= 1}
					>
						Prev
					</Button>

					<div className="text-sm tabular-nums text-slate-600">
						Page {currentPage} of {totalPages}
					</div>

					<Button
						variant="outline"
						onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
						disabled={currentPage >= totalPages}
					>
						Next
					</Button>
				</div>
			)}
		</section>
	);
}
