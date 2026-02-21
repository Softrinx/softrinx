"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/themeContext";

// ─── Real client stories from actual Softrinx projects ────────────────────────
const testimonials = [
  {
    id: 1,
    text: "They didn't just build a website — they built a brand identity that lets our photography breathe online. Every pixel serves the emotion we wanted to convey.",
    author: "Memora Visuals",
    role: "Photography Studio · Kenya",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200&h=200&fit=crop&crop=center",
    result: "Live · Converting · Client proud",
    category: "Web · Branding",
    link: "https://memoravisuals.com",
    size: "large",
  },
  {
    id: 2,
    text: "A farmer photographs a diseased crop and gets an AI diagnosis in seconds. Softrinx made something that genuinely matters to smallholder farmers across Kenya.",
    author: "AgriLens",
    role: "AI AgriTech Platform · Kenya",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop&crop=center",
    result: "Protecting yields across Kenya",
    category: "AI · Web App",
    link: "https://agrilens-farmer.vercel.app/",
    size: "small",
  },
  {
    id: 3,
    text: "Our lecturers now have AI that grades, tracks, and adapts. Assessment creation went from hours to minutes — deployed across our entire university cohort.",
    author: "IntelliMark",
    role: "EdTech AI Platform · University",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=200&h=200&fit=crop&crop=center",
    result: "Deployed across university cohorts",
    category: "EdTech · AI",
    link: "https://intellimark.pages.dev/",
    size: "small",
  },
  {
    id: 4,
    text: "Dating apps are all swipe, no substance. Softrinx understood what we wanted to build — genuine human connection — and delivered a platform that actually feels real.",
    author: "TabooTalks",
    role: "Connections Platform · Germany",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop&crop=faces",
    result: "Live in Germany · Growing",
    category: "Social · Web App",
    link: "https://www.tabootalks.de/",
    size: "medium",
  },
  {
    id: 5,
    text: "Precision agriculture without expensive IoT hardware — we couldn't believe it was possible. FarmSense is now helping farmers across three counties optimise their yields.",
    author: "FarmSense",
    role: "Smart Farming Platform · Kenya",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200&h=200&fit=crop&crop=center",
    result: "Precision farming for all",
    category: "AgriTech · Web App",
    link: "https://farm-sense-mu.vercel.app/",
    size: "small",
  },
  {
    id: 6,
    text: "A full streaming app — custom video player, offline mode, subscriptions — shipped to Google Play on time and on budget. Exactly what BritechMedia envisioned.",
    author: "DjAfro StreamBox",
    role: "Mobile Streaming App · Google Play",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&h=200&fit=crop&crop=center",
    result: "Live on Google Play Store",
    category: "Mobile · Streaming",
    link: "https://djafromovies.vercel.app/",
    size: "medium",
  },
];

