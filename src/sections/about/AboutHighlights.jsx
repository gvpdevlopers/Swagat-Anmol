import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Building2,
  MapPin,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHighlights() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".highlight-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 1,
        y: 80,
        scale: 0.9,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const data = [
    {
      icon: Building2,
      title: "Premium Construction",
      desc: "High-quality materials and strong structural integrity.",
    },
    {
      icon: MapPin,
      title: "Prime Location",
      desc: "Seamless connectivity to all key destinations.",
    },
    {
      icon: LayoutGrid,
      title: "Smart Layouts",
      desc: "Efficient spaces designed for modern comfort.",
    },
    {
      icon: Sparkles,
      title: "Modern Lifestyle",
      desc: "Amenities crafted for elevated everyday living.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(200,155,123,0.12), transparent 40%), radial-gradient(circle at 80% 70%, rgba(200,155,123,0.08), transparent 40%), #020617",
      }}
    >
      {/* GLOW ORBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[300px] h-[300px] bg-[#c89b7b]/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-[#c89b7b]/15 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-white/50">
            Highlights
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] leading-tight">
            What makes{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
              Swagat Anmol
            </span>{" "}
            unique
          </h2>
        </div>

        {/* GRID */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="highlight-card group relative p-6 rounded-2xl 
                bg-gradient-to-br from-white/5 to-white/[0.02] 
                border border-white/10 backdrop-blur-xl 
                transition-all duration-500
                hover:-translate-y-3 hover:scale-[1.02]
                hover:border-[#c89b7b]/60
                hover:shadow-[0_25px_80px_rgba(200,155,123,0.2)]"
              >
                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#c89b7b]/40 mb-5 transition group-hover:scale-110">
                  <Icon size={20} className="text-[#c89b7b]" />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="mt-3 text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* LIGHT SWEEP */}
                <div className="absolute inset-0 opacity-1 group-hover:opacity-100 transition duration-500 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}