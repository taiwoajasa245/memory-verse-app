"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1522205408450-add114ad53fe?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=1600&q=80",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
  {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/*  Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />
      </div>

      {/*  Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center px-6 sm:px-8 md:px-12 max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
        >
          Grow Daily in the Word
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-white/90 text-base sm:text-lg md:text-xl mt-5 leading-relaxed max-w-xl mx-auto drop-shadow-md"
        >
          Deepen your faith and memorize scripture with daily verses tailored just for you.
        </motion.p>

        <Link href="/signup">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button className="mt-8 bg-primary text-text-light hover:bg-primary/80 text-base sm:text-lg px-6 sm:px-12 py-4 sm:py-8 rounded-full shadow-lg transition-all duration-300">
            Start Your Journey
          </Button>
        </motion.div>
        </Link>
       
      </motion.div>
    </section>
  );
}

