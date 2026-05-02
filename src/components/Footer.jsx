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
  const sectionRef = useRef();
  const contentRef = useRef();
  const bgTextRef = useRef();
  const glowRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.to(bgTextRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(glowRef.current, {
        x: 40,
        y: -20,
        duration: 8,
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
      className="relative text-white pt-24 pb-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      {/* AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] bg-[#c89b7b]/20 blur-[120px] rounded-full top-[-100px] right-[-100px]"
      />

      {/* GRID TEXTURE */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12"
      >
        {/* BRAND */}
        <div>
          <h2 className="font-[Space_Grotesk] text-2xl font-semibold tracking-tight">
            Swagat Anmol
          </h2>

          <p className="mt-4 text-gray-300 max-w-sm font-[Inter] leading-relaxed">
            A premium residential project designed for modern living, offering
            spacious homes, elegant design, and a refined lifestyle.
          </p>

          {/* SOCIAL (UPGRADED) */}
          <div className="mt-6 flex gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/swagatanmol/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 flex items-center justify-center rounded-full
              backdrop-blur-xl bg-white/10 border border-white/20
              hover:border-[#c89b7b]/60 transition-all duration-300
              hover:scale-110 hover:shadow-[0_8px_25px_rgba(200,155,123,0.25)]"
            >
              <FaInstagram className="text-white/80 group-hover:text-[#c89b7b] transition" />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@SwagatAnmol"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 flex items-center justify-center rounded-full
              backdrop-blur-xl bg-white/10 border border-white/20
              hover:border-[#c89b7b]/60 transition-all duration-300
              hover:scale-110 hover:shadow-[0_8px_25px_rgba(200,155,123,0.25)]"
            >
              <FaYoutube className="text-white/80 group-hover:text-[#c89b7b] transition" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Swagat-anmol/61585867961708/#"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 flex items-center justify-center rounded-full
              backdrop-blur-xl bg-white/10 border border-white/20
              hover:border-[#c89b7b]/60 transition-all duration-300
              hover:scale-110 hover:shadow-[0_8px_25px_rgba(200,155,123,0.25)]"
            >
              <FaFacebookF className="text-white/80 group-hover:text-[#c89b7b] transition" />
            </a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400 font-[Inter]">
            Navigation
          </h3>

          <ul className="mt-6 space-y-3 font-[Inter]">
            {["Home", "About", "Amenities", "Gallery", "Contact"].map(
              (item, i) => (
                <li
                  key={i}
                  className="group cursor-pointer text-gray-300 hover:text-white transition"
                >
                  <span className="relative inline-block">
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#c89b7b] transition-all duration-300 group-hover:w-full" />
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400 font-[Inter]">
            Contact
          </h3>

          <ul className="mt-6 space-y-4 font-[Inter] text-gray-300">
            <li className="flex items-start gap-3 group">
              <FaMapMarkerAlt className="mt-1 text-gray-500 group-hover:text-[#c89b7b] transition" />
              Palanpur, Surat
            </li>

            <li className="flex items-start gap-3 group">
              <FaPhoneAlt className="mt-1 text-gray-500 group-hover:text-[#c89b7b] transition" />
              +91 98765 43210
            </li>

            <li className="flex items-start gap-3 group">
              <FaEnvelope className="mt-1 text-gray-500 group-hover:text-[#c89b7b] transition" />
              info@swagatanmol.com
            </li>
          </ul>
        </div>
      </div>

      {/* BACKGROUND TEXT */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end opacity-[0.035]">
        {/* SWAGAT (top faded layer) */}
        <h1
          className="font-[Space_Grotesk] font-semibold"
          style={{
            fontSize: "clamp(40px, 10vw, 160px)",
            lineHeight: "0.8",
            letterSpacing: "-0.04em",
            transform: "translateY(-10%)",
          }}
        >
          SWAGAT
        </h1>

        {/* ANMOL (main large text) */}
        <h1
          ref={bgTextRef}
          className="font-[Space_Grotesk] font-semibold"
          style={{
            fontSize: "clamp(60px, 14vw, 240px)",
            lineHeight: "0.8",
            letterSpacing: "-0.04em",
          }}
        >
          ANMOL
        </h1>
      </div>

      {/* DIVIDER */}
      <div className="mt-16 border-t border-white/10" />

      {/* BOTTOM */}
      <div className="relative z-10 mt-6 text-center text-gray-400 text-sm font-[Inter] space-y-2 px-6">
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
    </footer>
  );
}
