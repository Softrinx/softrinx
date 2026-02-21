"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CASES = [
  {
    number: "01",
    category: "Music Streaming",
    title: "Djafro StreamBox — 1,000+ Downloads on Google Play",
    result: "1k+ downloads · Live on Play Store",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&h=600&fit=crop",
    size: "large",
  },
  {
    number: "02",
    category: "HealthTech",
    title: "HealthMaster App — In Active Beta Testing",
    result: "Beta live · Real users onboarded",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    number: "03",
    category: "Community Platform",
    title: "TabooTalks — Used by People Across Germany",
    result: "Active users · Germany market",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    number: "04",
    category: "AgriTech",
    title: "AgriLens — Helping Farmers Make Smarter Decisions",
    result: "Used by farmers daily · Field-tested",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&h=600&fit=crop",
    size: "large",
  },
  {
    number: "05",
    category: "Creative Agency",
    title: "Memora Visuals — Digital Presence for a Creative Studio",
    result: "Live & converting · Brand established",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    number: "06",
    category: "Travel & Rentals",
    title: "WereNtOnline — Tourists Booking Kenya Coast Rentals Online",
    result: "Active bookings · Kenya Coast market",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop",
    size: "small",
  },
];

// ─── Single card ──────────────────────────────────────────────────────────────
function CaseCard({
  c, index,
}: {
  c: (typeof CASES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden group"
      style={{
        border: `1px solid var(--color-border)`,
        cursor: "pointer",
        background: "var(--color-surface)",
        gridColumn: c.size === "large" ? "span 2" : "span 1",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: c.size === "large" ? "clamp(220px,28vw,340px)" : "clamp(180px,22vw,260px)" }}>
        <motion.img
          src={c.image}
          alt={c.title}
          className="object-cover w-full h-full"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        />
        {/* Dark scrim */}
        <motion.div
          className="absolute inset-0"
          animate={{ background: hovered ? "rgba(8,11,9,0.55)" : "rgba(8,11,9,0.25)" }}
          transition={{ duration: 0.35 }}
        />
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-emerald)",
            background: "rgba(8,11,9,0.75)",
            padding: "0.25rem 0.6rem",
            border: `1px solid var(--color-emerald-border)`,
          }}>
            {c.category}
          </span>
        </div>
        {/* Number */}
        <div className="absolute top-4 right-4">
          <span style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.4)",
          }}>
            {c.number}
          </span>
        </div>
      </div>

      {/* Content row */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex-1 min-w-0">
          <h3 style={{
            fontSize: c.size === "large" ? "clamp(1rem, 1.8vw, 1.25rem)" : "clamp(0.88rem, 1.4vw, 1rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            color: "var(--color-text)",
            marginBottom: "0.5rem",
          }}>
            {c.title}
          </h3>
          <span style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--color-emerald)",
            letterSpacing: "0.04em",
          }}>
            {c.result}
          </span>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{
            x: hovered ? 0 : -4,
            y: hovered ? 0 : 4,
            opacity: hovered ? 1 : 0.35,
          }}
          transition={{ duration: 0.25 }}
          style={{
            width: "36px",
            height: "36px",
            border: `1px solid var(--color-emerald-border)`,
            background: hovered ? "var(--color-emerald)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.25s",
          }}
        >
          <ArrowUpRight
            size={16}
            style={{ color: hovered ? "#040805" : "var(--color-emerald)" }}
          />
        </motion.div>
      </div>

      {/* Bottom emerald line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{ background: "var(--color-emerald)" }}
      />
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function CaseStudy() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <section style={{
      background: "var(--color-bg)",
      paddingTop: "clamp(64px,10vw,100px)",
      paddingBottom: "clamp(64px,10vw,100px)",
      borderTop: `1px solid var(--color-border)`,
    }}>
      <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>

        {/* Header */}
        <div ref={headerRef} className="flex flex-col justify-between gap-8 mb-12 lg:flex-row lg:items-end">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -12 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            >
              <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
              <span style={{
                fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.15em", color: "var(--color-emerald)",
                textTransform: "uppercase",
              }}>
                Case Studies
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
                lineHeight: 1.0,
                color: "var(--color-text)",
              }}
            >
              Work That<br />Speaks.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="flex flex-col items-start gap-4 lg:items-end"
          >
            <p style={{
              fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)",
              lineHeight: 1.75,
              color: "var(--color-text-muted)",
              maxWidth: "22rem",
              textAlign: "right",
            }}>
              Real products. Real users. From Kenya's coast to Germany — these are the things we've built and shipped.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 group"
              style={{ color: "var(--color-emerald)", fontSize: "0.85rem" }}
            >
              All work
              <motion.span animate={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <ArrowUpRight size={15} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div
          className="gap-px case-study-grid"
          style={{ display: "grid", background: "var(--color-border)" }}
        >
          {CASES.map((c, i) => (
            <CaseCard key={c.number} c={c} index={i} />
          ))}
        </div>

        {/* Metrics band */}
        <motion.div
          className="grid grid-cols-2 mt-px lg:grid-cols-4"
          style={{ background: "var(--color-border)", gap: "1px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { value: "6+",   label: "Products Shipped" },
            { value: "3",    label: "Countries Reached" },
            { value: "1k+",  label: "End Users" },
            { value: "100%", label: "Still in Production" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 px-5 py-4"
              style={{ background: "var(--color-surface)" }}>
              <span style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--color-text)" }}>
                {m.value}
              </span>
              <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--color-text-faint)", letterSpacing: "0.04em", lineHeight: 1.3 }}>
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>

        <style>{`
          .case-study-grid {
            grid-template-columns: 1fr;
          }
          .case-study-grid > * {
            grid-column: span 1 !important;
          }
          @media (min-width: 640px) {
            .case-study-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .case-study-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .case-study-grid > *:nth-child(1),
            .case-study-grid > *:nth-child(4) {
              grid-column: span 2 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}