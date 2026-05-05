import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ChevronDown,
  ShieldCheck,
  Building2,
  Trees,
  MapPin,
  Home,
  Car,
  Dumbbell,
  School,
  Landmark,
} from "lucide-react";

export default function FAQ() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0); // 👈 first open by default

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ FIX: set initial state properly
      gsap.set(".faq-item", { opacity: 0, y: 40 });
      gsap.set(".faq-header", { opacity: 0, y: 60 });

      gsap.to(".faq-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.to(".faq-item", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
        clearProps: "all", // 🔥 FIX blur issue
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ✅ 10 FAQs
  const faqs = [
    {
      icon: Building2,
      q: "What is Swagat Anmol?",
      a: "Swagat Anmol is a premium residential project in Palanpur offering 2 & 3 BHK residences with modern amenities and upscale design.",
    },
    {
      icon: Trees,
      q: "What is a Podium Garden?",
      a: "A podium garden is an elevated landscaped space above parking or ground level, designed for relaxation and community living.",
    },
    {
      icon: Home,
      q: "What configurations are available?",
      a: "The project offers thoughtfully designed 2 BHK and 3 BHK residences with efficient layouts and premium finishes.",
    },
    {
      icon: ShieldCheck,
      q: "What security features are available?",
      a: "24x7 security, CCTV surveillance, and controlled entry ensure complete safety for residents.",
    },
    {
      icon: Car,
      q: "Is parking available?",
      a: "Yes, dedicated car parking spaces are provided with organized vehicle circulation.",
    },
    {
      icon: MapPin,
      q: "Where is the project located?",
      a: "Located in Palanpur, the project offers excellent connectivity to schools, hospitals, and key city areas.",
    },
    {
      icon: Dumbbell,
      q: "What fitness amenities are available?",
      a: "Gymnasium, jogging track, yoga deck, and open spaces for an active lifestyle.",
    },
    {
      icon: School,
      q: "Are schools nearby?",
      a: "Yes, multiple reputed schools and colleges are within 1–3 KM radius.",
    },
    {
      icon: Landmark,
      q: "Is the project good for investment?",
      a: "Yes, due to location growth, infrastructure, and premium planning, it holds strong long-term value.",
    },
    {
      icon: Trees,
      q: "What lifestyle amenities are included?",
      a: "Clubhouse, garden, gazebo, kids play area, indoor games, and co-working spaces.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#071a33,#0a2342)",
      }}
    >
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[400px] h-[400px] bg-[#c89b7b]/10 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="faq-header text-center">
          <h2 className="text-[32px] md:text-[56px] font-[Space_Grotesk]">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Everything you need to know about the project and lifestyle.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-12 space-y-4">
          {faqs.map((item, i) => {
            const Icon = item.icon;
            const isOpen = active === i;

            return (
              <div
                key={i}
                className="faq-item border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-[#c89b7b]/40"
              >
                {/* QUESTION */}
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#c89b7b]/40 flex items-center justify-center">
                      <Icon size={18} className="text-[#c89b7b]" />
                    </div>

                    <p className="text-white/90 font-medium">{item.q}</p>
                  </div>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#c89b7b]" : "text-white/60"
                    }`}
                  />
                </button>

                {/* ANSWER (IMPROVED ANIMATION) */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-[200px] opacity-100 px-6 pb-5"
                      : "max-h-0 opacity-0 px-6"
                  }`}
                >
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
