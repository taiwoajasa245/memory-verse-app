export default function Footer() {
  return (
    <footer className="relative border-t border-primary/20 bg-gradient-to-b from-background-light via-background-light/90 to-background-light dark:from-background-dark dark:via-background-dark/90 dark:to-background-dark py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
          <a
            href="https://github.com/taiwoajasa245"
            className="text-text-light/80 dark:text-text-dark/80 hover:text-primary transition-colors"
          >
            About Us
          </a>
          <a
            href="https://github.com/taiwoajasa245"
            className="text-text-light/80 dark:text-text-dark/80 hover:text-primary transition-colors"
          >
            Contact
          </a>
          <a
            href="https://github.com/taiwoajasa245"
            className="text-text-light/80 dark:text-text-dark/80 hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-text-light/60 dark:text-text-dark/60">
          © {new Date().getFullYear()} <span className="font-semibold">MemoryVerse</span>. All rights reserved.
        </p>
      </div>

      {/* Soft top glow for depth */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />
    </footer>
  );
}
