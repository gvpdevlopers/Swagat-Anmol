import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryIntro() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        badgeRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
      )
        .fromTo(
          titleRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.3",
        )
        .fromTo(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left",
          },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          textRef.current,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.6",
        );

      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 bg-[#f5f1ec] overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] 
          w-[420px] h-[420px] rounded-full 
          bg-[#c89b7b]/10 blur-[120px]"
        />

        <div
          className="absolute bottom-[-20%] left-[-10%] 
          w-[380px] h-[380px] rounded-full 
          bg-[#c89b7b]/10 blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT */}
          <div>
            {/* BADGE */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              border border-black/10
              bg-white/60 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.3em]
                text-black/60 font-[Space_Grotesk]"
              >
                Visual Experience
              </span>
            </div>

            {/* TITLE */}
            <h2
              ref={titleRef}
              className="mt-8 font-[Space_Grotesk]
              text-4xl sm:text-5xl md:text-6xl
              leading-[1.05] tracking-tight
              text-[#071a33] font-semibold"
            >
              Designed To
              <span className="block text-[#c89b7b]">
                Feel Timeless
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <div>
            {/* LINE */}
            <div
              ref={lineRef}
              className="w-24 h-[1px] bg-gradient-to-r 
              from-[#c89b7b] to-transparent mb-8"
            />

            {/* TEXT */}
            <p
              ref={textRef}
              className="text-base sm:text-lg md:text-xl
              leading-relaxed text-black/70
              max-w-2xl"
            >
              Every corner of Swagat Anmol is crafted with
              intention - blending timeless architecture,
              refined interiors, natural light, and elevated
              lifestyle experiences into a space that feels
              both luxurious and deeply personal.
            </p>

            {/* OPTIONAL SMALL TEXT */}
            <p
              className="mt-6 text-sm sm:text-base
              text-black/45 leading-relaxed
              max-w-xl"
            >
              Explore thoughtfully designed residences,
              premium amenities, landscaped spaces, and
              immersive environments curated for modern living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}