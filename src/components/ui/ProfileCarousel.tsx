"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import profile1 from "@/assets/profile.png";
import profile2 from "@/assets/profile-2.jpeg";

const photos: StaticImageData[] = [profile1, profile2];
const AUTOPLAY_MS = 9000;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

const slide = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -48 }),
};

const arrowStyles =
  "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-body shadow-soft backdrop-blur-sm transition-all duration-300 hover:bg-white md:opacity-0 md:group-hover:opacity-100";

export function ProfileCarousel() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);

  const go = useCallback((dir: number) => {
    setState(([current]) => [
      (current + dir + photos.length) % photos.length,
      dir,
    ]);
  }, []);

  // Auto-advance, restarted whenever the photo changes (manually or not).
  useEffect(() => {
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, go]);

  return (
    <div className="group relative w-full max-w-md overflow-hidden rounded-2xl border border-line shadow-soft-lg md:h-full">
      <div className="relative aspect-square md:aspect-auto md:h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
                go(1);
              } else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) {
                go(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={photos[index]}
              alt="João Victor Moraes"
              fill
              draggable={false}
              className="pointer-events-none select-none object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => go(-1)}
        className={cn(arrowStyles, "left-3")}
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => go(1)}
        className={cn(arrowStyles, "right-3")}
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setState(([current]) => [i, i > current ? 1 : -1])}
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
