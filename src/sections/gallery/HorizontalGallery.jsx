import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import img1 from "../../assets/why-choose-1.jpeg";
import img2 from "../../assets/experience-3.jpeg";
import img3 from "../../assets/amenities-game-4.jpeg";
import img4 from "../../assets/amenities-kids-3.jpeg";
import img5 from "../../assets/experience-1.jpeg";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: "01",
    title: "Luxury Exteriors",
    category: "Architecture",
    image: img1,
  },
  {
    id: "02",
    title: "Elegant Interiors",
    category: "Living Spaces",
    image: img2,
  },
  {
    id: "03",
    title: "Premium Amenities",
    category: "Lifestyle",
    image: img3,
  },
  {
    id: "04",
    title: "Landscaped Serenity",
    category: "Nature",
    image: img4,
  },
  {
    id: "05",
    title: "Refined Experiences",
    category: "Swagat Anmol",
    image: img5,
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gallery-card").forEach((card) => {
        const image = card.querySelector(".gallery-image");

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          },
        );

        gsap.fromTo(
          image,
          {
            scale: 1.08,
          },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
            },
          },
        );
      });

      // DRAG FUNCTIONALITY
      const slider = scrollRef.current;

      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      const startDragging = (pageX) => {
        isDragging = true;
        slider.classList.add("dragging");
        startX = pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };

      const stopDragging = () => {
        isDragging = false;
        slider.classList.remove("dragging");
      };

      const moveDragging = (pageX) => {
        if (!isDragging) return;

        const x = pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;

        slider.scrollLeft = scrollLeft - walk;
      };

      // MOUSE EVENTS
      slider.addEventListener("mousedown", (e) => {
        startDragging(e.pageX);
      });

      slider.addEventListener("mouseleave", stopDragging);
      slider.addEventListener("mouseup", stopDragging);

      slider.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        e.preventDefault();
        moveDragging(e.pageX);
      });

      // TOUCH EVENTS
      slider.addEventListener("touchstart", (e) => {
        startDragging(e.touches[0].pageX);
      });

      slider.addEventListener("touchend", stopDragging);

      slider.addEventListener("touchmove", (e) => {
        moveDragging(e.touches[0].pageX);
      });
      // CUSTOM PROGRESS BAR
const progress = progressRef.current;

const updateProgress = () => {
  const maxScroll =
    slider.scrollWidth - slider.clientWidth;

  const percentage =
    (slider.scrollLeft / maxScroll) * 100;

  gsap.to(progress, {
    width: `${percentage}%`,
    duration: 0.2,
    ease: "power2.out",
  });
};

slider.addEventListener("scroll", updateProgress);

updateProgress();
    }, sectionRef);

    return () => ctx.revert();
    
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#f5f1ec] overflow-hidden"
    >
      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] right-[-10%]
          w-[450px] h-[450px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-12 md:mb-14">
          <div
            className="inline-flex items-center gap-2
            px-4 py-1.5 rounded-full
            border border-black/10
            bg-white/60 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px]
              uppercase tracking-[0.35em]
              text-black/60 font-[Space_Grotesk]"
            >
              Visual Gallery
            </span>
          </div>

          <h2
            className="mt-6 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl
            leading-[1.05] tracking-tight
            text-[#071a33] font-semibold"
          >
            Explore Spaces
            <span className="block text-[#c89b7b]">
              Beautifully Curated
            </span>
          </h2>
        </div>

        {/* HORIZONTAL DRAG AREA */}
        <div
          ref={scrollRef}
          className="horizontal-scroll
          flex gap-5 lg:gap-7
          overflow-x-auto overflow-y-hidden
          px-5 sm:px-6 lg:px-8
          pb-4"
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="gallery-card
              relative flex-shrink-0"
            >
              {/* CARD */}
              <div
                className="relative overflow-hidden
                rounded-[28px]
                border border-black/10
                shadow-[0_20px_60px_rgba(0,0,0,0.1)]

                w-[82vw]
                sm:w-[62vw]
                md:w-[48vw]
                lg:w-[32vw]
                xl:w-[28vw]"
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image
                    w-full
                    h-[320px]
                    sm:h-[380px]
                    md:h-[430px]
                    lg:h-[480px]
                    xl:h-[520px]
                    object-cover"
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="absolute inset-0
                  bg-gradient-to-t
                  from-black/75 via-black/10 to-transparent"
                />

                {/* CATEGORY */}
                <div className="absolute top-5 left-5">
                  <div
                    className="inline-flex items-center gap-2
                    px-4 py-2 rounded-full
                    border border-white/15
                    bg-black/30 backdrop-blur-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

                    <span
                      className="text-[10px]
                      uppercase tracking-[0.35em]
                      text-white/70 font-[Space_Grotesk]"
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className="inline-flex items-center gap-3 mb-4"
                  >
                    <span className="w-10 h-[1px] bg-[#c89b7b]" />

                    <span
                      className="text-[10px]
                      uppercase tracking-[0.35em]
                      text-[#c89b7b]
                      font-[Space_Grotesk]"
                    >
                      Swagat Anmol
                    </span>
                  </div>

                  <h3
                    className="font-[Space_Grotesk]
                    text-2xl sm:text-3xl lg:text-[38px]
                    font-semibold leading-[1.05]
                    tracking-tight text-white"
                  >
                    {item.title}
                  </h3>

                  <div className="mt-5">
                    <span
                      className="text-[#c89b7b]
                      text-sm font-[Space_Grotesk]"
                    >
                      {item.id}
                    </span>

                    <span
                      className="text-white/40
                      text-sm font-[Space_Grotesk]"
                    >
                      {" "}
                      / 05
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
{/* CUSTOM SCROLLBAR */}
<div className="mt-8 px-5 sm:px-6 lg:px-8">
  <div
    className="relative h-[3px]
    bg-black/10 rounded-full overflow-hidden"
  >
    <div
      ref={progressRef}
      className="absolute left-0 top-0 h-full
      w-0 rounded-full
      bg-gradient-to-r
      from-[#c89b7b]
      to-[#e0bfa3]"
    />
  </div>
</div>
        {/* HINT */}
        <div className="mt-6 text-center">
          <p
            className="text-[10px]
            uppercase tracking-[0.35em]
            text-black/35 font-[Space_Grotesk]"
          >
            Drag Horizontally →
          </p>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .horizontal-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
          user-select: none;
          scroll-behavior: smooth;
        }

        .horizontal-scroll.dragging {
          cursor: grabbing;
        }

        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        .horizontal-scroll img {
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}