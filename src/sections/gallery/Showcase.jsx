import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import building from "../../assets/hero.webp";
import noise from "../../assets/noise.png";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const sectionRef = useRef();
  const revealRef = useRef();
  const outlineRef = useRef();
  const glowRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // ================= DESKTOP =================
      if (!isMobile) {
        // MAIN REVEAL
        gsap.fromTo(
          revealRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
            scale: 0.92,
            filter: "blur(18px)",
            y: 120,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          },
        );

        // OUTLINE REVEAL
        gsap.fromTo(
          outlineRef.current,
          {
            opacity: 0,
            scale: 1.08,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 2.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          },
        );

        // SLOW CINEMATIC MOTION
        gsap.to(revealRef.current, {
          backgroundPosition: "50% 55%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        // SLOW BREATHING
        gsap.to(revealRef.current, {
          scale: 1.018,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // GLOW FLOAT
        gsap.to(glowRef.current, {
          y: 60,
          x: 40,
          duration: 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // LIGHT SWEEP
        gsap.fromTo(
          lightRef.current,
          {
            x: "-140%",
            opacity: 0,
          },
          {
            x: "140%",
            opacity: 1,
            duration: 3,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 4,
          },
        );
      }

      // ================= MOBILE =================
      if (isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        });

        tl.fromTo(
          ".mobile-title",
          {
            y: 60,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.15,
            duration: 1,
            ease: "expo.out",
          },
        )
          .fromTo(
            ".mobile-divider",
            {
              scaleX: 0,
              opacity: 0,
            },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              transformOrigin: "left",
            },
            "-=0.5",
          )
          .fromTo(
            ".mobile-image",
            {
              scale: 1.15,
              opacity: 0,
              filter: "blur(10px)",
            },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "expo.out",
            },
            "-=0.5",
          );

        gsap.to(".mobile-image", {
          y: -12,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ================= 3D TILT =================
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    const { innerWidth, innerHeight } = window;

    const x = (e.clientX / innerWidth - 0.5) * 10;
    const y = (e.clientY / innerHeight - 0.5) * 10;

    gsap.to(revealRef.current, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1800,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(outlineRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-black py-28 md:py-44 overflow-hidden"
    >
      {/* AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="absolute
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[700px] h-[700px]
        rounded-full
        bg-[#c89b7b]/12
        blur-[140px]
        pointer-events-none"
      />

      {/* GRADIENT MASK */}
      <div
        className="absolute inset-0
        bg-gradient-to-b
        from-black via-transparent to-[#071a33]/80
        pointer-events-none"
      />

      <div className="w-full px-4 md:px-8 text-center relative z-10">
        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block relative">
          {/* OUTLINE TEXT */}
          <h2
            ref={outlineRef}
            className="absolute inset-0
            font-[Space_Grotesk]
            font-semibold
            text-transparent
            flex items-center justify-center
            pointer-events-none"
            style={{
              fontSize: "clamp(90px, 13vw, 240px)",
              WebkitTextStroke: "1px rgba(255,255,255,0.07)",
              letterSpacing: "-0.05em",
            }}
          >
            SWAGAT ANMOL
          </h2>

          {/* MAIN TEXT */}
          <h2
            ref={revealRef}
            className="relative
            font-[Space_Grotesk]
            font-semibold
            flex items-center justify-center
            will-change-transform"
            style={{
              fontSize: "clamp(90px, 13vw, 240px)",
              letterSpacing: "-0.05em",

              backgroundImage: `
                linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.95),
                  rgba(255,255,255,0.85)
                ),
                url(${building})
              `,

              backgroundBlendMode: "overlay",

              backgroundSize: "180%",
              backgroundPosition: "50% 45%",
              backgroundRepeat: "no-repeat",

              filter: "contrast(1.15) brightness(1.08) saturate(1.1)",

              WebkitBackgroundClip: "text",
              color: "transparent",

              clipPath: "inset(100% 0% 0% 0%)",

              textShadow: "0 0 30px rgba(255,255,255,0.05)",
            }}
          >
            SWAGAT ANMOL
          </h2>

          {/* LIGHT SWEEP */}
          <div
            ref={lightRef}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)",
              mixBlendMode: "screen",
              filter: "blur(8px)",
            }}
          />

          {/* GRAIN */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay">
            <img src={noise} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex flex-col items-center text-center">
          <h2
            className="mobile-title
            font-[Space_Grotesk]
            text-[46px]
            font-semibold
            text-white"
          >
            SWAGAT
          </h2>

          <h2
            className="mobile-title
            font-[Space_Grotesk]
            text-[46px]
            font-semibold
            bg-gradient-to-r
            from-[#c89b7b]
            to-[#e0bfa3]
            bg-clip-text text-transparent"
          >
            ANMOL
          </h2>

          <div
            className="mobile-divider
            mt-5 w-20 h-[2px]
            bg-gradient-to-r
            from-[#c89b7b]
            to-[#d4a98c]"
          />

          <div className="mt-10 w-full px-2">
            <img
              src={building}
              alt="Swagat Anmol"
              className="mobile-image
              w-full h-[260px]
              object-cover rounded-[24px]
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div
        className="absolute bottom-0 left-0
        w-full h-40
        bg-gradient-to-t
        from-[#071a33]
        to-transparent"
      />
    </section>
  );
}
