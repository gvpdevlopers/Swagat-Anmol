import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import building from "../assets/hero.webp";
import noise from "../assets/noise.png";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const sectionRef = useRef();
  const revealRef = useRef();
  const outlineRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // ================= DESKTOP =================
      if (!isMobile) {
        // reveal animation
        gsap.fromTo(
          revealRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );

        // subtle zoom (cinematic feel)
        gsap.to(revealRef.current, {
          backgroundSize: "185%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // breathing animation (very subtle)
        gsap.to(revealRef.current, {
          scale: 1.02,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // light sweep loop
        gsap.fromTo(
          lightRef.current,
          { x: "-120%" },
          {
            x: "120%",
            duration: 2.5,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 3,
          }
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
          }
        )
          .fromTo(
            ".mobile-divider",
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.6,
              transformOrigin: "left",
            },
            "-=0.4"
          )
          .fromTo(
            ".mobile-image",
            { scale: 1.15, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.3"
          );

        // subtle floating on mobile image
        gsap.to(".mobile-image", {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ================= MOUSE 3D TILT =================
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    const { innerWidth, innerHeight } = window;

    const x = (e.clientX / innerWidth - 0.5) * 12;
    const y = (e.clientY / innerHeight - 0.5) * 12;

    gsap.to(revealRef.current, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1200,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(outlineRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-40 overflow-hidden bg-black"
    >
      <div className="w-full px-4 md:px-8 text-center relative">

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block relative">

          {/* OUTLINE TEXT (clean depth instead of shadow blur) */}
          <h2
            ref={outlineRef}
            className="absolute inset-0 font-[Space_Grotesk] font-semibold text-transparent flex items-center justify-center pointer-events-none"
            style={{
              fontSize: "clamp(80px, 12vw, 220px)",
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
              letterSpacing: "-0.04em",
            }}
          >
            SWAGAT ANMOL
          </h2>

          {/* MAIN IMAGE TEXT */}
          <h2
            ref={revealRef}
            className="relative font-[Space_Grotesk] font-semibold flex items-center justify-center will-change-transform"
            style={{
              fontSize: "clamp(80px, 12vw, 220px)",
              letterSpacing: "-0.04em",

              backgroundImage: `url(${building})`,
              backgroundSize: "170%",
              backgroundPosition: "50% 45%",
              backgroundRepeat: "no-repeat",
              filter: "contrast(1.1) brightness(1.05)",

              WebkitBackgroundClip: "text",
              color: "transparent",

              clipPath: "inset(100% 0% 0% 0%)",
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
                "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
              mixBlendMode: "overlay",
            }}
          />

          {/* GRAIN OVERLAY (VERY IMPORTANT) */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay">
            <img src={noise} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex flex-col items-center text-center">

          <h2 className="mobile-title font-[Space_Grotesk] text-[42px] font-semibold text-white">
            SWAGAT
          </h2>

          <h2 className="mobile-title font-[Space_Grotesk] text-[42px] font-semibold bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
            ANMOL
          </h2>

          <div className="mobile-divider mt-4 w-16 h-[2px] bg-gradient-to-r from-[#c89b7b] to-[#d4a98c]" />

          <div className="mt-8 w-full px-2">
            <img
              src={building}
              alt="Swagat Anmol"
              className="mobile-image w-full h-[240px] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM FADE (cinematic transition) */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#071a33] to-transparent" />
    </section>
  );
}