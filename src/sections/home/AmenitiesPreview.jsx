import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import gym from "../../assets/amenities-gym-1.jpeg";
import garden from "../../assets/amenities-garden-2.jpeg";
import kids from "../../assets/amenities-kids-3.jpeg";
import game from "../../assets/amenities-game-4.jpeg";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { title: "Modern Fitness Center", image: gym },
  { title: "Podium Garden", image: garden },
  { title: "Kids Play Area", image: kids },
  { title: "Indoor Gaming Room", image: game },
];

export default function AmenitiesPreview() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔹 Reveal (smooth + premium)
      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // 🔹 Subtle vertical parallax per card
      cardsRef.current.forEach((card) => {
        gsap.to(card, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =========================
  // 🔥 MAGNETIC TILT + LIGHT
  // =========================
  const handleMouseMove = (e, el) => {
    if (window.innerWidth < 768) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 25;
    const rotateY = (x - centerX) / 25;

    // tilt
    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });

    // cursor light
    const glow = el.querySelector(".glow");
    if (glow) {
      gsap.to(glow, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const resetCard = (el) => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="text-white py-24 md:py-32"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* HEADER (balanced) */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-white/60 font-[Inter]">
              Amenities
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-[Space_Grotesk] font-semibold leading-tight">
              Designed for everyday luxury
            </h2>
          </div>

          <p className="text-white/70 font-[Inter] max-w-md">
            Experience thoughtfully curated spaces that enhance comfort,
            wellness, and community living.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {amenities.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, cardsRef.current[i])}
              onMouseLeave={() => resetCard(cardsRef.current[i])}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl will-change-transform"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-[240px] sm:h-[300px] md:h-[420px] object-cover transition duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* TEXT */}
              <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6">
                <h3 className="text-lg md:text-2xl font-[Space_Grotesk]">
                  {item.title}
                </h3>
              </div>

              {/* BORDER (glass feel) */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 group-hover:border-white/30 transition duration-500" />

              {/* CURSOR LIGHT */}
              <div className="glow pointer-events-none absolute w-32 h-32 md:w-40 md:h-40 bg-[#c89b7b]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
        {/* BOTTOM CTA */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <Link to="/gallery">
            <button
              className="relative px-8 md:px-10 py-4 rounded-full
      text-sm md:text-[15px]
      font-[Space_Grotesk]
      overflow-hidden group cursor-pointer
      backdrop-blur-xl
      bg-white/10
      border border-white/15
      shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      transition-all duration-500
      hover:border-[#c89b7b]/60
      hover:shadow-[0_12px_50px_rgba(200,155,123,0.25)]"
            >
              {/* GLOW */}
              <span
                className="absolute inset-0
        bg-gradient-to-r
        from-[#c89b7b]/20
        to-[#d4a98c]/20
        opacity-0
        group-hover:opacity-100
        transition duration-500"
              />

              {/* SHIMMER */}
              <span
                className="absolute top-0 left-[-120%]
        w-[60%] h-full
        bg-gradient-to-r
        from-transparent via-white/25 to-transparent
        rotate-12
        group-hover:left-[120%]
        transition-all duration-1000 ease-out"
              />

              {/* TEXT */}
              <span
                className="relative z-10
        inline-flex items-center gap-3
        text-white group-hover:text-[#c89b7b]
        transition duration-300"
              >
                Explore Lifestyle Gallery
                <span
                  className="transition-transform duration-300
          group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
