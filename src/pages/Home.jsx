import Hero from "../sections/home/Hero";
import About from "../sections/home/About";
import Highlights from "../sections/home/Highlights";
import Statement from "../sections/home/Statement";
import FloorPlans from "../sections/home/FloorPlans";
import BigTextScroll from "../sections/home/BigTextScroll";
import Experience from "../sections/home/Experience";
import Showcase from "../sections/home/Showcase";
import WhyChoose from "../sections/home/WhyChoose";
import AmenitiesPreview from "../sections/home/AmenitiesPreview";
import TextReveal from "../sections/home/TextReveal";
import LocationConnectivity from "../sections/home/LocationConnectivity";
import CTA from "../sections/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Statement />
      <FloorPlans />
      <BigTextScroll />
      <Experience />
      <Showcase />
      <WhyChoose />
      <AmenitiesPreview />
      <TextReveal />
      <LocationConnectivity />
      <CTA />
    </>
  );
}
