import { About } from "@/components/sections/About";
import { Classes } from "@/components/sections/Classes";
import { Contact } from "@/components/sections/Contact";
import { Equipment } from "@/components/sections/Equipment";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Plans } from "@/components/sections/Plans";
import { Spaces } from "@/components/sections/Spaces";
import { Team } from "@/components/sections/Team";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { PulseRail } from "@/components/ui/PulseRail";

export default function HomePage() {
  return (
    <>
      <DocumentTitle page="home" />
      <PulseRail />
      <Hero />
      <About />
      <Equipment />
      <Spaces />
      <Team />
      <Classes />
      <Plans />
      <Location />
      <Faq />
      <Contact />
    </>
  );
}
