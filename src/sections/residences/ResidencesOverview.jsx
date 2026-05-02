import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ResidencesOverview() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADING REVEAL
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // PARAGRAPH
      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      // CARDS STAGGER
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        }
      );

      // SUBTLE FLOAT (premium feel)
      gsap.to(cardsRef.current, {
        y: -8,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-[#071a33] to-black text-white overflow-hidden"
    >
      {/* SOFT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#c89b7b]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#c89b7b]/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        {/* HEADING */}
        <h2
          ref={headingRef}
          className="font-[Space_Grotesk] text-[34px] sm:text-[44px] md:text-[60px] lg:text-[72px] leading-[1.05] tracking-tight"
        >
          Crafted for{" "}
          <span className="bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
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

        {/* HIGHLIGHTS */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">

          {/* CARD 1 */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <h3 className="text-xl md:text-2xl font-[Space_Grotesk] font-semibold">
              2 & 3 BHK
            </h3>
            <p className="mt-2 text-white/60 text-sm">
              Spacious layouts designed for modern families
            </p>
          </div>

          {/* CARD 2 */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <h3 className="text-xl md:text-2xl font-[Space_Grotesk] font-semibold">
              Premium Design
            </h3>
            <p className="mt-2 text-white/60 text-sm">
              Elegant architecture with refined detailing
            </p>
          </div>

          {/* CARD 3 */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <h3 className="text-xl md:text-2xl font-[Space_Grotesk] font-semibold">
              Prime Location
            </h3>
            <p className="mt-2 text-white/60 text-sm">
              Seamless connectivity in a peaceful environment
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}