"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Mail, Phone, MapPin, Clock,
  Send, Check, ChevronDown,
} from "lucide-react";
import { useTheme } from "@/contexts/themeContext";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: Mail,  label: "Email",    value: "info@softrinx.com",  href: "mailto:info@softrinx.com",    note: "Reply within 24 hrs" },
  { icon: Phone, label: "Phone",   value: "+254 750 109798",     href: "tel:+254750109798",           note: "Available 24/7" },
  { icon: MapPin,label: "Office",  value: "Nyeri, Kenya",        href: "https://maps.google.com",     note: "Kimathi Street" },
  { icon: Clock, label: "Hours",   value: "Always on",           href: null,                          note: "Global clients welcome" },
];

const SERVICES_LIST = [
  "Web Application", "Mobile App", "Custom Software",
  "Cloud Infrastructure", "AI & Machine Learning", "Cyber Security", "Other",
];

const BUDGETS = [
  "Below $5,000", "$5k – $15k", "$15k – $30k",
  "$30k – $75k", "$75k+", "Not sure yet",
];

const TIMELINES = [
  "ASAP", "1 – 3 months", "3 – 6 months", "6 months+", "Flexible",
];

const FAQS = [
  {
    q: "What happens after I submit?",
    a: "A real person — not a bot — replies within 24 hours to schedule a free 30-minute scoping call. No commitment, no pitch, just listening.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We have active clients in Kenya, Germany, and the UK. We adapt to your timezone for calls and updates.",
  },
  {
    q: "How do you price projects?",
    a: "Fixed-scope, fixed-price. We agree on deliverables, timeline, and cost upfront — no surprises, no scope creep billing.",
  },
  {
    q: "Can I see more work before reaching out?",
    a: "Absolutely — check our Portfolio page. Seven live products across AI, mobile, web, and streaming.",
  },
];

// ─── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 20, x = 0 }: {
  children: React.ReactNode; delay?: number; y?: number; x?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Custom Select ─────────────────────────────────────────────────────────────
function SelectField({
  label, options, value, onChange, required, error,
}: {
  label: string; options: string[]; value: string;
  onChange: (v: string) => void; required?: boolean; error?: string;
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-faint)", display: "block", marginBottom: "0.5rem" }}>
        {label}{required && <span style={{ color: "var(--color-emerald)" }}> *</span>}
      </label>
      <button type="button" onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full transition-colors duration-200"
        style={{
          padding: "0.85rem 1rem",
          background: "var(--color-card)",
          border: `1px solid ${error ? "rgba(239,68,68,0.6)" : open ? "var(--color-emerald)" : "var(--color-border-mid)"}`,
          color: value ? "var(--color-text)" : "var(--color-text-faint)",
          fontSize: "0.88rem",
          fontWeight: value ? 600 : 400,
          textAlign: "left",
          cursor: "pointer",
        }}>
        <span>{value || `Select ${label.toLowerCase()}`}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} style={{ color: "var(--color-text-faint)" }} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute", top: "calc(100% + 2px)", left: 0, right: 0, zIndex: 50,
              background: "var(--color-surface)",
              border: `1px solid var(--color-border-mid)`,
              transformOrigin: "top",
            }}
          >
            {options.map((o) => (
              <button key={o} type="button"
                onClick={() => { onChange(o); setOpen(false); }}
                className="w-full text-left transition-all duration-150"
                style={{
                  padding: "0.75rem 1rem",
                  fontSize: "0.85rem",
                  color: o === value ? "var(--color-emerald)" : "var(--color-text-muted)",
                  fontWeight: o === value ? 700 : 400,
                  background: o === value ? "var(--color-emerald-bg)" : "transparent",
                  borderBottom: "1px solid var(--color-border)",
                  cursor: "pointer",
                }}>
                {o}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p style={{ fontSize: "0.72rem", color: "rgba(239,68,68,0.9)", marginTop: "0.35rem" }}>{error}</p>}
    </div>
  );
}

// ─── Input Field ───────────────────────────────────────────────────────────────
function InputField({
  label, type = "text", placeholder, value, onChange,
  required, error, multiline,
}: {
  label: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; required?: boolean; error?: string; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? "textarea" : "input";
  return (
    <div>
      <label style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-faint)", display: "block", marginBottom: "0.5rem" }}>
        {label}{required && <span style={{ color: "var(--color-emerald)" }}> *</span>}
      </label>
      <Tag
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={multiline ? 5 : undefined}
        style={{
          width: "100%",
          padding: "0.85rem 1rem",
          background: "var(--color-card)",
          border: `1px solid ${error ? "rgba(239,68,68,0.6)" : focused ? "var(--color-emerald)" : "var(--color-border-mid)"}`,
          color: "var(--color-text)",
          fontSize: "0.88rem",
          outline: "none",
          resize: multiline ? "none" : undefined,
          transition: "border-color 0.2s",
          fontFamily: "inherit",
        }}
      />
      {error && <p style={{ fontSize: "0.72rem", color: "rgba(239,68,68,0.9)", marginTop: "0.35rem" }}>{error}</p>}
    </div>
  );
}

