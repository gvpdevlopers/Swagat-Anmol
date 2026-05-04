import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";

import plan2bhk from "../../assets/2 BHK Unit Plan.jpeg";
import plan3bhk from "../../assets/3 BHK Unit Plan.jpeg";

export default function UnitFloorPlans() {
  const imageRef = useRef(null);
  const [active, setActive] = useState("2bhk");
  const [modal, setModal] = useState(false);

  const plans = {
    "2bhk": {
      title: "2 BHK Residences",
      desc: "Smart & efficient layouts",
      image: plan2bhk,
    },
    "3bhk": {
      title: "3 BHK Residences",
      desc: "Spacious luxury living",
      image: plan3bhk,
    },
  };

  // ===== IMAGE SWITCH =====
  useEffect(() => {
    if (!imageRef.current) return;

    const tl = gsap.timeline();

    tl.to(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.in",
    })
      .add(() => {
        imageRef.current.src = plans[active].image;
      })
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
  }, [active]);

  return (
    <>
      <section
        className="relative py-20 md:py-28 text-black overflow-hidden"
        style={{ background: "#f5f1ec" }}
      >
        {/* GLOW (adjusted for light bg) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[350px] h-[350px] bg-[#c89b7b]/20 blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#0a2342]/10 blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 md:px-6">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-[Space_Grotesk] text-[30px] sm:text-[40px] md:text-[52px] leading-tight">
              Choose your{" "}
              <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
                perfect space
              </span>
            </h2>

            <p className="mt-4 text-black/60 text-sm md:text-base">
              Select your residence type and explore thoughtfully designed layouts.
            </p>
          </div>

          {/* TABS */}
          <div className="mt-6 flex justify-center">
            <div className="flex gap-2 p-1 rounded-full bg-black/5 backdrop-blur-xl border border-black/10">
              {["2bhk", "3bhk"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActive(type)}
                  className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition hover:cursor-pointer ${
                    active === type
                      ? "bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] text-black shadow-[0_10px_30px_rgba(200,155,123,0.3)]"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {type === "2bhk" ? "2 BHK" : "3 BHK"}
                </button>
              ))}
            </div>
          </div>

          {/* IMAGE CARD */}
          <div
            onClick={() => setModal(true)}
            className="mt-8 md:mt-12 cursor-pointer group max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-white/60 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              
              {/* IMAGE */}
              <div className="h-[260px] sm:h-[320px] md:h-[420px] flex items-center justify-center">
                <img
                  ref={imageRef}
                  src={plans[active].image}
                  alt=""
                  className="h-full object-contain p-4 md:p-6 transition"
                />
              </div>

              {/* OVERLAY (light version) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* CONTENT + BUTTON */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-black">
                    {plans[active].title}
                  </h3>
                  <p className="text-black/60 text-xs md:text-sm">
                    {plans[active].desc}
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal(true);
                  }}
                  className="relative px-6 py-2 rounded-full text-xs md:text-sm font-[Space_Grotesk]
                  overflow-hidden group cursor-pointer
                  backdrop-blur-xl bg-white/70 border border-black/10
                  shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300
                  hover:border-[#c89b7b]/60 hover:shadow-[0_10px_40px_rgba(200,155,123,0.25)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#c89b7b]/20 to-[#d4a98c]/20 opacity-0 group-hover:opacity-100 transition duration-500" />

                  <span className="absolute top-0 left-[-120%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-12 group-hover:left-[120%] transition-all duration-1000 ease-out" />

                  <span className="relative z-10 text-black group-hover:text-[#c89b7b] transition">
                    View Plan
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center px-4">
          <button
            onClick={() => setModal(false)}
            className="absolute top-6 right-6 text-white text-xl"
          >
            <FaTimes />
          </button>

          <div className="max-w-5xl w-full text-center text-white">
            <h2 className="mb-6 text-lg md:text-2xl font-[Space_Grotesk]">
              {plans[active].title}
            </h2>

            <img
              src={plans[active].image}
              alt=""
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}