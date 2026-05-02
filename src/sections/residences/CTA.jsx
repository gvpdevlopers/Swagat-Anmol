import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".cta-buttons button", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        delay: 0.3,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] text-white overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c89b7b]/20 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* CONTENT */}
        <div className="cta-content">

          <h2 className="text-[34px] md:text-[60px] font-[Space_Grotesk] leading-tight">
            Experience the <span className="text-[#c89b7b]">next level</span> of living
          </h2>

          <p className="mt-6 text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Discover thoughtfully designed residences crafted for comfort,
            elegance, and long-term value in a prime location.
          </p>

          {/* BUTTONS */}
          <div className="cta-buttons mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            {/* PRIMARY CTA */}
            <button
              className="
                px-8 py-4 rounded-full
                bg-[#c89b7b]
                text-black font-medium
                hover:scale-[1.05]
                transition duration-300
                shadow-lg shadow-[#c89b7b]/20
              "
            >
              Book Site Visit
            </button>

            {/* SECONDARY CTA */}
            <button
              className="
                px-8 py-4 rounded-full
                border border-white/20
                text-white
                hover:border-[#c89b7b]
                hover:text-[#c89b7b]
                transition duration-300
              "
            >
              Download Brochure
            </button>

          </div>

        </div>

        {/* TRUST LINE */}
        <p className="mt-10 text-xs text-white/40 tracking-wide">
          Limited units available • Enquire today
        </p>

      </div>
    </section>
  );
}