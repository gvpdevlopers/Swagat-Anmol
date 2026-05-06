import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef();
  const linesRef = useRef([]);
  const panelRef = useRef();
  const dividerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT TEXT (line-by-line reveal)
      gsap.fromTo(
        linesRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // RIGHT PANEL
      gsap.fromTo(
        panelRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // DIVIDER ANIMATION
      gsap.fromTo(
        dividerRef.current,
        { height: 0, opacity: 0 },
        {
          height: "100%",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* LEFT — TYPOGRAPHY */}
          <div>
            <h2 className="font-[Space_Grotesk] text-[34px] sm:text-[44px] md:text-[60px] lg:text-[72px] leading-[1.05] tracking-tight">
              <span ref={(el) => (linesRef.current[0] = el)} className="block">
                Redefining
              </span>

              <span
                ref={(el) => (linesRef.current[1] = el)}
                className="block bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent"
              >
                modern living
              </span>

              <span ref={(el) => (linesRef.current[2] = el)} className="block">
                with elegance,
              </span>

              <span ref={(el) => (linesRef.current[3] = el)} className="block">
                comfort, and
              </span>

              <span ref={(el) => (linesRef.current[4] = el)} className="block">
                timeless design
              </span>
            </h2>
          </div>

          {/* RIGHT — GLASS PANEL */}
          <div className="relative flex items-center">
            {/* Divider */}
            <div
              ref={dividerRef}
              className="hidden md:block absolute left-[-40px] top-0 w-[1px] bg-white/10"
            />

            {/* Glass Card */}
            <div
              ref={panelRef}
              className="w-full max-w-md p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.3)]"
            >
              <p className="text-white/70 leading-relaxed font-[Inter]">
                Swagat Anmol is designed to deliver a refined lifestyle with
                thoughtfully planned residences, premium amenities, and a
                peaceful environment in the heart of Palanpur.
              </p>

              {/* Highlights */}
              <div className="mt-6 space-y-3 text-sm text-white/80 font-[Inter]">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Configuration</span>
                  <span className="text-white">2 & 3 BHK</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Towers</span>
                  <span className="text-white">5</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Storeys</span>
                  <span className="text-white">14</span>
                </div>

                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="text-white">Palanpur</span>
                </div>
              </div>

              {/* CTA */}
              <button
                className="mt-6 w-full py-3 rounded-full text-sm font-[Space_Grotesk]
  relative overflow-hidden group cursor-pointer
  backdrop-blur-xl bg-white/10 border border-white/20
  transition-all duration-300
  hover:border-[#c89b7b]/60 hover:bg-white/15"
              >
                {/* subtle glow */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#c89b7b]/10 to-[#d4a98c]/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                <span className="relative z-10 text-white/90 group-hover:text-[#c89b7b] transition">
                  Explore More →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
