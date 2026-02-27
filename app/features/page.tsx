/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Cpu, Globe, Shield, Zap, Code2,
  Smartphone, Brain, Network, Database, Cloud, Lock,
  BarChart3, Layers, GitBranch, Terminal, Eye, Target,
  CheckCircle2, ChevronRight,
} from "lucide-react";
import { useTheme } from "@/contexts/themeContext";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

// ─── Lottie ───────────────────────────────────────────────────────────────────
function LottieAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let anim: any, cancelled = false;
    import("lottie-web").then((lottie) => {
      if (cancelled || !containerRef.current) return;
      anim = lottie.default.loadAnimation({
        container: containerRef.current!,
        renderer: "svg", loop: true, autoplay: true,
        path: "/animations/features.json",
      });
      anim.addEventListener("DOMLoaded", () => { if (!cancelled) setLoaded(true); });
    });
    return () => { cancelled = true; anim?.destroy(); };
  }, []);
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: "rgba(255,255,255,0.08)", borderTopColor: "var(--color-emerald)" }} />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }} />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
      <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
        {text}
      </span>
    </div>
  );
}



// ─── Data ─────────────────────────────────────────────────────────────────────
const CORE_FEATURES = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    tag: "Software",
    description: "End-to-end software development from architecture to deployment. APIs, microservices, monoliths — we build systems that scale with your ambition.",
    points: ["React, Next.js, Vue", "Node.js, Django, FastAPI", "RESTful & GraphQL APIs", "System design & architecture"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    tag: "Mobile",
    description: "Native iOS, Android, and cross-platform apps with pixel-perfect UIs and buttery performance. Apps users actually love to open.",
    points: ["React Native & Flutter", "Native Swift & Kotlin", "Offline-first capabilities", "App Store & Play Store releases"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    tag: "AI/ML",
    description: "Intelligent systems that learn and adapt. We ship real ML products — not demos. LLM integration, computer vision, predictive analytics and more.",
    points: ["LLM fine-tuning & RAG", "Computer vision pipelines", "Predictive analytics", "Intelligent automation"],
  },
  {
    icon: Globe,
    title: "Web Platforms",
    tag: "Web",
    description: "High-performance, SEO-optimised web platforms. From marketing sites to complex web apps — crafted with care and built to convert.",
    points: ["Next.js & Nuxt SSR/SSG", "CMS integrations", "Performance-first development", "Accessibility & SEO baked in"],
  },
  {
    icon: Network,
    title: "Networking & IT",
    tag: "Infrastructure",
    description: "Enterprise networking, IT infrastructure setup, and managed services. We handle the hard infrastructure so you can focus on your product.",
    points: ["Network design & setup", "VPN & firewall config", "IT support & helpdesk", "Hardware procurement"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    tag: "DevOps",
    description: "Cloud-native deployments, CI/CD pipelines, and infrastructure as code. Zero-downtime releases, monitoring, and auto-scaling.",
    points: ["AWS, GCP, Azure", "Docker & Kubernetes", "CI/CD pipeline setup", "Monitoring & alerting"],
  },
];

const DIFFERENTIATORS = [
  {
    icon: Terminal,
    title: "Engineers, not account managers",
    body: "You talk directly to the person writing your code. No middlemen, no game of telephone.",
  },
  {
    icon: Eye,
    title: "Full visibility, always",
    body: "Real-time progress on your Jira board, weekly demos, and a Slack channel that's actually active.",
  },
  {
    icon: GitBranch,
    title: "Your code. Forever.",
    body: "Full source ownership from day one. No lock-in. No hostage code. It's yours the moment it's written.",
  },
  {
    icon: Shield,
    title: "Security by default",
    body: "Security isn't a post-launch thought. It's built into every layer from database schema to API design.",
  },
  {
    icon: BarChart3,
    title: "Measurable outcomes",
    body: "We define success metrics before we write a line of code. Every sprint is pointed at a business outcome.",
  },
  {
    icon: Layers,
    title: "One team, full stack",
    body: "Backend, frontend, mobile, AI, DevOps — all under one roof. No coordination tax across fragmented vendors.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    label: "Discover",
    title: "We map your world before touching the keyboard.",
    body: "Deep stakeholder interviews, technical audits, and competitive landscape analysis. We surface the real problem — not just the stated one.",
    icon: Target,
  },
  {
    num: "02",
    label: "Architect",
    title: "Every structural decision made deliberately.",
    body: "System design docs, API contracts, data models, tech stack selection. We write the blueprint before laying a single brick.",
    icon: Database,
  },
  {
    num: "03",
    label: "Build",
    title: "Real progress every week, not just at the end.",
    body: "Two-week sprints with live demos. You see working software, not status updates. Bugs caught early. Feedback loops tight.",
    icon: Code2,
  },
  {
    num: "04",
    label: "Ship",
    title: "Go-live is the beginning, not the end.",
    body: "Staging environments, load testing, production monitoring. We stay on for the first weeks post-launch to squash anything that surfaces.",
    icon: Zap,
  },
];

const STATS = [
  { value: "4+", label: "Products live in market" },
  { value: "100%", label: "Source code ownership" },
  { value: "5", label: "Full-stack engineers" },
  { value: "2024", label: "Founded & shipping" },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ f, index }: { f: typeof CORE_FEATURES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const Icon = f.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--color-card-hover)" : "var(--color-card)",
        border: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "background 0.25s",
        padding: "clamp(1.5rem, 2.5vw, 2.2rem)",
      }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{ background: "var(--color-emerald)" }}
      />

      {/* Tag */}
      <div className="flex items-center justify-between mb-5">
        <span style={{
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--color-emerald)", background: "var(--color-emerald-bg)",
          border: "1px solid var(--color-emerald-border)", padding: "0.18rem 0.55rem",
        }}>{f.tag}</span>
        <motion.div
          animate={{
            background: hovered ? "var(--color-emerald)" : "transparent",
            borderColor: hovered ? "var(--color-emerald)" : "var(--color-border)",
          }}
          transition={{ duration: 0.25 }}
          style={{ width: 36, height: 36, border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon size={15} style={{ color: hovered ? "#040805" : "var(--color-emerald)" }} />
        </motion.div>
      </div>

      <h3 style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--color-text)", marginBottom: "0.7rem", lineHeight: 1.2 }}>
        {f.title}
      </h3>
      <p style={{ fontSize: "0.8rem", lineHeight: 1.72, color: "var(--color-text-muted)", marginBottom: "1.2rem" }}>
        {f.description}
      </p>

      {/* Points */}
      <div className="flex flex-col gap-2">
        {f.points.map((point) => (
          <div key={point} className="flex items-center gap-2.5">
            <CheckCircle2 size={11} style={{ color: "var(--color-emerald)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.73rem", color: "var(--color-text-faint)", fontWeight: 500 }}>{point}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Differentiator Card ──────────────────────────────────────────────────────
function DiffCard({ d, index, inView }: { d: typeof DIFFERENTIATORS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = d.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "clamp(1.4rem, 2vw, 1.8rem)",
        border: "1px solid var(--color-border)",
        background: hovered ? "var(--color-card-hover)" : "var(--color-card)",
        position: "relative", overflow: "hidden", transition: "background 0.25s", cursor: "default",
      }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          animate={{ background: hovered ? "var(--color-emerald-bg)" : "transparent", borderColor: hovered ? "var(--color-emerald-border)" : "var(--color-border)" }}
          transition={{ duration: 0.25 }}
          style={{ width: 38, height: 38, border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        >
          <Icon size={15} style={{ color: hovered ? "var(--color-emerald)" : "var(--color-text-faint)" }} />
        </motion.div>
        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-text)", marginBottom: "0.4rem" }}>{d.title}</h4>
          <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "var(--color-text-muted)" }}>{d.body}</p>
        </div>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-[2px]"
        animate={{ width: hovered ? "100%" : "0%" }} transition={{ duration: 0.35 }}
        style={{ background: "var(--color-emerald)" }} />
    </motion.div>
  );
}

// ─── Stat ─────────────────────────────────────────────────────────────────────
function StatItem({ stat, index, inView }: { stat: typeof STATS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ padding: "clamp(1.5rem, 2vw, 2rem)", borderRight: index < STATS.length - 1 ? "1px solid var(--color-border)" : "none", textAlign: "center" }}
    >
      <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.05em", color: "var(--color-emerald)", lineHeight: 1, marginBottom: "0.4rem" }}>
        {stat.value}
      </div>
      <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--color-text-faint)", textTransform: "uppercase" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FeaturesPage() {
  const { colors } = useTheme();

  const diffRef = useRef(null);
  const processRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const diffInView = useInView(diffRef, { once: true, margin: "-60px" });
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  const [activeProcess, setActiveProcess] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveProcess((i) => (i + 1) % PROCESS_STEPS.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ background: "var(--color-bg)" }}>
      <Navigation />

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section className="relative flex items-center overflow-hidden"
        style={{ minHeight: "100svh", background: "var(--color-bg)" }}>

        {/* Radial glow */}
        <div className="absolute pointer-events-none" style={{
          top: "-15%", right: "0%",
          width: "65vw", height: "65vw", maxWidth: "780px", maxHeight: "780px",
          background: `radial-gradient(ellipse at 80% 20%, ${colors.emeraldBg} 0%, transparent 70%)`,
        }} />

        <div className="relative z-10 w-full px-6 mx-auto lg:px-16"
          style={{ maxWidth: "1360px", paddingTop: "clamp(110px, 14vw, 144px)", paddingBottom: "clamp(64px, 8vw, 96px)" }}>

          <div className="flex flex-col gap-12 lg:grid lg:items-center"
            style={{ gridTemplateColumns: "55fr 45fr" }}>

            {/* LEFT — Text */}
            <motion.div className="flex flex-col"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.32, 0.72, 0, 1] }}
              style={{ gap: "clamp(1.2rem, 2vw, 1.8rem)" }}>

              <div className="flex items-center gap-3">
                <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
                  What We Deliver
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)" }}>
                Every layer.
                <br />
                <span style={{ color: "var(--color-emerald)" }}>Every stack.</span>
                <br />
                One team.
              </h1>

              <p style={{ fontSize: "clamp(0.88rem, 1.3vw, 1rem)", lineHeight: 1.82, color: "var(--color-text-muted)", maxWidth: "30rem" }}>
                Softrinx covers the full technology surface — software, web, mobile, AI/ML, networking and cloud. No fragmented vendors. No coordination overhead. One expert team that owns the entire solution.
              </p>

              {/* Inline capability pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Full-Stack", "Mobile", "AI/ML", "DevOps", "Networking", "UI/UX"].map((cap) => (
                  <span key={cap} style={{
                    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em",
                    color: "var(--color-text-muted)", border: "1px solid var(--color-border)",
                    padding: "0.25rem 0.65rem", background: "var(--color-card)",
                  }}>{cap}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-bold transition-all duration-200 group hover:-translate-y-px"
                  style={{ background: "var(--color-emerald)", color: "#040805", padding: "0.8rem 1.6rem", fontSize: "0.88rem", boxShadow: `0 0 24px var(--color-emerald-glow)` }}>
                  Start a Project
                  <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/portfolio"
                  className="inline-flex items-center gap-2 font-semibold transition-all duration-200"
                  style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-border-mid)", padding: "0.8rem 1.6rem", fontSize: "0.88rem", background: "transparent" }}>
                  See Our Work <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — Lottie */}
            <motion.div className="flex items-center justify-center"
              initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.32, 0.72, 0, 1] }}
              style={{ height: "clamp(280px, 38vw, 520px)" }}>
              <LottieAnimation />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ height: 80, background: "linear-gradient(to top, var(--color-surface), transparent)" }} />
      </section>

      {/* ══ STATS BAR ══════════════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ background: "var(--color-border)", gap: "1px" }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{ background: "var(--color-surface)" }}>
                <StatItem stat={stat} index={i} inView={statsInView} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE FEATURES ══════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop: "clamp(72px, 10vw, 112px)", paddingBottom: "clamp(72px, 10vw, 112px)",
        background: "var(--color-bg)", borderBottom: "1px solid var(--color-border)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="flex flex-col justify-between gap-8 mb-14 lg:flex-row lg:items-end">
            <div>
              <SectionLabel text="Core Capabilities" />
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)" }}>
                Six domains.<br />
                <span style={{ color: "var(--color-emerald)" }}>Zero gaps.</span>
              </h2>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "24rem" }}>
              From your first line of code to the cloud infrastructure that runs it — we cover every discipline in-house.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--color-border)" }}>
            {CORE_FEATURES.map((f, i) => (
              <FeatureCard key={f.title} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE PROCESS ════════════════════════════════════════════════ */}
      <section ref={processRef} style={{
        paddingTop: "clamp(72px, 10vw, 112px)", paddingBottom: "clamp(72px, 10vw, 112px)",
        background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Big ghost text */}
        <div className="absolute pointer-events-none select-none" style={{
          bottom: "-4%", right: "-2%", fontSize: "clamp(8rem, 18vw, 18rem)",
          fontWeight: 900, lineHeight: 1, color: "var(--color-border)", userSelect: "none",
        }}>HOW</div>

        <div className="relative px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="mb-14">
            <SectionLabel text="How We Work" />
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)" }}>
              The Softrinx<br />playbook.
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20" style={{ alignItems: "center" }}>
            {/* Left: step selector tabs */}
            <div className="flex flex-col gap-px" style={{ background: "var(--color-border)" }}>
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeProcess === i;
                return (
                  <motion.button
                    key={step.num}
                    onClick={() => setActiveProcess(i)}
                    style={{
                      padding: "1.4rem 1.6rem",
                      background: isActive ? "var(--color-emerald-bg)" : "var(--color-surface)",
                      borderLeft: `3px solid ${isActive ? "var(--color-emerald)" : "transparent"}`,
                      cursor: "pointer", border: "none", textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex items-center gap-4">
                      <div style={{
                        width: 34, height: 34, border: `1px solid ${isActive ? "var(--color-emerald-border)" : "var(--color-border)"}`,
                        background: isActive ? "var(--color-emerald)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s",
                      }}>
                        <Icon size={14} style={{ color: isActive ? "#040805" : "var(--color-text-faint)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", color: isActive ? "var(--color-emerald)" : "var(--color-text-faint)", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                          {step.num} — {step.label}
                        </div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: isActive ? "var(--color-text)" : "var(--color-text-muted)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                          {step.title}
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ marginLeft: "auto", color: isActive ? "var(--color-emerald)" : "var(--color-border-mid)", flexShrink: 0 }} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right: animated detail */}
            <div style={{ minHeight: "280px" }}>
              <AnimatePresence mode="wait">
                {PROCESS_STEPS.map((step, i) => {
                  if (i !== activeProcess) return null;
                  return (
                    <motion.div key={step.num}
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}>
                      <div style={{ marginBottom: "1.5rem" }}>
                        <span style={{ fontSize: "clamp(5rem, 10vw, 9rem)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 1, color: "var(--color-border-mid)", display: "block", userSelect: "none" }}>
                          {step.num}
                        </span>
                      </div>
                      <div style={{ borderLeft: "2px solid var(--color-emerald)", paddingLeft: "1.4rem" }}>
                        <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--color-emerald)", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                          Phase {step.num} — {step.label}
                        </div>
                        <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--color-text)", marginBottom: "1rem", lineHeight: 1.2 }}>
                          {step.title}
                        </h3>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.78, color: "var(--color-text-muted)", maxWidth: "28rem" }}>
                          {step.body}
                        </p>
                      </div>
                      {/* Progress bar */}
                      <div className="flex gap-2 mt-8">
                        {PROCESS_STEPS.map((_, pi) => (
                          <motion.div key={pi}
                            animate={{ width: pi === activeProcess ? 28 : 6, background: pi === activeProcess ? "var(--color-emerald)" : "var(--color-border-mid)" }}
                            transition={{ duration: 0.3 }}
                            style={{ height: 6, cursor: "pointer" }}
                            onClick={() => setActiveProcess(pi)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY SOFTRINX ═══════════════════════════════════════════════════════ */}
      <section ref={diffRef} style={{
        paddingTop: "clamp(72px, 10vw, 112px)", paddingBottom: "clamp(72px, 10vw, 112px)",
        background: "var(--color-bg)", borderBottom: "1px solid var(--color-border)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="flex flex-col justify-between gap-8 mb-14 lg:flex-row lg:items-end">
            <div>
              <SectionLabel text="Why Softrinx" />
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)" }}>
                The difference<br />
                <span style={{ color: "var(--color-emerald)" }}>you&apos;ll actually feel.</span>
              </h2>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "24rem" }}>
              Principles that govern how we operate — not marketing copy. Ask any of our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--color-border)" }}>
            {DIFFERENTIATORS.map((d, i) => <DiffCard key={d.title} d={d} index={i} inView={diffInView} />)}
          </div>
        </div>
      </section>

      {/* ══ TECH STRIP ═════════════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)",
        paddingTop: "clamp(56px, 7vw, 80px)", paddingBottom: "clamp(56px, 7vw, 80px)",
        overflow: "hidden", position: "relative",
      }}>
        <div className="px-6 mx-auto mb-10 lg:px-16" style={{ maxWidth: "1360px" }}>
          <SectionLabel text="Tech We Use" />
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--color-text)", lineHeight: 1 }}>
            Best tools for the job.
          </h2>
        </div>

        {/* Scrolling ticker */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 z-10 w-24 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--color-surface), transparent)" }} />
          <div className="absolute top-0 bottom-0 right-0 z-10 w-24 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--color-surface), transparent)" }} />

          <div style={{ display: "flex", animation: "ticker 28s linear infinite", width: "fit-content" }}>
            {[...Array(2)].map((_, pass) => (
              <div key={pass} style={{ display: "flex", gap: "0px" }}>
                {["React", "Next.js", "TypeScript", "Node.js", "Python", "Flutter", "React Native", "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes", "TensorFlow", "FastAPI", "Redis", "GraphQL", "Tailwind", "Figma"].map((tech) => (
                  <div key={`${pass}-${tech}`} style={{
                    padding: "0.65rem 1.4rem",
                    border: "1px solid var(--color-border)",
                    borderRight: "none",
                    whiteSpace: "nowrap",
                    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em",
                    color: "var(--color-text-muted)", textTransform: "uppercase",
                    background: "var(--color-card)",
                    transition: "color 0.2s",
                  }}>{tech}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", position: "relative", overflow: "hidden" }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-1 gap-px lg:grid-cols-2" style={{ background: "var(--color-border)" }}>

            {/* Left — dark side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)", background: "var(--color-bg)", display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center" }}>
              <div>
                <SectionLabel text="Get Started" />
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)", marginBottom: "1rem" }}>
                  Have a feature<br />in mind?
                </h2>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.78, color: "var(--color-text-muted)", maxWidth: "26rem" }}>
                  Tell us what you&apos;re building. We&apos;ll tell you exactly how we'&apos; approach it — no obligation, no fluff.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                {["Free technical scoping session", "Honest timeline & cost estimates", "No lock-in contracts"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div style={{ width: 6, height: 6, background: "var(--color-emerald)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-muted)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — emerald */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
              className="relative overflow-hidden"
              style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)", background: "var(--color-emerald)" }}>
              {/* Diagonal texture */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
                <defs>
                  <pattern id="diag2" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="32" stroke="#000" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diag2)" />
              </svg>
              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(4,8,5,0.6)", textTransform: "uppercase", marginBottom: "0.8rem" }}>
                    ── Ready to ship?
                  </div>
                  <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#040805" }}>
                    Let&apos;s build something<br />remarkable together.
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 font-bold transition-all duration-200 group hover:-translate-y-px"
                    style={{ background: "#040805", color: "var(--color-emerald)", padding: "0.85rem 1.8rem", fontSize: "0.88rem", width: "fit-content" }}>
                    Start a project
                    <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link href="/services"
                    className="inline-flex items-center gap-2 font-semibold transition-all duration-200"
                    style={{ color: "rgba(4,8,5,0.7)", fontSize: "0.82rem", width: "fit-content" }}>
                    View all services <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}