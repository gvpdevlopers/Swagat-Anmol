import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import img1 from "../../assets/AboutUs-intro.jpeg";
import img2 from "../../assets/featured showcase.jpeg";
import img3 from "../../assets/amenities-gym-1.jpeg";
import img4 from "../../assets/why-choose-1.jpeg";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const showcaseData = [
  {
    id: "01",
    tag: "Architecture",
    title: "Architectural Identity",
    description:
      "A contemporary exterior designed with timeless elegance, refined proportions, and premium detailing that creates a lasting impression from every perspective.",
    image: img1,
  },
  {
    id: "02",
    tag: "Interiors",
    title: "Luxury Living Spaces",
    description:
      "Expansive interiors curated with natural light, sophisticated textures, and elevated comfort to deliver a refined living experience every day.",
    image: img2,
  },
  {
    id: "03",
    tag: "Lifestyle",
    title: "Curated Amenities",
    description:
      "Thoughtfully designed experiences that seamlessly blend wellness, leisure, recreation, and modern community living.",
    image: img3,
  },
  {
    id: "04",
    tag: "Landscape",
    title: "Landscaped Serenity",
    description:
      "Beautifully crafted green spaces designed to create calm, balance, openness, and a seamless connection with nature.",
    image: img4,
  },
];

export default function FeaturedShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".showcase-card");

      cards.forEach((card) => {
        const image = card.querySelector(".showcase-image");
        const content = card.querySelector(".showcase-content");

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
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
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );

        gsap.fromTo(
          content.children,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "top 85%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 bg-[#020617] overflow-hidden"
    >
      {/* AMBIENT GLOW */}
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
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <div
            className="inline-flex items-center gap-2
            px-4 py-1.5 rounded-full
            border border-white/10
            bg-white/[0.04] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px] uppercase tracking-[0.35em]
              text-white/60 font-[Space_Grotesk]"
            >
              Featured Showcase
            </span>
          </div>

          <h2
            className="mt-8 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl
            leading-[1.05] tracking-tight
            text-white font-semibold"
          >
            Crafted Through
            <span className="block bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
              Timeless Experiences
            </span>
          </h2>
        </div>

        {/* CARDS */}
        <div className="space-y-28 md:space-y-40">
          {showcaseData.map((item, index) => (
            <div
              key={item.id}
              className={`showcase-card grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* IMAGE SIDE */}
              <div className="relative">
                {/* IMAGE WRAPPER */}
                <div
                  className="relative rounded-[28px] overflow-hidden
                  border border-white/10
                  shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="showcase-image
                      w-full h-[340px] sm:h-[420px] md:h-[560px]
                      object-cover"
                    />
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="absolute inset-0
                    bg-gradient-to-t
                    from-black/60 via-black/10 to-transparent"
                  />

                  {/* TOP TAG */}
                  <div className="absolute top-6 left-6">
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
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* BOTTOM BRAND */}
                  <div className="absolute bottom-6 left-6">
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
                        text-white/60 font-[Space_Grotesk]"
                      >
                        Swagat Anmol
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENT SIDE */}
              <div className="showcase-content relative">
                {/* SMALL LABEL */}
                <div className="inline-flex items-center gap-3">
                  <span className="w-10 h-[1px] bg-[#c89b7b]" />

                  <span
                    className="text-[10px] uppercase tracking-[0.4em]
                    text-[#c89b7b] font-[Space_Grotesk]"
                  >
                    Featured Experience
                  </span>
                </div>

                {/* TITLE */}
                <h3
                  className="mt-7 font-[Space_Grotesk]
                  text-3xl sm:text-4xl md:text-5xl xl:text-6xl
                  font-semibold leading-[1.05]
                  tracking-tight text-white"
                >
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="mt-7 text-base sm:text-lg md:text-xl
                  leading-relaxed text-white/60
                  max-w-xl"
                >
                  {item.description}
                </p>

                {/* FEATURE POINTS */}
                <div className="mt-10 space-y-4">
                  {[
                    "Premium architecture",
                    "Luxury detailing",
                    "Thoughtful planning",
                  ].map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-white/75"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

                      <span className="text-sm sm:text-base">{point}</span>
                    </div>
                  ))}
                </div>

                {/* DIVIDER */}
                <div
                  className="mt-12 w-28 h-[1px]
                  bg-gradient-to-r
                  from-[#c89b7b] to-transparent"
                />

                {/* CTA */}
                <Link to="/contact">
                  <button
                    className="mt-10 relative px-8 py-4 rounded-full
                  text-sm font-[Space_Grotesk]
                  overflow-hidden group cursor-pointer
                  backdrop-blur-xl bg-white/5
                  border border-white/10
                  shadow-[0_10px_40px_rgba(0,0,0,0.3)]
                  transition-all duration-300
                  hover:border-[#c89b7b]/60
                  hover:shadow-[0_12px_50px_rgba(200,155,123,0.2)]"
                  >
                    <span
                      className="absolute inset-0
                    bg-gradient-to-r
                    from-[#c89b7b]/20 to-[#d4a98c]/20
                    opacity-0 group-hover:opacity-100
                    transition duration-500"
                    />

                    <span
                      className="absolute top-0 left-[-120%]
                    w-[60%] h-full
                    bg-gradient-to-r
                    from-transparent via-white/20 to-transparent
                    rotate-12
                    group-hover:left-[120%]
                    transition-all duration-1000 ease-out"
                    />

                    <span
                      className="relative z-10 text-white
                    group-hover:text-[#c89b7b] transition"
                    >
                      Experience The Spaces
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
