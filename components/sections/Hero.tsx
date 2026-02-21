"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight, Star } from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

// ─── Lottie ───────────────────────────────────────────────────────────────────
function LottieAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let anim: any, cancelled = false;
    import("lottie-web").then((lottie) => {
      if (cancelled || !containerRef.current) return;
      anim = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg", loop: true, autoplay: true,
        path: "/animations/hero2.json",
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

// ─── Cycling word ─────────────────────────────────────────────────────────────
const WORDS = ["Build.", "Ship.", "Scale.", "Deliver."];
function CyclingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden"
      style={{ verticalAlign: "bottom", height: "1.05em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          className="block whitespace-nowrap"
          style={{ color: "var(--color-emerald)" }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── Count-up ─────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

function StatCard({ raw, suffix, title, sub, delay }: {
  raw: number; suffix: string; title: string; sub: string; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [fired, setFired] = useState(false);
  useEffect(() => {
    if (inView && !fired) {
      const t = setTimeout(() => setFired(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, fired, delay]);
  const count = useCountUp(raw, 1800, fired);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center stat-card-inner">
      <motion.span
        className="font-black leading-none tabular-nums"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)", color: "var(--color-text)", letterSpacing: "-0.04em" }}
      >
        {count}{suffix}
      </motion.span>
      <motion.span
        className="mt-1 font-semibold text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay / 1000 + 0.15 }}
        style={{ fontSize: "clamp(0.72rem, 1.1vw, 0.88rem)", color: "var(--color-text-muted)" }}
      >
        {title}
      </motion.span>
      <motion.span
        className="mt-0.5 text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay / 1000 + 0.25 }}
        style={{ fontSize: "0.65rem", color: "var(--color-text-faint)", letterSpacing: "0.03em" }}
      >
        {sub}
      </motion.span>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroSection() {
  const { isDark, colors } = useTheme();

  return (
    <>
      <section
        className="relative flex items-center overflow-hidden"
        style={{ background: "var(--color-bg)", minHeight: "100svh", paddingBottom: "80px" }}
      >
        {/* Studio light bloom */}
        <div className="absolute pointer-events-none" style={{
          top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "80vw", height: "80vw", maxWidth: "900px", maxHeight: "900px",
          background: `radial-gradient(ellipse at 50% 0%, ${colors.emeraldBg} 0%, transparent 70%)`,
        }} />
        <div className="absolute hidden pointer-events-none lg:block" style={{
          top: "10%", right: "-10%", width: "50vw", height: "50vw",
          maxWidth: "600px", maxHeight: "600px",
          background: `radial-gradient(ellipse at 80% 30%, ${colors.emeraldBg} 0%, transparent 65%)`,
        }} />

        <div className="relative z-10 w-full px-6 mx-auto lg:px-16"
          style={{ maxWidth: "1360px", paddingTop: "clamp(96px, 12vw, 128px)" }}
        >
          <div className="flex flex-col lg:grid lg:items-center"
            style={{ gridTemplateColumns: "52fr 48fr", gap: "clamp(2rem, 4vw, 4rem)" }}
          >
            {/* LEFT */}
            <motion.div className="flex flex-col"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1], delay: 0.08 }}
              style={{ gap: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              {/* Tag */}
              <motion.div className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <span className="block w-5 h-px" style={{ background: "var(--color-emerald)" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
                  Software & AI — Nairobi
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.32, 0.72, 0, 1] }}
                style={{ fontSize: "clamp(2.8rem, 6.2vw, 5.5rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--color-text)" }}
              >
                We <CyclingWord />
                <br />Software.
              </motion.h1>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.32 }}
                style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)", lineHeight: 1.8, color: "var(--color-text-muted)", maxWidth: "26rem" }}
              >
                Softrinx engineers high-performance web, mobile, and AI solutions
                for businesses that need to move fast and last long.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/contact"
                  className="group inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-200 hover:-translate-y-px active:scale-[0.98]"
                  style={{ background: "var(--color-emerald)", color: "#040805", padding: "0.8rem 1.6rem", fontSize: "clamp(0.82rem, 1.3vw, 0.9rem)", boxShadow: `0 0 28px var(--color-emerald-glow)` }}
                >
                  Get A Quote
                  <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/portfolio"
                  className="inline-flex items-center gap-2 font-semibold transition-all duration-200 rounded-lg group hover:border-opacity-50"
                  style={{ background: "transparent", color: "var(--color-text-muted)", border: `1px solid var(--color-border-mid)`, padding: "0.8rem 1.6rem", fontSize: "clamp(0.82rem, 1.3vw, 0.9rem)" }}
                >
                  View Work
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT — Lottie */}
            <motion.div className="items-center justify-center hidden lg:flex"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.25 }}
              style={{ height: "clamp(400px, 50vw, 640px)", marginTop: "-40px", marginBottom: "-40px" }}
            >
              <LottieAnimation />
            </motion.div>
          </div>

          {/* Mobile Lottie */}
          <motion.div className="flex items-center justify-center mt-8 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ height: "clamp(200px, 55vw, 280px)" }}
          >
            <LottieAnimation />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ height: 100, background: "linear-gradient(to top, var(--color-surface), transparent)" }} />
      </section>

      {/* STATS */}
      <div className="relative z-20 w-full" style={{ marginTop: "-72px" }}>
        {/* Trust badges */}
        <div className="justify-center hidden gap-3 px-6 mb-4 lg:flex">
          {[
            { name: "Google", starColor: "#facc15", badgeColor: colors.emerald },
            { name: "Clutch", starColor: "#facc15", badgeColor: colors.emerald },
          ].map((b) => (
            <div key={b.name} className="flex items-center gap-2.5 px-4 py-2 rounded-full"
              style={{ background: colors.bgSurface, border: `1px solid ${colors.border}` }}
            >
              <Star size={12} style={{ color: b.badgeColor, fill: b.badgeColor }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: colors.textPrimary }}>{b.name}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} style={{ color: "#facc15", fill: "#facc15" }} />)}
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: colors.textFaint }}>5.0/5.0</span>
            </div>
          ))}
        </div>

        {/* Stats — 2×2 mobile, 4-col desktop with 1px dividers between each */}
        <div className="w-full overflow-hidden stats-grid">
          {[
            { raw: 50,  suffix: "+",  title: "Projects Shipped",    sub: "Across all industries",            delay: 0   },
            { raw: 3,   suffix: "yr", title: "In Business",         sub: "Working with passion",             delay: 150 },
            { raw: 100, suffix: "%",  title: "Client Satisfaction", sub: "We don't stop until you're happy", delay: 300 },
            { raw: 15,  suffix: "+",  title: "Industries Served",   sub: "From fintech to healthcare",       delay: 450 },
          ].map((s, i) => (
            <div key={s.title} className="stat-cell">
              <StatCard {...s} />
            </div>
          ))}
        </div>

        <style>{`
          /* Wrapper: border color = divider color, gap = divider thickness */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1px;
            background: var(--color-border);
            border-top: 1px solid var(--color-border);
          }
          /* Each cell fills with surface so only the 1px gaps show as dividers */
          .stat-cell {
            background: var(--color-surface);
          }
          .stat-card-inner {
            padding: 1.1rem 0.6rem;
          }
          /* Desktop: 4 columns in a single row = 3 vertical dividers */
          @media (min-width: 640px) {
            .stats-grid {
              grid-template-columns: repeat(4, 1fr);
            }
            .stat-card-inner {
              padding: 2.25rem 1.25rem;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default HeroSection;