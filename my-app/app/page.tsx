import { LanguageProvider } from "@/components/providers/language-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Solutions } from "@/components/sections/solutions";
import { DualUse } from "@/components/sections/dual-use";
import { About } from "@/components/sections/about";
import { Partners } from "@/components/sections/partners";
import { Investor } from "@/components/sections/investor";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Hero />
        <Solutions />
        <DualUse />
        <About />
        <Partners />
        <Investor />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
