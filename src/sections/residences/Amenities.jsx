import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Dumbbell,
  Flower2,
  Trees,
  Footprints,
  Users,
  Building2,
  Gamepad2,
  ShieldCheck,
  Camera,
  Car,
  Landmark,
  Film,
  BookOpen,
  ArrowUp,
  Bus,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Amenities() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const categories = [
    {
      title: "Security",
      desc: "Advanced safety systems with 24/7 monitoring ensuring complete peace of mind.",
      items: [
        { title: "24 x 7 Security", icon: ShieldCheck },
        { title: "CCTV Cameras", icon: Camera },
        { title: "Fire Safety", icon: ShieldCheck },
      ],
    },
    {
      title: "Lifestyle",
      desc: "Elegant lifestyle spaces crafted for leisure, relaxation, and modern living.",
      items: [
        { title: "Club House", icon: Building2 },
        { title: "MiniPlex Theatre", icon: Film },
        { title: "Gazebo", icon: Trees },
        { title: "Landscape Garden", icon: Trees },
        { title: "Attractive Entrance", icon: Landmark },
        { title: "Attractive Foyer", icon: Landmark },
      ],
    },
    {
      title: "Fitness & Wellness",
      desc: "Stay active and healthy with thoughtfully designed fitness spaces.",
      items: [
        { title: "Gymnasium", icon: Dumbbell },
        { title: "Yoga Deck", icon: Flower2 },
        { title: "Jogging Track", icon: Footprints },
      ],
    },
    {
      title: "Community",
      desc: "Spaces that bring people together and create a vibrant living environment.",
      items: [
        { title: "Kids Play Area", icon: Users },
        { title: "Senior Citizen Sitting", icon: Users },
        { title: "Party Lawn Area", icon: Trees },
        { title: "Semi Covered Sitting", icon: Trees },
        { title: "Shiv Mandir", icon: Landmark },
      ],
    },
    {
      title: "Convenience",
      desc: "Designed for effortless daily living with smart and practical amenities.",
      items: [
        { title: "Allotted Car Parking", icon: Car },
        { title: "Lift with Power Backup", icon: ArrowUp },
        { title: "School Drop Off Zone", icon: Bus },
        { title: "Co-working Space / Library", icon: BookOpen },
        { title: "Indoor Games", icon: Gamepad2 },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".amenity-group");

      sections.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-30 bg-black text-white"
    >
      {/* MAIN GRID */}
      <div className="mt-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        {/* LEFT SCROLL CONTENT */}
        <div className="space-y-20">
          {categories.map((group, gi) => (
            <div key={gi} className="amenity-group">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-6">
                {group.title}
              </p>

              <div className="space-y-4">
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-white/80 hover:text-white transition"
                    >
                      <Icon size={16} className="text-[#c89b7b]" />
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT STICKY PANEL */}
        <div className="hidden md:block">
          <div className="sticky top-28">
             {/* HEADER (MOVED HERE) */}
              <div className="mb-10">
                <h2 className="text-[28px] md:text-[40px] font-[Space_Grotesk] leading-tight">
                  Premium{" "}
                  <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
                    amenities
                  </span>
                </h2>

                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  Designed for comfort, wellness, and lifestyle elevation.
                </p>
              </div>
            <div
              className="relative p-8 rounded-2xl 
      bg-gradient-to-br from-[#0a2342] to-[#071a33] 
      border border-white/10 backdrop-blur-xl 
      overflow-hidden"
            >
              
              {/* glow */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_top,#c89b7b22,transparent_60%)]" />
              </div>

             

              {/* CONTENT */}
              <div key={active}>
                <h4 className="text-xl md:text-2xl font-semibold">
                  {categories[active].title}
                </h4>

                <p className="mt-4 text-white/70 text-sm leading-relaxed">
                  {categories[active].desc}
                </p>

                {/* highlight list */}
                <div className="mt-8 space-y-3 text-sm text-white/80">
                  {categories[active].items.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#c89b7b] rounded-full" />
                      {item.title}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-10">
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
                    <span className="absolute inset-0 bg-gradient-to-r from-[#c89b7b]/20 to-[#d4a98c]/20 opacity-0 group-hover:opacity-100 transition duration-500" />

                    <span className="absolute top-0 left-[-120%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-12 group-hover:left-[120%] transition-all duration-1000 ease-out" />

                    <span className="relative z-10 text-white group-hover:text-[#c89b7b] transition">
                      Explore Residences
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
