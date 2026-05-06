import ContactConnect from "../sections/contact/ContactConnect";
import ContactCTA from "../sections/contact/ContactCTA";
import ContactHero from "../sections/contact/ContactHero";
import ContactIntro from "../sections/contact/ContactIntro";
import FAQStrip from "../sections/contact/FAQStrip";
import VisitExperience from "../sections/contact/VisitExperience";

export default function Contact() {
  return (
    <>
        <ContactHero />
        <ContactIntro />
        <ContactConnect/>
        <VisitExperience/>
        <FAQStrip/>
        <ContactCTA/>
    </>
  );
}
