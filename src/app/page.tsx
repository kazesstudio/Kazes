import { Capabilities } from "@/components/home/capabilities";
import { Engagement } from "@/components/home/engagement";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Philosophy } from "@/components/home/philosophy";
import { Process } from "@/components/home/process";
import { SelectedWork } from "@/components/home/selected-work";

export default function HomePage() {
  return (
    <>
      {/* White ground for the whole upper page... */}
      <Hero />
      <Capabilities />
      <Process />
      <SelectedWork />
      <Philosophy />
      <Faq />
      {/* ...then one unbroken run of near-black to close it out. The FAQ sits
          above the first dark block so the page never flips black, back to
          white, then black again. */}
      <Engagement />
      <FinalCta />
    </>
  );
}