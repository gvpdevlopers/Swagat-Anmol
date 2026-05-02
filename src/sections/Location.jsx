import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mapImg from "../assets/masterplan.webp";

gsap.registerPlugin(ScrollTrigger);

const points = [
  { name: "Podium Garden", x: "48%", y: "55%" },
  { name: "Kids Play Area", x: "60%", y: "62%" },
  { name: "Jogging Track", x: "40%", y: "65%" },
  { name: "Senior Citizen Sitting", x: "55%", y: "48%" },
  { name: "Landscape Garden", x: "35%", y: "50%" },
  { name: "Shiv Mandir", x: "50%", y: "70%" },
  { name: "Semi Covered Sitting", x: "65%", y: "52%" },
  { name: "Yoga Deck", x: "45%", y: "60%" },
];

export default function Location() {
  const sectionRef = useRef();
  const pinsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Animate pins
      gsap.fromTo(
        pinsRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-400">
            Location
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold">
            Explore the Master Plan
          </h2>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden">

          {/* Image */}
          <img
            src={mapImg}
            alt="Master Plan"
            className="w-full h-[500px] md:h-[650px] object-cover"
            loading="lazy"
          />

          {/* Overlay (optional for contrast) */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Pins */}
          {points.map((point, i) => (
            <div
              key={i}
              ref={(el) => (pinsRef.current[i] = el)}
              className="absolute group"
              style={{
                left: point.x,
                top: point.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Dot */}
              <div className="w-4 h-4 bg-[#c08b5c] rounded-full relative cursor-pointer">

                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-[#c08b5c] animate-ping opacity-50"></span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {point.name}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}