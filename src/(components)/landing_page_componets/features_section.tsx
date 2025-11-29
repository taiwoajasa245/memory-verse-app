


"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, BookOpen, Clock } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Mail className="w-10 h-10 text-primary" />,
      title: "Daily / Weekly Verse Delivery",
      desc: "Choose your pace. Receive a new verse daily or weekly to keep your spirit nourished.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Personal Reflection Notes",
      desc: "Jot down your thoughts and prayers to deepen your understanding.",
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "Verse History Tracking",
      desc: "Revisit past verses and see how far you've come.",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background-light to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark py-24 px-6 md:px-10"
    >
      {/* Top wave coming from previous section */}
      <div className="absolute -top-[1px] left-0 right-0 overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-24 md:h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
            fill="rgba(59,130,246,0.1)"
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

      {/* Soft ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(173,216,230,0.15),transparent_70%)] pointer-events-none" />

      {/*  Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-text-light dark:text-text-dark">
          Features to Deepen Your Faith
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex justify-center"
            >
              <Card className="bg-grey/80 dark:bg-background-dark/60 backdrop-blur-md border border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
                <CardContent className="flex flex-col items-center text-center p-8">
                  <div className="p-4 bg-primary/10 rounded-full">{feature.icon}</div>
                  <h3 className="font-heading text-lg md:text-xl font-semibold mt-5 text-text-light dark:text-text-dark">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-light/80 dark:text-text-dark/70 mt-3">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
