import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import bgImage from "../../assets/experience-1.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function FullscreenParallax() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // IMAGE PARALLAX
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.15,
          y: "-5%",
        },
        {
          scale: 1,
          y: "5%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );

      // OVERLAY
      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0.75,
        },
        {
          opacity: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // CONTENT REVEAL
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
        },
      );

      // FLOATING GLOW
      gsap.to(".parallax-glow", {
        y: 80,
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
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden">
      {/* IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={bgImage}
          alt="Swagat Anmol Experience"
          className="w-full h-[115%] object-cover"
        />
      </div>

      {/* DARK OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0
        bg-gradient-to-b
        from-black/70 via-black/45 to-black/80"
      />

      {/* GOLD GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="parallax-glow absolute
          top-[15%] left-1/2 -translate-x-1/2
          w-[550px] h-[550px]
          rounded-full
          bg-[#c89b7b]/15
          blur-[140px]"
        />
      </div>

      {/* GRAIN */}
      <div
        className="absolute inset-0 opacity-[0.04]
        mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
        }}
      />

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 h-full
        flex flex-col items-center justify-center
        text-center px-5"
      >
        {/* LABEL */}
        <div
          className="inline-flex items-center gap-2
          px-5 py-2 rounded-full
          border border-white/10
          bg-white/[0.05] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

          <span
            className="text-[10px]
            uppercase tracking-[0.35em]
            text-white/70 font-[Space_Grotesk]"
          >
            Timeless Experience
          </span>
        </div>

        {/* TITLE */}
        <h2
          className="mt-8 font-[Space_Grotesk]
          text-4xl sm:text-5xl md:text-7xl xl:text-[110px]
          leading-[0.95] tracking-tight
          text-white font-semibold
          max-w-6xl"
          
        >
          Designed To
          <span className="block bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
            Feel Timeless
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p
          className="mt-8 max-w-3xl
          text-base sm:text-lg md:text-xl
          leading-relaxed text-white/65"
        >
          Every space at Swagat Anmol is thoughtfully crafted to create a
          refined living experience — blending architecture, emotion, luxury,
          and modern lifestyle into one timeless destination.
        </p>

        {/* DIVIDER */}
        <div
          className="mt-12 w-32 h-[1px]
          bg-gradient-to-r
          from-transparent via-[#c89b7b] to-transparent"
        />

        {/* CTA */}
        <button
          className="mt-12 relative
          px-8 py-4 rounded-full
          text-sm font-[Space_Grotesk]
          overflow-hidden group
          backdrop-blur-xl bg-white/10
          border border-white/15
          shadow-[0_10px_40px_rgba(0,0,0,0.3)]
          transition-all duration-300
          hover:border-[#c89b7b]/60
          hover:shadow-[0_12px_50px_rgba(200,155,123,0.25)]"
        >
          {/* BG */}
          <span
            className="absolute inset-0
            bg-gradient-to-r
            from-[#c89b7b]/20 to-[#d4a98c]/20
            opacity-0 group-hover:opacity-100
            transition duration-500"
          />

          {/* SHINE */}
          <span
            className="absolute top-0 left-[-120%]
            w-[60%] h-full
            bg-gradient-to-r
            from-transparent via-white/30 to-transparent
            rotate-12
            group-hover:left-[120%]
            transition-all duration-1000 ease-out"
          />

          <span
            className="relative z-10
            text-white group-hover:text-[#c89b7b]
            transition"
          >
            Explore The Experience
          </span>
        </button>
      </div>

      {/* BOTTOM FADE */}
      <div
        className="absolute bottom-0 left-0 right-0
        h-40 bg-gradient-to-t
        from-[#020617] to-transparent"
      />
    </section>
  );
}
