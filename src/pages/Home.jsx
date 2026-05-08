import Hero from "../sections/home/Hero";
import About from "../sections/home/About";
import Highlights from "../sections/home/Highlights";
import Statement from "../sections/home/Statement";
import BigTextScroll from "../sections/home/BigTextScroll";
import Showcase from "../sections/home/Showcase";
import WhyChoose from "../sections/home/WhyChoose";
import AmenitiesPreview from "../sections/home/AmenitiesPreview";
import TextReveal from "../sections/home/TextReveal";
import LocationConnectivity from "../sections/home/LocationConnectivity";
import CTA from "../sections/home/CTA";
import LifestyleSection from "../sections/home/LifestyleSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Statement />
      <LifestyleSection />
      <BigTextScroll />
      <WhyChoose />
      <Showcase />
      <AmenitiesPreview />
      <TextReveal />
      <LocationConnectivity />
      <CTA />
    </>
  );
}
