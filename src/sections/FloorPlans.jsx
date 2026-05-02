import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTimes } from "react-icons/fa";

import plan1 from "../assets/2 BHK Unit Plan.jpeg";
import plan2 from "../assets/3 BHK Unit Plan.jpeg";
import plan3 from "../assets/3 BHK Penthouse.jpeg";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    title: "2 BHK Residences",
    desc: "Smart, efficient layouts",
    image: plan1,
  },
  {
    title: "3 BHK Residences",
    desc: "Spacious family living",
    image: plan2,
  },
  {
    title: "3 BHK Penthouse",
    desc: "Luxury redefined",
    image: plan3,
  },
];

export default function FloorPlans() {
  const sectionRef = useRef();
  const rowsRef = useRef([]);
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // smooth parallax
  const handleMouseMove = (e, el) => {
    if (window.innerWidth < 768) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el.querySelector("img"), {
      x: x * 16,
      y: y * 16,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = (el) => {
    gsap.to(el.querySelector("img"), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="py-24 md:py-32"
        style={{ background: "#f5f1ec" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          {/* HEADER */}
          <div className="mb-16 md:mb-20 max-w-3xl">
            <p className="text-xs tracking-[0.25em] uppercase text-black/40 font-[Inter]">
              Floor Plans
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] font-semibold text-[#1a1a1a]">
              Interactive Living Spaces
            </h2>
          </div>

          {/* ROWS */}
          <div className="space-y-16 md:space-y-24">
            {plans.map((plan, i) => {
              const isReverse = i % 2 !== 0;

              return (
                <div
                  key={i}
                  ref={(el) => (rowsRef.current[i] = el)}
                  className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  {/* IMAGE CARD */}
                  <div
                    className={`relative group cursor-pointer ${
                      isReverse ? "md:order-2" : ""
                    }`}
                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={(e) => handleLeave(e.currentTarget)}
                    onClick={() => setActivePlan(plan)}
                  >
                    <div className="relative rounded-2xl overflow-hidden p-[1px] bg-gradient-to-br from-[#c89b7b]/30 to-transparent">
                      {/* GLASS CARD */}
                      <div className="relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_40px_120px_rgba(0,0,0,0.12)]">
                        {/* INNER LIGHT */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                        {/* IMAGE */}
                        <div className="h-[240px] sm:h-[280px] md:h-[320px] flex items-center justify-center">
                          <img
                            src={plan.image}
                            alt={plan.title}
                            className="h-full object-contain rotate-90 scale-[1.2] transition-transform duration-700 ease-out group-hover:scale-[1.28]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className={`${isReverse ? "md:order-1" : ""}`}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-[Space_Grotesk] font-semibold text-[#1a1a1a] [text-shadow:0_1px_0_rgba(255,255,255,0.4)]">
                      {plan.title}
                    </h3>

                    <p className="mt-3 text-black/60 font-[Inter]">
                      {plan.desc}
                    </p>

                    <button
                      onClick={() => setActivePlan(plan)}
                      className="mt-6 px-6 py-3 rounded-full text-sm font-[Space_Grotesk]
  relative overflow-hidden group cursor-pointer
  bg-white border border-black/20 text-black/80
  shadow-[0_6px_20px_rgba(0,0,0,0.08)]
  transition-all duration-300
  hover:border-[#c89b7b] hover:text-[#c89b7b]
  hover:shadow-[0_10px_30px_rgba(200,155,123,0.2)]"
                    >
                      {/* light shimmer */}
                      <span className="absolute top-0 left-[-120%] w-[60%] h-full bg-gradient-to-r from-transparent via-black/10 to-transparent rotate-12 group-hover:left-[120%] transition-all duration-1000" />

                      <span className="relative z-10">View Floor Plan →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {activePlan && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center px-4">
          <button
            onClick={() => setActivePlan(null)}
            className="absolute top-6 right-6 text-white text-xl"
          >
            <FaTimes />
          </button>

          <div className="max-w-5xl w-full text-center">
            <h2 className="mb-6 text-xl sm:text-2xl font-[Space_Grotesk] text-white">
              {activePlan.title}
            </h2>

            <img
              src={activePlan.image}
              alt=""
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
