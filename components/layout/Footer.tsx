"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const contact = [
  {
    icon: Mail,
    label: "info@softrinx.com",
    href: "mailto:info@softrinx.com",
  },
  {
    icon: Phone,
    label: "+254 750 109798",
    href: "tel:+254750109798",
  },
  {
    icon: MapPin,
    label: "Nyeri, Kenya",
    href: "https://maps.google.com/?q=Nyeri,Kenya",
  },
];

const socials = [
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/_softrinx",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Softrinx",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/softrinx",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/share/1C9Vim8B4P/",
  },
];

// ─── Main footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const { colors } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      style={{
        background: "var(--color-bg)",
        borderTop: `1px solid var(--color-border)`,
      }}
    >
      {/* ─── CTA Banner ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--color-emerald)",
          borderBottom: `1px solid var(--color-border)`,
        }}
      >
        <div
          className="px-6 py-12 mx-auto lg:px-16 md:py-16"
          style={{ maxWidth: "1360px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
          >
            <div>
              <h3
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#040805",
                  marginBottom: "0.5rem",
                  lineHeight: 1.15,
                }}
              >
                Have a project in mind?
              </h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "rgba(4,8,5,0.7)",
                  maxWidth: "500px",
                }}
              >
                Let's build something exceptional together. Our team is ready to
                turn your vision into reality.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold transition-all duration-200 group"
              style={{
                background: "#040805",
                color: "#34d399",
                fontSize: "0.88rem",
                letterSpacing: "0.02em",
                flexShrink: 0,
              }}
            >
              Start Your Project
              <motion.span
                animate={{ x: 0, y: 0 }}
                whileHover={{ x: 4, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ─── Main Footer Grid with Vertical Lines ───────────────────────── */}
      <div
        className="px-6 py-16 mx-auto lg:px-16"
        style={{ maxWidth: "1360px" }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-0">
          {/* Brand column — spans 5 */}
          <motion.div
            className="lg:col-span-5 lg:pr-16"
            style={{
              borderRight: "1px solid var(--color-border)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/images/logo.png"
                alt="Softrinx"
                width={160}
                height={40}
                style={{ height: "auto", width: "160px" }}
              />
            </Link>
            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "var(--color-text-muted)",
                marginBottom: "2rem",
                maxWidth: "360px",
              }}
            >
              Enterprise software development for startups and established businesses. 
              We build scalable systems that drive real results.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: "var(--color-emerald)",
                  borderRadius: "50%",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.03em",
                }}
              >
                All systems operational
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      width: "36px",
                      height: "36px",
                      border: `1px solid var(--color-border)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-emerald)";
                      e.currentTarget.style.background = "var(--color-emerald-bg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon size={15} style={{ color: "var(--color-text-muted)" }} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation links - spans 4 */}
          <motion.div
            className="lg:col-span-4 lg:px-12"
            style={{
              borderRight: "1px solid var(--color-border)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--color-text-faint)",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--color-text-muted)",
                      transition: "color 0.2s",
                      display: "block",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-muted)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info - spans 3 */}
          <motion.div
            className="lg:col-span-3 lg:pl-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--color-text-faint)",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-4">
              {contact.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={i}>
                    <a
                      href={c.href}
                      target={c.icon === MapPin ? "_blank" : undefined}
                      rel={c.icon === MapPin ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-3 group"
                      style={{ transition: "all 0.2s" }}
                    >
                      <Icon
                        size={16}
                        style={{
                          color: "var(--color-emerald)",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--color-text-muted)",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLSpanElement).style.color = "var(--color-text)";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLSpanElement).style.color =
                            "var(--color-text-muted)";
                        }}
                      >
                        {c.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Business hours */}
            <div className="pt-6 mt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-faint)", marginBottom: "0.5rem" }}>
                Business Hours
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                Mon - Fri: 8:00 - 18:00 EAT
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--color-emerald)", marginTop: "0.5rem" }}>
                Emergency support 24/7
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid var(--color-border)`,
        }}
      >
        <div
          className="px-6 py-6 mx-auto lg:px-16"
          style={{ maxWidth: "1360px" }}
        >
          <motion.div
            className="flex flex-col items-center justify-center gap-2 md:flex-row"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--color-text-faint)",
              }}
            >
              © {year} Softrinx. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </footer>
  );
}