import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Engagement } from "@/components/sections/engagement";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Partners } from "@/components/sections/partners";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyChoose } from "@/components/sections/why-choose";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Process />
        <Engagement />
        <Partners />
        <MarqueeBand />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
