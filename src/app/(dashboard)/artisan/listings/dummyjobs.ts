export interface Job {
  title: string;
  category: string;
  budget: string;
  location: string;
  shortDescription: string;
  urgency: "low" | "medium" | "high";
  icon: string;
}

export const jobs: Job[] = [
  {
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
