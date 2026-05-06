import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Phone, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CONTENT REVEAL
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 60,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // GLOW FLOAT
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-black overflow-hidden"
    >
      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={glowRef}
          className="absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px]
          rounded-full
          bg-[#c89b7b]/12
          blur-[130px]"
        />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:32px_32px]" />

      <div
        className="relative z-10
        max-w-5xl mx-auto
        px-5 sm:px-6 lg:px-8"
      >
        <div
          ref={contentRef}
          className="rounded-[36px]
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          px-6 sm:px-10 md:px-14
          py-14 md:py-20
          text-center
          shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
        >
          {/* LABEL */}
          <div
            className="inline-flex items-center gap-2
            px-4 py-1.5 rounded-full
            border border-white/10
            bg-white/[0.04]"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px]
              uppercase tracking-[0.35em]
              text-white/60 font-[Space_Grotesk]"
            >
              Begin Your Journey
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="mt-8 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl
            leading-[1] tracking-tight
            text-white font-semibold"
          >
            Your Next Chapter
            <span className="block text-[#c89b7b]">Begins Here</span>
          </h2>

          {/* SUBTEXT */}
          <p
            className="mt-8 max-w-2xl mx-auto
            text-base sm:text-lg
            leading-relaxed text-white/55"
          >
            Connect with our team to explore thoughtfully crafted residences,
            schedule a private visit, and experience the timeless lifestyle of
            Swagat Anmol.
          </p>

          {/* DIVIDER */}
          <div
            className="mt-10 w-20 h-[1px]
            mx-auto
            bg-gradient-to-r
            from-transparent
            via-[#c89b7b]
            to-transparent"
          />

          {/* BUTTONS */}
          <div
            className="mt-12 flex flex-col sm:flex-row
            items-center justify-center gap-4"
          >
            {/* PRIMARY */}
            <a
              href="tel:+919876543210"
              className="relative w-full sm:w-auto
              px-8 py-4 rounded-full
              font-[Space_Grotesk] text-sm
              overflow-hidden group
              bg-white/10 backdrop-blur-xl
              border border-white/15
              text-white
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
                className="relative z-10
                flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                Call Sales Team
              </span>
            </a>

            {/* SECONDARY */}
            <a
              href="/residences"
              className="w-full sm:w-auto
              px-8 py-4 rounded-full
              font-[Space_Grotesk] text-sm
              border border-white/10
              bg-white/[0.03]
              text-white/75
              transition-all duration-300
              hover:border-[#c89b7b]/60
              hover:text-[#c89b7b]"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Residences
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div
        className="absolute bottom-0 left-0 right-0
        h-32 bg-gradient-to-t
        from-black to-transparent"
      />
    </section>
  );
}
