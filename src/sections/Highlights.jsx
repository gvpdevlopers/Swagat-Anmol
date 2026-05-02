import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImg from "../assets/highlight-bg.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Highlights() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = countersRef.current.filter(Boolean);

      counters.forEach((counterEl) => {
        const wrapper = counterEl.closest(".counter-wrap");
        const endValue = parseInt(counterEl.dataset.value, 10);

        let obj = { val: 0 };

        gsap.to(obj, {
          val: endValue,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%", // starts late
            end: "center center", // finishes EXACTLY at center
            scrub: true,
          },
          onUpdate: () => {
            counterEl.textContent = Math.round(obj.val);
          },
        });

        // 👇 Position sync (important)
        gsap.fromTo(
          wrapper,
          { y: -100 }, // stronger offset
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 100%",
              end: "center center",
              scrub: true,
            },
          },
        );
      });

      // BACKGROUND ZOOM (subtle cinematic)
      gsap.to(bgRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative text-white min-h-[300vh]">
      {/* BACKGROUND */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          ref={bgRef}
          src={bgImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* SLIDE 1 */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="counter-wrap flex flex-col items-center text-center">
            <h2 className="text-[64px] sm:text-[90px] md:text-[140px] font-semibold leading-none">
              <span ref={(el) => (countersRef.current[0] = el)} data-value="5">
                0
              </span>
            </h2>

            <p className="mt-6 md:mt-8 text-xs sm:text-sm md:text-lg tracking-[0.3em] text-white/70 uppercase">
              Towers
            </p>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="h-screen flex items-center justify-center px-4">
          <div className="counter-wrap flex flex-col items-center text-center">
            <h2 className="text-[64px] sm:text-[90px] md:text-[140px] font-semibold leading-none">
              <span ref={(el) => (countersRef.current[1] = el)} data-value="14">
                0
              </span>
            </h2>

            <p className="mt-6 md:mt-8 text-xs sm:text-sm md:text-lg tracking-[0.3em] text-white/70 uppercase">
              Storeys
            </p>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div className="h-screen flex items-center justify-center text-center px-4">
          <div className="translate-y-6 md:translate-y-10 max-w-2xl">
            <h2 className="text-[32px] sm:text-[48px] md:text-[72px] font-semibold">
              Palanpur
            </h2>

            <p className="mt-6 text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
              A premium residential destination designed for modern living,
              connectivity, and long-term value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
