import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResidencesOverview() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADING
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        },
      );

      // TEXT
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
          },
        },
      );

      // CARDS
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden text-white"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      {/* SOFT GLOW LAYERS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[420px] h-[420px] bg-[#c89b7b]/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[420px] h-[420px] bg-[#c89b7b]/10 blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* HEADING */}
        <h2
          ref={headingRef}
          className="font-[Space_Grotesk] text-[34px] sm:text-[44px] md:text-[58px] lg:text-[68px] leading-[1.05] tracking-tight"
        >
          Crafted for{" "}
          <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
            modern living
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p
          ref={textRef}
          className="mt-6 md:mt-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-[Inter]"
        >
          Discover thoughtfully designed residences that blend contemporary
          architecture with comfort, space, and refined elegance — built to
          elevate everyday living.
        </p>

        {/* CARDS */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "2 & 3 BHK",
              desc: "Spacious layouts designed for modern families",
            },
            {
              title: "Premium Design",
              desc: "Elegant architecture with refined detailing",
            },
            {
              title: "Prime Location",
              desc: "Seamless connectivity in a peaceful environment",
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative p-6 md:p-8 rounded-2xl 
              backdrop-blur-xl bg-white/5 border border-white/10 
              transition-all duration-500 
              hover:-translate-y-2 hover:border-[#c89b7b]/40 cursor-pointer
              hover:shadow-[0_20px_60px_rgba(200,155,123,0.15)]"
            >
              {/* HOVER GLOW */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#c89b7b]/10 to-transparent" />

              <h3 className="relative text-xl md:text-2xl font-[Space_Grotesk] font-semibold">
                {item.title}
              </h3>

              <p className="relative mt-2 text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="mt-14 md:mt-16 flex justify-center">
          <button
            onClick={() => {
              const section = document.getElementById(
                "residance-specifications",
              );

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
    backdrop-blur-xl bg-white/10 border border-white/20
    shadow-[0_10px_40px_rgba(0,0,0,0.3)]
    transition-all duration-300
    hover:border-[#c89b7b]/60
    hover:shadow-[0_12px_60px_rgba(200,155,123,0.25)]"
          >
            {/* GLOW */}
            <span
              className="absolute inset-0
      bg-gradient-to-r
      from-[#c89b7b]/20 to-[#d4a98c]/20
      opacity-0 group-hover:opacity-100
      transition duration-500"
            />

            {/* SHIMMER */}
            <span
              className="absolute top-0 left-[-120%]
      w-[60%] h-full
      bg-gradient-to-r
      from-transparent via-white/30 to-transparent
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
              View Premium Specifications
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
    </section>
  );
}
