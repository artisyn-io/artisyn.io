"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import bgImg from "../listings/(assets)/bg.png";
import { jobs } from "../listings/dummyjobs";

export default function ArtisanDashboard() {
	// Mock data for earnings and metrics
	const mockData = {
		totalEarnings: "₦120,000.00",
		activeJobs: 2,
		completedJobs: 12,
		averageRating: 4.5,
		profileViews: 124,
		searchAppearances: "1.2k",
		clientSaves: 18,
		proposalResponseRate: 95,
	};

	// Sample active jobs
	const activeJobsData = jobs.slice(0, 2);

	// Sample available jobs
	const availableJobsPreview = jobs.slice(0, 4);

	return (
		<div className="w-full">
			{/* Greeting Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Welcome back, Samuel 👋</h1>
			</div>

			{/* Stats Overview Row */}
			<section className="mb-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Total Earnings */}
					<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
						<div className="flex items-start justify-between">
							<div>
								<p className="text-sm text-gray-600 mb-1">Total Earnings</p>
								<h3 className="text-2xl font-bold text-gray-900">
									₦120,000.00
								</h3>
							</div>
						</div>
						<a
							href="#"
							className="text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-3 inline-block"
						>
							View Earnings →
						</a>
					</div>

					{/* Active Jobs */}
					<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
						<p className="text-sm text-gray-600 mb-1">Active Jobs</p>
						<h3 className="text-2xl font-bold text-gray-900">
							{mockData.activeJobs}
						</h3>
					</div>

					{/* Completed Jobs */}
					<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
						<p className="text-sm text-gray-600 mb-1">Completed Jobs</p>
						<h3 className="text-2xl font-bold text-gray-900">
							{mockData.completedJobs}
						</h3>
					</div>

					{/* Average Rating */}
					<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
						<p className="text-sm text-gray-600 mb-1">Average Rating</p>
						<div className="flex items-baseline gap-2">
							<Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
							<h3 className="text-2xl font-bold text-gray-900">
								{mockData.averageRating}
							</h3>
						</div>
					</div>
				</div>
			</section>

			{/* Two Column Layout: Available Jobs (Left) + Profile Performance & Active Jobs (Right) */}
			<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Available Jobs Section (Left - takes 2 columns on lg) */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">
								Available Jobs
							</h2>
							<a
								href="/artisan/jobs"
								className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
							>
								View All →
							</a>
						</div>

						{/* Jobs List */}
						<div className="divide-y divide-gray-200">
							{availableJobsPreview.map((job, index) => (
								<div key={index} className="p-4 hover:bg-gray-50 transition-colors">
									<div className="flex gap-3">
										{/* Job Image */}
										<div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
											<Image
												src={bgImg}
												alt={job.title}
												width={80}
												height={80}
												className="w-full h-full object-cover"
											/>
										</div>

										{/* Job Details */}
										<div className="flex-1 min-w-0">
											<p className="text-xs text-gray-500 mb-1">
												Posted 1 min ago
											</p>
											<h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
												{job.shortDescription}
											</h3>
											<div className="text-xs text-gray-600">
												<div className="flex flex-wrap gap-2">
													<span>Category: {job.category}</span>
													<span>•</span>
													<span>Compensation: {job.budget}</span>
													<span>•</span>
													<span>Location: {job.location}</span>
													<span>•</span>
													<span className="uppercase font-medium text-red-600">
														{job.urgency}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Column: Profile Performance + Active Jobs */}
				<div className="space-y-6">
					{/* Profile Performance Section */}
					<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">
								Profile Performance
							</h2>
							<a
								href="/artisan/profile"
								className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
							>
								Go to Profile →
							</a>
						</div>

						{/* Content */}
						<div className="divide-y divide-gray-200">
							<div className="p-4">
								<p className="text-sm text-gray-600 mb-1">Profile views</p>
								<p className="text-lg font-semibold text-gray-900">
									{mockData.profileViews}
								</p>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600 mb-1">Search appearances</p>
								<p className="text-lg font-semibold text-gray-900">
									{mockData.searchAppearances}
								</p>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600 mb-1">Client saves</p>
								<p className="text-lg font-semibold text-gray-900">
									{mockData.clientSaves}
								</p>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600 mb-1">Proposal response rate</p>
								<p className="text-lg font-semibold text-gray-900">
									{mockData.proposalResponseRate}%
								</p>
							</div>
						</div>
					</div>

					{/* Active Jobs Section */}
					<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">
								Active Jobs
							</h2>
							<a
								href="/artisan/jobs"
								className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
							>
								View All →
							</a>
						</div>

						{/* Jobs List */}
						<div className="divide-y divide-gray-200">
							{activeJobsData.map((job, index) => (
								<div key={index} className="p-4 hover:bg-gray-50 transition-colors">
									<div className="flex gap-3">
										{/* Job Image */}
										<div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
											<Image
												src={bgImg}
												alt={job.title}
												width={60}
												height={60}
												className="w-full h-full object-cover"
											/>
										</div>

										{/* Job Info */}
										<div className="flex-1 min-w-0">
											<p className="text-xs text-gray-500 mb-1">
												Started 1 day ago
											</p>
											<h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
												{job.shortDescription}
											</h3>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