// ─── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.07}>
      <div style={{ borderBottom: "1px solid var(--color-border)" }}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full gap-4 py-5 text-left"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: "clamp(0.88rem, 1.3vw, 1rem)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.3 }}>
            {q}
          </span>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ flexShrink: 0, width: "28px", height: "28px", border: "1px solid var(--color-border-mid)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <span style={{ fontSize: "1.1rem", lineHeight: 1, color: open ? "var(--color-emerald)" : "var(--color-text-faint)", fontWeight: 300 }}>+</span>
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              style={{ overflow: "hidden" }}
            >
              <p style={{ fontSize: "0.88rem", lineHeight: 1.78, color: "var(--color-text-muted)", paddingBottom: "1.25rem", maxWidth: "44rem" }}>
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

// ─── Main Contact Page ─────────────────────────────────────────────────────────
export default function ContactPage() {
  const { colors, isDark } = useTheme();

  // Form state
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    service: "", budget: "", timeline: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: string) => (v: string) =>
    setForm((p) => ({ ...p, [field]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.service) e.service = "Select a service";
    if (!form.budget) e.budget = "Select a budget";
    if (!form.timeline) e.timeline = "Select a timeline";
    if (form.message.trim().length < 10) e.message = "Tell us a bit more";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <Navigation />

      {/* ══ HERO — full-width split, no image ══════════════════════════════════ */}
      <section style={{
        paddingTop: "clamp(96px, 14vw, 140px)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Vertical line accents */}
        <div className="absolute top-0 bottom-0 flex gap-6 pointer-events-none left-8" style={{ opacity: 0.5 }}>
          {[0, 1].map(i => (
            <motion.div key={i} className="w-px"
              style={{ background: "var(--color-border)" }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: i * 0.15 }} />
          ))}
        </div>
        <div className="absolute top-0 bottom-0 flex gap-6 pointer-events-none right-8" style={{ opacity: 0.5 }}>
          {[0, 1].map(i => (
            <motion.div key={i} className="w-px"
              style={{ background: "var(--color-border)" }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: i * 0.15 }} />
          ))}
        </div>

        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Left */}
            <div style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)", borderRight: "1px solid var(--color-border)", paddingRight: "clamp(1.5rem, 4vw, 4rem)" }}>
              <motion.div className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}>
                <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
                  Contact Us
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.07, ease: [0.32, 0.72, 0, 1] }}
                style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 900, letterSpacing: "-0.055em", lineHeight: 0.9, color: "var(--color-text)", marginBottom: "2rem" }}
              >
                Let's<br />
                <span style={{ color: "var(--color-emerald)" }}>build</span><br />
                something.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.8, color: "var(--color-text-muted)", maxWidth: "28rem", marginBottom: "3rem" }}
              >
                Tell us what you're building. We'll tell you how fast we can ship it, what it'll cost, and what it'll do for your business.
              </motion.p>

              {/* Contact cards */}
              <div className="grid grid-cols-1 gap-px sm:grid-cols-2"
                style={{ background: "var(--color-border)", border: "1px solid var(--color-border)" }}>
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, note }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.25 + i * 0.07 }}
                    style={{ background: "var(--color-surface)", padding: "1.25rem" }}
                  >
                    <div className="flex items-start gap-3">
                      <div style={{
                        width: "34px", height: "34px", flexShrink: 0,
                        border: "1px solid var(--color-emerald-border)",
                        background: "var(--color-emerald-bg)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={15} style={{ color: "var(--color-emerald)" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-faint)", marginBottom: "0.2rem" }}>
                          {label}
                        </p>
                        {href ? (
                          <a href={href} style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-text)", display: "block" }}>
                            {value}
                          </a>
                        ) : (
                          <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-text)" }}>{value}</p>
                        )}
                        <p style={{ fontSize: "0.68rem", color: "var(--color-text-faint)", marginTop: "0.15rem" }}>{note}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — quick links + map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              style={{ paddingLeft: "clamp(1.5rem, 4vw, 4rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem" }}
            >
              {/* Email directory */}
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-faint)", marginBottom: "1.25rem" }}>
                  Direct Lines
                </p>
                <div style={{ border: "1px solid var(--color-border)" }}>
                  {[
                    { dept: "General",    email: "info@softrinx.com",     desc: "General enquiries" },
                    { dept: "Sales",      email: "sales@softrinx.com",    desc: "Partnerships & new projects" },
                    { dept: "Support",    email: "support@softrinx.com",  desc: "Technical help & issues" },
                    { dept: "Accounts",   email: "accounts@softrinx.com", desc: "Billing & invoices" },
                  ].map(({ dept, email, desc }, i, arr) => (
                    <a key={dept} href={`mailto:${email}`}
                      className="flex items-center justify-between gap-4 transition-colors duration-200 group"
                      style={{
                        padding: "1rem 1.25rem",
                        borderBottom: i < arr.length - 1 ? "1px solid var(--color-border)" : "none",
                        background: "transparent",
                        textDecoration: "none",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-faint)", marginBottom: "0.2rem" }}>{dept}</p>
                        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text)" }}>{email}</p>
                        <p style={{ fontSize: "0.68rem", color: "var(--color-text-faint)" }}>{desc}</p>
                      </div>
                      <ArrowUpRight size={14} style={{ color: "var(--color-emerald)", flexShrink: 0, opacity: 0.6 }}
                        className="transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map embed */}
              <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7245900718594!2d36.960811873682566!3d-0.3927370352995991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18286779bfd0e3b7%3A0xff724c2b23076240!2sBomas!5e0!3m2!1sen!2ske!4v1765030944031!5m2!1sen!2ske"
                  width="100%" height="200"
                  style={{ border: 0, display: "block", filter: isDark ? "invert(1) hue-rotate(180deg) brightness(0.85)" : "none" }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Softrinx Office"
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "var(--color-surface)", padding: "0.75rem 1rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: "1px solid var(--color-border)",
                }}>
                  <div>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-text)" }}>Nyeri, Kenya</p>
                    <p style={{ fontSize: "0.62rem", color: "var(--color-text-faint)" }}>Kimathi Street</p>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold"
                    style={{ fontSize: "0.68rem", color: "var(--color-emerald)", letterSpacing: "0.06em" }}>
                    Directions <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FORM SECTION ══════════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "clamp(64px, 10vw, 100px)",
        paddingBottom: "clamp(64px, 10vw, 100px)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

            {/* Left — form header + selling points */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--color-emerald)", textTransform: "uppercase" }}>
                    Start Here
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.07}>
                <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)", marginBottom: "1.25rem" }}>
                  Tell us about<br />your project.
                </h2>
              </Reveal>

              <Reveal delay={0.13}>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--color-text-muted)", marginBottom: "3rem" }}>
                  Fill out the form and we'll come back with a clear proposal — timeline, cost, and exactly what we'll deliver.
                </p>
              </Reveal>

              {/* What to expect */}
              <Reveal delay={0.18}>
                <div style={{ borderTop: "1px solid var(--color-border)" }}>
                  {[
                    { step: "01", title: "Reply within 24 hours", body: "A real person reads every submission and responds the same business day." },
                    { step: "02", title: "Free scoping call", body: "30 minutes. We map your project, ask the hard questions, and give honest feedback." },
                    { step: "03", title: "Fixed-price proposal", body: "Scope, timeline, cost — all locked in. No surprises, ever." },
                  ].map(({ step, title, body }, i) => (
                    <div key={step} style={{ padding: "1.5rem 0", borderBottom: "1px solid var(--color-border)", display: "flex", gap: "1.25rem" }}>
                      <span style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.08em", color: "var(--color-emerald)", marginTop: "0.3rem", flexShrink: 0 }}>
                        {step}
                      </span>
                      <div>
                        <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.3rem", letterSpacing: "-0.02em" }}>{title}</p>
                        <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "var(--color-text-muted)" }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.1} x={16} y={0}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center"
                    style={{
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg)",
                      padding: "4rem 2rem",
                      minHeight: "520px",
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
                      style={{ width: "64px", height: "64px", background: "var(--color-emerald)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}
                    >
                      <Check size={28} style={{ color: "#040805" }} />
                    </motion.div>
                    <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--color-text)", marginBottom: "0.75rem" }}>
                      Message received.
                    </h3>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: "22rem", marginBottom: "2rem" }}>
                      We'll reply within 24 hours. In the meantime, take a look at our portfolio to see what we've built.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button onClick={() => setSubmitted(false)}
                        style={{ padding: "0.75rem 1.5rem", border: "1px solid var(--color-border-mid)", background: "transparent", color: "var(--color-text-muted)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
                        Send another
                      </button>
                      <Link href="/portfolio"
                        className="inline-flex items-center gap-2 font-bold"
                        style={{ padding: "0.75rem 1.5rem", background: "var(--color-emerald)", color: "#040805", fontSize: "0.82rem" }}>
                        View Portfolio <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit}
                    style={{ border: "1px solid var(--color-border)", background: "var(--color-bg)", padding: "clamp(1.5rem, 3vw, 2.5rem)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <InputField label="Full Name" placeholder="Jane Mwangi" value={form.name} onChange={set("name")} required error={errors.name} />
                      <InputField label="Email" type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")} required error={errors.email} />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <InputField label="Company" placeholder="Acme Ltd (optional)" value={form.company} onChange={set("company")} />
                      <InputField label="Phone" type="tel" placeholder="+254 700 000 000" value={form.phone} onChange={set("phone")} />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SelectField label="Service Needed" options={SERVICES_LIST} value={form.service} onChange={set("service")} required error={errors.service} />
                      <SelectField label="Budget Range" options={BUDGETS} value={form.budget} onChange={set("budget")} required error={errors.budget} />
                    </div>
                    <SelectField label="Timeline" options={TIMELINES} value={form.timeline} onChange={set("timeline")} required error={errors.timeline} />
                    <InputField label="Project Details" placeholder="Tell us about your project, goals, and any constraints…" value={form.message} onChange={set("message")} required error={errors.message} multiline />

                    <button type="submit" disabled={submitting}
                      className="flex items-center justify-center gap-2 font-bold transition-all duration-200 active:scale-[0.98]"
                      style={{
                        padding: "1rem 2rem",
                        background: submitting ? "var(--color-emerald-bg)" : "var(--color-emerald)",
                        color: submitting ? "var(--color-emerald)" : "#040805",
                        border: `1px solid var(--color-emerald)`,
                        fontSize: "0.9rem",
                        letterSpacing: "0.02em",
                        cursor: submitting ? "not-allowed" : "pointer",
                        width: "100%",
                      }}>
                      {submitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            style={{ width: "16px", height: "16px", border: "2px solid var(--color-emerald)", borderTopColor: "transparent", borderRadius: "50%" }}
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                          <ArrowUpRight size={14} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "clamp(64px, 10vw, 100px)",
        paddingBottom: "clamp(64px, 10vw, 100px)",
      }}>
        <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-8 h-px" style={{ background: "var(--color-emerald)" }} />
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: "var(--color-emerald)", textTransform: "uppercase" }}>FAQ</span>
                </div>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--color-text)" }}>
                  Quick<br />answers.
                </h2>
              </Reveal>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)" }}>
              {FAQS.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ borderTop: "1px solid var(--color-border)" }}>
          {/* Emerald left */}
          <div className="relative flex flex-col justify-between overflow-hidden"
            style={{ background: "var(--color-emerald)", padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)", borderRight: "1px solid rgba(255,255,255,0.12)" }}>
            {/* Diagonal hatch */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
              <defs>
                <pattern id="hatch-c" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="28" stroke="#000" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hatch-c)" />
            </svg>
            <div className="relative z-10">
              <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9, color: "#040805", marginBottom: "1.75rem" }}>
                One email.<br />One call.<br />One decision.
              </h2>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(4,8,5,0.6)", marginBottom: "2.5rem", maxWidth: "22rem" }}>
                That's all it takes to start. We make the rest easy.
              </p>
              <a href="mailto:info@softrinx.com"
                className="inline-flex items-center gap-2 font-bold transition-all duration-200 group hover:-translate-y-px"
                style={{ background: "#040805", color: "var(--color-emerald)", padding: "0.9rem 2rem", fontSize: "0.88rem" }}>
                info@softrinx.com
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Dark right */}
          <div className="flex flex-col justify-center"
            style={{ background: "var(--color-surface)", padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)" }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-faint)", marginBottom: "1.5rem" }}>
              Or explore first
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "See our work", href: "/portfolio", desc: "7 live projects across AI, mobile, and web" },
                { label: "Our services", href: "/services", desc: "Full stack — from idea to production" },
                { label: "About the team", href: "/about", desc: "5 engineers, 3 years, built From Vision. For Everyone." },
              ].map(({ label, href, desc }) => (
                <Link key={href} href={href}
                  className="flex items-center justify-between gap-4 transition-all duration-200 group"
                  style={{ padding: "1.1rem 1.25rem", border: "1px solid var(--color-border)", background: "transparent", textDecoration: "none" }}
                >
                  <div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-text)", marginBottom: "0.15rem" }}>{label}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--color-text-faint)" }}>{desc}</p>
                  </div>
                  <ArrowRight size={16} style={{ color: "var(--color-emerald)", flexShrink: 0 }}
                    className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}