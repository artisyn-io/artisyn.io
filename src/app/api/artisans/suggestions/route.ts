import { NextRequest, NextResponse } from "next/server";

const artisanSuggestions = [
  { label: "James Emeka", type: "Artisan" },
  { label: "Jane Smith", type: "Artisan" },
  { label: "Grace Fixer", type: "Artisan" },
  { label: "Amara Chike", type: "Artisan" },
  { label: "Sofia Okafor", type: "Artisan" },
  { label: "John Doe", type: "Artisan" },
  { label: "Plumber", type: "Category" },
  { label: "Barber", type: "Category" },
  { label: "Painter", type: "Category" },
  { label: "Electrician", type: "Category" },
  { label: "Carpenter", type: "Category" },
  { label: "Mechanic", type: "Category" },
  { label: "Tech Repair", type: "Category" },
  { label: "Tailor", type: "Category" },
  { label: "Chef", type: "Category" },
  { label: "Cleaner", type: "Category" },
  { label: "Ikeja, Lagos", type: "Location" },
  { label: "Yaba, Lagos", type: "Location" },
  { label: "Surulere, Lagos", type: "Location" },
  { label: "Ajah, Lagos", type: "Location" },
  { label: "Lekki, Lagos", type: "Location" },
];

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const suggestions = artisanSuggestions
    .filter((suggestion) => suggestion.label.toLowerCase().includes(query))
    .slice(0, 8);

  return NextResponse.json({ suggestions });
}
