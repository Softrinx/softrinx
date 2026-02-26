/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink, Smartphone, ArrowRight, Globe } from "lucide-react";
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
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animations/andidate.json",
      });
      anim.addEventListener("DOMLoaded", () => { if (!cancelled) setLoaded(true); });
    });
    return () => { cancelled = true; anim?.destroy(); };
  }, []);
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 rounded-full animate-spin"
            style={{ borderColor: "rgba(255,255,255,0.1)", borderTopColor: "var(--color-emerald)" }} />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }} />
    </div>
  );
}

// ─── Projects ─
const PROJECTS = [
  {
    id: "memora",
    number: "01",
    client: "Memora Visuals",
    headline: "Photography & Visual Storytelling",
    pitch: "We built a world-class digital home for a storytelling studio that believes moments matter. Every pixel serves the emotion.",
    description: "A premium photography platform for a Kenya-based studio — covering family milestones, brand stories, and personal achievements. Thoughtful architecture, an integrated editorial blog, and performance that lets the imagery breathe.",
    category: "Web · Branding",
    tags: ["Next.js", "CMS", "Photography", "Branding"],
    result: "Live · Converting · Client proud",
    link: "https://memoravisuals.com",
    playstore: null,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1400&h=1000&fit=crop",
    // desktop grid sizing
    cols: 2, rows: 2,
  },
  {
    id: "agrilens",
    number: "02",
    client: "AgriLens",
    headline: "AI Crop Disease Detection",
    pitch: "A farmer takes a photo of a sick crop. Within seconds, AI trained on Kenyan agriculture gives the diagnosis. We built that.",
    description: "An AI-powered platform trained to detect crop diseases through image analysis — instant diagnosis, treatment recommendations, and an agricultural AI assistant. Built for smallholder farmers across Kenya.",
    category: "AI · Web App",
    tags: ["AI/ML", "Computer Vision", "Python", "React"],
    result: "Protecting yields across Kenya",
    link: "https://agrilens-farmer.vercel.app/",
    playstore: null,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=900&fit=crop",
    cols: 1, rows: 2,
  },
  {
    id: "intellimark",
    number: "03",
    client: "IntelliMark",
    headline: "AI University Assessment Platform",
    pitch: "What if every lecturer had an AI that graded, tracked, and adapted to their students? We made it real.",
    description: "An intelligent EdTech platform automating assessment creation, grading, and performance tracking for universities and colleges.",
    category: "EdTech · AI",
    tags: ["AI", "EdTech", "React", "Node.js"],
    result: "Deployed across university cohorts",
    link: "https://intellimark.pages.dev/",
    playstore: null,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop",
    cols: 1, rows: 1,
  },
  {
    id: "tabootalks",
    number: "04",
    client: "TabooTalks",
    headline: "Authentic Connections Platform",
    pitch: "Dating apps are broken — all swipe, no substance. TabooTalks is what happens when you build for genuine human connection.",
    description: "A Germany-based connections platform built around real conversation. Deep interactions, no masks, no pressure — thoughtful UX that treats authenticity as the core product.",
    category: "Social · Web App",
    tags: ["React", "Node.js", "Real-time", "Germany"],
    result: "Live in Germany · Growing",
    link: "https://www.tabootalks.de/",
    playstore: null,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=700&fit=crop",
    cols: 1, rows: 1,
  },
  {
    id:"Hmex",
    number: "05",
    client: "H-mex health tech",
    headline: "AI NCDs Risk Assessment Tool",
    pitch: "We built an AI-powered risk assessment tool for non-communicable diseases, tailored for the east African population. Early detection, personalised insights, and a healthier future.",
    description: "An AI-driven health tech platform designed to assess the risk of non-communicable diseases (NCDs) prevalent in East Africa. By analysing user data, lifestyle factors, and regional health trends, the tool provides early detection and personalised insights to empower individuals to take proactive steps towards better health.",
    category: "HealthTech · AI",
    tags: ["AI/ML", "HealthTech", "React", "Python"],
    result: "Empowering healthier lives in East Africa",
    link: "https://hmex.vercel.app",
    playstore: null,
    image:"/images/hmex.png",
    cols: 1, rows: 1,
  },
  {
    id: "werent",
    number: "06",
    client: "WerEntOnline",
    headline: "Real Estate Rental & Leasing",
    pitch: "We built the bridge between landlords and tenants — clean listings, smart filters, seamless enquiries.",
    description: "A full-featured rental and leasing platform built with both landlords and tenants in mind. Search, filter, enquire, and lease — all in one streamlined experience.",
    category: "PropTech · Web App",
    tags: ["Next.js", "Maps API", "Full-stack"],
    result: "Platform live · Listings active",
    link: "https://www.werentonline.com/",
    playstore: null,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=700&fit=crop",
    cols: 1, rows: 1,
  },
  {
    id: "farmsense",
    number: "07",
    client: "FarmSense",
    headline: "Smart Farming Without Hardware",
    pitch: "IoT precision agriculture — without the hardware bill. We democratised smart farming through software alone.",
    description: "Maximise yields, optimise irrigation, and monitor crop health — without expensive IoT devices. Democratising precision agriculture through software alone.",
    category: "AgriTech · Web App",
    tags: ["React", "Analytics", "AgriTech"],
    result: "Precision farming for all",
    link: "https://farm-sense-mu.vercel.app/",
    playstore: null,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=700&fit=crop",
    cols: 1, rows: 1,
  },
  {
    id: "djafro",
    number: "08",
    client: "DjAfro StreamBox",
    headline: "Movies Streaming App",
    pitch: "A full streaming app — video player, offline mode, subscriptions — built from scratch and shipped to Google Play.",
    description: "Built end-to-end for BritechMedia: custom video player, offline downloads, subscription management, and a curated African content library. On Android via Google Play.",
    category: "Mobile · Streaming",
    tags: ["React Native", "Android", "Streaming", "Play Store"],
    result: "Live on Google Play Store",
    link: "https://djafromovies.vercel.app/",
    playstore: "https://play.google.com/store/apps/details?id=com.djafro.moviesbox",
    image: "/images/afro.png",
    cols: 3, rows: 1,
  },
];

