import Hero from "../sections/Hero";
import About from "../sections/About";
import Highlights from "../sections/Highlights";
import Statement from "../sections/Statement";
import FloorPlans from "../sections/FloorPlans";
import BigTextScroll from "../sections/BigTextScroll";
import Experience from "../sections/Experience";
import Showcase from "../sections/Showcase";
import WhyChoose from "../sections/WhyChoose";
import AmenitiesPreview from "../sections/AmenitiesPreview";
import TextReveal from "../sections/TextReveal";
import LocationConnectivity from "../sections/LocationConnectivity";
import CTA from "../sections/CTA";

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