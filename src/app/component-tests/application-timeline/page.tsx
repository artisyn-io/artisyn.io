import {
	ApplicationTimeline,
	type ApplicationTimelineStep,
	type ApplicationStatus,
} from "@/components/jobs/application-timeline";

type TimelineScenario = {
	title: string;
	currentStatus: ApplicationStatus;
	steps: ApplicationTimelineStep[];
};

const scenarios: TimelineScenario[] = [
	{
		title: "Pending Review",
		currentStatus: "pending",
		steps: [
			{
				status: "pending",
				timestamp: "May 31, 2026 at 9:15 AM",
				description: "Application submitted and waiting for client review.",
			},
		],
	},
	{
		title: "Accepted Application",
		currentStatus: "accepted",
		steps: [
			{
				status: "pending",
				timestamp: "May 29, 2026 at 2:40 PM",
				description: "Application received by the client.",
			},
			{
				status: "accepted",
				timestamp: "May 30, 2026 at 10:05 AM",
				description: "Client accepted the application. Next step: coordinate start details.",
			},
		],
	},
	{
		title: "Rejected Application",
		currentStatus: "rejected",
		steps: [
			{
				status: "pending",
				timestamp: "May 28, 2026 at 4:12 PM",
				description: "Application submitted for review.",
			},
			{
				status: "rejected",
				timestamp: "May 30, 2026 at 8:30 AM",
				description: "The client selected another applicant for this job.",
			},
		],
	},
	{
		title: "Withdrawn Application",
		currentStatus: "withdrawn",
		steps: [
			{
				status: "pending",
				timestamp: "May 27, 2026 at 11:24 AM",
				description: "Application submitted successfully.",
			},
			{
				status: "withdrawn",
				timestamp: "May 28, 2026 at 1:18 PM",
				description: "Applicant withdrew before the client made a decision.",
			},
		],
	},
];

export default function ApplicationTimelineTestPage() {
	return (
		<main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-5xl">
				<div className="mb-8">
					<p className="text-sm font-medium text-[#605DEC]">Component test</p>
					<h1 className="mt-2 text-3xl font-bold">Application Timeline</h1>
					<p className="mt-2 max-w-2xl text-sm text-gray-600">
						Visual states for pending, accepted, rejected, and withdrawn application
						flows.
					</p>
				</div>

				<div className="grid gap-5 md:grid-cols-2">
					{scenarios.map((scenario) => (
						<section
							key={scenario.title}
							className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
						>
							<div className="mb-5">
								<h2 className="text-lg font-semibold">{scenario.title}</h2>
								<p className="mt-1 text-sm text-gray-500">
									Current status: {scenario.currentStatus}
								</p>
							</div>
							<ApplicationTimeline
								steps={scenario.steps}
								currentStatus={scenario.currentStatus}
							/>
						</section>
					))}
				</div>
			</div>
		</main>
	);
}
