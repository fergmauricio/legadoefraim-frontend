"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const banners = [
  {
    id: 1,
    image: "/banners/banner1.jpg",
    title: "A fé veste bem",
    subtitle: "Camisetas cristãs que contam sua história.",
  },
  {
    id: 2,
    image: "/banners/banner2.jpg",
    title: "Vista o propósito",
    subtitle: "Seja luz onde Deus te colocar.",
  },
  {
    id: 3,
    image: "/banners/banner3.jpg",
    title: "Expressando fé com estilo",
    subtitle: "A mensagem é eterna, o estilo também.",
  },
];

export function HomeBanner() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const INTERVAL_MS = 7000;

  const nextBanner = () => setIndex((prev) => (prev + 1) % banners.length);
  const prevBanner = () =>
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(nextBanner, INTERVAL_MS);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    stopAutoPlay();
    nextBanner();
    startAutoPlay();
  };

  const handlePrev = () => {
    stopAutoPlay();
    prevBanner();
    startAutoPlay();
  };

  const current = banners[index];

  return (
    <div className="relative w-full aspect-1920/700 overflow-hidden mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="100vw, h-full"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 text-center text-white px-4">
            <motion.h1
              key={`title-${current.id}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-display font-semibold mb-4 drop-shadow-lg"
            >
              {current.title}
            </motion.h1>
            <motion.p
              key={`subtitle-${current.id}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-2xl text-slate-200 max-w-2xl drop-shadow-md"
            >
              {current.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between px-6">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/40 hover:bg-black/60 transition text-white backdrop-blur-sm cursor-pointer"
          aria-label="Anterior"
        >
          <ArrowLeftIcon />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/40 hover:bg-black/60 transition text-white backdrop-blur-sm cursor-pointer"
          aria-label="Próximo"
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className="absolute bottom-[15%] left-0 right-0 flex justify-center gap-2">
        {banners.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setIndex(i)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              i === index ? "bg-white w-5" : "bg-white/40 hover:bg-white/70"
            )}
            aria-label={`Ir para banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
