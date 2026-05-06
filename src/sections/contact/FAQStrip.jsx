import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How do I schedule a private site visit?",
    answer:
      "You can schedule a personalized walkthrough by submitting an enquiry form or connecting directly with our advisors.",
  },
  {
    question: "What configurations are available at Swagat Anmol?",
    answer:
      "The project offers thoughtfully designed premium residences with spacious layouts and refined architectural planning.",
  },
  {
    question: "Can I receive pricing and brochure details?",
    answer:
      "Yes, our team can provide the latest pricing, floor plans, brochure, and complete project details upon enquiry.",
  },
  {
    question: "Where is the experience center located?",
    answer:
      "The Swagat Anmol experience center is conveniently located in Palanpur, Gujarat with seamless accessibility.",
  },
];

export default function FAQStrip() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const faqRef = useRef(null);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADING
      gsap.fromTo(
        headingRef.current.children,
        {
          opacity: 0,
          y: 60,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
          },
        },
      );

      // FAQ ITEMS
      gsap.fromTo(
        faqRef.current.children,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] overflow-hidden"
    >
      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[5%]
          w-[420px] h-[420px]
          rounded-full bg-[#c89b7b]/10 blur-[120px]"
        />

        <div
          className="absolute bottom-[-10%] right-[0%]
          w-[500px] h-[500px]
          rounded-full bg-[#c89b7b]/10 blur-[140px]"
        />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:32px_32px]" />

      <div
        className="relative z-10
        max-w-6xl mx-auto
        px-5 sm:px-6 lg:px-8"
      >
        {/* ================= HEADING ================= */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto">
          {/* LABEL */}
          <div
            className="inline-flex items-center gap-2
            px-4 py-1.5 rounded-full
            border border-white/10
            bg-white/[0.04] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#c89b7b]" />

            <span
              className="text-[10px]
              uppercase tracking-[0.35em]
              text-white/60 font-[Space_Grotesk]"
            >
              Quick Answers
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="mt-8 font-[Space_Grotesk]
            text-4xl sm:text-5xl md:text-6xl
            leading-[1] tracking-tight
            text-white font-semibold"
          >
            Frequently Asked
            <span className="block text-[#c89b7b]">Questions</span>
          </h2>

          {/* SUBTEXT */}
          <p
            className="mt-7 text-base sm:text-lg
            leading-relaxed text-white/55"
          >
            Everything you need to know before planning your visit or exploring
            residences at Swagat Anmol.
          </p>
        </div>

        {/* ================= FAQ LIST ================= */}
        <div ref={faqRef} className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={index}
                className="group rounded-[28px]
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-2xl
                overflow-hidden
                transition-all duration-500
                hover:border-[#c89b7b]/30
                hover:shadow-[0_20px_50px_rgba(200,155,123,0.12)]"
              >
                {/* QUESTION */}
                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className="w-full px-6 sm:px-8 py-7
                  flex items-center justify-between
                  text-left hover:cursor-pointer"
                >
                  <div className="pr-6">
                    <p
                      className="font-[Space_Grotesk]
                      text-xl sm:text-2xl
                      text-white
                      font-medium leading-snug"
                    >
                      {faq.question}
                    </p>
                  </div>

                  {/* ICON */}
                  <div
                    className="flex-shrink-0
                    w-12 h-12 rounded-2xl
                    border border-white/10
                    bg-white/[0.05]
                    flex items-center justify-center
                    text-[#c89b7b]"
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-6 sm:px-8 pb-8
                      max-w-4xl"
                    >
                      <div
                        className="w-16 h-[1px]
                        bg-gradient-to-r
                        from-[#c89b7b] to-transparent"
                      />

                      <p
                        className="mt-6 text-base
                        leading-relaxed text-white/60"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
