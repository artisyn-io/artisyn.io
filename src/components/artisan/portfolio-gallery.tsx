'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import Image from 'next/image';

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  thumbnail?: string;
}

interface PortfolioGalleryProps {
  images?: PortfolioImage[];
  onImageClick?: (image: PortfolioImage, index: number) => void;
  className?: string;
}

export function PortfolioGallery({
  images = [],
  onImageClick,
  className = '',
}: PortfolioGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: false }));
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    onImageClick?.(images[index], index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const navigateImage = useCallback(
    (direction: 'next' | 'prev') => {
      if (selectedIndex === null || images.length === 0) return;

      const newIndex =
        direction === 'next'
          ? (selectedIndex + 1) % images.length
          : (selectedIndex - 1 + images.length) % images.length;

      setSelectedIndex(newIndex);
    },
    [selectedIndex, images],
  );

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length, navigateImage]);

  // Empty state
  if (!images || images.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 ${className}`}
      >
        <div className="text-gray-400 mb-4">
          <ImageOff className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-600 mb-2">
          No Portfolio Images
        </h3>
        <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
          This artisan hasn&apos;t added any portfolio images yet. Check back
          later or contact them to see examples of their work.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
          >
            {/* Loading placeholder */}
            {!loadedImages[image.id] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            )}

            {/* Image */}
            <Image
              src={image.thumbnail || image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                loadedImages[image.id] === false ? 'hidden' : ''
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
              onLoad={() => handleImageLoad(image.id)}
              onError={() => handleImageError(image.id)}
            />

            {/* Fallback for failed images */}
            {loadedImages[image.id] === false && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                <ImageOff className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
                <span className="text-xs sm:text-sm">Failed to load</span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 text-white hover:text-gray-300 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Previous button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 sm:left-8 z-50 p-2 sm:p-3 text-white hover:text-gray-300 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 sm:right-8 z-50 p-2 sm:p-3 text-white hover:text-gray-300 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Image container */}
            <div
              className="relative w-full h-full flex items-center justify-center p-12 sm:p-16 md:p-20"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-w-5xl max-h-full"
                >
                  <Image
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image counter */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm sm:text-base">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
