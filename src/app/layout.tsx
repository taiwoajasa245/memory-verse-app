import Providers from "@/(components)/landing_page_componets/providers";
import "@/app/globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
});

export const metadata = {
  title: "MemoryVerse - Grow Daily in the Word",
  description:
    "Deepen your faith and memorize scripture with daily verses delivered to you.",
  icons: {
    icon: "/mIcon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light scroll-smooth">
      <body
        className={`${manrope.variable} bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark antialiased`}
      >
      <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
