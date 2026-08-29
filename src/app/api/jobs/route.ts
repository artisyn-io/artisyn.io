import { NextRequest, NextResponse } from 'next/server';

const completedJobs = [
  {
    id: "job_c1",
    title: "Fix Leaking Pipes",
    category: "Home Services",
    compensation: "₦28,000",
    location: "Ibadan, Nigeria",
    completedAt: "2026-05-10T14:00:00Z",
    clientName: "Adebayo Residence",
  },
  {
    id: "job_c2",
    title: "Custom Native Attire",
    category: "Fashion & Tailoring",
    compensation: "₦22,500",
    location: "Abeokuta, Nigeria",
    completedAt: "2026-05-05T10:30:00Z",
    clientName: "Okonkwo Family",
  },
  {
    id: "job_c3",
    title: "Engine Service – Toyota Corolla",
    category: "Auto Repair",
    compensation: "₦45,000",
    location: "Lagos, Nigeria",
    completedAt: "2026-04-28T09:00:00Z",
    clientName: "Chukwuemeka Motors",
  },
  {
    id: "job_c4",
    title: "Electrical Wiring & Sockets",
    category: "Home Services",
    compensation: "₦30,000",
    location: "Akure, Nigeria",
    completedAt: "2026-04-20T11:00:00Z",
    clientName: "Bello Apartments",
  },
  {
    id: "job_c5",
    title: "Haircut & Grooming Session",
    category: "Personal Care",
    compensation: "₦15,000",
    location: "Akure, Nigeria",
    completedAt: "2026-04-15T08:00:00Z",
    clientName: "Tunde Adeyemi",
  },
  {
    id: "job_c6",
    title: "Private Tutoring – Mathematics",
    category: "Education",
    compensation: "₦20,000",
    location: "Akure, Nigeria",
    completedAt: "2026-04-10T16:00:00Z",
    clientName: "Eze Household",
  },
  {
    id: "job_c7",
    title: "Roof Repair & Waterproofing",
    category: "Construction",
    compensation: "₦60,000",
    location: "Port Harcourt, Nigeria",
    completedAt: "2026-04-02T13:00:00Z",
    clientName: "Nwosu Properties",
  },
];

// The available-jobs response is sourced from the backend route so the
// available tab never couples its UI to local fixture data.
const availableJobs = completedJobs.map((job, index) => ({
  id: job.id,
  title: job.title,
  category: job.category,
  budget: job.compensation,
  location: job.location,
  shortDescription: `Complete ${job.title.toLowerCase()} for ${job.clientName}.`,
  urgency: (index % 3 === 0 ? 'high' : index % 3 === 1 ? 'medium' : 'low') as
    | 'high'
    | 'medium'
    | 'low',
  icon: 'FiBriefcase',
  status: 'available' as const,
}));

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '5', 10));

  const source = searchParams.get('status') === 'available' ? availableJobs : completedJobs;
  const total = source.length;
  const totalPages = Math.ceil(total / limit);
  const jobs = source.slice((page - 1) * limit, page * limit);

  return NextResponse.json({ jobs, total, page, totalPages });
}
