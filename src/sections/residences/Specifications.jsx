import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Specifications() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const ctaRef = useRef(null);

  const [active, setActive] = useState(0);

  const data = [
    {
      title: "Structure",
      desc: "Earthquake-resistant RCC framed structure with high-grade materials ensuring durability and safety.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-[#c89b7b]"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M3 10L12 3l9 7v11H3z" />
        </svg>
      ),
    },
    {
      title: "Flooring",
      desc: "Premium vitrified tiles with anti-skid surfaces in bathrooms and balconies.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-[#c89b7b]"
          fill="none"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      title: "Kitchen",
      desc: "Granite platform with stainless steel sink and modular kitchen provisions.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-[#c89b7b]"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      title: "Doors & Windows",
      desc: "High-quality flush doors and aluminum sliding windows for maximum light.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-[#c89b7b]"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M3 3h18v18H3z" />
          <path d="M12 3v18" />
        </svg>
      ),
    },
    {
      title: "Electrical",
      desc: "Concealed copper wiring with premium switches and sufficient power points.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-[#c89b7b]"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
        </svg>
      ),
    },
    {
      title: "Bathrooms",
      desc: "Designer fittings with modern sanitary ware and hot/cold provisions.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-[#c89b7b]"
          fill="none"
          strokeWidth="1.5"
        >
          <path d="M4 10h16M7 10v7a5 5 0 0010 0v-7" />
        </svg>
      ),
    },
  ];

  // ================= ANIMATION =================
  useEffect(() => {
    if (!contentRef.current || !iconRef.current || !ctaRef.current) return;

    const tl = gsap.timeline();

    tl.to([contentRef.current, iconRef.current, ctaRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
    })
      .fromTo(
        iconRef.current,
        { scale: 0.6, rotate: -10, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.8)",
        },
      )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3",
      );
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 pb-24 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#020617,#071a33,#000000)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-[Space_Grotesk] text-[32px] sm:text-[40px] md:text-[56px]">
            Premium{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
              specifications
            </span>
          </h2>

          <p className="mt-4 text-white/70 text-sm md:text-base">
            Built with precision, quality materials, and modern standards.
          </p>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid grid-cols-12 gap-10 mt-16">
          {/* LEFT NAV */}
          <div className="col-span-4 space-y-3">
            {data.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 hover:cursor-pointer
                ${
                  active === i
                    ? "bg-white/10 border border-[#c89b7b]/40 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-8">
            <div
              className="p-8 md:p-10 rounded-2xl 
              bg-gradient-to-br from-[#0a2342] to-[#071a33] 
              border border-white/10 backdrop-blur-xl"
            >
              {/* ICON */}
              {active !== null && data[active] && (
                <>
                  {/* ICON */}
                  <div
                    ref={iconRef}
                    className="w-12 h-12 flex items-center justify-center rounded-xl 
      bg-white/5 border border-[#c89b7b]/30"
                  >
                    {data[active].icon}
                  </div>

                  {/* CONTENT */}
                  <div ref={contentRef}>
                    <h3 className="mt-8 text-2xl md:text-3xl font-semibold">
                      {data[active].title}
                    </h3>

                    <p className="mt-4 text-white/70 max-w-xl">
                      {data[active].desc}
                    </p>
                  </div>
                </>
              )}
              {/* CTA */}
              <div
                ref={ctaRef}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                {/* PRIMARY */}
                <button
                  className="relative px-7 py-3 rounded-full text-sm font-[Space_Grotesk]
    overflow-hidden group cursor-pointer
    bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] text-black
    shadow-[0_10px_40px_rgba(200,155,123,0.4)]
    transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {/* shimmer */}
                  <span
                    className="absolute top-0 left-[-120%] w-[60%] h-full 
      bg-gradient-to-r from-transparent via-white/30 to-transparent 
      rotate-12 group-hover:left-[120%] 
      transition-all duration-1000 ease-out"
                  />

                  <span className="relative z-10">Download Brochure</span>
                </button>

                {/* SECONDARY */}
                <button
                  className="relative px-7 py-3 rounded-full text-sm font-[Space_Grotesk]
    overflow-hidden group cursor-pointer
    backdrop-blur-xl bg-white/10 border border-white/20
    shadow-[0_8px_30px_rgba(0,0,0,0.25)] 
    transition-all duration-300
    hover:border-[#c89b7b]/60 
    hover:shadow-[0_10px_40px_rgba(200,155,123,0.25)]
    active:scale-95"
                >
                  {/* glow */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r 
      from-[#c89b7b]/20 to-[#d4a98c]/20 
      opacity-0 group-hover:opacity-100 
      transition duration-500"
                  />

                  {/* shimmer */}
                  <span
                    className="absolute top-0 left-[-120%] w-[60%] h-full 
      bg-gradient-to-r from-transparent via-white/30 to-transparent 
      rotate-12 group-hover:left-[120%] 
      transition-all duration-1000 ease-out"
                  />

                  <span className="relative z-10 text-white group-hover:text-[#c89b7b] transition">
                    Book Site Visit
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* MOBILE ACCORDION */}
        <div className="md:hidden mt-12 space-y-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              {/* HEADER */}
              <button
                onClick={() => setActive(i)}
                className="w-full text-left px-5 py-4 bg-white/5 flex items-center gap-3"
              >
                {item.icon}
                {item.title}
              </button>

              {/* CONTENT */}
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  active === i ? "max-h-[500px] py-4" : "max-h-0"
                }`}
              >
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
          {/* MOBILE STICKY CTA */}
          <div className="md:hidden mt-10 w-full z-50 px-4 pb-4 pt-3 backdrop-blur-xl">
            <div className="flex gap-3">
              {/* PRIMARY */}
              <button
                className="flex-1 relative px-5 py-3 rounded-full text-sm font-[Space_Grotesk]
      overflow-hidden group cursor-pointer
      bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] text-black
      shadow-[0_10px_30px_rgba(200,155,123,0.35)]
      active:scale-95 transition"
              >
                {/* shimmer */}
                <span
                  className="absolute top-0 left-[-120%] w-[60%] h-full 
        bg-gradient-to-r from-transparent via-white/30 to-transparent 
        rotate-12 group-active:left-[120%] 
        transition-all duration-700 ease-out"
                />

                <span className="relative z-10">Download</span>
              </button>

              {/* SECONDARY */}
              <button
                className="flex-1 relative px-5 py-3 rounded-full text-sm font-[Space_Grotesk]
      overflow-hidden group cursor-pointer
      backdrop-blur-xl bg-white/10 border border-white/20
      active:scale-95 transition"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r 
        from-[#c89b7b]/20 to-[#d4a98c]/20 
        opacity-0 group-active:opacity-100 
        transition duration-300"
                />

                <span className="relative z-10 text-white">Book Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
