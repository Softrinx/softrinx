"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Zap,
  Target,
  Shield,
} from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Target,
    title: "Strategic Planning",
    description:
      "Deep-dive discovery sessions to align technology with your business goals. We map your requirements to scalable solutions.",
  },
  {
    icon: Zap,
    title: "Rapid Delivery",
    description:
      "Agile sprints with weekly demos. Ship production-ready features in 2-week cycles, not months.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant infrastructure. Penetration testing, encrypted data, and 99.9% uptime SLAs standard.",
  },
];

const highlights = [
  "AWS/Azure certified architects",
  "Response within 4 business hours",
  "NDA signed before kickoff",
  "Fixed-price or retainer options",
];

const offices = [
  {
    title: "Headquarters",
    location: "Westlands, Nairobi, Kenya",
    description:
      "Strategy, design, and executive consultations. Where partnerships begin.",
  },
  {
    title: "Development Hub",
    location: "Nairobi, Kenya",
    description:
      "Engineering, QA, and DevOps teams. 50+ developers building at scale.",
  },
];

// ─── Form component ───────────────────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Integrate with your backend/email service
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-text-label)",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onFocus={() => setFocused("firstName")}
            onBlur={() => setFocused(null)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              fontSize: "0.92rem",
              color: "var(--color-text)",
              background: "var(--color-card)",
              border: `1px solid ${
                focused === "firstName"
                  ? "var(--color-emerald)"
                  : "var(--color-border)"
              }`,
              outline: "none",
              transition: "all 0.2s",
            }}
            placeholder="John"
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-text-label)",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            Last Name *
          </label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onFocus={() => setFocused("lastName")}
            onBlur={() => setFocused(null)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              fontSize: "0.92rem",
              color: "var(--color-text)",
              background: "var(--color-card)",
              border: `1px solid ${
                focused === "lastName"
                  ? "var(--color-emerald)"
                  : "var(--color-border)"
              }`,
              outline: "none",
              transition: "all 0.2s",
            }}
            placeholder="Mwangi"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "var(--color-text-label)",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          Company *
        </label>
        <input
          type="text"
          required
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          onFocus={() => setFocused("company")}
          onBlur={() => setFocused(null)}
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            fontSize: "0.92rem",
            color: "var(--color-text)",
            background: "var(--color-card)",
            border: `1px solid ${
              focused === "company"
                ? "var(--color-emerald)"
                : "var(--color-border)"
            }`,
            outline: "none",
            transition: "all 0.2s",
          }}
          placeholder="Your Company Ltd"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-text-label)",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              fontSize: "0.92rem",
              color: "var(--color-text)",
              background: "var(--color-card)",
              border: `1px solid ${
                focused === "email"
                  ? "var(--color-emerald)"
                  : "var(--color-border)"
              }`,
              outline: "none",
              transition: "all 0.2s",
            }}
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-text-label)",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              fontSize: "0.92rem",
              color: "var(--color-text)",
              background: "var(--color-card)",
              border: `1px solid ${
                focused === "phone"
                  ? "var(--color-emerald)"
                  : "var(--color-border)"
              }`,
              outline: "none",
              transition: "all 0.2s",
            }}
            placeholder="+254 700 000000"
          />
        </div>
      </div>

      {/* Project type + Budget */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-text-label)",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            Project Type
          </label>
          <select
            value={formData.projectType}
            onChange={(e) => handleChange("projectType", e.target.value)}
            onFocus={() => setFocused("projectType")}
            onBlur={() => setFocused(null)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              fontSize: "0.92rem",
              color: formData.projectType
                ? "var(--color-text)"
                : "var(--color-text-muted)",
              background: "var(--color-card)",
              border: `1px solid ${
                focused === "projectType"
                  ? "var(--color-emerald)"
                  : "var(--color-border)"
              }`,
              outline: "none",
              transition: "all 0.2s",
            }}
          >
            <option value="">Select type</option>
            <option value="web">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="cloud">Cloud Infrastructure</option>
            <option value="ai">AI Integration</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "var(--color-text-label)",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            Budget Range
          </label>
          <select
            value={formData.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            onFocus={() => setFocused("budget")}
            onBlur={() => setFocused(null)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              fontSize: "0.92rem",
              color: formData.budget
                ? "var(--color-text)"
                : "var(--color-text-muted)",
              background: "var(--color-card)",
              border: `1px solid ${
                focused === "budget"
                  ? "var(--color-emerald)"
                  : "var(--color-border)"
              }`,
              outline: "none",
              transition: "all 0.2s",
            }}
          >
            <option value="">Select range</option>
            <option value="10-25k">$10k - $25k</option>
            <option value="25-50k">$25k - $50k</option>
            <option value="50-100k">$50k - $100k</option>
            <option value="100k+">$100k+</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "var(--color-text-label)",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          Project Details *
        </label>
        <textarea
          required
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          rows={5}
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            fontSize: "0.92rem",
            color: "var(--color-text)",
            background: "var(--color-card)",
            border: `1px solid ${
              focused === "message"
                ? "var(--color-emerald)"
                : "var(--color-border)"
            }`,
            outline: "none",
            transition: "all 0.2s",
            resize: "vertical",
          }}
          placeholder="Tell us about your project: timeline, requirements, technical constraints..."
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold transition-all duration-200 group"
        style={{
          background: "var(--color-emerald)",
          color: "#040805",
          fontSize: "0.9rem",
          letterSpacing: "0.02em",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Message
        <motion.span
          animate={{ x: 0, y: 0 }}
          whileHover={{ x: 4, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={18} />
        </motion.span>
      </button>
    </form>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Contact() {
  const { colors } = useTheme();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <section
      style={{
        background: "var(--color-bg)",
        paddingTop: "clamp(64px,10vw,100px)",
        paddingBottom: "clamp(64px,10vw,100px)",
      }}
    >
      <div className="px-6 mx-auto lg:px-16" style={{ maxWidth: "1360px" }}>
        {/* ─── Services Grid ─────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -12 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <span
              className="block w-8 h-px"
              style={{ background: "var(--color-emerald)" }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--color-emerald)",
                textTransform: "uppercase",
              }}
            >
              How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.07,
              ease: [0.32, 0.72, 0, 1],
            }}
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "var(--color-text)",
              marginBottom: "clamp(3rem, 5vw, 4rem)",
            }}
          >
            Built For Scale.
            <br />
            <span style={{ color: "var(--color-emerald)" }}>
              Delivered On Time.
            </span>
          </motion.h2>

          {/* Services row — 3 columns */}
          <div className="grid grid-cols-1 gap-px md:grid-cols-3" style={{ background: "var(--color-border)" }}>
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{
                    background: "var(--color-surface)",
                    padding: "2rem 1.5rem",
                    border: `1px solid var(--color-border)`,
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      border: `1px solid var(--color-emerald-border)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Icon size={24} style={{ color: "var(--color-emerald)" }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "var(--color-text)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {s.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Split CTA Panel ───────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 gap-px mb-20 lg:grid-cols-2"
          style={{ background: "var(--color-border)" }}
        >
          {/* Left: Why choose us */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{
              background: "var(--color-emerald)",
              padding: "clamp(2.5rem, 5vw, 4rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Diagonal texture lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  #040805,
                  #040805 1px,
                  transparent 1px,
                  transparent 12px
                )`,
              }}
            />

            <div className="relative z-10">
              <h3
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#040805",
                  marginBottom: "1.5rem",
                  lineHeight: 1.1,
                }}
              >
                Enterprise-Grade
                <br />
                Development Partner
              </h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                  color: "rgba(4,8,5,0.75)",
                  marginBottom: "2rem",
                }}
              >
                From MVP to IPO-ready infrastructure, we've shipped production
                systems serving millions of users. Our process eliminates risk
                at every stage.
              </p>

              {/* Highlights */}
              <div className="mb-8 space-y-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      size={18}
                      style={{ color: "#040805", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "#040805",
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>

              {/* Call now button */}
              <a
                href="tel:+254750109798"
                className="inline-flex items-center gap-3 px-6 py-3 font-bold transition-all duration-200 group"
                style={{
                  background: "#040805",
                  color: "#34d399",
                  fontSize: "0.88rem",
                  letterSpacing: "0.02em",
                  border: "none",
                }}
              >
                <Phone size={18} />
                +254 750 109798
              </a>
            </div>
          </motion.div>

          {/* Right: Offices */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{
              background: "var(--color-surface)",
              padding: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                marginBottom: "2rem",
              }}
            >
              Visit Our Offices
            </h3>

            <div className="mb-8 space-y-6">
              {offices.map((o, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin
                      size={18}
                      style={{ color: "var(--color-emerald)" }}
                    />
                    <h4
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "var(--color-text)",
                      }}
                    >
                      {o.title}
                    </h4>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-emerald)",
                      marginBottom: "0.4rem",
                      fontWeight: 600,
                    }}
                  >
                    {o.location}
                  </p>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {o.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Email + Hours */}
            <div
              className="pt-6"
              style={{ borderTop: `1px solid var(--color-border)` }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Mail size={18} style={{ color: "var(--color-emerald)" }} />
                <div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    info@softrinx.com
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Response within 4 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} style={{ color: "var(--color-emerald)" }} />
                <div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Mon - Fri: 8:00 - 18:00 EAT
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Emergency support 24/7
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Form Section ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-10 text-center">
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                marginBottom: "1rem",
              }}
            >
              Start Your Project Today
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "var(--color-text-muted)",
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Fill out the form below and our team will respond with a detailed
              proposal within 24 hours.
            </p>
          </div>

          <div
            style={{
              background: "var(--color-surface)",
              border: `1px solid var(--color-border)`,
              padding: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}