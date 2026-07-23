"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import profile1 from "@/assets/profile.png";
import profile2 from "@/assets/profile-2.jpeg";

const photos: StaticImageData[] = [profile1, profile2];
const INTERVAL_MS = 9000;

export function ProfileCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((current) => (current + 1) % photos.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line shadow-soft-lg md:h-full">
      <div className="relative aspect-square md:aspect-auto md:h-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={photos[index]}
              alt="João Victor Moraes"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 384px"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-5 bg-white/90" : "w-1.5 bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
