import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactIntro() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT CONTENT
      gsap.fromTo(
        leftRef.current,
        {
          opacity: 0,
          y: 80,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      // RIGHT CONTENT
      gsap.fromTo(
        rightRef.current.children,
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
            trigger: rightRef.current,
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#f5f1ec] overflow-hidden"
    >
      {/* SUBTLE GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[20%] right-[-10%]
          w-[420px] h-[420px]
          rounded-full bg-[#c89b7b]/10 blur-[120px]"
        />
      </div>

      <div
        className="relative z-10
        max-w-7xl mx-auto
        px-5 sm:px-6 lg:px-8"
      >
        <div
          className="grid lg:grid-cols-[1.15fr_0.85fr]
          gap-14 lg:gap-24 items-start"
        >
          {/* LEFT */}
          <div ref={leftRef}>
            {/* LABEL */}
            <div
              className="inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              border border-black/10
              bg-white/60 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

              <span
                className="text-[10px]
                uppercase tracking-[0.35em]
                text-black/60 font-[Space_Grotesk]"
              >
                Connect With Us
              </span>
            </div>

            {/* TITLE */}
            <h2
              className="mt-8 font-[Space_Grotesk]
              text-4xl sm:text-5xl md:text-6xl xl:text-[72px]
              leading-[0.98] tracking-tight
              text-[#071a33] font-semibold"
            >
              Every Conversation
              <span className="block text-[#c89b7b]">Begins With</span>
              <span className="block">Understanding</span>
            </h2>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} className="lg:pt-16">
            {/* PARAGRAPH */}
            <p
              className="text-base sm:text-lg md:text-xl
              leading-relaxed text-black/60"
            >
              We believe meaningful spaces begin with meaningful conversations.
              Share your lifestyle, aspirations, and expectations, and our
              advisors will help you explore a living experience thoughtfully
              tailored for you.
            </p>

            {/* DIVIDER */}
            <div
              className="mt-10 w-24 h-[1px]
              bg-gradient-to-r
              from-[#c89b7b] to-transparent"
            />

            {/* SMALL DETAILS */}
            <div className="mt-10 space-y-5">
              {[
                "Private consultations",
                "Personalized guidance",
                "Luxury living experiences",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

                  <span className="text-sm sm:text-base text-black/65">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
