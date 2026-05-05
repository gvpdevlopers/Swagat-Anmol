import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BigTextScroll() {
  const textRef = useRef();

  useEffect(() => {
    const el = textRef.current;

    // duplicate for seamless loop
    el.innerHTML += el.innerHTML;

    const width = el.scrollWidth / 2;

    gsap.to(el, {
      x: -width,
      duration: 110, // slower = premium feel
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* EDGE FADE */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-black to-transparent" />
      </div>

      {/* MAIN TEXT */}
      <div className="relative whitespace-nowrap">
        <div
          ref={textRef}
          className="flex gap-24 md:gap-32 font-[Space_Grotesk] font-semibold tracking-tight"
          style={{
            fontSize: "clamp(70px, 12vw, 180px)",
            lineHeight: "1.05",
          }}
        >
          <span className="text-white">Crafted for refined living.</span>

          <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
            Designed with intention.
          </span>

          <span className="text-white">Spaces that feel elevated.</span>

          <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
            Built for modern lifestyles.
          </span>
        </div>
      </div>

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      {/* BOTTOM LINE */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
}
