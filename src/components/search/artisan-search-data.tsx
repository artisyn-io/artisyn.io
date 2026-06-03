import type { ReactNode } from "react";

import {
  Car,
  ChefHat,
  Hammer,
  Laptop,
  Paintbrush,
  Plug,
  Scissors,
  Shirt,
  Wrench,
} from "lucide-react";

import { CleanerIcon } from "@/icons";

export type ArtisanSearchResult = {
  category: string;
  icon: ReactNode;
  id: string;
  image: string;
  location: string;
  name: string;
  price: number;
  rate?: boolean;
  rating: number;
  verified: boolean;
};

const categoryIcons = {
  Barber: <Scissors className="size-4 text-[#9333EA]" />,
  Carpenter: <Hammer className="size-4 text-[#16A34A]" />,
  Chef: <ChefHat className="size-4 text-[#974925]" />,
  Cleaner: <CleanerIcon size={16} />,
  Electrician: <Plug className="size-4 text-[#DC2626]" />,
  Mechanic: <Car className="size-4 text-[#EA580C]" />,
  Painter: <Paintbrush className="size-4 text-[#CA8A04]" />,
  Plumber: <Wrench className="size-4 text-[#DC2626]" />,
  Tailor: <Shirt className="size-4 text-[#DB2777]" />,
  "Tech Repair": <Laptop className="size-4 text-[#4F46E5]" />,
} satisfies Record<string, ReactNode>;

export const ARTISAN_SEARCH_RESULTS: ArtisanSearchResult[] = [
  {
    category: "Plumber",
    icon: categoryIcons.Plumber,
    id: "james-emeka",
    image: "/images/image3.jpg",
    location: "Ikeja, Lagos",
    name: "James Emeka",
    price: 45,
    rating: 4.9,
    verified: true,
  },
  {
    category: "Barber",
    icon: categoryIcons.Barber,
    id: "jane-smith",
    image: "/images/image2.jpg",
    location: "Yaba, Lagos",
    name: "Jane Smith",
    price: 30,
    rate: true,
    rating: 4.8,
    verified: true,
  },
  {
    category: "Painter",
    icon: categoryIcons.Painter,
    id: "grace-fixer",
    image: "/images/image3.jpg",
    location: "Surulere, Lagos",
    name: "Grace Fixer",
    price: 55,
    rate: true,
    rating: 4.7,
    verified: true,
  },
  {
    category: "Electrician",
    icon: categoryIcons.Electrician,
    id: "amara-chike",
    image: "/images/image5.jpg",
    location: "Ajah, Lagos",
    name: "Amara Chike",
    price: 60,
    rating: 4.6,
    verified: false,
  },
  {
    category: "Carpenter",
    icon: categoryIcons.Carpenter,
    id: "carpenter",
    image: "/images/image4.jpg",
    location: "Ikeja, Lagos",
    name: "Emeka Carpenter",
    price: 50,
    rate: true,
    rating: 4.7,
    verified: true,
  },
  {
    category: "Mechanic",
    icon: categoryIcons.Mechanic,
    id: "amara-chike-1",
    image: "/images/image3.jpg",
    location: "Ajah, Lagos",
    name: "Tunde Mechanic",
    price: 52,
    rate: true,
    rating: 4.5,
    verified: true,
  },
  {
    category: "Chef",
    icon: categoryIcons.Chef,
    id: "sofia-okafor",
    image: "/images/image2.jpg",
    location: "Lekki, Lagos",
    name: "Sofia Okafor",
    price: 75,
    rating: 4.9,
    verified: false,
  },
  {
    category: "Cleaner",
    icon: categoryIcons.Cleaner,
    id: "john-doe",
    image: "/images/image1.jpg",
    location: "Lekki, Lagos",
    name: "John Doe",
    price: 25,
    rate: true,
    rating: 4.4,
    verified: true,
  },
  {
    category: "Tech Repair",
    icon: categoryIcons["Tech Repair"],
    id: "ada-nwosu",
    image: "/images/image5.jpg",
    location: "Gwarinpa, Abuja",
    name: "Ada Nwosu",
    price: 70,
    rating: 4.8,
    verified: true,
  },
  {
    category: "Tailor",
    icon: categoryIcons.Tailor,
    id: "mina-adebayo",
    image: "/images/image4.jpg",
    location: "Victoria Island, Lagos",
    name: "Mina Adebayo",
    price: 40,
    rating: 4.6,
    verified: false,
  },
  {
    category: "Plumber",
    icon: categoryIcons.Plumber,
    id: "femi-cole",
    image: "/images/image3.jpg",
    location: "Ikorodu, Lagos",
    name: "Femi Cole",
    price: 35,
    rating: 4.3,
    verified: false,
  },
  {
    category: "Painter",
    icon: categoryIcons.Painter,
    id: "ife-martins",
    image: "/images/image2.jpg",
    location: "Port Harcourt, Rivers",
    name: "Ife Martins",
    price: 48,
    rating: 4.6,
    verified: true,
  },
];

export const ARTISAN_SEARCH_CATEGORIES = Array.from(
  new Set(ARTISAN_SEARCH_RESULTS.map((artisan) => artisan.category))
).sort((first, second) => first.localeCompare(second));
