import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { X } from "lucide-react";

import img1 from "../../assets/why-choose-1.jpeg";
import img2 from "../../assets/experience-3.jpeg";
import img3 from "../../assets/amenities-game-4.jpeg";
import img4 from "../../assets/amenities-kids-3.jpeg";
import img5 from "../../assets/experience-1.jpeg";
import img6 from "../../assets/AboutUs-intro.jpeg";
import img7 from "../../assets/amenities-gym-1.jpeg";
import img8 from "../../assets/experience-2.webp";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    image: img1,
    title: "Luxury Exterior",
    category: "Architecture",
    height: "h-[280px] md:h-[340px]",
  },
  {
    id: 2,
    image: img2,
    title: "Elegant Interiors",
    category: "Interiors",
    height: "h-[420px] md:h-[520px]",
  },
  {
    id: 3,
    image: img3,
    title: "Lifestyle Spaces",
    category: "Amenities",
    height: "h-[340px] md:h-[420px]",
  },
  {
    id: 4,
    image: img4,
    title: "Family Experiences",
    category: "Lifestyle",
    height: "h-[420px] md:h-[520px]",
  },
  {
    id: 5,
    image: img5,
    title: "Refined Living",
    category: "Experience",
    height: "h-[320px] md:h-[400px]",
  },
  {
    id: 6,
    image: img6,
    title: "Premium Design",
    category: "Architecture",
    height: "h-[460px] md:h-[560px]",
  },
  {
    id: 7,
    image: img7,
    title: "Fitness & Wellness",
    category: "Amenities",
    height: "h-[320px] md:h-[400px]",
  },
  {
    id: 8,
    image: img8,
    title: "Curated Clubhouse",
    category: "Luxury",
    height: "h-[420px] md:h-[520px]",
  },
];

export default function MasonryGallery() {
  const sectionRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".masonry-card").forEach((card, index) => {
        const image = card.querySelector(".masonry-image");
        const content = card.querySelector(".masonry-content");

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
            },
          },
        );

        gsap.fromTo(
          image,
          {
            scale: 1.12,
          },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
            },
          },
        );

        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 md:py-36 bg-[#020617] overflow-hidden"
      >
        {/* GLOW */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[10%] left-[-10%]
            w-[500px] h-[500px]
            rounded-full bg-[#c89b7b]/10 blur-[140px]"
          />

          <div
            className="absolute bottom-[0%] right-[-10%]
            w-[450px] h-[450px]
            rounded-full bg-[#c89b7b]/10 blur-[140px]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <div
              className="inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              border border-white/10
              bg-white/[0.04] backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

              <span
                className="text-[10px]
                uppercase tracking-[0.35em]
                text-white/60 font-[Space_Grotesk]"
              >
                Visual Collection
              </span>
            </div>

            <h2
              className="mt-7 font-[Space_Grotesk]
              text-4xl sm:text-5xl md:text-6xl
              leading-[1.05] tracking-tight
              text-white font-semibold"
            >
              Curated Through
              <span className="block bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
                Architecture & Emotion
              </span>
            </h2>

            <p
              className="mt-7 text-base sm:text-lg md:text-xl
              leading-relaxed text-white/60 max-w-2xl"
            >
              A carefully curated visual journey showcasing timeless
              architecture, refined interiors, landscaped experiences, and
              elevated living.
            </p>
          </div>

          {/* MASONRY GRID */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 lg:gap-6 space-y-5 lg:space-y-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="masonry-card break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                {/* CARD */}
                <div
                  className={`relative overflow-hidden rounded-[28px]
                  border border-white/10
                  bg-white/[0.03]
                  shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                  ${item.height}`}
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="masonry-image
                      w-full h-full object-cover
                      transition-transform duration-1000
                      group-hover:scale-105"
                    />
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0
                    bg-gradient-to-t
                    from-black/80 via-black/20 to-transparent"
                  />

                  {/* TOP CATEGORY */}
                  <div className="absolute top-5 left-5">
                    <div
                      className="inline-flex items-center gap-2
                      px-4 py-2 rounded-full
                      border border-white/15
                      bg-black/30 backdrop-blur-md"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

                      <span
                        className="text-[10px]
                        uppercase tracking-[0.35em]
                        text-white/70 font-[Space_Grotesk]"
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="masonry-content absolute bottom-6 left-6 right-6">
                    {/* SMALL LABEL */}
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="w-10 h-[1px] bg-[#c89b7b]" />

                      <span
                        className="text-[10px]
                        uppercase tracking-[0.35em]
                        text-[#c89b7b]
                        font-[Space_Grotesk]"
                      >
                        Swagat Anmol
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3
                      className="font-[Space_Grotesk]
                      text-2xl sm:text-3xl
                      font-semibold leading-[1.05]
                      tracking-tight text-white"
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* HOVER GLOW */}
                  <div
                    className="absolute inset-0 opacity-0
                    group-hover:opacity-100
                    transition duration-700
                    bg-gradient-to-t
                    from-[#c89b7b]/10 via-transparent to-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999]
          bg-black/90 backdrop-blur-xl
          flex items-center justify-center
          p-5"
          onClick={() => setSelectedImage(null)}
        >
          {/* CLOSE */}
          <button
            className="absolute top-6 right-6
            w-12 h-12 rounded-full
            border border-white/10
            bg-white/10 backdrop-blur-md
            flex items-center justify-center
            text-white transition
            hover:bg-white/20"
          >
            <X size={20} />
          </button>

          {/* IMAGE */}
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative overflow-hidden
              rounded-[32px]
              border border-white/10
              shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[85vh] object-cover"
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0
                bg-gradient-to-t
                from-black/80 via-black/10 to-transparent"
              />

              {/* CONTENT */}
              <div className="absolute bottom-8 left-8 right-8">
                {/* CATEGORY */}
                <div
                  className="inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  border border-white/15
                  bg-black/30 backdrop-blur-md mb-5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

                  <span
                    className="text-[10px]
                    uppercase tracking-[0.35em]
                    text-white/70 font-[Space_Grotesk]"
                  >
                    {selectedImage.category}
                  </span>
                </div>

                {/* TITLE */}
                <h3
                  className="font-[Space_Grotesk]
                  text-3xl sm:text-4xl md:text-5xl
                  font-semibold leading-[1.05]
                  tracking-tight text-white"
                >
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
