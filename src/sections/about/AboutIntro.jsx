import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Home, MapPin, Star, Building2 } from "lucide-react";

import aboutImg from "../../assets/AboutUs-intro.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntro() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // TEXT REVEAL
      gsap.from(".about-intro-text > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 50,
        filter: "blur(6px)",
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // VISUAL REVEAL
      gsap.from(".about-intro-visual", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        scale: 0.96,
        duration: 1.2,
        ease: "power3.out",
      });

      // SUBTLE FLOAT (premium feel)
      gsap.to(imageRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] text-white overflow-hidden"
    >
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#c89b7b]/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="about-intro-text">
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 font-[Inter]">
            About The Project
          </p>

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] leading-tight">
            A thoughtfully crafted living experience
          </h2>

          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            Swagat Anmol is designed to redefine modern residential living in
            Palanpur. With a strong focus on space, comfort, and design, the
            project blends contemporary architecture with everyday practicality.
          </p>

          <p className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-lg">
            Every detail is carefully considered — from efficient layouts to
            premium finishes — ensuring a lifestyle that feels elevated, yet
            effortlessly functional.
          </p>

          {/* MINI HIGHLIGHTS */}
          <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
            <div className="flex items-center gap-3 group">
              <Home className="text-[#c89b7b]" size={20} />
              <div>
                <p className="text-lg font-semibold">2 & 3</p>
                <p className="text-white/60 text-sm">BHK Residences</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <Building2 className="text-[#c89b7b]" size={20} />
              <div>
                <p className="text-lg font-semibold">Premium</p>
                <p className="text-white/60 text-sm">Construction</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <MapPin className="text-[#c89b7b]" size={20} />
              <div>
                <p className="text-lg font-semibold">Prime</p>
                <p className="text-white/60 text-sm">Location</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <Star className="text-[#c89b7b]" size={20} />
              <div>
                <p className="text-lg font-semibold">Modern</p>
                <p className="text-white/60 text-sm">Amenities</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="about-intro-visual relative">
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl h-[300px] sm:h-[350px] md:h-[420px] group"
          >
            {/* IMAGE */}
            <img
              src={aboutImg}
              alt="Swagat Anmol"
              className="w-full h-full object-cover"
            />

            {/* HOVER LIGHT SWEEP */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          {/* CTA */}
          <div className="mt-8 flex justify-center md:justify-start">
            <button
              onClick={() => {
                const section = document.getElementById("about-dev");

                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="relative px-8 py-4 rounded-full
    text-sm font-[Space_Grotesk]
    overflow-hidden group cursor-pointer
    backdrop-blur-xl bg-white/5 border border-white/10
    shadow-[0_10px_40px_rgba(0,0,0,0.3)]
    transition-all duration-500
    hover:border-[#c89b7b]/50
    hover:bg-white/[0.07]
    hover:shadow-[0_12px_50px_rgba(200,155,123,0.2)]"
            >
              {/* GLOW */}
              <span
                className="absolute inset-0
      bg-gradient-to-r
      from-[#c89b7b]/15
      to-[#d4a98c]/15
      opacity-0 group-hover:opacity-100
      transition duration-500"
              />

              {/* SHIMMER */}
              <span
                className="absolute top-0 left-[-120%]
      w-[60%] h-full
      bg-gradient-to-r
      from-transparent via-white/20 to-transparent
      rotate-12
      group-hover:left-[120%]
      transition-all duration-1000 ease-out"
              />

              {/* TEXT */}
              <span
                className="relative z-10
      inline-flex items-center gap-3
      text-white group-hover:text-[#c89b7b]
      transition"
              >
                Discover The Architecture
                <span
                  className="transition-transform duration-300
        group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
