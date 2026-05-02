import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Specifications() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const contentRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ================= ACCORDION =================
  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      if (i === activeIndex) {
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  }, [activeIndex]);

  // ================= TILT =================
  const handleMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 1000,
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

  const data = [
    {
      title: "Structure",
      desc: "Earthquake-resistant RCC framed structure with high-grade materials ensuring durability and safety.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#c89b7b]" fill="none" strokeWidth="1.5">
          <path d="M3 10L12 3l9 7v11H3z" />
        </svg>
      ),
    },
    {
      title: "Flooring",
      desc: "Premium vitrified tiles with anti-skid surfaces in bathrooms and balconies.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#c89b7b]" fill="none" strokeWidth="1.5">
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
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#c89b7b]" fill="none" strokeWidth="1.5">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      title: "Doors & Windows",
      desc: "High-quality flush doors and aluminum sliding windows for maximum light.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#c89b7b]" fill="none" strokeWidth="1.5">
          <path d="M3 3h18v18H3z" />
          <path d="M12 3v18" />
        </svg>
      ),
    },
    {
      title: "Electrical",
      desc: "Concealed copper wiring with premium switches and sufficient power points.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#c89b7b]" fill="none" strokeWidth="1.5">
          <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
        </svg>
      ),
    },
    {
      title: "Bathrooms",
      desc: "Designer fittings with modern sanitary ware and hot/cold provisions.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#c89b7b]" fill="none" strokeWidth="1.5">
          <path d="M4 10h16M7 10v7a5 5 0 0010 0v-7" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020617 0%, #071a33 50%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-[Space_Grotesk] text-[34px] md:text-[60px]">
            Premium{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
              specifications
            </span>
          </h2>

          <p className="mt-6 text-white/70">
            Built with precision, quality materials, and modern standards.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {data.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMove(e, cardsRef.current[i])}
              onMouseLeave={() => resetTilt(cardsRef.current[i])}
              onClick={() =>
                setActiveIndex(activeIndex === i ? null : i)
              }
              className="cursor-pointer p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 transition hover:border-[#c89b7b]/50"
            >
              {/* ICON */}
              <div>{item.icon}</div>

              {/* TITLE */}
              <h3 className="mt-4 text-lg font-semibold">
                {item.title}
              </h3>

              {/* ACCORDION */}
              <div
                ref={(el) => (contentRefs.current[i] = el)}
                className="overflow-hidden h-0 opacity-0"
              >
                <p className="mt-3 text-sm text-white/60">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}