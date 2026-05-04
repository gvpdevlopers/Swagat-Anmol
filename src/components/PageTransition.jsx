import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline();

    // fade OUT old content
    tl.to(el, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
    })

      // scroll to top AFTER fade out
      .add(() => {
        window.scrollTo(0, 0);
      })

      // small reset delay to avoid layout jump
      .set(el, { opacity: 0 })

      // fade IN new content
      .to(el, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="will-change-opacity">
      {children}
    </div>
  );
}
