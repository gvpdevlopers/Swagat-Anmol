import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LocationAdvantage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loc-item", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".map-box", {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-[34px] md:text-[56px] font-[Space_Grotesk] leading-tight">
            Prime <span className="text-[#c89b7b]">location</span> advantage
          </h2>

          <p className="mt-6 text-white/70 max-w-lg">
            Seamlessly connected to key destinations, ensuring convenience,
            accessibility, and long-term value for modern living.
          </p>

          {/* LIST */}
          <div className="mt-10 space-y-6">

            {[
              { title: "City Center", value: "10 mins drive" },
              { title: "Railway Station", value: "15 mins" },
              { title: "Airport", value: "25 mins" },
              { title: "Schools & Colleges", value: "Within 5 mins" },
              { title: "Hospitals", value: "Nearby access" },
            ].map((item, i) => (
              <div
                key={i}
                className="loc-item flex items-center justify-between p-5 rounded-xl border border-white/10 bg-white/5 hover:border-[#c89b7b]/60 transition"
              >
                <div className="flex items-center gap-4">
                  {/* ICON */}
                  <div className="w-10 h-10 rounded-full border border-[#c89b7b] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#c89b7b] rounded-full" />
                  </div>

                  <p className="text-white/90">{item.title}</p>
                </div>

                <span className="text-white/60 text-sm">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MAP */}
        <div className="map-box relative rounded-2xl overflow-hidden border border-white/10">

          {/* MAP (replace with real embed if needed) */}
          <iframe
            title="location-map"
            src="https://www.google.com/maps?q=Ahmedabad&output=embed"
            className="w-full h-[400px] md:h-[500px] grayscale contrast-125"
            loading="lazy"
          />

          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent pointer-events-none" />

          {/* label */}
          <div className="absolute bottom-4 left-4 text-sm text-white/70">
            Palanpur, Gujarat
          </div>
        </div>

      </div>
    </section>
  );
}