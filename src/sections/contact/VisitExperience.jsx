import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Coffee,
  Building2,
} from "lucide-react";

import experienceImage from "../../assets/experience-2.webp";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Sparkles,
    title: "Private Site Tours",
    text: "Experience thoughtfully curated walkthroughs tailored to your lifestyle preferences.",
  },
  {
    icon: ShieldCheck,
    title: "Expert Consultation",
    text: "Connect with experienced advisors for personalized project guidance and insights.",
  },
  {
    icon: Coffee,
    title: "Premium Hospitality",
    text: "Enjoy a refined and welcoming environment crafted around comfort and attention.",
  },
  {
    icon: Building2,
    title: "Architectural Presentation",
    text: "Discover the design philosophy, planning, and spatial vision behind Swagat Anmol.",
  },
];

export default function VisitExperience() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const topContentRef = useRef(null);
  const featureRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // IMAGE REVEAL
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.1,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // CONTENT STAGGER
      // TOP CONTENT
      gsap.fromTo(
        topContentRef.current.children,
        {
          opacity: 0,
          y: 50,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: topContentRef.current,
            start: "top 82%",
          },
        },
      );

      // FEATURE CONTENT
      gsap.fromTo(
        featureRef.current.children,
        {
          opacity: 0,
          y: 50,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featureRef.current,
            start: "top 85%",
          },
        },
      );

      // IMAGE PARALLAX
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#f5f1ec] overflow-hidden"
    >
      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[20%] left-[-10%]
          w-[500px] h-[500px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />

        <div
          className="absolute bottom-[-10%] right-[-10%]
          w-[420px] h-[420px]
          rounded-full bg-[#c89b7b]/10 blur-[120px]"
        />
      </div>

      <div
        className="relative z-10
        max-w-7xl mx-auto
        px-5 sm:px-6 lg:px-8"
      >
        {/* ================= TOP CONTENT ================= */}
        <div
          ref={topContentRef}
          className="max-w-5xl mx-auto
  mb-14 md:mb-20
  text-center"
        >
          {/* LABEL */}
          <div
            className="inline-flex items-center gap-2
    px-4 py-1.5 rounded-full
    border border-black/10
    bg-white/70 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px]
      uppercase tracking-[0.35em]
      text-black/60 font-[Space_Grotesk]"
            >
              Personalized Experience
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="mt-8 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl
            leading-[1] tracking-tight
            text-[#071a33] font-semibold"
          >
            Experience The
            <span className="block text-[#c89b7b]">Spaces In Person</span>
          </h2>

          {/* SUBTEXT */}
          <p
            className="mt-7 text-base sm:text-lg
            leading-relaxed text-black/60"
          >
            Discover the thoughtfully curated lifestyle of Swagat Anmol through
            guided walkthroughs, personalized consultations, premium
            hospitality, and immersive architectural presentations crafted to
            elevate your experience.
          </p>

          {/* DIVIDER */}
          <div
            className="mt-10 w-24 h-[1px]
    mx-auto
    bg-gradient-to-r
    from-transparent
    via-[#c89b7b]
    to-transparent"
          />
        </div>
        <div className="grid lg:grid-cols-[1fr_0.95fr] gap-12 lg:gap-20 items-center">
          {/* ================= IMAGE SIDE ================= */}
          <div className="relative">
            <div
              className="absolute -top-10 -left-10
              w-40 h-40 rounded-full
              bg-[#c89b7b]/20 blur-[80px]"
            />

            <div
              className="relative overflow-hidden
              rounded-[32px]
              border border-black/10
              shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
            >
              <img
                ref={imageRef}
                src={experienceImage}
                alt="Visit Experience"
                className="w-full h-[500px] md:h-[680px] object-cover"
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0
                bg-gradient-to-t
                from-black/60 via-black/10 to-transparent"
              />

              {/* FLOATING LABEL */}
              <div className="absolute bottom-6 left-6">
                <div
                  className="inline-flex items-center gap-2
                  px-5 py-2 rounded-full
                  border border-white/15
                  bg-white/10 backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

                  <span
                    className="text-[10px]
                    uppercase tracking-[0.35em]
                    text-white/80 font-[Space_Grotesk]"
                  >
                    Experience Center
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTENT SIDE ================= */}
          <div ref={featureRef} className="relative">
            {/* FEATURES */}
            <div className=" grid sm:grid-cols-2 gap-5">
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden
                    rounded-[28px]
                    border border-black/10
                    bg-white/70 backdrop-blur-xl
                    p-6 transition-all duration-500
                    hover:-translate-y-1
                    hover:border-[#c89b7b]/40
                    hover:shadow-[0_20px_50px_rgba(200,155,123,0.18)]"
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
                      w-12 h-12 rounded-2xl
                      border border-black/10
                      bg-white
                      flex items-center justify-center
                      text-[#c89b7b]"
                    >
                      <Icon size={20} />
                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10">
                      <h3
                        className="mt-5 font-[Space_Grotesk]
                        text-xl text-[#071a33]
                        font-semibold"
                      >
                        {item.title}
                      </h3>

                      <p
                        className="mt-3 text-sm
                        leading-relaxed text-black/55"
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              {/* PRIMARY */}
              <button
                onClick={() => {
                  const section = document.getElementById("contact-form");

                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="relative px-8 py-4 rounded-full
                font-[Space_Grotesk] text-sm
                overflow-hidden group
                bg-[#071a33] text-white
                shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                transition-all duration-300
                hover:shadow-[0_12px_50px_rgba(200,155,123,0.22)]
                hover:cursor-pointer"
              >
                <span
                  className="absolute inset-0
                  bg-gradient-to-r
                  from-[#c89b7b]/20 to-[#d4a98c]/20
                  opacity-0 group-hover:opacity-100
                  transition duration-500"
                />

                <span className="relative z-10 flex items-center gap-2">
                  Schedule A Visit
                  <ArrowUpRight size={16} />
                </span>
              </button>

              {/* SECONDARY */}
              <Link to="/gallery">
                <button
                  className="px-8 py-4 rounded-full
                font-[Space_Grotesk] text-sm
                border border-black/10
                text-[#071a33]
                hover:border-[#c89b7b]/60
                hover:text-[#c89b7b]
                transition-all duration-300
                bg-white/70 backdrop-blur-xl
                hover:cursor-pointer"
                >
                  Explore Residences →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
