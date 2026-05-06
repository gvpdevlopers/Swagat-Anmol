import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../../assets/experience-1-2.webp";
import img2 from "../../assets/experience-2.webp";
import img3 from "../../assets/experience-3.jpeg";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    title: "Premium Construction",
    text: "Built with high-quality materials and modern engineering standards.",
    image: img1,
  },
  {
    number: "02",
    title: "Prime Location",
    text: "Excellent connectivity to schools, hospitals, and key areas.",
    image: img2,
  },
  {
    number: "03",
    title: "Spacious Living",
    text: "Expansive layouts with natural light and ventilation.",
    image: img3,
  },
  {
    number: "04",
    title: "Modern Amenities",
    text: "Lifestyle spaces crafted for comfort and everyday living.",
    image: img1,
  },
];

export default function WhyChoose2() {
  const sectionRef = useRef();
  const itemsRef = useRef([]);
  const imageRef = useRef();

  const [active, setActive] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {

      // ================= DESKTOP SCROLL SYNC =================
      if (!isMobile) {
        itemsRef.current.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          });
        });

        // image transition
        gsap.fromTo(
          imageRef.current,
          { scale: 1.1, opacity: 0, filter: "blur(8px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      // ================= MOBILE ANIMATION =================
      if (isMobile) {
        itemsRef.current.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            }
          );
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 text-white"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">

        {/* HEADER */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase text-white/60 font-[Inter]">
            Why Choose
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-[Space_Grotesk] font-semibold leading-tight">
            Designed for a refined lifestyle
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">

          {/* ================= LEFT (DESKTOP PREVIEW) ================= */}
          <div className="hidden md:block sticky top-32 h-fit">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.6)]">

              <img
                ref={imageRef}
                key={active}
                src={features[active].image}
                alt=""
                className="w-full h-[320px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-[Space_Grotesk]">
                  {features[active].title}
                </h3>
                <p className="text-sm text-white/70 mt-1 font-[Inter]">
                  {features[active].text}
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-12 md:space-y-16">

            {features.map((item, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="group border-b border-white/10 pb-8"
              >

                {/* MOBILE IMAGE (INLINE) */}
                <div className="md:hidden mb-5 overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[220px] object-cover"
                  />
                </div>

                <div className="flex items-start gap-5">

                  <span
                    className={`text-4xl md:text-5xl font-[Space_Grotesk] transition ${
                      active === i
                        ? "text-[#c89b7b]"
                        : "text-white/20"
                    }`}
                  >
                    {item.number}
                  </span>

                  <div>
                    <h3
                      className={`text-lg md:text-2xl font-[Space_Grotesk] transition ${
                        active === i
                          ? "text-[#c89b7b]"
                          : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 text-white/60 font-[Inter] max-w-md text-sm md:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* ACTIVE LINE */}
                <div
                  className={`mt-5 h-[1px] bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] transition-all duration-500 ${
                    active === i ? "w-full" : "w-0"
                  }`}
                />

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}