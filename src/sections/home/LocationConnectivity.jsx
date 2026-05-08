import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import locationImg from "../../assets/location-connectivity.jpeg";

gsap.registerPlugin(ScrollTrigger);

const points = [
  { name: "Jogging Track", x: "48%", y: "10%" },

  // moved LEFT toward center
  { name: "Kids Play Area", x: "70%", y: "20%" },

  { name: "Podium Garden", x: "40%", y: "66%" },

  // slightly centered & aligned with podium area
  { name: "Yoga Deck", x: "75%", y: "60%" },
];

const connectivity = [
  { label: "Schools", value: "5–10 min" },
  { label: "Hospitals", value: "10–15 min" },
  { label: "Highway Access", value: "5 min" },
  { label: "City Center", value: "15–20 min" },
];

export default function LocationConnectivity() {
  const sectionRef = useRef();
  const imageRef = useRef();
  const pinsRef = useRef([]);
  const contentRef = useRef([]);

  const [activePin, setActivePin] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // IMAGE ENTRY
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // PARALLAX
      gsap.to(imageRef.current, {
        y: -40,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // PINS ENTRY
      gsap.fromTo(
        pinsRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // CONTENT ENTRY
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 text-white"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* LEFT IMAGE */}
        <div className="relative">
          <div className="overflow-hidden border border-white/10">
            <img
              ref={imageRef}
              src={locationImg}
              alt="Location"
              className="w-full h-[360px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 "/>
          </div>

          {/* PINS */}
          {points.map((point, i) => (
            <div
              key={i}
              ref={(el) => (pinsRef.current[i] = el)}
              className="absolute"
              style={{
                left: point.x,
                top: point.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* DOT */}
              <div
                className="relative w-4 h-4 rounded-full bg-[#c89b7b] cursor-pointer"
                onClick={() => setActivePin(activePin === i ? null : i)}
                onMouseEnter={() => setActivePin(i)}
                onMouseLeave={() => setActivePin(null)}
              >
                {/* PULSE */}
                <span className="absolute inset-0 rounded-full bg-[#c89b7b] opacity-50 animate-ping" />
              </div>

              {/* TOOLTIP */}
              <div
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded bg-black/80 whitespace-nowrap transition ${
                  activePin === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                {point.name}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p
            ref={(el) => (contentRef.current[0] = el)}
            className="text-sm uppercase tracking-widest text-gray-400"
          >
            Location & Connectivity
          </p>

          <h2
            ref={(el) => (contentRef.current[1] = el)}
            className="mt-4 font-[Space_Grotesk] text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight"
          >
            Well connected,
            <br /> perfectly placed
          </h2>

          <p
            ref={(el) => (contentRef.current[2] = el)}
            className="mt-6 text-gray-300 max-w-md"
          >
            Situated in Palanpur, Swagat Anmol offers seamless access to
            essential destinations, ensuring convenience for everyday living.
          </p>

          {/* CONNECTIVITY LIST */}
          <div className="mt-8 md:mt-10 space-y-5">
            {connectivity.map((item, i) => (
              <div
                key={i}
                ref={(el) => (contentRef.current[i + 3] = el)}
                className="flex justify-between border-b border-white/10 pb-3 text-sm md:text-base"
              >
                <span className="text-gray-400">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            ref={(el) => (contentRef.current[contentRef.current.length] = el)}
            className="mt-8 md:mt-10"
          >
            <a
              href="https://goo.gl/maps/V5Ucs9E3ycMwcDKp8?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="relative px-7 py-3 rounded-full text-sm font-[Space_Grotesk] 
      overflow-hidden group cursor-pointer
      backdrop-blur-xl bg-white/10 border border-white/20
      shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300
      hover:border-[#c89b7b]/60
      hover:shadow-[0_10px_40px_rgba(200,155,123,0.25)]"
              >
                {/* GRADIENT GLOW */}
                <span
                  className="absolute inset-0
        bg-gradient-to-r
        from-[#c89b7b]/20 to-[#d4a98c]/20
        opacity-0 group-hover:opacity-100
        transition duration-500"
                />

                {/* SHIMMER SWEEP */}
                <span
                  className="absolute top-0 left-[-120%]
        w-[60%] h-full
        bg-gradient-to-r
        from-transparent via-white/30 to-transparent
        rotate-12
        group-hover:left-[120%]
        transition-all duration-1000 ease-out"
                />

                {/* TEXT */}
                <span
                  className="relative z-10
        inline-flex items-center gap-2
        text-white group-hover:text-[#c89b7b]
        transition"
                >
                  View on Map
                  <span
                    className="transition-transform duration-300
          group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
