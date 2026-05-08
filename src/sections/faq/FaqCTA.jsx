import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function FaqCTA() {
  const sectionRef = useRef();
  const contentRef = useRef();
  const glowRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.to(glowRef.current, {
        x: 40,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMove = (e, el) => {
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = (el) => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-black md:py-36 text-white overflow-hidden"
    >
      {/* AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] bg-[#c89b7b]/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"
      />

      {/* SUBTLE GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div ref={contentRef}>
          {/* LABEL */}
          <div
            className="inline-flex items-center gap-2
            px-4 py-1.5 rounded-full
            border border-white/10
            bg-white/[0.04]"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px]
              uppercase tracking-[0.35em]
              text-white/55 font-[Space_Grotesk]"
            >
              Need More Assistance?
            </span>
          </div>

          {/* HEADLINE */}
          <h2
            className="mt-8 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl
            font-semibold leading-[1.08] tracking-tight"
          >
            Still Have
            <span className="block bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>

          {/* SUBTEXT */}
          <p
            className="mt-6 text-white/65
            max-w-2xl mx-auto
            font-[Inter]
            text-sm sm:text-base
            leading-relaxed"
          >
            Our team is here to assist you with project details, floor plans,
            pricing information, site visits, and personalized guidance to help
            you make the right decision.
          </p>

          {/* DIVIDER */}
          <div className="mt-8 w-16 h-[2px] mx-auto bg-gradient-to-r from-[#c89b7b] to-[#d4a98c]" />

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {/* PRIMARY */}
            <Link to="/contact">
              <button
                onMouseMove={(e) => handleMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleLeave(e.currentTarget)}
                className="relative px-8 py-4 rounded-full
                font-[Space_Grotesk] text-sm
                backdrop-blur-xl
                bg-white/10 border border-white/20
                shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                overflow-hidden group cursor-pointer
                transition-all duration-300
                hover:border-[#c89b7b]/60
                hover:shadow-[0_12px_50px_rgba(200,155,123,0.25)]"
              >
                {/* GLOW */}
                <span
                  className="absolute inset-0
                  bg-gradient-to-r
                  from-[#c89b7b]/20 to-[#d4a98c]/20
                  opacity-0 group-hover:opacity-100
                  transition duration-500"
                />

                {/* SHIMMER */}
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
                  Schedule Site Visit
                </span>
              </button>
            </Link>

            {/* SECONDARY */}
            <Link to="/contact">
              <button
                onMouseMove={(e) => handleMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleLeave(e.currentTarget)}
                className="relative px-8 py-4 rounded-full
                font-[Space_Grotesk] text-sm
                border border-white/20
                hover:border-[#c89b7b]/60
                hover:text-[#c89b7b]
                transition-all duration-300
                backdrop-blur-xl bg-white/5
                cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  Contact Advisor
                  <span
                    className="inline-block
                    transition-transform duration-300
                    group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </button>
            </Link>
          </div>

          {/* TRUST LINE */}
          <p className="mt-10 text-xs text-white/35 tracking-wide">
            Personalized guidance • Private consultations • Quick response
          </p>
        </div>
      </div>
    </section>
  );
}
