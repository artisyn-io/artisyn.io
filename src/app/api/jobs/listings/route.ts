import { NextRequest, NextResponse } from "next/server";

const availableJobs = [
  {
    id: "job_a1",
    title: "Plumber",
    category: "Home Services",
    budget: "₦15,000 - ₦30,000",
    location: "Ibadan, Nigeria",
    shortDescription:
      "Fix leaking pipes and replace damaged bathroom fittings in a residential apartment.",
    urgency: "high",
    icon: "FiTool",
  },
  {
    id: "job_a2",
    title: "Tailor",
    category: "Fashion & Tailoring",
    budget: "₦10,000 - ₦25,000",
    location: "Abeokuta, Nigeria",
    shortDescription:
      "Sew a complete set of custom native attire for an upcoming family event.",
    urgency: "medium",
    icon: "FiScissors",
  },
  {
    id: "job_a3",
    title: "Mechanic",
    category: "Auto Repair",
    budget: "₦20,000 - ₦50,000",
    location: "Lagos, Nigeria",
    shortDescription:
      "Diagnose engine knocking sound and service a Toyota Corolla.",
    urgency: "high",
    icon: "FiTruck",
  },
  {
    id: "job_a4",
    title: "Electrician",
    category: "Home Services",
    budget: "₦12,000 - ₦35,000",
    location: "Akure, Nigeria",
    shortDescription:
      "Fix faulty wiring and install new power sockets in a two-bedroom flat.",
    urgency: "low",
    icon: "FiZap",
  },
  {
    id: "job_a5",
    title: "Barber",
    category: "Personal Care",
    budget: "₦12,000 - ₦35,000",
    location: "Akure, Nigeria",
    shortDescription:
      "Provide haircuts, beard trims, and grooming services for clients in a professional setting.",
    urgency: "medium",
    icon: "FiScissors",
  },
  {
    id: "job_a6",
    title: "Teacher",
    category: "Education",
    budget: "₦12,000 - ₦35,000",
    location: "Akure, Nigeria",
    shortDescription:
      "Teach students literacy, numeracy, and other subjects at a local school.",
    urgency: "low",
    icon: "FiBriefcase",
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json({ jobs: availableJobs });
}