const FILTERS = ["All", "Web", "AI", "Mobile", "EdTech", "AgriTech", "PropTech", "Social"];

function matchesFilter(p: typeof PROJECTS[0], f: string) {
  if (f === "All") return true;
  return p.category.toLowerCase().includes(f.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(f.toLowerCase()));
}

// ─── Card (works for both desktop masonry + mobile stack) ─────────────────────
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const isWide = project.cols === 2;
  const isTall = project.rows === 2;

  // font sizes scale by card importance
  const clientSize = isWide
    ? "clamp(1.9rem, 3.8vw, 3.8rem)"
    : isTall
    ? "clamp(1.6rem, 3vw, 3rem)"
    : "clamp(1.3rem, 2.2vw, 2.1rem)";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // Desktop: respect grid col/row span via inline (handled by wrapper)
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        // Mobile: fixed comfortable height; desktop: min-height drives rows
        minHeight: "clamp(260px, 38vw, 420px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}>
          <Image src={project.image} alt={project.client} fill
            className="object-cover" style={{ objectPosition: "center top" }} />
        </motion.div>
        {/* Scrim — deepens on hover */}
        <motion.div className="absolute inset-0"
          animate={{
            background: hovered
              ? "linear-gradient(to top,rgba(4,8,5,0.97) 0%,rgba(4,8,5,0.78) 45%,rgba(4,8,5,0.25) 100%)"
              : "linear-gradient(to top,rgba(4,8,5,0.85) 0%,rgba(4,8,5,0.4) 52%,rgba(4,8,5,0.1) 100%)"
          }}
          transition={{ duration: 0.4 }} />
      </div>

      {/* Top meta */}
      <div className="relative z-10 flex items-start justify-between p-4 lg:p-5">
        <motion.span animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.2 }}
          style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)" }}>
          {project.number}
        </motion.span>
        <span style={{
          fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase",
          color: "var(--color-emerald)", background: "rgba(4,8,5,0.85)",
          padding: "0.18rem 0.52rem", border: "1px solid var(--color-emerald-border)", flexShrink: 0,
        }}>
          {project.category}
        </span>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 p-4 lg:p-6">
        {/* Client name — BIG */}
        <div style={{ marginBottom: "0.25rem" }}>
          <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-emerald)", marginBottom: "0.25rem" }}>
            Client
          </div>
          <motion.h2
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            style={{ fontSize: clientSize, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#ffffff", marginBottom: "0.2rem" }}>
            {project.client}
          </motion.h2>
          <div style={{ fontSize: "clamp(0.72rem, 1.1vw, 0.88rem)", fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "-0.01em" }}>
            {project.headline}
          </div>
        </div>

        {/* Pitch — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, y: 14, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 8, height: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)", lineHeight: 1.72, color: "rgba(255,255,255,0.72)", marginTop: "0.75rem", overflow: "hidden", maxWidth: "34rem" }}>
              {project.pitch}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tags row */}
        <motion.div className="flex flex-wrap gap-1.5 mt-3"
          animate={{ opacity: hovered ? 1 : 0.6 }} transition={{ duration: 0.25 }}>
          {project.tags.slice(0, 3).map(t => (
            <span key={t} style={{
              fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.15)", padding: "0.13rem 0.42rem",
            }}>{t}</span>
          ))}
        </motion.div>

        {/* CTA row — appears on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, delay: 0.04 }}
              className="flex flex-wrap items-center gap-2 mt-4">
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="group inline-flex items-center gap-1.5 font-bold transition-all duration-200"
                style={{ background: "var(--color-emerald)", color: "#040805", padding: "0.5rem 1rem", fontSize: "0.7rem" }}>
                <Globe size={11} />
                View Live
                <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              {project.playstore && (
                <a href={project.playstore} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-bold"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "white", padding: "0.5rem 0.85rem", fontSize: "0.7rem" }}>
                  <Smartphone size={11} />
                  Play Store
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result line — on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: 0.06 }}
              style={{ marginTop: "0.85rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
              <div className="flex items-center gap-2">
                <div style={{ width: 5, height: 5, background: "var(--color-emerald)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.66rem", fontWeight: 700, color: "var(--color-emerald)", letterSpacing: "0.04em" }}>
                  {project.result}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom emerald line */}
      <motion.div className="absolute bottom-0 left-0 h-[3px]"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        style={{ background: "var(--color-emerald)", zIndex: 20 }} />
    </motion.article>
  );
}

