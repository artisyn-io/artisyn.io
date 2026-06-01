'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
} from 'lucide-react';

import { ArtisanBadge } from '../../components/artisan/artisan-badge';
import { ArtisanGrid } from './artisan-grid';
import { ArtisanSearch } from './artisan-search';
import { CleanerIcon } from '../../icons';
import { useState } from 'react';

export type artisanProps = {
  id?: string;
  name: string;
  category: string;
  location: string;
  icon: React.ReactNode;
  rate?: boolean;
  image: string;
};

export type categoryProps = {
  name: string;
  icon?: React.ReactNode;
};

export function SearchGridSection() {
  const [activeCategory, setActiveCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredArtisans = (category: categoryProps) => {
    setActiveCategory(category.name);
  };

  const filteredArtisansByCategoryAndSearch = artisans.filter((artisan) => {
    const categoryMatch =
      activeCategory === '' || artisan.category === activeCategory;

    const searchMatch =
      searchTerm === '' ||
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <section className="p-4 bg-white pt-35">
      <div className="max-w-260 mx-auto mb-18">
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[48px]/15 font-bold text-[#262626] text-center max-w-150 mx-auto mb-12"
        >
          Skilled Artisans Across Every Category
        </motion.h2>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-140.5 mx-auto"
        >
          <ArtisanSearch onSearch={handleSearch} />
        </motion.div>

        <motion.div
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
              },
            },
          }}
          className="contain-badge pt-6 pb-12 flex flex-wrap gap-3 md:justify-center max-md:overflow-x-auto max-md:flex-nowrap"
        >
          {categoryArtisans.map((category) => (
            <motion.div
              key={category.name}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    ease: 'easeOut',
                  },
                },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-29.25 shrink-0"
            >
              <ArtisanBadge
                icon={category.icon}
                name={category.name}
                isActive={activeCategory === category.name}
                onClick={() => filteredArtisans(category)}
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredArtisansByCategoryAndSearch.length === 0 ? (
            <motion.p
              key="no-results"
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center text-[#262626] text-base mb-12"
            >
              No artisans found in this category.
            </motion.p>
          ) : (
            <motion.div
              key="results"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArtisanGrid artisans={filteredArtisansByCategoryAndSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.button
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="h-11 px-6 cursor-pointer font-medium rounded-xl text-white bg-[#605DEC] hover:transition-colors hover:bg-[#605DEC]/90 mx-auto flex justify-center items-center"
      >
        View more Artisan
      </motion.button>
    </section>
  );
}

const categoryArtisans = [
  { name: 'Plumber', icon: <Wrench className="text-[#DC2626] size-6" /> },
  { name: 'Barber', icon: <Scissors className="text-[#9333EA] size-6" /> },
  { name: 'Painter', icon: <Paintbrush className="text-[#CA8A04] size-6" /> },
  { name: 'Electrician', icon: <Plug className="text-[#DC2626] size-6" /> },
  { name: 'Carpenter', icon: <Hammer className="text-[#16A34A] size-6" /> },
  { name: 'Mechanic', icon: <Car className="text-[#EA580C] size-6" /> },
  { name: 'Tech Repair', icon: <Laptop className="text-[#4F46E5] size-6" /> },
  { name: 'Tailor', icon: <Shirt className="text-[#DB2777] size-6" /> },
  { name: 'Chef', icon: <ChefHat className="text-[#974925] size-6" /> },
  { name: 'Cleaner', icon: <CleanerIcon /> },
];

const artisans = [
  {
    id: 'james-emeka',
    name: 'James Emeka',
    image: '/images/image3.jpg',
    category: 'Plumber',
    location: 'Ikeja, Lagos.',
    icon: <Wrench className="text-[#DC2626] size-4" />,
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    image: '/images/image2.jpg',
    category: 'Barber',
    location: 'Yaba, Lagos.',
    icon: <Scissors className="text-[#9333EA] size-4" />,
    rate: true,
  },
  {
    id: 'grace-fixer',
    name: 'Grace Fixer',
    image: '/images/image3.jpg',
    category: 'Painter',
    location: 'Surulere, Lagos.',
    icon: <Paintbrush className="text-[#CA8A04] size-4" />,
    rate: true,
  },
  {
    id: 'amara-chike',
    name: 'Amara Chike',
    image: '/images/image5.jpg',
    category: 'Electrician',
    location: 'Ajah, Lagos.',
    icon: <Plug className="text-[#DC2626] size-4" />,
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    image: '/images/image4.jpg',
    category: 'Carpenter',
    location: 'Ikeja, Lagos.',
    icon: <Hammer className="text-[#16A34A] size-4" />,
    rate: true,
  },
  {
    id: 'amara-chike-1',
    name: 'Amara Chike',
    image: '/images/image3.jpg',
    category: 'Mechanic',
    location: 'Ajah, Lagos.',
    icon: <Car className="text-[#EA580C] size-4" />,
    rate: true,
  },
  {
    id: 'sofia-okafor',
    name: 'Sofia Okafor',
    image: '/images/image2.jpg',
    category: 'Chef',
    location: 'Lekki, Lagos.',
    icon: <ChefHat className="text-[#974925] size-4" />,
  },
  {
    id: 'john-doe',
    name: 'John Doe',
    image: '/images/image1.jpg',
    category: 'Cleaner',
    location: 'Lekki, Lagos.',
    icon: <CleanerIcon size={16} />,
    rate: true,
  },
];
