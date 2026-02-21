"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/themeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    text: "Working with Softrinx transformed how we approach digital infrastructure. The cloud migration was seamless, and our uptime improved by 40%. Their team understood our scale challenges from day one.",
    author: "Wanjiru Kamau",
    role: "CTO, Safaripay Kenya",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    rating: 5,
    size: "large", // 2 cols
  },
  {
    id: 2,
    text: "The mobile app they built for our logistics platform handles 50k+ daily transactions flawlessly. Performance is exceptional, and the UI is intuitive for our drivers.",
    author: "Kipchoge Mutai",
    role: "Founder, SwiftMove Logistics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 5,
    size: "small",
  },
  {
    id: 3,
    text: "Their AI integration cut our customer support response time by 65%. The chatbot they built understands context in both English and Swahili — game-changing for our market.",
    author: "Achieng Omondi",
    role: "Operations Director, TechHub Nairobi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 5,
    size: "small",
  },
  {
    id: 4,
    text: "Our e-commerce platform saw a 120% revenue increase after the rebuild. Page load times dropped from 4.2s to 0.8s. Softrinx delivered beyond every metric we set.",
    author: "James Mwangi",
    role: "CEO, Tujuane Marketplace",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    rating: 5,
    size: "medium",
  },
  {
    id: 5,
    text: "The fintech dashboard they created handles real-time data from 12 banks with zero latency. Security implementation exceeded industry standards. Exceptional work.",
    author: "Faith Nyambura",
    role: "Product Lead, M-Shwari Digital",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    rating: 5,
    size: "small",
  },
  {
    id: 6,
    text: "From architecture to deployment, their team owned every detail. The custom CRM they built reduced our onboarding time by 80%. Best dev partner we've worked with.",
    author: "Daniel Korir",
    role: "Head of Engineering, Savannah Ventures",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    rating: 5,
    size: "medium",
  },
];

const partners = [
  { name: "Healthmaster", logo: "/images/images/hm.png" },
  { name: "Uamas", logo: "/images/images/uamas.png" },
  { name: "Alx", logo: "/images/images/alx.png" },
  { name: "DjAfroStreamBox", logo: "/images/images/afro.png" },
];

// ─── Single testimonial card ──────────────────────────────────────────────────
function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden group"
      style={{
        border: `1px solid var(--color-border)`,
        background: "var(--color-surface)",
        gridColumn: t.size === "large" ? "span 2" : "span 1",
        gridRow: t.size === "medium" ? "span 2" : "span 1",
        padding: "clamp(1.2rem, 2.5vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: t.size === "large" ? "280px" : t.size === "medium" ? "320px" : "240px",
      }}
    >
      {/* Quote icon — top left */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: "1.2rem",
          right: "1.2rem",
          color: "var(--color-emerald)",
        }}
      >
        <Quote size={t.size === "large" ? 32 : 24} />
      </motion.div>

      {/* Testimonial text */}
      <div>
        <p
          style={{
            fontSize: t.size === "large" ? "clamp(0.95rem, 1.4vw, 1.1rem)" : "clamp(0.82rem, 1.2vw, 0.92rem)",
            lineHeight: 1.65,
            color: "var(--color-text)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          "{t.text}"
        </p>
      </div>

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div
          className="relative overflow-hidden"
          style={{
            width: t.size === "large" ? "56px" : "48px",
            height: t.size === "large" ? "56px" : "48px",
            border: `2px solid var(--color-emerald-border)`,
            flexShrink: 0,
          }}
        >
          <img
            src={t.image}
            alt={t.author}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            style={{
              fontSize: t.size === "large" ? "0.95rem" : "0.88rem",
              fontWeight: 700,
              color: "var(--color-text)",
              letterSpacing: "-0.01em",
              marginBottom: "0.15rem",
            }}
          >
            {t.author}
          </h4>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--color-emerald)",
              letterSpacing: "0.03em",
            }}
          >
            {t.role}
          </p>
        </div>
      </div>

      {/* Bottom emerald line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{ background: "var(--color-emerald)" }}
      />
    </motion.div>
  );
}

// ─── Partners carousel (no cards, just logos) ─────────────────────────────────
function PartnersCarousel() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 0.5); // Smooth continuous scroll
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  // Double the array to create seamless loop
  const doubled = [...partners, ...partners, ...partners];

  return (
    <div className="relative overflow-hidden" style={{ height: "100px" }}>
      {/* Left fade */}
      <div
        className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none"
        style={{
          width: "120px",
          background: `linear-gradient(to right, var(--color-bg), transparent)`,
        }}
      />
      {/* Right fade */}
      <div
        className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none"
        style={{
          width: "120px",
          background: `linear-gradient(to left, var(--color-bg), transparent)`,
        }}
      />

      {/* Scrolling container */}
      <div
        className="flex items-center gap-16"
        style={{
          transform: `translateX(${offset}px)`,
          willChange: "transform",
        }}
      >
        {doubled.map((partner, i) => (
          <div
            key={i}
            className="flex-shrink-0 transition-opacity duration-300 opacity-40 hover:opacity-100"
            style={{
              filter: "grayscale(1)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.filter = "grayscale(1)";
            }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={48}
              className="object-contain"
              style={{ height: "48px", width: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { colors } = useTheme();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <section
      style={{
        background: "var(--color-bg)",
        paddingTop: "clamp(64px,10vw,100px)",
        paddingBottom: "clamp(64px,10vw,100px)",
        position: "relative",
      }}
    >
      {/* Vertical timeline accent — right side */}
      <div
        className="absolute top-0 bottom-0 right-0 flex-col items-center hidden lg:flex"
        style={{
          width: "1px",
          background: "var(--color-border)",
          marginRight: "5vw",
        }}
      >
        {/* Timeline dots */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            style={{
              width: "8px",
              height: "8px",
              background: "var(--color-emerald)",
              border: `2px solid var(--color-bg)`,
              position: "absolute",
              top: `${20 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -12 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--color-emerald)",
                textTransform: "uppercase",
              }}
            >
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07, ease: [0.32, 0.72, 0, 1] }}
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "var(--color-text)",
              maxWidth: "800px",
            }}
          >
            What Developers
            <br />
            <span style={{ color: "var(--color-emerald)" }}>Are Saying</span>
          </motion.h2>
        </div>

        {/* Bento grid — responsive masonry */}
        <div
          className="grid gap-px mb-16"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            background: "var(--color-border)",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>

        {/* Partners section */}
        <div className="mt-20">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Trusted by
            </p>
            <h3
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
              }}
            >
              Our Collaborations
            </h3>
          </motion.div>

          <PartnersCarousel />
        </div>

        {/* Bottom CTA row — link to all testimonials */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 group"
            style={{
              border: `1px solid var(--color-emerald-border)`,
              color: "var(--color-emerald)",
              fontSize: "0.85rem",
              letterSpacing: "0.03em",
            }}
          >
            Read All Reviews
            <motion.span
              animate={{ x: 0 }}
              whileHover={{ x: 4, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}