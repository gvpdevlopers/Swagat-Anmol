import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function NotFound() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const bigRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ENTRY
      gsap.from(".nf-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.from(".nf-btn", {
        y: 30,
        opacity: 0,
        delay: 0.4,
        duration: 0.8,
        ease: "power3.out",
      });

      // 🔥 PREMIUM FLOAT (smoother + slower)
      gsap.to(bigRef.current, {
        y: -20,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 🔥 BACKGROUND GLOW FLOAT
      gsap.to(glowRef.current, {
        y: 40,
        x: -20,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 🔥 MOUSE PARALLAX (key upgrade)
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;

    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;

    gsap.to(bigRef.current, {
      x,
      y,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(glowRef.current, {
      x: x * 1.5,
      y: y * 1.5,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      {/* 🔥 MOVING GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] bg-[#c89b7b]/20 blur-[120px] rounded-full"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="relative text-center px-6 max-w-2xl">
        {/* BIG 404 */}
        <h1
          ref={bigRef}
          className="text-[90px] sm:text-[120px] md:text-[160px] font-[Space_Grotesk] font-bold tracking-tight text-white/10"
        >
          404
        </h1>

        {/* TITLE */}
        <h2 className="nf-text text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] font-semibold leading-tight">
          Page not{" "}
          <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
            found
          </span>
        </h2>

        {/* DESC */}
        <p className="nf-text mt-4 text-white/70 text-sm sm:text-base md:text-lg">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTON */}
        <div className="nf-btn mt-8 flex justify-center">
          <Link
            to="/"
            className="relative px-8 py-3 rounded-full text-sm font-[Space_Grotesk]
            overflow-hidden group cursor-pointer
            backdrop-blur-xl bg-white/10 border border-white/20
            shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300
            hover:border-[#c89b7b]/60 hover:shadow-[0_10px_40px_rgba(200,155,123,0.25)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#c89b7b]/20 to-[#d4a98c]/20 opacity-0 group-hover:opacity-100 transition duration-500" />

            <span className="absolute top-0 left-[-120%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-12 group-hover:left-[120%] transition-all duration-1000 ease-out" />

            <span className="relative z-10 text-white group-hover:text-[#c89b7b] transition">
              Return to Home
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