// ─── Count-up ─────────────────────────────────────────────────────────────────
function useCountUp(target: number, start: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const fn = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1600, 1);
      setV(Math.floor(ease(p) * target));
      if (p < 1) requestAnimationFrame(fn);
      else setV(target);
    };
    requestAnimationFrame(fn);
  }, [start, target]);
  return v;
}

const SELLING = [
  { num: "01", title: "We don't just code — we solve.", body: "Every project starts with understanding the real problem. We ask hard questions before writing a single line. The result is software that actually works for the people using it." },
  { num: "02", title: "Speed without cutting corners.", body: "We've shipped 7 products in under a year. Not because we rushed — because we have systems, clear communication, and engineers who know their craft." },
  { num: "03", title: "Full ownership. Always.", body: "Every repository, every domain, every line of code belongs to you. No lock-ins, no hidden dependencies on us. You can take it anywhere." },
  { num: "04", title: "From Vision. For Everyone.. For the world.", body: "We're CS graduates from DeKUT, Nyeri — building products used in Kenya, Germany, and beyond. World-class engineering doesn't require a zip code." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoverFilter, setHoverFilter] = useState<string | null>(null);

  const statsRef = useRef(null);
  const sellingRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const sellingInView = useInView(sellingRef, { once: true, margin: "-60px" });

  const [statsFired, setStatsFired] = useState(false);
  useEffect(() => { if (statsInView) setStatsFired(true); }, [statsInView]);
  const c1 = useCountUp(7, statsFired);
  const c2 = useCountUp(4, statsFired);
  const c3 = useCountUp(100, statsFired);
  const c4 = useCountUp(5, statsFired);

  const filtered = PROJECTS.filter(p => matchesFilter(p, activeFilter));

  return (
    <main style={{ background: "var(--color-bg)" }}>
      <Navigation />

      {/* ══ HERO — text left, Lottie right ═════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{
        background: "var(--color-bg)",
        paddingBottom: 0,
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{
          top: "-20%", right: "-5%",
          width: "65vw", height: "65vw", maxWidth: "750px", maxHeight: "750px",
          background: `radial-gradient(ellipse at 80% 15%, ${colors.emeraldBg} 0%, transparent 65%)`,
        }} />
        {/* Vertical line decorations — left */}
        <div className="absolute top-0 bottom-0 flex gap-4 pointer-events-none left-8" style={{ opacity: 0.7 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-px" style={{ background: "var(--color-border)" }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.3, delay: i * 0.13 }} />
          ))}
        </div>

        <div className="relative z-10 w-full px-6 mx-auto lg:px-16"
          style={{ maxWidth: "1360px", paddingTop: "clamp(110px, 14vw, 144px)", paddingBottom: "clamp(64px, 8vw, 96px)" }}>

          {/* Grid: text LEFT (55%), Lottie RIGHT (45%) — mirrors about page but reversed */}
          <div className="flex flex-col gap-10 lg:grid lg:items-center"
            style={{ gridTemplateColumns: "55fr 45fr" }}>

            {/* LEFT — text */}
            <motion.div className="flex flex-col"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
              style={{ gap: "clamp(1.2rem, 2vw, 1.8rem)" }}>

              <div className="flex items-center gap-3">
                <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
                  Portfolio
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(3rem, 7.5vw, 7rem)", fontWeight: 900, letterSpacing: "-0.055em", lineHeight: 0.92, color: "var(--color-text)" }}>
                Work that<br />
                <span style={{ color: "var(--color-emerald)" }}>speaks</span><br />
                for itself.
              </h1>

              <p style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", lineHeight: 1.8, color: "var(--color-text-muted)", maxWidth: "30rem" }}>
                Seven products. Real clients. Real deadlines. From AI farming tools in Kenya to a streaming app on Google Play — hover each project to see the story behind it.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-bold transition-all duration-200 group hover:-translate-y-px"
                  style={{ background: "var(--color-emerald)", color: "#040805", padding: "0.8rem 1.6rem", fontSize: "0.88rem", boxShadow: `0 0 28px var(--color-emerald-glow)` }}>
                  Start Your Project
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/about"
                  className="inline-flex items-center gap-2 font-semibold transition-all duration-200"
                  style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-border-mid)", padding: "0.8rem 1.6rem", fontSize: "0.88rem", background: "transparent" }}>
                  About Us <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — Lottie */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
              className="items-center justify-center hidden lg:flex"
              style={{ height: "clamp(320px, 42vw, 560px)" }}>
              <LottieAnimation />
            </motion.div>

            {/* Mobile Lottie — below text */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center lg:hidden"
              style={{ height: "clamp(200px, 55vw, 280px)" }}>
              <LottieAnimation />
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ height: 80, background: "linear-gradient(to top, var(--color-surface), transparent)" }} />
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════════════════ */}
      <div ref={statsRef} style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "1px", background: "var(--color-border)" }}>
            {[
              { v: c1, s: "", label: "Products shipped" },
              { v: c2, s: "", label: "Countries reached" },
              { v: c3, s: "%", label: "Client satisfaction" },
              { v: c4, s: "", label: "Tech domains" },
            ].map((st, i) => (
              <motion.div key={st.label}
                initial={{ opacity: 0, y: 16 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ padding: "2.25rem 1.5rem", background: "var(--color-surface)" }}>
                <div style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, color: "var(--color-text)", marginBottom: "0.35rem" }}>
                  {st.v}<span style={{ color: "var(--color-emerald)" }}>{st.s}</span>
                </div>
                <div style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-faint)" }}>
                  {st.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FILTER BAR ═════════════════════════════════════════════════════════ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "var(--color-nav-bg)",
        borderBottom: "1px solid var(--color-border)",
        backdropFilter: "blur(14px)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="flex items-stretch overflow-x-auto scrollbar-hide"
            style={{ borderLeft: "1px solid var(--color-border)" }}>
            {FILTERS.map((f) => {
              const active = activeFilter === f;
              return (
                <button key={f} onClick={() => setActiveFilter(f)}
                  onMouseEnter={() => setHoverFilter(f)}
                  onMouseLeave={() => setHoverFilter(null)}
                  style={{
                    padding: "1rem 1.2rem",
                    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    whiteSpace: "nowrap", border: "none", borderRight: "1px solid var(--color-border)",
                    cursor: "pointer", position: "relative",
                    background: active ? "var(--color-emerald-bg)" : hoverFilter === f ? "var(--color-card)" : "transparent",
                    color: active ? "var(--color-emerald)" : hoverFilter === f ? "var(--color-text)" : "var(--color-text-faint)",
                    transition: "all 0.2s", flexShrink: 0,
                  }}>
                  {f}
                  {active && (
                    <motion.div layoutId="fline" className="absolute bottom-0 left-0 w-full h-[2px]"
                      style={{ background: "var(--color-emerald)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 40 }} />
                  )}
                </button>
              );
            })}
            <div className="flex items-center px-4 ml-auto shrink-0">
              <span style={{ fontSize: "0.63rem", fontWeight: 700, color: "var(--color-text-faint)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                {filtered.length} / {PROJECTS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ PROJECT GRID ═══════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop: "clamp(28px, 3vw, 40px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        background: "var(--color-bg)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-32 text-center">
                <p style={{ color: "var(--color-text-faint)", fontSize: "0.9rem" }}>No projects in this category yet.</p>
              </motion.div>
            ) : (
              <motion.div key={`grid-${activeFilter}`} layout>
                {/* 
                  DESKTOP: 3-col CSS grid with col/row spans
                  MOBILE: single column stack — all cards full width, comfortable height
                */}
                <div style={{
                  display: "grid",
                  // Mobile: 1 col. Tablet: 2 col. Desktop: 3 col
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "1px",
                  background: "var(--color-border)",
                }}
                  className="portfolio-grid">
                  {filtered.map((p, i) => (
                    // On mobile: all cards are 1-col, standard height via CSS
                    // On desktop: span is applied via a wrapping div trick
                    <div
                      key={p.id}
                      className="portfolio-card-wrapper"
                      style={{ display: "contents" }}>
                      <ProjectCard project={p} index={i} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ WHY HIRE US ════════════════════════════════════════════════════════ */}
      <section style={{
        borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        paddingTop: "clamp(72px, 10vw, 112px)", paddingBottom: "clamp(72px, 10vw, 112px)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="flex flex-col justify-between gap-8 mb-16 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-emerald)", textTransform: "uppercase" }}>Why Softrinx</span>
              </div>
              <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 0.95, color: "var(--color-text)" }}>
                The reason clients<br /><span style={{ color: "var(--color-emerald)" }}>come back.</span>
              </h2>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.78, color: "var(--color-text-muted)", maxWidth: "26rem" }}>
              We're not a body shop. We're a team of five engineers who care about what we ship — and it shows in every product on this page.
            </p>
          </div>

          <div ref={sellingRef} className="grid grid-cols-1 gap-px lg:grid-cols-2"
            style={{ background: "var(--color-border)" }}>
            {SELLING.map((s, i) => (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 20 }}
                animate={sellingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                style={{ padding: "clamp(1.8rem, 3vw, 2.8rem)", background: "var(--color-surface)", position: "relative" }}>
                {i === 0 && <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: "var(--color-emerald)" }} />}
                <div style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 1, color: "var(--color-border-mid)", marginBottom: "1.2rem", userSelect: "none" }}>
                  {s.num}
                </div>
                <h3 style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--color-text)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.78, color: "var(--color-text-muted)" }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH + INDUSTRIES ══════════════════════════════════════════════════ */}
      <section style={{
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        paddingTop: "clamp(72px, 10vw, 112px)", paddingBottom: "clamp(72px, 10vw, 112px)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-1 gap-px lg:grid-cols-2" style={{ background: "var(--color-border)" }}>
            <div style={{ padding: "clamp(2rem, 4vw, 4rem)", background: "var(--color-bg)" }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-emerald)", textTransform: "uppercase" }}>Our Stack</span>
              </div>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--color-text)", marginBottom: "2rem", lineHeight: 1.1 }}>
                The tools behind<br />every delivery.
              </h3>
              <div className="grid grid-cols-2 gap-px" style={{ background: "var(--color-border)" }}>
                {[
                  { domain: "Frontend", items: "React · Next.js · Tailwind" },
                  { domain: "Backend", items: "Node.js · Python · FastAPI" },
                  { domain: "AI / ML", items: "PyTorch · TensorFlow · OpenAI" },
                  { domain: "Mobile", items: "React Native · Android · Play Store" },
                  { domain: "Cloud", items: "Vercel · AWS · GCP · Firebase" },
                  { domain: "Database", items: "PostgreSQL · MongoDB · Supabase" },
                ].map(({ domain, items }) => (
                  <div key={domain} style={{ padding: "1rem 1.2rem", background: "var(--color-bg)" }}>
                    <div style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", color: "var(--color-emerald)", textTransform: "uppercase", marginBottom: "0.3rem" }}>{domain}</div>
                    <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>{items}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "clamp(2rem, 4vw, 4rem)", background: "var(--color-surface)" }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-emerald)", textTransform: "uppercase" }}>Industries</span>
              </div>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--color-text)", marginBottom: "2rem", lineHeight: 1.1 }}>
                Wherever tech<br />creates value.
              </h3>
              <div style={{ border: "1px solid var(--color-border)" }}>
                {[
                  { name: "AgriTech", desc: "AI crop detection · Smart farming · Kenya" },
                  { name: "Media & Entertainment", desc: "Streaming app · Photography platform" },
                  { name: "Education", desc: "University AI assessment & engagement" },
                  { name: "Real Estate", desc: "Rental & leasing marketplace" },
                  { name: "Social & Connections", desc: "Authentic dating platform · Germany" },
                ].map(({ name, desc }, i, arr) => (
                  <div key={name} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                    padding: "1rem 1.25rem",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-text)" }}>{name}</div>
                    <div style={{ fontSize: "0.67rem", color: "var(--color-text-faint)", textAlign: "right", flexShrink: 0, maxWidth: "55%" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
        <div className="absolute top-0 bottom-0 flex gap-4 pointer-events-none right-8">
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-px" style={{ background: "var(--color-border)" }}
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.12 }} />
          ))}
        </div>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-1 gap-px lg:grid-cols-2" style={{ background: "var(--color-border)" }}>
            <motion.div className="relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ padding: "clamp(3.5rem, 7vw, 7rem) clamp(1.5rem, 4vw, 4rem)", background: "var(--color-emerald)" }}>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }}>
                <defs>
                  <pattern id="diagpf3" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="32" stroke="#000" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagpf3)" />
              </svg>
              <div className="relative z-10">
                <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#040805", marginBottom: "1.5rem" }}>
                  Your project<br />belongs here<br />next.
                </h2>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "rgba(4,8,5,0.65)", marginBottom: "2rem", maxWidth: "22rem" }}>
                  Every project on this page started with one conversation. Let's have yours.
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-bold transition-all duration-200 group hover:-translate-y-px"
                  style={{ background: "#040805", color: "var(--color-emerald)", padding: "0.9rem 2rem", fontSize: "0.88rem" }}>
                  Let's Build Together
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
              style={{ padding: "clamp(3.5rem, 7vw, 7rem) clamp(1.5rem, 4vw, 4rem)", background: "var(--color-bg)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.5rem" }}>
              <div>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--color-emerald)", textTransform: "uppercase", marginBottom: "1rem" }}>What to expect</div>
                <div className="flex flex-col gap-4">
                  {[
                    { title: "Response within 24 hours", body: "We don't ghost. You'll hear from us the same business day." },
                    { title: "Free scoping call", body: "30 minutes to understand your project — no commitment, no pitch." },
                    { title: "Clear proposal", body: "Fixed timeline, fixed price, full scope. No hidden fees, ever." },
                  ].map(({ title, body }) => (
                    <div key={title} className="flex gap-3">
                      <div style={{ width: 6, height: 6, background: "var(--color-emerald)", flexShrink: 0, marginTop: "0.4rem" }} />
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.2rem" }}>{title}</div>
                        <div style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "var(--color-text-muted)" }}>{body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
                <Link href="/contact" className="inline-flex items-center gap-2 font-semibold transition-colors group"
                  style={{ color: "var(--color-emerald)", fontSize: "0.85rem" }}>
                  Get in touch <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="mailto:info@softrinx.com" className="inline-flex items-center gap-2 font-semibold"
                  style={{ color: "var(--color-text-faint)", fontSize: "0.82rem" }}>
                  info@softrinx.com <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global grid style — desktop gets masonry spans, mobile gets clean single col */}
      <style>{`
        @media (min-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          /* Memora — wide + tall (spans 2 cols, 2 rows) */
          .portfolio-grid > div:nth-child(1) > article {
            grid-column: span 2;
            grid-row: span 2;
            min-height: clamp(500px, 52vw, 700px) !important;
          }
          /* AgriLens — tall (1 col, 2 rows) */
          .portfolio-grid > div:nth-child(2) > article {
            grid-row: span 2;
            min-height: clamp(500px, 52vw, 700px) !important;
          }
          /* DjAfro — wide (spans 2 cols) */
          .portfolio-grid > div:nth-child(8) > article {
            grid-column: span 3;
            min-height: clamp(300px, 26vw, 380px) !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Make display:contents work for grid spanning */
        @media (min-width: 1024px) {
          .portfolio-grid > div {
            display: contents !important;
          }
        }
        @media (max-width: 1023px) {
          .portfolio-grid > div {
            display: block !important;
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}