import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  School,
  ShoppingBag,
  Bus,
  Hospital,
  Landmark,
  MapPin,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LocationAdvantage() {
  const sectionRef = useRef(null);

  const groups = [
    {
      title: "Education",
      items: [
        { name: "Upasana Vidhyalaya", dist: "0.7 KM", icon: School },
        { name: "School of Science", dist: "1.7 KM", icon: School },
        { name: "Ascent Speed School", dist: "1 KM", icon: School },
        { name: "Shree Ram Vidhyalaya", dist: "3 KM", icon: School },
        { name: "GD Modi College", dist: "1 KM", icon: School },
      ],
    },
    {
      title: "Retail & Lifestyle",
      items: [
        { name: "D Mart", dist: "2 KM", icon: ShoppingBag },
        { name: "Osia Hyper Mart", dist: "1.5 KM", icon: ShoppingBag },
        { name: "Pantaloons / Croma", dist: "2 KM", icon: ShoppingBag },
        { name: "Aroma Circle", dist: "0.8 KM", icon: MapPin },
      ],
    },
    {
      title: "Transport",
      items: [{ name: "New Bus Port", dist: "1.2 KM", icon: Bus }],
    },
    {
      title: "Healthcare",
      items: [{ name: "Medipolis Hospital", dist: "2 KM", icon: Hospital }],
    },
    {
      title: "Landmarks",
      items: [
        { name: "Sadhi Mata Mandir", dist: "1.2 KM", icon: Landmark },
        { name: "Joravar Palace", dist: "1.4 KM", icon: Landmark },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loc-block", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 text-black overflow-visible"
      style={{ background: "#f5f1ec" }}
    >
      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto px-6">
        <h2 className="text-[34px] md:text-[60px] font-[Space_Grotesk] leading-tight">
          Prime{" "}
          <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
            location
          </span>{" "}
          advantage
        </h2>

        <p className="mt-6 text-black/60">
          Seamlessly connected to key destinations, ensuring convenience,
          accessibility, and long-term value for modern living.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="mt-20 max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16">
        {/* LEFT - STICKY MAP */}
        <div className="hidden md:block md:w-1/2">
          <div className="sticky top-28">
            <div className="h-[500px] relative rounded-2xl overflow-hidden border border-black/10">
              <iframe
                title="location-map"
                src="https://www.google.com/maps?q=24.1667,72.4137&z=14&output=embed"
                className="w-full h-full grayscale contrast-125"
                loading="lazy"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* info */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/70 backdrop-blur-xl border border-black/10">
                <p className="text-sm text-black/80">Swagat Anmol, Palanpur</p>

                <a
                  href="https://goo.gl/maps/V5Ucs9E3ycMwcDKp8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-[#c89b7b]"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 space-y-16">
          {groups.map((group, gi) => (
            <div key={gi} className="loc-block">
              <p className="text-xs uppercase tracking-wider text-black/40 mb-6">
                {group.title}
              </p>

              <div className="space-y-4">
                {group.items.map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={i}
                      className="group relative flex items-center justify-between p-5 rounded-xl 
                      border border-black/10 bg-white/60 
                      transition-all duration-300
                      hover:bg-gradient-to-r hover:from-[#f0e7df] hover:to-[#e9ddd2]
                      hover:border-[#c89b7b]/60 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-full border border-[#c89b7b]/40 
                          flex items-center justify-center 
                          group-hover:scale-110 transition"
                        >
                          <Icon size={18} className="text-[#c89b7b]" />
                        </div>

                        <p className="text-black/80 text-sm group-hover:text-black">
                          {item.name}
                        </p>
                      </div>

                      <span className="text-black/60 text-sm group-hover:text-black">
                        {item.dist}
                      </span>

                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c89b7b] group-hover:w-full transition-all duration-500" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE MAP */}
      <div className="md:hidden mt-16 px-6">
        <div className="relative rounded-2xl overflow-hidden border border-black/10">
          <iframe
            title="location-map"
            src="https://www.google.com/maps?q=24.1667,72.4137&z=14&output=embed"
            className="w-full h-[350px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
