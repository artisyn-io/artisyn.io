import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs } from "../../listings/dummyjobs";

interface JobDetailsPageProps {
  params: {
    id: string;
  };
}
 

const getJob = (id: string) => 
  jobs.find((job) => String(job.id).toLowerCase() === decodeURIComponent(id).toLowerCase());

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <main className="my-8 px-4">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">Job Details</p>
          <h1 className="text-3xl font-semibold text-black">{job.title}</h1>
        </div>
        <Link
          href="/artisan/jobs"
          className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back to jobs
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font-semibold text-[#4338CA]">
                {job.category}
              </span>
              <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-sm text-gray-600">
                {job.location}
              </span>
            </div>
            <p className="text-lg text-gray-700">{job.shortDescription}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Budget</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{job.budget}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Urgency</p>
              <p className="mt-2 text-lg font-semibold text-gray-900 capitalize">{job.urgency}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Status</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">Open</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">What you’ll be doing</h2>
              <p className="mt-3 text-gray-700">
                Deliver reliable, high-quality service for this {job.title.toLowerCase()} engagement. The client expects a professional approach and clear updates from start to finish.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                <li>Proven experience in {job.category.toLowerCase()} work.</li>
                <li>Strong communication and punctuality.</li>
                <li>Ability to complete the job within the expected timeframe.</li>
              </ul>
            </div>
          </div>
        </section>

        <aside className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gray-500">Apply</p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">Ready to take it?</h2>
            </div>
            <div className="rounded-3xl bg-[#F8FAFC] p-5">
              <p className="text-sm text-gray-600">Budget</p>
              <p className="mt-2 text-xl font-semibold text-gray-900">{job.budget}</p>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-base font-medium text-gray-900">{job.location}</p>
          </div>

          <button
            type="button"
            className="w-full rounded-2xl bg-[#4338CA] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3730a3]"
            onClick={() => alert("Apply flow not implemented yet.")}
          >
            Apply now
          </button>
        </aside>
      </div>
    </main>
  );
}
