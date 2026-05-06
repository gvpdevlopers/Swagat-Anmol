import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  "24x7 Security",
  "CCTV Surveillance",
  "Club House",
  "Gymnasium",
  "Yoga Deck",
  "Children Play Area",
  "Jogging Track",
  "Senior Citizen Sitting",
  "Landscape Garden",
  "Gazebo",
  "Indoor Games",
  "Mini Theatre",
];

export default function Amenities() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Stagger animation
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[#0a0a0a] text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            Amenities
          </p>

          <h2 className="mt-4 text-5xl font-semibold leading-tight">
            Crafted for a Better Lifestyle
          </h2>

          <p className="mt-6 text-gray-400">
            Experience thoughtfully designed amenities that enhance comfort, 
            convenience, and everyday living.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {amenities.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative border border-white/10 p-6 rounded-xl overflow-hidden cursor-pointer transition"
            >
              
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>

              {/* Content */}
              <p className="relative z-10 text-lg font-medium tracking-wide group-hover:translate-x-1 transition duration-300">
                {item}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}