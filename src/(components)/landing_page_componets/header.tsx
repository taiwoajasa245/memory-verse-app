"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function HeaderSection() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 lg:px-8 pt-4">
        <div
          className={clsx(
            "max-w-5xl mx-auto transition-all duration-500 ease-out",
            scrolled
              ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg border border-gray-200/20 dark:border-gray-700/30 rounded-2xl"
              : "bg-transparent"
          )}
        >
          <div className="flex items-center justify-between px-6 lg:px-8 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center gap-3">
              <div className="size-7 text-primary flex-shrink-0">
                <svg fill="none" viewBox="0 0 48 48">
                  <path
                    d="M4 42.4S14.1 36 24 41.2C35.1 46.9 44 42.2 44 42.2V7s-8.9 4.6-20 0C14.1.9 4 7.3 4 7.3v35.1Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2
                className={clsx(
                  "font-heading text-xl font-bold tracking-tight transition-colors duration-300",
                  scrolled
                    ? "text-gray-900 dark:text-white"
                    : "text-white drop-shadow-lg"
                )}
              >
                MemoryVerse
              </h2>
            </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link
                href="#home"
                className={clsx(
                  "font-medium transition-all duration-300 hover:scale-105",
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    : "text-white hover:text-primary drop-shadow-md"
                )}
              >
                Home
              </Link>
              <Link
                href="#features"
                className={clsx(
                  "font-medium transition-all duration-300 hover:scale-105",
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    : "text-white hover:text-primary drop-shadow-md"
                )}
              >
                Features
              </Link>
              <Link
                href="/login"
                className={clsx(
                  "font-medium transition-all duration-300 hover:scale-105",
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    : "text-white hover:text-primary drop-shadow-md"
                )}
              >
                Log In
              </Link>
              <Link href="/signup">
                <Button className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={clsx(
                "md:hidden p-2 rounded-lg transition-all duration-300",
                scrolled
                  ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "hover:bg-white/20"
              )}
            >
              {mobileMenuOpen ? (
                <X
                  className={clsx(
                    "w-6 h-6",
                    scrolled
                      ? "text-gray-900 dark:text-white"
                      : "text-white drop-shadow-lg"
                  )}
                />
              ) : (
                <Menu
                  className={clsx(
                    "w-6 h-6",
                    scrolled
                      ? "text-gray-900 dark:text-white"
                      : "text-white drop-shadow-lg"
                  )}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="absolute top-20 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/30 p-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="#home"
                className="text-gray-900 dark:text-white font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#features"
                className="text-gray-900 dark:text-white font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/login"
                className="text-gray-900 dark:text-white font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg mt-2">
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}