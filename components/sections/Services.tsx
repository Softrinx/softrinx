"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Code, Smartphone, Server, BrainCircuit, Database, Shield,
  ArrowRight, ArrowUpRight,
} from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    number: "01",
    icon: Code,
    title: "Custom Software Development",
    description:
      "End-to-end engineering of web platforms, SaaS products, and internal tools — built to your exact specifications with clean, maintainable code.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native iOS & Android and cross-platform apps with polished UX. We build for performance, offline-first resilience, and App Store success.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    number: "03",
    icon: Server,
    title: "Cloud Infrastructure",
    description:
      "Scalable, cost-efficient cloud architecture on AWS, GCP, or Azure. CI/CD pipelines, containerisation, and zero-downtime deployments.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    number: "04",
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description:
      "Custom model integration, LLM fine-tuning, and intelligent automation that gives your product a measurable edge over competitors.",
    tags: ["LLMs", "Python", "TensorFlow", "OpenAI"],
  },
  {
    number: "05",
    icon: Database,
    title: "Database Architecture",
    description:
      "Robust schema design, query optimisation, and migration strategies for relational and NoSQL databases at any scale.",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    number: "06",
    icon: Shield,
    title: "Cyber Security",
    description:
      "Penetration testing, security audits, and hardening of your stack — so your data and your clients' trust stay protected.",
    tags: ["Pen Testing", "OWASP", "OAuth", "Encryption"],
  },
];

const ROW_A = [...SERVICES, ...SERVICES, ...SERVICES];
const ROW_B = [...SERVICES, ...SERVICES, ...SERVICES].reverse();

