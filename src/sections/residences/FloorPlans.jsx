import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

import plan2bhk from "../../assets/2 BHK Unit Plan.jpeg";
import plan3bhk from "../../assets/3 BHK Unit Plan.jpeg";

export default function FloorPlans() {
  const [active, setActive] = useState("2bhk");

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // ================= TAB TRANSITION =================
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.96, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }
    );
  }, [active]);

  // ================= ZOOM PAN =================
  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageRef.current, {
      x: x * 30,
      y: y * 30,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const resetMove = () => {
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const currentImage = active === "2bhk" ? plan2bhk : plan3bhk;

  return (
    <section
      className="relative py-24 md:py-32 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020617 0%, #071a33 50%, #000000 100%)",
      }}
    >
      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#c89b7b]/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#0a2342]/40 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-[Space_Grotesk] text-[34px] md:text-[60px] leading-tight">
            Explore detailed{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
              floor plans
            </span>
          </h2>

          <p className="mt-6 text-white/70 text-sm md:text-lg font-[Inter]">
            Thoughtfully designed layouts that maximize space, comfort, and functionality.
          </p>
        </div>

        {/* TABS */}
        <div className="mt-12 flex justify-center">
          <div className="flex backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1">

            {["2bhk", "3bhk"].map((type) => (
              <button
                key={type}
                onClick={() => setActive(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  active === type
                    ? "bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {type === "2bhk" ? "2 BHK" : "3 BHK"}
              </button>
            ))}
          </div>
        </div>

        {/* PLAN VIEW */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseLeave={resetMove}
          className="mt-16 relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5"
        >
          {/* IMAGE */}
          <img
            ref={imageRef}
            src={currentImage}
            alt="Floor Plan"
            className="w-full h-[400px] md:h-[600px] object-contain p-6"
          />

          {/* OVERLAY DEPTH */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />

          {/* LIGHT SWEEP */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition duration-1000" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] text-black font-medium transition hover:scale-105">
            Download Plan
          </button>

          <button className="px-8 py-3 rounded-full border border-white/20 text-white/80 hover:border-[#c89b7b] hover:text-[#c89b7b] transition">
            Book Site Visit
          </button>

        </div>

      </div>
    </section>
  );
}