import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();
  const menuItemsRef = useRef([]);

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
        { y: "0%", duration: 0.7, ease: "power3.out" }
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
        }
      );
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  // ✅ ROUTES CONFIG
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Residences", path: "/residences" },
    { name: "About", path: "/#about" },
    { name: "Amenities", path: "/#amenities" },
    { name: "Gallery", path: "/#gallery" },
    { name: "Contact", path: "/#contact" },
  ];

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
          
          {/* LOGO (click → home) */}
          <Link to="/" className="text-xl md:text-2xl font-semibold tracking-tight font-[Space_Grotesk]">
            <span className="text-white">Swagat</span>{" "}
            <span className="bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] bg-clip-text text-transparent tracking-wide">
              Anmol
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex gap-10 text-sm tracking-wide text-white font-[Space_Grotesk]">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="relative cursor-pointer group overflow-hidden"
              >
                <Link to={item.path}>
                  <span className="block transition duration-300 group-hover:-translate-y-1 group-hover:text-[#c89b7b]">
                    {item.name}
                  </span>

                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] transition-all duration-300 group-hover:w-full" />

                  <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white blur-md transition duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CONTACT CTA */}
          <a
            href="tel:+919876543210"
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)] group transition hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#c89b7b] to-[#d4a98c] flex items-center justify-center text-black">
              <FaPhoneAlt className="text-xs" />
            </div>

            <span className="text-sm font-medium text-white group-hover:text-[#c89b7b]">
              +91 98765 43210
            </span>
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
            className="cursor-pointer transition hover:text-[#c89b7b]"
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}

        {/* MOBILE CTA */}
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