// ─── Scroll-reveal ────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Carousel row ─────────────────────────────────────────────────────────────
function CarouselRow({
  items,
  direction,
}: {
  items: typeof ROW_A;
  direction: "left" | "right";
}) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {items.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex items-center flex-shrink-0 gap-3 px-5 py-3"
              style={{
                border: `1px solid var(--color-border)`,
                background: "var(--color-card)",
                minWidth: "240px",
              }}
            >
              <Icon size={16} style={{ color: "var(--color-emerald)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                {s.title}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-faint)", marginLeft: "auto", flexShrink: 0 }}>
                {s.number}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
export default function Services() {
  const [active, setActive] = useState(0);
  const { isDark } = useTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SERVICES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const ActiveIcon = SERVICES[active].icon;

  // Each row is exactly this tall. Both columns use this to lock grid height.
  const ROW_H = 72;
  const PANEL_H = SERVICES.length * ROW_H + (SERVICES.length - 1); // rows + borders

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--color-bg)", paddingTop: "clamp(64px,10vw,120px)", paddingBottom: 0 }}
    >
      {/* ── Section header ── */}
      <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
              What We Offer
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 mb-16 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.08}>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)" }}>
              Our<br />Services.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", lineHeight: 1.8, color: "var(--color-text-muted)", maxWidth: "28rem" }}>
              From idea to production, we cover the full engineering stack.
              Every service is delivered with precision, speed, and long-term thinking.
            </p>
          </Reveal>
        </div>

        {/* ── Main interactive panel ── */}
        <Reveal delay={0.1} y={32}>
          <div
            className="grid overflow-hidden lg:grid-cols-2"
            style={{
              border: `1px solid var(--color-border)`,
              // Lock the entire grid to a fixed height — nothing inside
              // can ever cause it to grow or shrink.
              height: `${PANEL_H}px`,
            }}
          >
            {/* ── LEFT — every row is exactly ROW_H px, no exceptions ── */}
            <div style={{ borderRight: `1px solid var(--color-border)`, height: "100%" }}>
              {SERVICES.map((s, i) => {
                const isActive = i === active;
                const Icon = s.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="w-full text-left"
                    style={{
                      // FIXED height — this is the entire secret.
                      // No AnimatePresence, no height:auto, no expanding text.
                      // Only background color and icon/text color change.
                      height: `${ROW_H}px`,
                      boxSizing: "border-box",
                      borderBottom: i < SERVICES.length - 1 ? `1px solid var(--color-border)` : "none",
                      background: isActive ? "var(--color-emerald-bg)" : "transparent",
                      padding: "0 clamp(1.25rem, 3vw, 2rem)",
                      transition: "background 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex items-center gap-4" style={{ width: "100%" }}>
                      {/* Number */}
                      <span style={{
                        fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
                        color: isActive ? "var(--color-emerald)" : "var(--color-text-faint)",
                        fontVariantNumeric: "tabular-nums",
                        transition: "color 0.25s",
                        flexShrink: 0, width: "1.5rem",
                      }}>
                        {s.number}
                      </span>

                      {/* Icon */}
                      <div style={{
                        width: "36px", height: "36px",
                        border: `1px solid ${isActive ? "var(--color-emerald-border)" : "var(--color-border)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "border-color 0.25s",
                      }}>
                        <Icon size={16} style={{ color: isActive ? "var(--color-emerald)" : "var(--color-text-faint)", transition: "color 0.25s" }} />
                      </div>

                      {/* Title — single line, never wraps or expands */}
                      <p style={{
                        flex: 1,
                        fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)",
                        fontWeight: 700,
                        color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                        transition: "color 0.25s",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        margin: 0,
                      }}>
                        {s.title}
                      </p>

                      {/* Active dot */}
                      <div style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: isActive ? "var(--color-emerald)" : "transparent",
                        border: `1px solid ${isActive ? "var(--color-emerald)" : "var(--color-border)"}`,
                        flexShrink: 0, transition: "all 0.25s",
                      }} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── RIGHT — all animated content, locked to same PANEL_H ── */}
            <div
              className="relative flex-col justify-between hidden lg:flex"
              style={{
                padding: "clamp(2rem, 4vw, 3rem)",
                background: "var(--color-surface)",
                height: "100%",
                // overflow hidden so the fade animation never causes scroll
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                  style={{ display: "flex", flexDirection: "column", height: "100%", gap: "clamp(0.6rem, 1.2vw, 1rem)" }}
                >
                  {/* Icon */}
                  <div style={{
                    width: "52px", height: "52px",
                    border: `1px solid var(--color-emerald-border)`,
                    background: "var(--color-emerald-bg)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <ActiveIcon size={24} style={{ color: "var(--color-emerald)" }} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)",
                    fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05,
                    color: "var(--color-text)", margin: 0,
                  }}>
                    {SERVICES[active].title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)",
                    lineHeight: 1.75, color: "var(--color-text-muted)",
                    maxWidth: "28rem", margin: 0,
                  }}>
                    {SERVICES[active].description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2" style={{ marginTop: "auto" }}>
                    {SERVICES[active].tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em",
                        padding: "0.3rem 0.75rem",
                        border: `1px solid var(--color-border-mid)`,
                        color: "var(--color-text-muted)", textTransform: "uppercase",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Learn more */}
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 group"
                    style={{ color: "var(--color-emerald)", fontSize: "0.85rem", letterSpacing: "0.04em" }}
                  >
                    Learn more
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "var(--color-border)" }}>
                <motion.div
                  key={active}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  style={{ height: "100%", background: "var(--color-emerald)" }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Infinite dual carousel ── */}
      <div style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <Reveal>
          <div className="flex flex-col gap-3">
            <CarouselRow items={ROW_A} direction="left" />
            <CarouselRow items={ROW_B} direction="right" />
          </div>
        </Reveal>
      </div>

      {/* ── CTA — split sharp panel ── */}
      <Reveal y={24}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ borderTop: `1px solid var(--color-border)` }}>
          {/* Left — emerald */}
          <div
            className="relative flex flex-col justify-between overflow-hidden"
            style={{
              background: "var(--color-emerald)",
              padding: "clamp(2.5rem, 5vw, 4rem)",
              borderRight: `1px solid rgba(255,255,255,0.12)`,
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px)",
            }} />
            <div className="relative z-10">
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(0,0,0,0.5)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Start a Project
              </p>
              <h3 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#040805", marginBottom: "2.5rem" }}>
                Ready to Build<br />Something Real?
              </h3>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 font-bold transition-all duration-200 group"
                style={{ background: "#040805", color: "var(--color-emerald)", padding: "0.85rem 1.75rem", fontSize: "0.88rem", letterSpacing: "0.02em" }}
              >
                Get A Quote
                <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right — dark surface */}
          <div className="flex flex-col justify-between" style={{ background: "var(--color-surface)", padding: "clamp(2.5rem, 5vw, 4rem)" }}>
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-text-faint)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Or Learn More
              </p>
              <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--color-text)", marginBottom: "1rem" }}>
                Explore how we've helped companies ship faster and grow smarter.
              </h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "22rem" }}>
                Our portfolio spans fintech, healthtech, e-commerce, and enterprise SaaS. Real work. Real results.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 mt-8 font-semibold transition-colors duration-200 group"
              style={{ color: "var(--color-emerald)", fontSize: "0.88rem" }}
            >
              View Our Work
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}