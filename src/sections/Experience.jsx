import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../assets/experience-1.jpeg";
import img2 from "../assets/experience-2.webp";
import img3 from "../assets/experience-3.jpeg";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    title: "Podium Garden",
    text: "A serene green space designed for relaxation and peaceful living.",
    image: img1,
  },
  {
    title: "Grand Entrance Lobby",
    text: "An elegant arrival experience crafted with modern design.",
    image: img2,
  },
  {
    title: "Lifestyle Amenities",
    text: "Spaces designed to elevate comfort, wellness, and leisure.",
    image: img3,
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slidesRef.current.filter(Boolean);
      if (!slides.length) return;

      // ✅ INITIAL STATE FIX
      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 }); // FIRST SLIDE ALWAYS VISIBLE
      gsap.set(".exp-image", { scale: 1.1, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.2,
        },
      });

      slides.forEach((slide, i) => {
        const image = slide.querySelector(".exp-image");
        const content = slide.querySelector(".exp-content");

        // ✅ ONLY FADE FOR NON-FIRST SLIDES
        if (i !== 0) {
          tl.to(
            slide,
            {
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "+=0.4"
          );
        }

        // IMAGE MOTION
        tl.to(
          image,
          {
            scale: 1.2,
            y: -40,
            duration: 2.4,
            ease: "none",
          },
          "<"
        )

        // ✅ TEXT TIMING FIX
        .fromTo(
          content.children,
          {
            y: 50,
            opacity: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
          },
          i === 0 ? 0 : "<0.2"
        )

        // HOLD
        .to({}, { duration: 1 })

        // EXIT
        .to(
          slide,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "+=0.3"
        )

        // RESET IMAGE
        .set(image, { scale: 1.1, y: 40 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[260vh] relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(135deg, #071a33, #0a2342)",
      }}
    >
      {data.map((item, i) => (
        <div
          key={i}
          ref={(el) => el && (slidesRef.current[i] = el)}
          className="sticky top-0 h-screen flex items-center justify-center"
        >
          {/* IMAGE */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="exp-image w-full h-full object-cover will-change-transform"
            />

            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* CONTENT */}
          <div className="exp-content relative z-10 text-center max-w-3xl px-6">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 font-[Inter]">
              Experience
            </p>

            <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-[Space_Grotesk] font-semibold leading-tight">
              {item.title}
            </h2>

            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed font-[Inter]">
              {item.text}
            </p>
          </div>
        </div>
      ))}

      {/* subtle grain */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.05] mix-blend-overlay" />

      {/* lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}