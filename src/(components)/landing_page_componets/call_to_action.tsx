"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-10 bg-gradient-to-b from-primary/10 via-background-light to-background-light dark:from-primary/10 dark:via-background-dark dark:to-background-dark rounded-2xl mt-20 md:mt-28 text-center">
        {/* Top wave (connects from testimonials section) */}
      <div className="absolute -top-[1px] left-0 right-0 overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-24 md:h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
            fill="rgba(173,216,230,0.15)"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z;
                M0,0 C400,50 800,150 1200,80 L1200,120 L0,120 Z;
                M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Decorative dot patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left pattern */}
        <div className="absolute top-6 left-6 w-24 h-24 bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_1px,_transparent_1px)] bg-[size:10px_10px]" />
        {/* Bottom right pattern */}
        <div className="absolute bottom-6 right-6 w-32 h-32 bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_1px,_transparent_1px)] bg-[size:12px_12px]" />
      </div>

      {/* Soft glowing overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(173,216,230,0.15),transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto text-center"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-snug">
          Ready to Grow in the Word?
        </h2>
        <p className="text-text-light/80 dark:text-text-dark/80 max-w-xl text-base md:text-lg">
          Join thousands of others on a journey to memorize and meditate on the
          Bible. It’s free to get started — strengthen your faith daily.
        </p>

        <Link href="/signup">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="h-12 px-8 mt-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300"
        >
          Sign Up for Free
        </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
