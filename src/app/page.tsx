import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 divide-y divide-line">
        <Hero />
        <About />
        <TechStack />
        <FeaturedProject />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
