import HeaderSection from "@/(components)/landing_page_componets/header";
import HeroSection from "@/(components)/landing_page_componets/hero_section";
import VerseOfTheDay from "@/(components)/landing_page_componets/verse_of_the_day"; 
import FeaturesSection from "@/(components)/landing_page_componets/features_section";
import TestimonialsSection from "@/(components)/landing_page_componets/testimonials_section";
import CallToAction from "@/(components)/landing_page_componets/call_to_action";
import Footer from "@/(components)/landing_page_componets/footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen ">
      <HeaderSection />
      <HeroSection />
      <VerseOfTheDay />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </main>
  );
}

