import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import plan2bhk from "../assets/2 BHK Unit Plan.jpeg";
import plan3bhk from "../assets/3 BHK Unit Plan.jpeg";

export default function UnitTypes() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ENTRY ANIMATION
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ================= 3D TILT =================
  const handleMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: x * 12,
      rotateX: -y * 12,
      transformPerspective: 1200,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const resetTilt = (el) => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  // ================= MODAL ANIMATION =================
  useEffect(() => {
    if (activePlan && modalRef.current && imageRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 0.85, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [activePlan]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #071a33 0%, #020617 60%, #000000 100%)",
      }}
    >
      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#c89b7b]/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#0a2342]/40 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-[Space_Grotesk] text-[34px] md:text-[60px] leading-tight">
            Choose your{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
              perfect space
            </span>
          </h2>

          <p className="mt-6 text-white/70 text-sm md:text-lg font-[Inter]">
            Designed for comfort, space, and modern elegance — crafted for your lifestyle.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">

          {/* CARD */}
          {[{ title: "2 BHK Residences", img: plan2bhk, desc: "Smart & efficient layouts" },
            { title: "3 BHK Residences", img: plan3bhk, desc: "Spacious luxury living" }
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, cardsRef.current[i])}
              onMouseLeave={() => resetTilt(cardsRef.current[i])}
              className="group relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-[320px] md:h-[420px] object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* LIGHT SWEEP */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-[Space_Grotesk] font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-white/70 text-sm">{item.desc}</p>

                <button
                  onClick={() => setActivePlan(item.img)}
                  className="mt-4 text-sm text-[#c89b7b] hover:text-[#d4a98c] transition cursor-pointer"
                >
                  View Floor Plan →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activePlan && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={() => setActivePlan(null)}
        >
          <div className="relative max-w-5xl w-full px-6">
            <img
              ref={imageRef}
              src={activePlan}
              alt=""
              className="w-full rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            />

            <button
              onClick={() => setActivePlan(null)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}