import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bgTextRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CONTENT REVEAL
      gsap.from(contentRef.current.children, {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // PARALLAX: BACKGROUND TEXT (mid layer)
      gsap.to(bgTextRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // PARALLAX: GLOW (far layer - slower)
      gsap.to(glowRef.current, {
        y: -60,
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // SUBTLE FLOATING (keeps it alive)
      gsap.to(glowRef.current, {
        y: "-=20",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative text-white pt-24 md:pt-32 pb-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      {/* FAR LAYER - GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] 
        bg-[#c89b7b]/20 blur-[120px] rounded-full 
        top-[-100px] right-[-120px]"
      />

      {/* GRID TEXTURE */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />

      {/* CONTENT (NEAR LAYER) */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12"
      >
        {/* BRAND */}
        <div>
          <h2 className="font-[Space_Grotesk] text-xl md:text-2xl font-semibold">
            Swagat Anmol
          </h2>

          <p className="mt-4 text-gray-300 max-w-sm text-sm md:text-base leading-relaxed">
            A premium residential project designed for modern living, offering
            spacious homes, elegant design, and a refined lifestyle.
          </p>

          {/* SOCIAL */}
          <div className="mt-6 flex gap-4">
            {[FaInstagram, FaYoutube, FaFacebookF].map((Icon, i) => (
              <div
                key={i}
                className="group w-10 h-10 flex items-center justify-center rounded-full
                backdrop-blur-xl bg-white/10 border border-white/20
                hover:border-[#c89b7b]/60 transition-all duration-300
                hover:scale-110 hover:shadow-[0_8px_25px_rgba(200,155,123,0.25)]"
              >
                <Icon className="text-white/80 group-hover:text-[#c89b7b] transition" />
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400">
            Navigation
          </h3>

          <ul className="mt-6 space-y-3 text-sm">
            {["Home", "About", "Amenities", "Gallery", "Contact"].map(
              (item, i) => (
                <li
                  key={i}
                  className="group cursor-pointer text-gray-300 hover:text-white"
                >
                  <span className="relative inline-block">
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#c89b7b] group-hover:w-full transition-all duration-300" />
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400">
            Contact
          </h3>

          <ul className="mt-6 space-y-4 text-sm text-gray-300">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 text-gray-500" />
              Palanpur
            </li>

            <li className="flex gap-3">
              <FaPhoneAlt className="mt-1 text-gray-500" />
              +91 98765 43210
            </li>

            <li className="flex gap-3">
              <FaEnvelope className="mt-1 text-gray-500" />
              info@swagatanmol.com
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM SECTION WITH PARALLAX TEXT */}
      <div className="relative mt-20">
        {/* MID LAYER - BG TEXT */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.04] hidden sm:flex">
          <div ref={bgTextRef} className="text-center">
            <h1
              className="font-[Space_Grotesk] font-semibold"
              style={{
                fontSize: "clamp(60px, 12vw, 200px)",
                lineHeight: "0.8",
                letterSpacing: "-0.04em",
              }}
            >
              SWAGAT
            </h1>

            <h1
              className="font-[Space_Grotesk] font-semibold"
              style={{
                fontSize: "clamp(80px, 14vw, 260px)",
                lineHeight: "0.8",
                letterSpacing: "-0.04em",
              }}
            >
              ANMOL
            </h1>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10" />

        {/* COPYRIGHT */}
        <div className="relative z-10 mt-6 text-center text-gray-400 text-xs md:text-sm space-y-2 px-6">
          <p>
            © {new Date().getFullYear()} Swagat Developers. All rights reserved.
          </p>

          <p>
            Designed & Developed by{" "}
            <a
              href="https://glowventures.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#c89b7b] transition"
            >
              Glow Ventures
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
