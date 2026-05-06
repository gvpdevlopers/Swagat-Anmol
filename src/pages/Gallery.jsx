import FeaturedShowcase from "../sections/gallery/FeaturedShowcase";
import FullscreenParallax from "../sections/gallery/FullscreenParallax";
import GalleryCTA from "../sections/gallery/GalleryCTA";
import GalleryHero from "../sections/gallery/GalleryHero";
import GalleryIntro from "../sections/gallery/GalleryIntro";
import HorizontalGallery from "../sections/gallery/HorizontalGallery";
import MasonryGallery from "../sections/gallery/MasonryGallery";
import Showcase from "../sections/gallery/Showcase";

export default function Gallery() {
  return (
    <>
      <GalleryHero />
      <GalleryIntro />
      <FeaturedShowcase />
      <HorizontalGallery />
      <Showcase />
      <MasonryGallery/>
      <FullscreenParallax />
      <GalleryCTA />
    </>
  );
}
