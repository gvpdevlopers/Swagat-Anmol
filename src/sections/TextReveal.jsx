import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal() {
  const sectionRef = useRef();
  const linesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      linesRef.current.forEach((line) => {
        const inner = line.querySelector(".line-inner");

        gsap.fromTo(
          inner,
          {
            y: "120%",
            opacity: 0,
            filter: "blur(8px)",
            scale: 0.96,
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
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative text-white bg-black py-32 md:py-40 overflow-hidden"
    >
      {/*  SUBTLE GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#c89b7b]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#c89b7b]/10 blur-[120px]" />
      </div>

      {/*  TOP DIVIDER */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">

        <h2 className="space-y-6 md:space-y-8 font-[Space_Grotesk] font-semibold tracking-tight">

          {/* LINE 1 */}
          <div
            ref={(el) => (linesRef.current[0] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(42px,6vw,96px)] leading-[1.05]">
              We don’t build homes.
            </div>
          </div>

          {/* LINE 2 */}
          <div
            ref={(el) => (linesRef.current[1] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(42px,6vw,96px)] leading-[1.05] bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
              We craft experiences.
            </div>
          </div>

          {/* LINE 3 */}
          <div
            ref={(el) => (linesRef.current[2] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(42px,6vw,96px)] leading-[1.05]">
              Designed for modern living.
            </div>
          </div>

          {/* LINE 4 */}
          <div
            ref={(el) => (linesRef.current[3] = el)}
            className="overflow-hidden"
          >
            <div className="line-inner text-[clamp(42px,6vw,96px)] leading-[1.05] bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
              Built for timeless comfort.
            </div>
          </div>

        </h2>

      </div>

      {/*  BOTTOM DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}