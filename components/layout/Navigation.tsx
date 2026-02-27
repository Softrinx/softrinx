"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, X, Phone, Facebook, Twitter, Instagram,
  Linkedin, Github, Search, Sun, Moon,
} from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

const NAV_ITEMS = [
  { name: "Home",      path: "/" },
  { name: "About",     path: "/about" },
  { name: "Services",  path: "/services" },
  { name: "Features",  path: "/features" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact",   path: "/contact" },
];

const SOCIALS = [
  { icon: <Facebook  size={16} />, link: "https://facebook.com"  },
  { icon: <Twitter   size={16} />, link: "https://twitter.com"   },
  { icon: <Instagram size={16} />, link: "https://instagram.com" },
  { icon: <Linkedin  size={16} />, link: "https://linkedin.com"  },
  { icon: <Github    size={16} />, link: "https://github.com"    },
];

const Navigation = () => {
  const [isOpen,      setIsOpen]      = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname  = usePathname();
  const { isDark, toggle, colors } = useTheme();

  const em       = colors.emerald;
  const textNav  = isDark ? "rgba(255,255,255,0.65)" : colors.textMuted;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
  }, [searchOpen]);

  const closeSearch = () => { setSearchOpen(false); setSearchQuery(""); };
  const isActive    = (p: string) => p === "/" ? pathname === "/" : pathname.startsWith(p);

  return (
    <>
      {/* ── Desktop + Mobile Nav bar ───────────────────────────────────────── */}
      <nav
        className="fixed z-50 w-full transition-all duration-500"
        style={{
          background:    scrolled ? colors.navBg        : "transparent",
          backdropFilter:scrolled ? "blur(18px)"        : "none",
          boxShadow:     scrolled ? `0 1px 0 0 ${colors.navBorder}` : "none",
        }}
      >
        {/* Top emerald accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: `linear-gradient(90deg,transparent,${em}90,transparent)`, opacity: 0.7 }} />

        <div className="px-5 mx-auto" style={{ maxWidth: "1360px" }}>
          <div className="flex items-center justify-between" style={{ height: "68px", gap: "1rem" }}>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" style={{ lineHeight: 0 }}>
              <Image
                src="/images/images/logo.png"
                alt="Softrinx"
                width={130} height={36}
                className="w-auto"
                style={{ height: "clamp(28px, 4vw, 36px)" }}
              />
            </Link>

            {/* ── Desktop nav links (hidden when search open) ── */}
            <div
              className="items-stretch justify-center flex-1 hidden lg:flex"
              style={{
                transition: "opacity 0.2s, transform 0.2s",
                opacity: searchOpen ? 0 : 1,
                pointerEvents: searchOpen ? "none" : "auto",
                transform: searchOpen ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="relative flex items-center px-5 text-[12.5px] tracking-[0.1em] uppercase font-semibold transition-colors duration-200 group"
                    style={{ color: active ? em : textNav }}
                  >
                    {/* Active state: left vertical emerald bar + bottom bar */}
                    {active && (
                      <span style={{
                        position: "absolute",
                        left: 0,
                        top: "20%",
                        bottom: "20%",
                        width: "2px",
                        background: em,
                        display: "block",
                      }} />
                    )}

                    <span>{item.name}</span>

                    {/* Hover underline (inactive only) */}
                    {!active && (
                      <span
                        className="absolute bottom-0 left-5 h-[1.5px] transition-all duration-300 w-0 group-hover:w-[calc(100%-40px)]"
                        style={{ background: `${em}55` }}
                      />
                    )}

                    {/* Active bottom bar */}
                    {active && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ background: em }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Right side controls ── */}
            <div className="flex items-center flex-shrink-0 gap-2">

              {/* ── Search — expands LEFT over nav, never touches phone/CTA ── */}
              <div className="relative items-center hidden lg:flex">
                {/* Expanded input — absolute positioned left of button */}
                <div
                  style={{
                    position: "absolute",
                    right: "calc(100% + 8px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: searchOpen ? "220px" : "0px",
                    overflow: "hidden",
                    transition: "width 0.3s cubic-bezier(0.32,0.72,0,1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: colors.bgCard,
                      border: `1px solid ${colors.borderMid}`,
                      borderRadius: "6px",
                      padding: "0 10px",
                      width: "220px",
                      opacity: searchOpen ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <Search size={13} style={{ color: colors.textFaint, flexShrink: 0 }} />
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                      placeholder="Search…"
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: "0.82rem",
                        color: colors.textPrimary,
                        padding: "8px 6px",
                        fontFamily: "inherit",
                      }}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")}
                        style={{ color: colors.textFaint, background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Search toggle button */}
                <button
                  onClick={() => searchOpen ? closeSearch() : setSearchOpen(true)}
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: "34px", height: "34px",
                    background: searchOpen ? colors.emeraldBg : "transparent",
                    border: `1px solid ${searchOpen ? colors.emeraldBorder : "transparent"}`,
                    borderRadius: "6px",
                    color: searchOpen ? em : textNav,
                    cursor: "pointer",
                  }}
                  aria-label="Search"
                >
                  {searchOpen ? <X size={15} /> : <Search size={15} />}
                </button>
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggle}
                className="flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95"
                style={{
                  width: "34px", height: "34px",
                  background: colors.emeraldBg,
                  border: `1px solid ${colors.emeraldBorder}`,
                  borderRadius: "50%",
                  color: em,
                  position: "relative",
                  overflow: "hidden",
                }}
                aria-label="Toggle theme"
              >
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isDark ? 1 : 0, transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)" }}>
                  <Sun size={14} />
                </span>
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isDark ? 0 : 1, transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0deg) scale(1)" }}>
                  <Moon size={14} />
                </span>
              </button>

              {/* Divider */}
              <div className="flex-shrink-0 hidden w-px h-5 lg:block" style={{ background: colors.border }} />

              {/* Phone — desktop only, never wraps */}
              <div className="items-center flex-shrink-0 hidden gap-2 lg:flex">
                <Phone size={14} style={{ color: em, flexShrink: 0 }} />
                <div style={{ lineHeight: 1.2 }}>
                  <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.textLabel, marginBottom: "1px" }}>
                    Support
                  </p>
                  <a href="tel:+254750109798"
                    style={{ fontSize: "12px", fontWeight: 700, color: colors.textPrimary, whiteSpace: "nowrap" }}>
                    +254 750 109798
                  </a>
                </div>
              </div>

              {/* CTA — desktop */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center flex-shrink-0 transition-all duration-200 hover:-translate-y-px active:scale-[0.98]"
                style={{
                  background: em,
                  color: "#040805",
                  padding: "0.55rem 1.1rem",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                  boxShadow: `0 0 18px ${colors.emeraldGlow}`,
                }}
              >
                Get A Quote
              </Link>

              {/* Hamburger — mobile */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center transition-colors lg:hidden w-9 h-9"
                style={{ color: isDark || !scrolled ? "#fff" : colors.textPrimary }}
                aria-label="Menu"
              >
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                  <Menu size={22} />
                </span>
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}>
                  <X size={22} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-40"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none", transition: "opacity 0.3s" }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel — slides from right, top-left and bottom-left rounded */}
        <div
          className="absolute right-0 flex flex-col"
          style={{
            width: "min(300px, 85vw)",
            background: colors.bgSurface,
            borderLeft: `1px solid ${colors.border}`,
            top: "68px", bottom: 0,
            borderRadius: "16px 0 0 0",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
            overflow: "hidden",
          }}
        >

          {/* Search row + X close */}
          <div className="flex items-center flex-shrink-0 gap-2 px-4 pt-5 pb-3" style={{ marginTop: "8px" }}>
            <div className="flex items-center gap-2 flex-1 px-3 py-2.5"
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: "6px" }}>
              <Search size={13} style={{ color: colors.textFaint, flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search…"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontSize: "0.82rem", color: colors.textPrimary, fontFamily: "inherit",
                }}
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: colors.textMuted, background: "none", border: "none",
                cursor: "pointer", display: "flex", padding: "6px", flexShrink: 0,
              }}>
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-4 py-5 overflow-y-auto">
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: colors.textFaint, paddingLeft: "6px", marginBottom: "8px" }}>
              Navigation
            </p>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-3 mb-0.5 text-[14px] font-semibold transition-all duration-200 group"
                  style={{
                    color: active ? em : colors.textMuted,
                    background: active ? colors.emeraldBg : "transparent",
                    borderRadius: "6px",
                    border: `1px solid ${active ? colors.emeraldBorder : "transparent"}`,
                    letterSpacing: "0.02em",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{
                      width: "5px", height: "5px",
                      background: active ? em : colors.borderMid,
                      display: "block", flexShrink: 0,
                      transition: "background 0.2s",
                    }} />
                    {item.name}
                  </div>
                  {active && (
                    <span style={{ fontSize: "0.75rem", color: em, opacity: 0.6 }}>→</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Drawer footer */}
          <div className="flex-shrink-0 px-5 py-5 space-y-4" style={{ borderTop: `1px solid ${colors.border}` }}>
            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center flex-shrink-0"
                style={{ width: "34px", height: "34px", background: colors.emeraldBg, border: `1px solid ${colors.emeraldBorder}`, borderRadius: "6px" }}>
                <Phone size={14} style={{ color: em }} />
              </div>
              <div>
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: colors.textFaint }}>
                  Client Support
                </p>
                <a href="tel:+254750109798" style={{ fontSize: "13px", fontWeight: 700, color: colors.textPrimary }}>
                  +254 750 109798
                </a>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full font-bold transition-all duration-200"
              style={{
                background: em, color: "#040805",
                padding: "0.75rem",
                fontSize: "13px",
                letterSpacing: "0.04em",
              }}
            >
              Get A Quote
            </Link>

            {/* Socials */}
            <div className="flex items-center gap-1">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: "32px", height: "32px",
                    color: colors.textFaint,
                    borderRadius: "4px",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = em}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = colors.textFaint}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p style={{ fontSize: "10px", textAlign: "center", color: colors.textFaint }}>
              info@softrinx.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;