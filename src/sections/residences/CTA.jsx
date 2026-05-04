import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef();
  const contentRef = useRef();
  const glowRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CONTENT REVEAL
      gsap.fromTo(
        contentRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // BACKGROUND GLOW FLOAT
      gsap.to(glowRef.current, {
        x: 40,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // MAGNETIC BUTTON EFFECT
  const handleMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = (el) => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28  bg-black md:py-36 text-white overflow-hidden"
    >
      {/* AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] bg-[#c89b7b]/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"
      />

      {/* SUBTLE GRID (luxury detail) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div ref={contentRef}>
          {/* HEADLINE */}
          <h2 className="font-[Space_Grotesk] text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
        Experience the next level of living
          </h2>

          {/* SUBTEXT */}
          <p className="mt-6 text-gray-300 max-w-xl mx-auto font-[Inter] text-sm sm:text-base leading-relaxed">
            Discover thoughtfully designed residences crafted for comfort, elegance, and long-term value in a prime location.
          </p>

          {/* DIVIDER */}
          <div className="mt-8 w-16 h-[2px] mx-auto bg-gradient-to-r from-[#c89b7b] to-[#d4a98c]" />

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            
            {/* PRIMARY */}
            <button
              onMouseMove={(e) => handleMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
              className="relative px-8 py-4 rounded-full font-[Space_Grotesk] text-sm backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden group hover:cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#c89b7b]/20 to-[#d4a98c]/20 opacity-0 group-hover:opacity-100 transition duration-500" />
              <span className="relative z-10 group-hover:text-[#c89b7b] transition">
                Schedule Site Visit
              </span>
            </button>

            {/* SECONDARY */}
            <button
              onMouseMove={(e) => handleMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
              className="px-8 py-4 rounded-full font-[Space_Grotesk] text-sm border border-white/20 hover:border-[#c89b7b]/60 hover:text-[#c89b7b] transition backdrop-blur-xl bg-white/5 hover:cursor-pointer"
            >
              Download Brochure →
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}