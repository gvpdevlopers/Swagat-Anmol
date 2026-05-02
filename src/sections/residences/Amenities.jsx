import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Amenities() {
  const trackRef = useRef(null);
  const isPaused = useRef(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const data = [
    "24x7 Security",
    "CCTV Surveillance",
    "Club House",
    "Gymnasium",
    "Yoga Deck",
    "Children Play Area",
    "Jogging Track",
    "Senior Citizen Sitting",
    "Landscape Garden",
    "Gazebo",
    "Indoor Games",
    "Mini Theatre",
  ];

  // 🔁 duplicate for seamless loop
  const loopData = [...data, ...data];

  // ================= AUTO SCROLL =================
  useEffect(() => {
    const el = trackRef.current;
    let raf;

    const loop = () => {
      if (!isPaused.current && el) {
        el.scrollLeft += 0.4;

        // seamless loop reset
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  // ================= DRAG SCROLL =================
  const onMouseDown = (e) => {
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // ================= TOUCH SUPPORT =================
  const onTouchStart = (e) => {
    isPaused.current = true;
    startX.current = e.touches[0].pageX;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onTouchEnd = () => {
    isPaused.current = false;
  };

  // ================= ARROWS =================
  const scrollLeft = () => {
    trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // ================= WHEEL SUPPORT =================
  useEffect(() => {
    const el = trackRef.current;

    const handleWheel = (e) => {
      if (window.innerWidth < 768) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // ================= TILT =================
  const handleMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.3,
    });
  };

  const resetTilt = (el) => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
    });
  };

  return (
    <section className="relative py-24 md:py-32 text-white bg-[#020617] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[34px] md:text-[60px] font-[Space_Grotesk]">
            Premium <span className="text-[#c89b7b]">amenities</span>
          </h2>

          <p className="mt-6 text-white/70">
            Designed for comfort, wellness, and lifestyle elevation.
          </p>
        </div>

        {/* ARROWS */}
        <div className="flex justify-end gap-3 mt-10">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c89b7b]"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c89b7b]"
          >
            →
          </button>
        </div>

        {/* SCROLLER */}
        <div className="relative mt-10">

          {/* fade edges */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-2"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {loopData.map((item, i) => (
              <div
                key={i}
                onMouseMove={(e) => handleMove(e, e.currentTarget)}
                onMouseLeave={(e) => resetTilt(e.currentTarget)}
                className="
                  min-w-[260px] md:min-w-[300px]
                  p-6 md:p-8
                  rounded-2xl
                  bg-gradient-to-br from-[#0a2342] to-[#071a33]
                  border border-white/10
                  hover:border-[#c89b7b]/60
                  transition
                "
              >
                <div className="w-8 h-8 border border-[#c89b7b] rounded-full" />

                <h3 className="mt-6 text-base md:text-lg font-medium">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* hide scrollbar */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        `}
      </style>
    </section>
  );
}