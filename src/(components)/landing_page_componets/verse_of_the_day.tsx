"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getVerseOfTheDay } from "@/lib/api/verses";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Verse } from "@/lib/api/models";

export default function VerseOfTheDay() {
  const { data: verse, isLoading, error, refetch } = useQuery<Verse>({
    queryKey: ["verseOfTheDay"],
    queryFn: getVerseOfTheDay,
    initialData: {
      id: 1,
      reference: "John 3:16",
      verse: "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.",
      translation: "NIV",
      created_at: new Date().toISOString(),
      is_favourite: false,
    },

  });

  useEffect(() => {
    refetch();
  } , []);

  const handleGetNewVerse = () => {
    refetch();
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  };

  return (
    <section
      id="verse"
      className="relative py-24 px-6 md:px-10 overflow-hidden bg-gradient-to-r from-primary/10 via-background-light to-primary/5 dark:from-background-dark dark:via-primary/10 dark:to-background-dark"
    >
      {/* Animated background wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-40 md:h-56"
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

      {/* Soft floating glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(173,216,230,0.15),transparent_70%)] pointer-events-none" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Verse Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="shadow-xl rounded-xl overflow-hidden bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border border-primary/10"
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="py-10 px-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-red-500 dark:text-red-400">
                  <p className="text-lg">Failed to load verse</p>
                  <p className="text-sm mt-2">Please try again</p>
                </div>
              ) : (
                <>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4"
                  >
                    {/* {verse?.book} {verse?.chapter}:{verse?.verse} */}
                     {verse?.reference} ({verse?.translation})
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-xl text-text-light/80 dark:text-text-dark/80 leading-relaxed"
                  >
                    {verse?.verse}
                  </motion.p>
                </>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <Button
                  className="mt-8 bg-primary text-text-light hover:bg-primary/80 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
                  onClick={handleGetNewVerse}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Get a New Verse"
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-40 md:h-56"
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
    </section>
  );
}