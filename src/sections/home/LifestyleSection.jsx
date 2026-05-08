import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import lifestyleImg from "../../assets/featured showcase.jpeg";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    title: "Spacious Living",
    text: "Expansive layouts thoughtfully designed to create openness, comfort, and effortless everyday functionality.",
  },
  {
    number: "02",
    title: "Natural Light & Ventilation",
    text: "Large openings and balanced planning allow abundant daylight and refreshing airflow throughout the residences.",
  },
  {
    number: "03",
    title: "Peaceful Lifestyle",
    text: "A carefully curated environment designed to bring together privacy, wellness, and elevated living experiences.",
  },
];

export default function LifestyleSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADING
      gsap.fromTo(
        headingRef.current.children,
        {
          opacity: 0,
          y: 60,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
          },
        },
      );

      // IMAGE
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.08,
          y: 60,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        },
      );

      // CARDS
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 88%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden bg-[#f5f1ea]"
    >
      {/* SOFT GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-10%]
          w-[500px] h-[500px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />

        <div
          className="absolute bottom-[-15%] left-[-10%]
          w-[400px] h-[400px]
          rounded-full bg-[#071a33]/5 blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* TOP CONTENT */}
        <div ref={headingRef} className="max-w-4xl mx-auto text-center">
          {/* LABEL */}
          <div
            className="inline-flex items-center gap-2
            px-5 py-2 rounded-full
            border border-black/10
            bg-white/70 backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px]
              uppercase tracking-[0.35em]
              text-black/50 font-[Space_Grotesk]"
            >
              Elevated Lifestyle
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="mt-8 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            leading-[0.98] tracking-tight
            text-[#071a33] font-semibold"
          >
            Designed Around
            <span className="block text-[#c89b7b]">Everyday Living</span>
          </h2>

          {/* SUBTEXT */}
          <p
            className="mt-8 max-w-3xl mx-auto
            text-base sm:text-lg
            leading-relaxed text-black/60"
          >
            Swagat Anmol is thoughtfully crafted to balance spacious
            architecture, natural comfort, elegant aesthetics, and a refined
            residential lifestyle designed for modern living.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* IMAGE */}
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-[32px]"
          >
            <div
              className="absolute inset-0 z-10
              bg-gradient-to-t from-black/30 via-transparent to-transparent"
            />

            <img
              src={lifestyleImg}
              alt="Lifestyle"
              className="w-full h-[575px] object-cover"
            />

            {/* FLOATING CARD */}
            <div
              className="absolute bottom-6 left-6 z-20
              rounded-2xl border border-white/15
              bg-white/10 backdrop-blur-xl
              px-5 py-4"
            >
              <p
                className="text-[10px]
                uppercase tracking-[0.35em]
                text-white/60 font-[Space_Grotesk]"
              >
                Premium Residences
              </p>

              <h3
                className="mt-2 text-2xl
                text-white font-[Space_Grotesk] font-semibold"
              >
                Crafted For Modern Families
              </h3>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-5">
            {features.map((item, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative overflow-hidden
                rounded-[28px]
                border border-black/10
                bg-white/70 backdrop-blur-xl
                p-6 md:p-7
                transition-all duration-500
                hover:-translate-y-1
                hover:border-[#c89b7b]/30
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                {/* HOVER GLOW */}
                <div
                  className="absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition duration-500
                  bg-gradient-to-br
                  from-[#c89b7b]/10 to-transparent"
                />

                <div className="relative flex gap-5">
                  {/* NUMBER */}
                  <div
                    className="flex-shrink-0
                    w-14 h-14 rounded-2xl
                    border border-black/10
                    bg-[#071a33]
                    flex items-center justify-center"
                  >
                    <span
                      className="font-[Space_Grotesk]
                      text-sm text-[#c89b7b]"
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3
                      className="font-[Space_Grotesk]
                      text-2xl text-[#071a33]
                      font-semibold"
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 text-black/60 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="pt-4">
              <Link to="/residences">
                <button
                  className="relative px-8 py-4 rounded-full
                  text-sm font-[Space_Grotesk]
                  overflow-hidden group cursor-pointer
                  border border-[#071a33]/10
                  bg-[#071a33]
                  shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                  transition-all duration-300
                  hover:shadow-[0_12px_50px_rgba(200,155,123,0.2)]"
                >
                  {/* GLOW */}
                  <span
                    className="absolute inset-0
                    bg-gradient-to-r
                    from-[#c89b7b]/20 to-[#d4a98c]/20
                    opacity-0 group-hover:opacity-100
                    transition duration-500"
                  />

                  <span
                    className="relative z-10
                    inline-flex items-center gap-2
                    text-white group-hover:text-[#c89b7b]
                    transition"
                  >
                    Explore Detailed Residences
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5"
                    />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
