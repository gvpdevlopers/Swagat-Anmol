import { useEffect, useRef } from "react";
import gsap from "gsap";

import logo from "../assets/logo.png"; // make sure path is correct

export default function Loader({ done }) {
  const containerRef = useRef();
  const logoRef = useRef();
  const glowRef = useRef();
  const sweepRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 2, ease: "power2.out" }
    )
      .fromTo(
        logoRef.current,
        { scale: 0.85, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
        },
        "-=1.5"
      )
      .fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 1 },
        "-=1"
      )
      .fromTo(
        sweepRef.current,
        { x: "-120%" },
        { x: "120%", duration: 1.6, ease: "power2.inOut" },
        "-=0.8"
      )
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition duration-700 ${
        done ? "pointer-events-none" : ""
      }`}
    >
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] bg-[#c89b7b]/30 blur-[120px] rounded-full"
      />

      <div className="relative">
        <img
          ref={logoRef}
          src={logo}
          alt="logo"
          className="w-[180px] md:w-[240px] mix-blend-screen opacity-90"
        />

        <div
          ref={sweepRef}
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, transparent 40%, rgba(200,155,123,0.5) 50%, transparent 60%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
}