import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import img1 from "../assets/why-choose-1.jpeg";
import img2 from "../assets/why-choose-2.jpeg";
import img3 from "../assets/why-choose-3.jpeg";

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
    text: "Excellent connectivity to key areas and essentials.",
    image: img2,
  },
  {
    number: "03",
    title: "Spacious Living",
    text: "Expansive layouts with natural light and ventilation.",
    image: img3,
  },
];

export default function WhyChoose() {
  const imageRef = useRef();
  const contentRef = useRef();
  const intervalRef = useRef();

  const [active, setActive] = useState(0);

  // 🔥 SMOOTH SLIDE
  const animateSlide = (nextIndex) => {
    const tl = gsap.timeline();

    tl.to(imageRef.current, {
      scale: 0.98,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    })
      .to(
        contentRef.current,
        {
          y: 10,
          opacity: 0,
          duration: 0.25,
        },
        "<"
      )
      .add(() => setActive(nextIndex))
      .fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      )
      .fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );
  };

  // 🔥 AUTO SLIDER FIXED
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % features.length;
        animateSlide(next);
        return prev;
      });
    }, 4500);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDotClick = (index) => {
    clearInterval(intervalRef.current);
    animateSlide(index);
  };

  const handleImageClick = () => {
    clearInterval(intervalRef.current);
    const next = (active + 1) % features.length;
    animateSlide(next);
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center py-24 md:py-32 overflow-hidden"
      style={{
        background: "#f5f1ec", // 🔥 LIGHT PREMIUM BG
      }}
    >
      <div className="max-w-5xl mx-auto px-5 w-full">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-black/40 font-[Inter]">
            Why Choose
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-[Space_Grotesk] font-semibold text-[#1a1a1a] leading-tight">
            Designed for a refined lifestyle
          </h2>
        </div>

        {/* IMAGE */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-pointer group"
          onClick={handleImageClick}
        >
          <img
            ref={imageRef}
            src={features[active].image}
            alt=""
            className="w-full h-[240px] sm:h-[300px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* SOFT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* IMAGE TEXT */}
          <div className="absolute bottom-0 left-0 p-5 md:p-8">
            <span className="text-xs md:text-sm text-[#c89b7b] font-[Space_Grotesk] tracking-wider">
              {features[active].number}
            </span>

            <h3 className="text-lg md:text-2xl font-[Space_Grotesk] mt-1 text-white">
              {features[active].title}
            </h3>
          </div>

          {/* PREMIUM SHADOW */}
          <div className="absolute inset-0 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] pointer-events-none" />
        </div>

        {/* TEXT */}
        <div
          ref={contentRef}
          className="text-center max-w-xl mx-auto mt-6 md:mt-8"
        >
          <p className="text-black/60 font-[Inter] text-sm md:text-base leading-relaxed">
            {features[active].text}
          </p>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-6 md:mt-8">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2 rounded-full transition-all duration-500 hover:cursor-pointer ${
                active === i
                  ? "w-8 bg-[#c89b7b]"
                  : "w-2 bg-black/20"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}