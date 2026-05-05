import AboutDeveloper from "../sections/about/AboutDeveloper";
import AboutHero from "../sections/about/AboutHero";
import AboutHighlights from "../sections/about/AboutHighlights";
import AboutIntro from "../sections/about/AboutIntro";
import AboutStory from "../sections/about/AboutStory";
import BigTextScroll from "../sections/about/BigTextScroll";
import CTA from "../sections/about/CTA";


export default function AboutUs() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutStory />
      <AboutDeveloper />
      <BigTextScroll />
      <AboutHighlights />
      <CTA/>
    </>
  );
}