const partners = [
  { name: "Healthmaster",     logo: "/images/images/hm.png" },
  { name: "Uamas",            logo: "/images/images/uamas.png" },
  { name: "Alx",              logo: "/images/images/alx.png" },
  { name: "DjAfro StreamBox", logo: "/images/images/afro.png" },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
  result: string;
  category: string;
  link: string;
  size: string;
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={t.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="t-card"
      data-size={t.size}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        padding: "clamp(1.1rem, 2.5vw, 1.75rem)",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {/* Category + arrow */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem" }}>
        <span style={{
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--color-emerald)",
          border: "1px solid var(--color-emerald-border)",
          background: "var(--color-emerald-bg)",
          padding: "0.2rem 0.5rem", flexShrink: 0,
        }}>
          {t.category}
        </span>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0.28, x: hovered ? 0 : -2, y: hovered ? 0 : 2 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--color-emerald)", flexShrink: 0, display: "flex" }}>
          <ArrowUpRight size={15} />
        </motion.span>
      </div>

      {/* Quote */}
      <p style={{
        fontSize: "clamp(0.82rem, 1.15vw, 0.93rem)",
        lineHeight: 1.72, color: "var(--color-text)",
        letterSpacing: "-0.01em", flex: 1, marginBottom: "1.25rem",
      }}>
        "{t.text}"
      </p>

      {/* Result */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <div style={{ width: 4, height: 4, background: "var(--color-emerald)", flexShrink: 0 }} />
        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--color-emerald)", letterSpacing: "0.04em" }}>
          {t.result}
        </span>
      </div>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: "38px", height: "38px", border: "1px solid var(--color-emerald-border)", flexShrink: 0, overflow: "hidden" }}>
          <img src={t.image} alt={t.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.02em", marginBottom: "0.1rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {t.author}
          </p>
          <p style={{ fontSize: "0.64rem", fontWeight: 600, color: "var(--color-emerald)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {t.role}
          </p>
        </div>
      </div>

      {/* Hover bottom line */}
      <motion.div
        style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: "var(--color-emerald)" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      />
    </motion.a>
  );
}

// ─── Partners — pure CSS infinite, truly never ends ───────────────────────────
function PartnersCarousel() {
  const items = [...partners, ...partners, ...partners, ...partners];
  return (
    <div style={{ position: "relative", overflow: "hidden", height: "72px" }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "110px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, var(--color-bg), transparent)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "110px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, var(--color-bg), transparent)" }} />
      <div className="p-track" style={{ display: "flex", alignItems: "center", gap: "3.5rem", width: "max-content", height: "100%" }}>
        {items.map((p, i) => (
          <div key={i} className="p-logo" style={{ flexShrink: 0 }}>
            <Image src={p.logo} alt={p.name} width={110} height={34}
              className="object-contain" style={{ height: "34px", width: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { colors } = useTheme();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <section style={{
      background: "var(--color-bg)",
      paddingTop: "clamp(64px,10vw,100px)",
      paddingBottom: "clamp(64px,10vw,100px)",
      borderTop: "1px solid var(--color-border)",
      position: "relative",
    }}>
      <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>

        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-6 mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -12 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45 }}>
              <span style={{ display: "block", width: "2rem", height: "1px", background: "var(--color-emerald)" }} />
              <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
                Client Stories
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.07, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)" }}>
              Real projects.<br />
              <span style={{ color: "var(--color-emerald)" }}>Real results.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "22rem" }}>
              Every card is a live product. Click any to see it in the wild.
            </p>
            <Link href="/portfolio"
              className="inline-flex items-center gap-2 font-semibold group"
              style={{ color: "var(--color-emerald)", fontSize: "0.82rem", width: "fit-content" }}>
              Full portfolio <ArrowUpRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="gap-px mb-16 t-grid" style={{ display: "grid", background: "var(--color-border)" }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>

        {/* Partners */}
        <div>
          <motion.p className="mb-8 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--color-text-faint)", textTransform: "uppercase" }}>
            Trusted collaborations
          </motion.p>
          <PartnersCarousel />
        </div>

        {/* CTA */}
        <motion.div className="flex justify-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <Link href="/portfolio"
            className="inline-flex items-center gap-2 font-semibold"
            style={{ border: "1px solid var(--color-emerald-border)", color: "var(--color-emerald)", fontSize: "0.85rem", padding: "0.7rem 1.5rem", letterSpacing: "0.03em" }}>
            View All Projects <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        /* ── Grid breakpoints ── */

        /* Mobile: 1 col, no bento spans at all */
        .t-grid { grid-template-columns: 1fr; }
        .t-card {
          grid-column: span 1 !important;
          grid-row:    span 1 !important;
          min-height: 190px;
        }

        /* Tablet: 2 equal cols, still no spans */
        @media (min-width: 580px) {
          .t-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Desktop: full 3-col bento with size spans */
        @media (min-width: 1024px) {
          .t-grid { grid-template-columns: repeat(3, 1fr); }
          .t-card[data-size="large"]  { grid-column: span 2 !important; grid-row: span 1 !important; min-height: 260px; }
          .t-card[data-size="medium"] { grid-column: span 1 !important; grid-row: span 2 !important; }
          .t-card[data-size="small"]  { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 240px; }
        }

        /* ── Infinite partner scroll ── */
        .p-logo { opacity: 0.35; filter: grayscale(1); transition: opacity 0.3s, filter 0.3s; }
        .p-logo:hover { opacity: 1; filter: grayscale(0); }

        @keyframes p-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .p-track { animation: p-scroll 26s linear infinite; will-change: transform; }
        .p-track:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}