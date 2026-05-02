import Amenities from "../sections/residences/Amenities";
import CTA from "../sections/residences/CTA";
import FloorPlans from "../sections/residences/FloorPlans";
import LocationAdvantage from "../sections/residences/LocationAdvantage";
import ResidencesHero from "../sections/residences/ResidencesHero";
import ResidencesOverview from "../sections/residences/ResidencesOverview";
import Specifications from "../sections/residences/Specifications";
import UnitTypes from "./UnitTypes";

export default function Residences() {
  return (
    <>
       <ResidencesHero />
       <ResidencesOverview />
       <UnitTypes />
       <FloorPlans/>
       <Specifications />
       <Amenities />
       <LocationAdvantage />
       <CTA />
    </>
  );
}