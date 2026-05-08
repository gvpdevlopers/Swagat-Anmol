import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import residencesHero from "../../assets/hero.webp";
import { Link } from "react-router-dom";

export default function ResidencesHero() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const overlayRef = useRef();
  const imageRef = useRef();
  const buttonsRef = useRef();
  const badgeRef = useRef();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(
        imageRef.current,
        { scale: 1.08, opacity: 0.85 },
        { scale: 1, opacity: 1, duration: 2 },
      )
        .fromTo(
          overlayRef.current,
          { opacity: 0.85 },
          { opacity: 0.6, duration: 1.2 },
          "-=1.5",
        )
        .fromTo(
          badgeRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=1.2",
        )
        .fromTo(
          titleRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=1.1",
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=1",
        )
        .fromTo(
          buttonsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.9",
        );

      gsap.to(imageRef.current, {
        scale: 1.03,
        duration: 14,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section className="h-screen relative overflow-hidden">
      {/* BACKGROUND */}
      <img
        ref={imageRef}
        src={residencesHero}
        alt="Residences at Swagat Anmol"
        onLoad={() => setLoaded(true)}
        className="absolute w-full h-full
object-cover will-change-transform
brightness-[0.78] contrast-[1.08]"
      />

      {/* MAIN OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0
  bg-gradient-to-b
  from-black/85
  via-black/60
  to-black/85"
      />

      {/* CINEMATIC VIGNETTE */}
      <div
        className="absolute inset-0
  bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.5)_100%)]"
      />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div className="max-w-5xl">
          {/* SMALL BADGE */}
          <div
            ref={badgeRef}
            className="mb-6 inline-block
px-4 py-1.5 rounded-full
text-[10px] tracking-[0.35em] uppercase
border border-white/10
text-white/65
backdrop-blur-xl bg-white/[0.04]
shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          >
            Residences at Swagat Anmol
          </div>

          {/* TITLE */}
          <h1
            ref={titleRef}
            className="font-[Space_Grotesk]
text-4xl sm:text-5xl md:text-7xl
font-semibold leading-[1.02]
tracking-tight
drop-shadow-[0_6px_35px_rgba(0,0,0,0.75)]"
          >
            <span className="block text-white">Crafted Spaces for</span>

            <span className="block bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
              Elevated Living
            </span>
          </h1>

          {/* SUBTITLE */}
          <p
            ref={subtitleRef}
            className="mt-7
text-base sm:text-lg md:text-xl
text-white/75
max-w-2xl mx-auto
leading-relaxed
drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]"
          >
            Explore intelligently designed 2 & 3 BHK residences and exclusive
            penthouses crafted with precision, comfort, and timeless elegance.
          </p>

          {/* CTA */}
          <div
            ref={buttonsRef}
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5"
          >
            {/* PRIMARY CTA */}
            <Link to="/contact">
              <button
                className="relative px-9 py-4 rounded-full text-sm font-[Space_Grotesk]
      overflow-hidden group cursor-pointer
      backdrop-blur-xl bg-white/10 border border-white/20
      shadow-[0_10px_40px_rgba(0,0,0,0.3)]
      transition-all duration-300
      hover:border-[#c89b7b]/60
      hover:shadow-[0_12px_60px_rgba(200,155,123,0.3)]"
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

            {/* SECONDARY CTA */}
            <button
              onClick={() => {
                const section = document.getElementById("unit-floorplans");

                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="relative px-6 py-3 text-sm font-[Space_Grotesk]
  text-white/80 group cursor-pointer transition"
            >
              <span
                className="inline-flex items-center gap-2
    group-hover:text-[#c89b7b] transition"
              >
                Explore Floor Plans
                <span
                  className="inline-block transform
      transition-transform duration-300
      group-hover:translate-x-1"
                >
                  →
                </span>
              </span>

              <span
                className="absolute left-0 bottom-0
    h-[1px] w-0 bg-[#c89b7b]
    transition-all duration-500
    group-hover:w-full"
              />
            </button>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/60 animate-pulse font-[Space_Grotesk]">
        Discover More ↓
      </div>
    </section>
  );
}
