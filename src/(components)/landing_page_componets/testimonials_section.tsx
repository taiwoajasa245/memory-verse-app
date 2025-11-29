

"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah J.",
    quote:
      "MemoryVerse has been a blessing. Starting my day with Scripture has never been easier and has truly deepened my walk with God.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkrrt1HHwbI58MHTqMtB_kWWhcvgPNdU2_mZEX_-UAIVJqr8O8IiqGrVulBCQHcVYYSaoqWUyTMjupFnNyXiqxtOo5KxT_oWLO3BeQyB8qCh96dJH7uZtIKwdWSWo9_v9ZbF_Be3cJwRl8Y70PF6jazbAIrtX3Te-TFwP9JgDZXmevqBcACvkn9T5A48QbgzYkw5j86Xpr3aNWmrFNj2MRLhts9SxRG_q8-thJk36ghUD4AJxUtSs4-jNbWVX9TfZGF_boA5YPqISV",
  },
  {
    name: "Michael P.",
    quote:
      "I love being able to track my progress. It's so motivating to see how many verses I've committed to memory over time.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeBVLmRgoKvfuNo7VSJwC-jXZvUKLCdF0JCQklEfz3WHTo39TAb4dPfbdSu7JIgMmCqg_if0tnpPuFoAOIDEyO4l_6Eu4cxWeV5zIhpXurJOxrHONuqEP6K944WP-zv8SxXZUDJsD0TO9P7mU9iB3f5mGRNuHtFLcCzH3KRJV0Kt6FeUJlnfUdmarb03hBpcAjOejmoCSGfEpsd8Q-FDRrOaKo9MVUCQMigwz2qyKu-qEv4VWqu-MGI0BVXqIrY_upSC-XCUDg1veW",
  },
  {
    name: "Emily R.",
    quote:
      "The personalized collections feature is fantastic for focusing on specific themes or books of the Bible. Highly recommend!",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwQVRzNp-Oq6Y5klBvbnaUM2RjqDaXigzCSNyOI9_o1Ue4n0zH7OZ7DJl_YzzMX_smCYti_puy6yt3nkxnqi9RUAEtnZsAbdZ1kprDM7hjjZHLfHZn_OpxuAziFNAxxtuebkVy_d0OfD8bGGfspQPNGl4m6PeXH9SRDWL40sPoTKAZPRca-5vLI9-uJjCOQpUxxIXnjzcXquneWE-_CQVCCKj1gvGsTgX974oVJduFaHKquQ2zFnpZ5NFw7wTwliiSA-IryNR8lnz5",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 px-6 md:px-10 bg-gradient-to-b from-background-light via-primary/10 to-background-light dark:from-background-dark dark:via-primary/5 dark:to-background-dark"
    >
 
      <div className="absolute -top-[1px] left-0 right-0 overflow-hidden leading-[0] rotate-180">
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

  {/* Soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(173,216,230,0.15),transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-6xl mx-auto"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-text-light dark:text-text-dark">
          What Our Community Says
        </h2>

   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {testimonials.map((t, i) => (
    <motion.div
      key={t.name}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: i * 0.2 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <div className="bg-grey/80 dark:bg-background-dark/60 backdrop-blur-md border border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl p-8 text-center max-w-sm flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <img
            src={t.image}
            alt={t.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary/40 shadow-md"
          />
        </div>
        <p className="italic text-text-light/80 dark:text-text-dark/80 mb-6 leading-relaxed text-center">
          “{t.quote}”
        </p>
        <h3 className="font-heading font-bold text-lg text-text-light dark:text-text-dark text-center">
          {t.name}
        </h3>
      </div>
    </motion.div>
  ))}
</div>

      </motion.div>
    </section>
  );
}
