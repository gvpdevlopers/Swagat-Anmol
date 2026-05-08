import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const menuRef = useRef();
  const menuItemsRef = useRef([]);

  // 🔥 underline refs
  const underlineRef = useRef(null);
  const navContainerRef = useRef(null);
  const itemRefs = useRef([]);

  // Scroll background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.7, ease: "power3.out" },
      );

      gsap.fromTo(
        menuItemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  // ✅ NAV ITEMS (Home removed)
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Residences", path: "/residences" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  // ✅ ACTIVE CHECK (supports hash + path)
  const isActive = (path) => {
    // reset active when on home
    if (location.pathname === "/" && !location.hash) {
      return false;
    }

    // hash sections (home page anchors)
    if (path.includes("#")) {
      return (
        location.pathname === "/" && location.hash === path.replace("/", "")
      );
    }

    // normal routes
    return location.pathname === path;
  };

  // 🔥 UNDERLINE ANIMATION
  const moveUnderline = () => {
    const activeIndex = navItems.findIndex((item) => isActive(item.path));

    if (activeIndex === -1) {
      gsap.to(underlineRef.current, {
        width: 0,
        duration: 0.3,
      });
      return;
    }
    const activeEl = itemRefs.current[activeIndex];

    if (!activeEl || !underlineRef.current) return;

    const rect = activeEl.getBoundingClientRect();
    const parentRect = navContainerRef.current.getBoundingClientRect();

    gsap.to(underlineRef.current, {
      x: rect.left - parentRect.left,
      width: rect.width,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  // run on route change
  useEffect(() => {
    moveUnderline();
  }, [location]);

  // run on resize
  useEffect(() => {
    window.addEventListener("resize", moveUnderline);
    return () => window.removeEventListener("resize", moveUnderline);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? "py-3 backdrop-blur-xl" : "py-6"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, #071a33, #0a2342)"
            : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-semibold font-[Space_Grotesk]"
          >
            <span className="text-white">Swagat</span>{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent">
              Anmol
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div
            ref={navContainerRef}
            className="relative hidden md:flex gap-10 text-sm tracking-wide text-white font-[Space_Grotesk]"
          >
            {navItems.map((item, i) => (
              <Link
                key={item.name}
                to={item.path}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`relative transition ${
                  isActive(item.path)
                    ? "text-[#c89b7b]"
                    : "text-white hover:text-[#c89b7b]"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* 🔥 SLIDING UNDERLINE */}
            <span
              ref={underlineRef}
              className="absolute bottom-[-6px] h-[2px] bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] rounded-full"
              style={{ width: 0 }}
            />
          </div>

          {/* CTA */}
          <a
            href="tel:+919876543210"
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] flex items-center justify-center text-black">
              <FaPhoneAlt className="text-xs" />
            </div>
            <span className="text-sm text-white">+91 98765 43210</span>
          </a>

          {/* MOBILE ICON */}
          <div
            className="md:hidden text-white text-xl cursor-pointer z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-10 text-white text-3xl font-[Space_Grotesk]"
        style={{
          background: "linear-gradient(135deg, #071a33, #0a2342)",
          transform: "translateY(-100%)",
        }}
      >
        {navItems.map((item, i) => (
          <Link
            key={item.name}
            to={item.path}
            ref={(el) => (menuItemsRef.current[i] = el)}
            className={`transition ${
              isActive(item.path) ? "text-[#c89b7b]" : "hover:text-[#c89b7b]"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}

        <a
          href="tel:+919876543210"
          className="mt-6 flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] flex items-center justify-center text-black">
            <FaPhoneAlt className="text-xs" />
          </div>
          <span className="text-base text-white">+91 98765 43210</span>
        </a>
      </div>
    </>
  );
}
