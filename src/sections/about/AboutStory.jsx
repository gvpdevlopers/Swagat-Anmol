import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStatement() {
  const sectionRef = useRef();
  const linesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      linesRef.current.forEach((line) => {
        const inner = line.querySelector(".line-inner");

        gsap.fromTo(
          inner,
          {
            y: "110%",
            opacity: 0,
            filter: "blur(6px)",
            scale: 0.97,
          },
          {
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.6, // smoother than true
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-28 md:py-40 overflow-hidden"
    >
      {/* SOFT AMBIENT GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-25%] left-[-10%] w-[500px] h-[500px] bg-[#c89b7b]/10 blur-[140px]" />
        <div className="absolute bottom-[-25%] right-[-10%] w-[500px] h-[500px] bg-[#c89b7b]/10 blur-[140px]" />
      </div>

      {/* TOP DIVIDER */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="font-[Space_Grotesk] font-semibold tracking-tight space-y-6 md:space-y-8">
          {/* LINE 1 */}
          <div
            ref={(el) => (linesRef.current[0] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(38px,5.5vw,88px)] leading-[1.08] text-white/90">
              We don’t just build homes.
            </div>
          </div>

          {/* LINE 2 */}
          <div
            ref={(el) => (linesRef.current[1] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(38px,5.5vw,88px)] leading-[1.08] bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
              We create living experiences.
            </div>
          </div>

          {/* LINE 3 */}
          <div
            ref={(el) => (linesRef.current[2] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(38px,5.5vw,88px)] leading-[1.08] text-white/80">
              Designed for modern lifestyles.
            </div>
          </div>

          {/* LINE 4 */}
          <div
            ref={(el) => (linesRef.current[3] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(38px,5.5vw,88px)] leading-[1.08] text-white/70">
              Built for long-term value.
            </div>
          </div>
        </h2>

        {/* SUBTEXT (small but important) */}
        <p className="mt-10 max-w-2xl text-white/50 text-sm md:text-base leading-relaxed">
          Every element at Swagat Anmol is designed with intent — balancing
          aesthetics, functionality, and future-ready living.
        </p>
      </div>

      {/* BOTTOM DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
