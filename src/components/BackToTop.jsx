import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.killTweensOf(window);

    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1.6,
      ease: "expo.out",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={(e) => {
        gsap.to(e.currentTarget, {
          scale: 0.9,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
        });

        scrollToTop();
      }}
      className="fixed bottom-6 right-6 z-[999] group cursor-pointer"
    >
      <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-xl border border-black/20 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-[#c89b7b] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c89b7b]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        <span className="relative z-10 text-black/80 text-lg group-hover:text-[#c89b7b] transition">
          ↑
        </span>
      </div>
    </button>
  );
}
