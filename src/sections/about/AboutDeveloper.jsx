import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Building2, Users, Award, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutDeveloper() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // LEFT TEXT
      gsap.from(".dev-text > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      // RIGHT CARDS
      gsap.from(".dev-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      // VIDEO REVEAL
      gsap.from(".dev-video", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });

      // GLOW PARALLAX
      gsap.to(glowRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -80,
        x: 60,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="about-dev"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] text-white overflow-hidden"
    >
      {/* GLOW */}
      <div
        ref={glowRef}
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#c89b7b]/10 blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="dev-text">
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 font-[Inter]">
            Developer
          </p>

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] leading-tight">
            Built by{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#e0bfa3] bg-clip-text text-transparent">
              Swagat Anmol Developers
            </span>
          </h2>

          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
            Swagat Developers is known for delivering thoughtfully designed
            residential projects with a strong focus on quality, trust, and
            long-term value.
          </p>

          <p className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-lg">
            Every project reflects a commitment to craftsmanship, modern
            architecture, and a lifestyle that balances comfort with design.
          </p>

          {/* TRUST */}
          <div className="mt-8 space-y-4">
            {[
              "Quality-driven construction approach",
              "Customer-first philosophy",
              "Modern and functional designs",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#c89b7b]" />
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        {/* RIGHT */}
        <div className="relative flex items-center h-full">
          <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-6">
            {/* VIDEO CARD */}
            <div className="dev-video relative rounded-2xl overflow-hidden border border-white/10 group">
              {/* VIDEO */}
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/s-XpZOBayJE"
                  title="Swagat Developers"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* OPTIONAL SUB TEXT (balances height) */}
            <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-md">
              A visual glimpse into the design philosophy, construction quality,
              and lifestyle experience delivered across every Swagat project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
