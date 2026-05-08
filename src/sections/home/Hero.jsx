import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import heroImg from "../../assets/hero.webp";

export default function Hero() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const overlayRef = useRef();
  const imageRef = useRef();
  const buttonsRef = useRef();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    tl.fromTo(
      imageRef.current,
      { scale: 1.06, opacity: 0.9 },
      { scale: 1, opacity: 1, duration: 1.8 },
    )
      .fromTo(
        overlayRef.current,
        { opacity: 0.9 },
        { opacity: 0.55, duration: 1 },
        "-=1.3",
      )
      .fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
        },
        "-=1.1",
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.9",
      )
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.8",
      );

    gsap.to(imageRef.current, {
      scale: 1.02,
      duration: 12,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }, [loaded]);

  return (
    <section className="h-screen relative overflow-hidden">
      {/* BACKGROUND */}
      <img
        ref={imageRef}
        src={heroImg}
        alt="Swagat Anmol"
        onLoad={() => setLoaded(true)}
        className="absolute w-full h-full object-cover will-change-transform"
      />

      {/* OVERLAY (better gradient for premium contrast) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
      />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div className="max-w-5xl">
          {/* TITLE */}
          <h1
            ref={titleRef}
            className="font-[Space_Grotesk] text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight"
          >
            <span className="block text-white/90">Where Elegance Meets</span>

            <span className="block bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(200,155,123,0.2)]">
              Expansive Spaces
            </span>
          </h1>

          {/* SUBTITLE */}
          <p
            ref={subtitleRef}
            className="mt-5 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Discover thoughtfully designed 2 & 3 BHK residences at Swagat Anmol,
            Palanpur.
          </p>

          {/* CTA */}
          <div
            ref={buttonsRef}
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            {/* PRIMARY CTA */}
            <Link to="/contact">
              <button
                className="relative px-8 py-4 rounded-full text-sm font-[Space_Grotesk]
      overflow-hidden group cursor-pointer
      backdrop-blur-xl bg-white/10 border border-white/20
      shadow-[0_10px_40px_rgba(0,0,0,0.3)]
      transition-all duration-300
      hover:border-[#c89b7b]/60
      hover:shadow-[0_12px_50px_rgba(200,155,123,0.25)]"
              >
                {/* GRADIENT GLOW */}
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

                <span className="relative z-10 text-white group-hover:text-[#c89b7b] transition">
                  Schedule Site Visit
                </span>
              </button>
            </Link>

            {/* SECONDARY CTA */}
            <Link to="/residences">
              <button
                className="relative px-6 py-3 text-sm font-[Space_Grotesk]
      text-white/80 group cursor-pointer transition"
              >
                <span
                  className="inline-flex items-center gap-2
        group-hover:text-[#c89b7b] transition"
                >
                  Explore Residences
                  {/* ARROW */}
                  <span
                    className="inline-block
          transform transition-transform duration-300
          group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>

                {/* UNDERLINE */}
                <span
                  className="absolute left-0 bottom-0
        h-[1px] w-0 bg-[#c89b7b]
        transition-all duration-500
        group-hover:w-full"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/60 animate-pulse font-[Space_Grotesk]">
        Scroll Down ↓
      </div>
    </section>
  );
}
