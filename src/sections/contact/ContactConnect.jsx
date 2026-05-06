import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactConnect() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    interestedIn: "",
    message: "",
    siteVisit: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // FORM ANIMATION
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          x: -80,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // INFO ANIMATION
      gsap.fromTo(
        infoRef.current.children,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // GOOGLE APPS SCRIPT URL
      // Replace with your actual Apps Script URL
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbwTwKyirhK4eZRnVXcIJ62sXCvx5MxcXITj7t3g8nHMnJDXVuF8ttDInwiQKFY3IX39/exec";

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setSuccess(true);

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        interestedIn: "",
        message: "",
        siteVisit: false,
      });

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#020617] overflow-hidden"
    >
      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[-10%]
          w-[500px] h-[500px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />

        <div
          className="absolute bottom-[0%] right-[-10%]
          w-[450px] h-[450px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />
      </div>

      <div
        className="relative z-10
        max-w-7xl mx-auto
        px-5 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16">
          {/* ================= LEFT FORM ================= */}
          <div
            ref={formRef}
            className="relative rounded-[32px]
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            p-6 sm:p-8 md:p-10
            shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
          >
            {/* LABEL */}
            <div
              className="inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              border border-white/10
              bg-white/[0.03]"
            >
              <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

              <span
                className="text-[10px]
                uppercase tracking-[0.35em]
                text-white/60 font-[Space_Grotesk]"
              >
                Connect With Us
              </span>
            </div>

            {/* TITLE */}
            <h2
              className="mt-7 font-[Space_Grotesk]
              text-3xl sm:text-4xl md:text-5xl
              leading-[1.05] tracking-tight
              text-white font-semibold"
            >
              Begin Your
              <span className="block text-[#c89b7b]">Luxury Journey</span>
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* NAME */}
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-14 rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  px-5 text-white
                  outline-none
                  transition-all duration-300
                  placeholder:text-white/35
                  focus:border-[#c89b7b]/60
                  focus:bg-white/[0.05]"
                />
              </div>

              {/* PHONE + EMAIL */}
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full h-14 rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  px-5 text-white
                  outline-none
                  transition-all duration-300
                  placeholder:text-white/35
                  focus:border-[#c89b7b]/60
                  focus:bg-white/[0.05]"
                />

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full h-14 rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  px-5 text-white
                  outline-none
                  transition-all duration-300
                  placeholder:text-white/35
                  focus:border-[#c89b7b]/60
                  focus:bg-white/[0.05]"
                />
              </div>

              {/* INTEREST */}
              <input
                type="text"
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleChange}
                placeholder="Interested In"
                className="w-full h-14 rounded-2xl
                border border-white/10
                bg-white/[0.03]
                px-5 text-white
                outline-none
                transition-all duration-300
                placeholder:text-white/35
                focus:border-[#c89b7b]/60
                focus:bg-white/[0.05]"
              />

              {/* MESSAGE */}
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                className="w-full rounded-[24px]
                border border-white/10
                bg-white/[0.03]
                px-5 py-4 text-white
                outline-none resize-none
                transition-all duration-300
                placeholder:text-white/35
                focus:border-[#c89b7b]/60
                focus:bg-white/[0.05]"
              />

              {/* FORM ACTIONS */}
              <div
                className="border-b border-white/10
  pb-8"
              >
                {/* CHECKBOX */}
                <label
                  className="flex items-center gap-3
    text-sm text-white/55 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="siteVisit"
                    checked={formData.siteVisit}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#c89b7b]"
                  />
                  I would like to schedule a private site visit
                </label>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full mt-6
    px-8 py-4 rounded-full
    font-[Space_Grotesk] text-sm
    overflow-hidden group
    backdrop-blur-xl bg-white/10
    border border-white/15
    shadow-[0_10px_40px_rgba(0,0,0,0.35)]
    transition-all duration-300
    hover:border-[#c89b7b]/60
    hover:shadow-[0_12px_50px_rgba(200,155,123,0.25)]
    hover:cursor-pointer"
                >
                  <span
                    className="absolute inset-0
      bg-gradient-to-r
      from-[#c89b7b]/20 to-[#d4a98c]/20
      opacity-0 group-hover:opacity-100
      transition duration-500"
                  />

                  <span className="relative z-10 text-white group-hover:text-[#c89b7b] transition">
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </span>
                </button>

                {/* SUCCESS */}
                {success && (
                  <div
                    className="mt-5 rounded-2xl
border border-emerald-500/20
bg-emerald-500/10
px-5 py-4 text-sm text-emerald-300
backdrop-blur-xl"
                  >
                    Your enquiry has been submitted successfully.
                  </div>
                )}
              </div>
            </form>

            {/* SOCIALS */}
            <div
              className="mt-10 rounded-[28px]
  border border-white/10
  bg-white/[0.03]
  backdrop-blur-2xl
  p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className="font-[Space_Grotesk]
        text-xl text-white font-semibold"
                  >
                    Follow The Journey
                  </h3>

                  <p className="mt-2 text-sm text-white/45">
                    Explore architecture, lifestyle, and curated experiences.
                  </p>
                </div>

                <ArrowUpRight className="text-[#c89b7b]" />
              </div>

              {/* SOCIAL */}
              <div className="mt-6 flex gap-4">
                {[
                  {
                    icon: FaInstagram,
                    link: "https://www.instagram.com/swagatanmol/",
                  },
                  {
                    icon: FaYoutube,
                    link: "https://www.youtube.com/@SwagatAnmol",
                  },
                  {
                    icon: FaFacebookF,
                    link: "https://www.facebook.com/people/Swagat-anmol/61585867961708/#",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 flex items-center justify-center rounded-full
          backdrop-blur-xl bg-white/10 border border-white/20
          hover:border-[#c89b7b]/60 transition-all duration-300
          hover:scale-110 hover:shadow-[0_8px_25px_rgba(200,155,123,0.25)]
          cursor-pointer"
                    >
                      <Icon className="text-white/80 group-hover:text-[#c89b7b] transition text-[15px]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT INFO ================= */}
          <div ref={infoRef} className="space-y-6">
            {/* CONTACT CARD */}
            <div
              className="rounded-[30px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-7 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
            >
              <h3
                className="font-[Space_Grotesk]
                text-2xl text-white font-semibold"
              >
                Contact Information
              </h3>

              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone",
                    value: "+91 98765 43210",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    value: "info@swagatanmol.com",
                  },
                  {
                    icon: MapPin,
                    title: "Location",
                    value: "Palanpur, Gujarat",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl
                      border border-white/10
                      bg-white/[0.04]
                      flex items-center justify-center
                      text-[#c89b7b]"
                    >
                      <item.icon size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-white/40">{item.title}</p>

                      <p className="mt-1 text-white/80">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* QUICK BUTTONS */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2
                  px-5 py-4 rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  text-white/80 transition-all duration-300
                  hover:border-[#c89b7b]/60
                  hover:text-[#c89b7b]"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2
                  px-5 py-4 rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  text-white/80 transition-all duration-300
                  hover:border-[#c89b7b]/60
                  hover:text-[#c89b7b]"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>

            {/* HOURS */}
            <div
              className="rounded-[30px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-7 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-3">
                <Clock3 className="text-[#c89b7b]" size={22} />

                <h3
                  className="font-[Space_Grotesk]
                  text-2xl text-white font-semibold"
                >
                  Office Hours
                </h3>
              </div>

              <div className="mt-6 space-y-6">
                <div className="flex justify-between text-white/70">
                  <span>Monday — Saturday</span>
                  <span>10:00 AM — 7:00 PM</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>

            {/* MAP WRAPPER */}
            <div
              className="rounded-[30px]
  border border-white/10
  bg-white/[0.04]
  backdrop-blur-2xl
  p-5
  shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
            >
              {/* MAP CARD */}
              <div
                className="relative overflow-hidden
    rounded-[24px]
    border border-white/10
    h-[350px]"
              >
                <iframe
                  title="location-map"
                  src="https://www.google.com/maps?q=24.1667,72.4137&z=14&output=embed"
                  className="absolute inset-0 w-full h-full grayscale contrast-125"
                  loading="lazy"
                />

                {/* DARK FADE */}
                <div
                  className="pointer-events-none absolute inset-0
      bg-gradient-to-t
      from-black/60 via-transparent to-transparent"
                />

                {/* LABEL */}
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <div
                    className="inline-flex items-center gap-2
        px-4 py-2 rounded-full
        border border-white/15
        bg-black/30 backdrop-blur-md"
                  >
                    <MapPin size={16} className="text-[#c89b7b]" />

                    <span
                      className="text-[10px]
          uppercase tracking-[0.35em]
          text-white/70 font-[Space_Grotesk]"
                    >
                      Visit Experience Center
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
