import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aboutMain from "../../assets/about-main.jpeg";
import aboutSmall from "../../assets/about-small.jpeg";

import decor1 from "../../assets/decor-2.svg";
import decor2 from "../../assets/decor-1.svg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // MAIN IMAGE (lightweight)
      gsap.fromTo(
        image1Ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // FLOAT IMAGE (clean + smooth)
      gsap.fromTo(
        image2Ref.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // PARALLAX (smooth version)
      gsap.to(image2Ref.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // TEXT
      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      {/* DECOR SVG (SUBTLE) */}
      <img
        src={decor1}
        className="absolute top-0 right-0 w-72 opacity-10 pointer-events-none"
        alt=""
      />

      <img
        src={decor2}
        className="absolute bottom-0 left-0 w-72 opacity-10 pointer-events-none"
        alt=""
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        {/* IMAGES */}
        <div className="relative">
          {/* MAIN */}
          <img
            ref={image1Ref}
            src={aboutMain}
            alt=""
            className="w-full h-[420px] md:h-[520px] object-cover rounded-3xl will-change-transform"
            style={{ transform: "translateZ(0)" }}
          />

          {/* FLOAT */}
          <img
            ref={image2Ref}
            src={aboutSmall}
            alt=""
            className="absolute bottom-[-30px] right-[-20px] md:right-[-40px] w-48 md:w-64 h-56 md:h-72 object-cover rounded-2xl border border-white/10 will-change-transform"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        {/* CONTENT */}
        <div ref={contentRef} className="text-white">
          <p className="text-xs tracking-[0.25em] uppercase text-white/60 font-[Inter]">
            About Project
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight font-[Space_Grotesk]">
            Crafted for Modern Living
          </h2>

          <p className="mt-6 text-white/70 leading-relaxed font-[Inter]">
            Swagat Anmol offers thoughtfully designed 2 & 3 BHK residences in
            Palanpur, blending elegance with functionality. With 5 towers rising
            14 storeys high, the project delivers a premium lifestyle with
            expansive spaces and modern amenities.
          </p>

          <p className="mt-4 text-white/60 font-[Inter]">
            Experience a new standard of living with podium gardens, dedicated
            parking, and a carefully planned environment built for comfort and
            convenience.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              className="relative px-7 py-3 rounded-full text-sm font-[Space_Grotesk] 
    overflow-hidden group cursor-pointer
    backdrop-blur-xl bg-white/10 border border-white/20
    shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300
    hover:border-[#c89b7b]/60 hover:shadow-[0_10px_40px_rgba(200,155,123,0.25)]"
            >
              {/* glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#c89b7b]/20 to-[#d4a98c]/20 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* shimmer */}
              <span className="absolute top-0 left-[-120%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-12 group-hover:left-[120%] transition-all duration-1000 ease-out" />

              <span className="relative z-10 text-white group-hover:text-[#c89b7b] transition">
                Learn More
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
