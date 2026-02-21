"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Facebook, Twitter, Instagram, Linkedin, Github, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/themeContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { isDark, toggle, colors } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
  }, [searchOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => {
    setSearchOpen((p) => !p);
    if (searchOpen) setSearchQuery("");
  };

  const navItems = [
    { name: "Home",      path: "/" },
    { name: "About",     path: "/about" },
    { name: "Services",  path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact",   path: "/contact" },
  ];

  const socialIcons = [
    { icon: <Facebook size={18} />, link: "https://facebook.com" },
    { icon: <Twitter size={18} />, link: "https://twitter.com" },
    { icon: <Instagram size={18} />, link: "https://instagram.com" },
    { icon: <Linkedin size={18} />, link: "https://linkedin.com" },
    { icon: <Github size={18} />, link: "https://github.com" },
  ];

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const em = colors.emerald;
  const textNav = isDark
    ? "rgba(255,255,255,0.72)"
    : colors.textMuted;

  return (
    <>
      <nav
        className="fixed z-50 w-full transition-all duration-500"
        style={{
          background: scrolled ? colors.navBg : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? `0 1px 0 0 ${colors.navBorder}` : "none",
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${em}90, transparent)`, opacity: 0.7 }} />

        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-stretch justify-between" style={{ height: "72px" }}>

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 mr-10">
              <Image
                src="/images/images/logo3.png"
                alt="Softrinx Logo"
                width={150} height={40}
                className="w-auto transition-all duration-300 h-9"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="items-stretch hidden lg:flex">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="relative flex items-center gap-1.5 px-5 text-[13px] tracking-[0.08em] uppercase font-semibold transition-colors duration-200 group border-b-2"
                    style={{
                      color: active ? em : textNav,
                      borderBottomColor: active ? em : "transparent",
                    }}
                  >
                    {active && (
                      <span style={{ color: em, fontWeight: 300, fontSize: "1rem", lineHeight: 1 }}>/</span>
                    )}
                    <span>{item.name}</span>
                    {!active && (
                      <span className="absolute bottom-0 left-5 h-[2px] rounded-full transition-all duration-300 w-0 group-hover:w-[calc(100%-40px)]"
                        style={{ background: `${textNav}50` }} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 ml-auto">

              {/* Expanding search */}
              <div className="items-center hidden lg:flex">
                <div className="flex items-center overflow-hidden transition-all duration-300 border rounded-lg"
                  style={{
                    width: searchOpen ? "192px" : "32px",
                    borderColor: searchOpen ? colors.borderMid : "transparent",
                    background: searchOpen ? colors.bgCard : "transparent",
                    paddingLeft: searchOpen ? "12px" : 0,
                  }}
                >
                  {searchOpen && (
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Escape" && toggleSearch()}
                      placeholder="Search…"
                      className="flex-1 min-w-0 py-2 text-sm bg-transparent outline-none"
                      style={{ color: colors.textPrimary }}
                    />
                  )}
                  <button onClick={toggleSearch}
                    className="flex-shrink-0 p-2 transition-colors duration-200"
                    style={{ color: searchOpen ? em : textNav }}
                    aria-label="Search"
                  >
                    {searchOpen ? <X size={15} /> : <Search size={16} />}
                  </button>
                </div>
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggle}
                className="flex items-center justify-center transition-all duration-300 rounded-full hover:scale-110 active:scale-95"
                style={{
                  width: "36px", height: "36px",
                  background: colors.emeraldBg,
                  border: `1px solid ${colors.emeraldBorder}`,
                  color: em,
                  flexShrink: 0,
                }}
                aria-label="Toggle theme"
              >
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isDark ? 1 : 0, transform: isDark ? "rotate(0deg)" : "rotate(90deg)" }}>
                  <Sun size={15} />
                </span>
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isDark ? 0 : 1, transform: isDark ? "-rotate-90" : "rotate(0deg)" }}>
                  <Moon size={15} />
                </span>
              </button>

              {/* Divider */}
              <div className="hidden w-px h-6 lg:block" style={{ background: colors.border }} />

              {/* Phone */}
              <div className="items-center hidden gap-3 lg:flex">
                <Phone className="flex-shrink-0 w-4 h-4" style={{ color: em }} />
                <div>
                  <p className="text-[10px] font-medium tracking-widest uppercase leading-none mb-0.5"
                    style={{ color: colors.textLabel }}>Support</p>
                  <a href="tel:+254750109798"
                    className="text-[13px] font-semibold leading-none transition-colors duration-200"
                    style={{ color: colors.textPrimary }}>+254 750 109798</a>
                </div>
              </div>

              {/* CTA */}
              <Link href="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2.5 text-[13px] font-bold tracking-wide rounded-lg transition-all duration-200 hover:-translate-y-px active:scale-[0.98]"
                style={{ background: em, color: "#040805", boxShadow: `0 0 20px ${colors.emeraldGlow}` }}
              >
                Get A Quote
              </Link>

              {/* Hamburger */}
              <button onClick={toggleMenu}
                className="relative flex items-center justify-center w-10 h-10 lg:hidden"
                style={{ color: isDark || !scrolled ? "#fff" : colors.textPrimary }}
                aria-label="Menu"
              >
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? "scale(0.75)" : "scale(1)" }}>
                  <Menu size={24} />
                </span>
                <span className="absolute transition-all duration-300"
                  style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "scale(1)" : "scale(0.75)" }}>
                  <X size={24} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className="fixed inset-0 z-40 transition-all duration-400"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleMenu} />

        <div className="absolute top-0 right-0 h-full w-[320px] flex flex-col transition-transform duration-400"
          style={{
            background: colors.bgSurface,
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            borderLeft: `1px solid ${colors.border}`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, ${em}, ${em}60)` }} />

          {/* Drawer header */}
          <div className="flex items-center justify-end px-6 border-b"
            style={{ height: "72px", borderColor: colors.border }}
          >
            <button onClick={toggle}
              className="flex items-center justify-center mr-3 transition-all duration-300 rounded-full"
              style={{ width: "34px", height: "34px", background: colors.emeraldBg, border: `1px solid ${colors.emeraldBorder}`, color: em }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={toggleMenu} className="p-1.5 rounded-md transition-colors"
              style={{ color: colors.textMuted }}>
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-5 border-b" style={{ borderColor: colors.border }}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
            >
              <Search size={15} style={{ color: colors.textFaint, flexShrink: 0 }} />
              <input type="text" placeholder="Search…"
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: colors.textPrimary }} />
            </div>
          </div>

          {/* Links */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 mb-3"
              style={{ color: colors.textFaint }}>Menu</p>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link key={item.name} href={item.path} onClick={toggleMenu}
                  className="flex items-center gap-2.5 px-3 py-3.5 rounded-lg mb-0.5 text-[15px] transition-all duration-200 border"
                  style={{
                    color: active ? em : colors.textMuted,
                    fontWeight: active ? 700 : 500,
                    background: active ? colors.emeraldBg : "transparent",
                    borderColor: active ? colors.emeraldBorder : "transparent",
                  }}
                >
                  <span style={{ color: em, opacity: active ? 1 : 0, width: active ? "auto" : 0, overflow: "hidden", fontWeight: 300, fontSize: "1.1rem" }}>/</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Drawer footer */}
          <div className="flex-shrink-0 px-6 py-6 space-y-4 border-t" style={{ borderColor: colors.border }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center flex-shrink-0 rounded-lg w-9 h-9"
                style={{ background: colors.emeraldBg, border: `1px solid ${colors.emeraldBorder}` }}>
                <Phone className="w-4 h-4" style={{ color: em }} />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: colors.textFaint }}>Client Support</p>
                <a href="tel:+254750109798" className="text-sm font-semibold" style={{ color: colors.textPrimary }}>+254 750 109798</a>
              </div>
            </div>

            <Link href="/contact" onClick={toggleMenu}
              className="flex items-center justify-center w-full py-3 text-sm font-bold transition-all duration-200 rounded-xl"
              style={{ background: em, color: "#040805" }}
            >
              Get A Quote
            </Link>

            <div className="flex gap-1">
              {socialIcons.map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
                  className="p-2 transition-all duration-200 rounded-md"
                  style={{ color: colors.textFaint }}>
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-[11px] text-center" style={{ color: colors.textFaint }}>hello@softrinx.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;