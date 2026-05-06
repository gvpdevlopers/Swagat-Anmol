import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Plane, School, Building2, Hospital, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    icon: Plane,
    title: "Airport",
    distance: "20 Mins",
  },
  {
    icon: School,
    title: "School",
    distance: "5 Mins",
  },
  {
    icon: Hospital,
    title: "Hospital",
    distance: "8 Mins",
  },
  {
    icon: Building2,
    title: "Business Hub",
    distance: "15 Mins",
  },
];

export default function LocationSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const mapRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADING
      gsap.fromTo(
        headingRef.current.children,
        {
          opacity: 0,
          y: 60,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
          },
        },
      );

      // MAP
      gsap.fromTo(
        mapRef.current,
        {
          opacity: 0,
          scale: 1.05,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
          },
        },
      );

      // CARDS
      gsap.fromTo(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#020617] overflow-hidden"
    >
      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[-10%]
          w-[500px] h-[500px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />

        <div
          className="absolute bottom-[-10%] right-[-10%]
          w-[450px] h-[450px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:32px_32px]" />

      <div
        className="relative z-10
        max-w-7xl mx-auto
        px-5 sm:px-6 lg:px-8"
      >
        {/* ================= TOP ================= */}
        <div ref={headingRef} className="max-w-4xl">
          {/* LABEL */}
          <div
            className="inline-flex items-center gap-2
            px-4 py-1.5 rounded-full
            border border-white/10
            bg-white/[0.04] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px]
              uppercase tracking-[0.35em]
              text-white/60 font-[Space_Grotesk]"
            >
              Prime Connectivity
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="mt-8 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl xl:text-[72px]
            leading-[0.98] tracking-tight
            text-white font-semibold"
          >
            Connected To
            <span className="block text-[#c89b7b]">Everything</span>
            <span className="block">That Matters</span>
          </h2>

          {/* SUBTEXT */}
          <p
            className="mt-8 max-w-2xl
            text-base sm:text-lg
            leading-relaxed text-white/55"
          >
            Strategically located with seamless access to essential
            destinations, Swagat Anmol offers exceptional connectivity while
            preserving a calm and elevated living environment.
          </p>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-16 lg:mt-20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10">
            {/* ================= MAP ================= */}
            <div
              ref={mapRef}
              className="rounded-[32px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
            >
              <div
                className="relative overflow-hidden
                rounded-[26px]
                border border-white/10
                h-[420px] md:h-[560px]"
              >
                {/* MAP */}
                <iframe
                  title="location-map"
                  src="https://www.google.com/maps?q=24.1667,72.4137&z=14&output=embed"
                  className="absolute inset-0 w-full h-full grayscale contrast-125"
                  loading="lazy"
                />

                {/* OVERLAY */}
                <div
                  className="pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-black/60 via-transparent to-transparent"
                />

                {/* FLOATING LOCATION CARD */}
                <div
                  className="absolute left-6 bottom-6
                  rounded-2xl
                  border border-white/10
                  bg-black/40 backdrop-blur-xl
                  p-5 max-w-[280px]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl
                      border border-white/10
                      bg-white/10
                      flex items-center justify-center
                      text-[#c89b7b]"
                    >
                      <MapPin size={20} />
                    </div>

                    <div>
                      <p
                        className="text-[10px]
                        uppercase tracking-[0.3em]
                        text-white/45 font-[Space_Grotesk]"
                      >
                        Swagat Anmol
                      </p>

                      <h3
                        className="mt-2 text-lg
                        text-white font-semibold"
                      >
                        Experience Center
                      </h3>

                      <p className="mt-1 text-sm text-white/55">
                        Palanpur, Gujarat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= LOCATION CARDS ================= */}
            <div
              ref={cardsRef}
              className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5"
            >
              {locations.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden
                    rounded-[30px]
                    border border-white/10
                    bg-white/[0.04]
                    backdrop-blur-2xl
                    p-7 transition-all duration-500
                    hover:-translate-y-1
                    hover:border-[#c89b7b]/40
                    hover:shadow-[0_20px_50px_rgba(200,155,123,0.15)]"
                  >
                    {/* HOVER GLOW */}
                    <div
                      className="absolute inset-0 opacity-0
                      group-hover:opacity-100 transition duration-500
                      bg-gradient-to-br
                      from-[#c89b7b]/10 to-transparent"
                    />

                    {/* ICON */}
                    <div
                      className="relative z-10
                      w-14 h-14 rounded-2xl
                      border border-white/10
                      bg-white/[0.05]
                      flex items-center justify-center
                      text-[#c89b7b]"
                    >
                      <Icon size={24} />
                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10 mt-6">
                      <p
                        className="text-[11px]
                        uppercase tracking-[0.3em]
                        text-white/40 font-[Space_Grotesk]"
                      >
                        Nearby Destination
                      </p>

                      <h3
                        className="mt-3 text-2xl
                        text-white font-semibold"
                      >
                        {item.title}
                      </h3>

                      <div
                        className="mt-6 inline-flex
                        items-center gap-2
                        rounded-full
                        border border-white/10
                        bg-white/[0.04]
                        px-4 py-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

                        <span className="text-sm text-white/70">
                          {item.distance}
                        </span>
                      </div>
                    </div>

                    {/* BIG NUMBER */}
                    <div
                      className="absolute top-4 right-5
                      text-[70px] font-[Space_Grotesk]
                      font-semibold text-white/[0.03]"
                    >
                      {`0${index + 1}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
