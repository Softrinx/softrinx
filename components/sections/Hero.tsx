/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
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

// ─── Animated grid background — subtle, professional ─────────────────────────
function GridBackground({ emeraldBg }: { emeraldBg: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, ${emeraldBg.replace(")", ", 0.6)").replace("rgba(", "rgba(")} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        opacity: 0.4,
      }} />

      {/* Animated corner accent lines — top-left */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "absolute", top: "18%", left: 0,
          width: "22vw", maxWidth: "280px", height: "1px",
          background: `linear-gradient(to right, transparent, ${emeraldBg.replace("0.06", "0.4")})`,
          transformOrigin: "left",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "absolute", top: "18%", left: 0,
          width: "1px", height: "14vh",
          background: `linear-gradient(to bottom, ${emeraldBg.replace("0.06", "0.4")}, transparent)`,
          transformOrigin: "top",
        }}
      />

      {/* Animated corner accent lines — bottom-right */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "absolute", bottom: "22%", right: 0,
          width: "18vw", maxWidth: "220px", height: "1px",
          background: `linear-gradient(to left, transparent, ${emeraldBg.replace("0.06", "0.3")})`,
          transformOrigin: "right",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "absolute", bottom: "22%", right: 0,
          width: "1px", height: "10vh",
          background: `linear-gradient(to top, ${emeraldBg.replace("0.06", "0.3")}, transparent)`,
          transformOrigin: "bottom",
        }}
      />
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
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center stat-card-inner"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 + 0.1 }}
    >
      <span
        className="font-black leading-none tabular-nums"
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)", color: "var(--color-text)", letterSpacing: "-0.04em" }}
      >
        {count}{suffix}
      </span>
      <span
        className="mt-1 font-semibold text-center"
        style={{ fontSize: "clamp(0.72rem, 1.1vw, 0.88rem)", color: "var(--color-text-muted)" }}
      >
        {title}
      </span>
      <span
        className="mt-0.5 text-center"
        style={{ fontSize: "0.65rem", color: "var(--color-text-faint)", letterSpacing: "0.03em" }}
      >
        {sub}
      </span>
    </motion.div>
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
        {/* Animated grid + corner accents */}
        <GridBackground emeraldBg={colors.emeraldBg} />

        {/* Studio light bloom — larger on big screens */}
        <div className="absolute pointer-events-none" style={{
          top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "90vw", height: "90vw", maxWidth: "1100px", maxHeight: "1100px",
          background: `radial-gradient(ellipse at 50% 0%, ${colors.emeraldBg} 0%, transparent 65%)`,
        }} />
        <div className="absolute hidden pointer-events-none lg:block" style={{
          top: "10%", right: "-5%", width: "50vw", height: "50vw",
          maxWidth: "700px", maxHeight: "700px",
          background: `radial-gradient(ellipse at 80% 30%, ${colors.emeraldBg} 0%, transparent 65%)`,
        }} />

        <div className="relative z-10 w-full px-6 mx-auto lg:px-16 xl:px-24"
          style={{ maxWidth: "1600px", paddingTop: "clamp(96px, 12vw, 128px)" }}
        >
          <div className="flex flex-col lg:grid lg:items-center"
            style={{ gridTemplateColumns: "52fr 48fr", gap: "clamp(2rem, 5vw, 6rem)" }}
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
                  Software Development
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.32, 0.72, 0, 1] }}
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--color-text)" }}
              >
                We <CyclingWord />
                <br />Software.
              </motion.h1>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.32 }}
                style={{ fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)", lineHeight: 1.8, color: "var(--color-text-muted)", maxWidth: "30rem" }}
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
                  className="group inline-flex items-center gap-2 font-bold transition-all duration-200 hover:-translate-y-px active:scale-[0.98]"
                  style={{ background: "var(--color-emerald)", color: "#040805", padding: "0.85rem 1.8rem", fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)", boxShadow: `0 0 28px var(--color-emerald-glow)` }}
                >
                  Get A Quote
                  <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/portfolio"
                  className="inline-flex items-center gap-2 font-semibold transition-all duration-200 group"
                  style={{ background: "transparent", color: "var(--color-text-muted)", border: `1px solid var(--color-border-mid)`, padding: "0.85rem 1.8rem", fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)" }}
                >
                  View Work
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Trust badges — inline on large screens */}
              <motion.div
                className="hidden xl:flex items-center gap-4 mt-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  { name: "Google", },
                  { name: "Clutch", },
                ].map((b) => (
                  <div key={b.name} className="flex items-center gap-2 px-3 py-1.5"
                    style={{ background: colors.bgSurface, border: `1px solid ${colors.border}` }}
                  >
                    <Star size={10} style={{ color: colors.emerald, fill: colors.emerald }} />
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: colors.textPrimary }}>{b.name}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={9} style={{ color: "#facc15", fill: "#facc15" }} />)}
                    </div>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: colors.textFaint }}>5.0</span>
                  </div>
                ))}
                <span style={{ fontSize: "0.7rem", color: "var(--color-text-faint)", letterSpacing: "0.05em" }}>
                  Rated top agency
                </span>
              </motion.div>
            </motion.div>

            {/* RIGHT — Lottie */}
            <motion.div className="items-center justify-center hidden lg:flex"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.25 }}
              style={{ height: "clamp(400px, 48vw, 680px)", marginTop: "-40px", marginBottom: "-40px" }}
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
        {/* Trust badges — shown here on non-xl screens */}
        <div className="justify-center hidden gap-3 px-6 mb-4 lg:flex xl:hidden">
          {[
            { name: "Google" },
            { name: "Clutch" },
          ].map((b) => (
            <div key={b.name} className="flex items-center gap-2.5 px-4 py-2"
              style={{ background: colors.bgSurface, border: `1px solid ${colors.border}` }}
            >
              <Star size={12} style={{ color: colors.emerald, fill: colors.emerald }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: colors.textPrimary }}>{b.name}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} style={{ color: "#facc15", fill: "#facc15" }} />)}
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: colors.textFaint }}>5.0/5.0</span>
            </div>
          ))}
        </div>

        {/* Stats grid */}
        <div className="w-full overflow-hidden stats-grid">
          {[
            { raw: 50,  suffix: "+",  title: "Projects Shipped",    sub: "Across all industries",            delay: 0   },
            { raw: 3,   suffix: "yr", title: "In Business",         sub: "Working with passion",             delay: 150 },
            { raw: 100, suffix: "%",  title: "Client Satisfaction", sub: "We don't stop until you're happy", delay: 300 },
            { raw: 15,  suffix: "+",  title: "Industries Served",   sub: "From fintech to healthcare",       delay: 450 },
          ].map((s) => (
            <div key={s.title} className="stat-cell">
              <StatCard {...s} />
            </div>
          ))}
        </div>

        <style>{`
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1px;
            background: var(--color-border);
            border-top: 1px solid var(--color-border);
          }
          .stat-cell {
            background: var(--color-surface);
          }
          .stat-card-inner {
            padding: 1.1rem 0.6rem;
          }
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