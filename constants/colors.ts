// ─── Softrinx Design Tokens ──────────────────────────────────────────────────
// Single source of truth for all colors across dark and light themes.
// These map 1:1 to the CSS variables defined in globals.css.

export const COLORS = {
    dark: {
      // Backgrounds
      bgPrimary:   "#080b09",   // hero, page base
      bgSurface:   "#0d1210",   // stats card, facts section, cards
      bgCard:      "rgba(255,255,255,0.03)",
      bgCardHover: "rgba(255,255,255,0.05)",
  
      // Borders
      border:      "rgba(255,255,255,0.07)",
      borderMid:   "rgba(255,255,255,0.12)",
      borderBright:"rgba(255,255,255,0.2)",
  
      // Text
      textPrimary: "#ffffff",
      textMuted:   "rgba(255,255,255,0.42)",
      textFaint:   "rgba(255,255,255,0.28)",
      textLabel:   "rgba(255,255,255,0.35)",
  
      // Brand
      emerald:     "#34d399",
      emeraldGlow: "rgba(52,211,153,0.22)",
      emeraldBg:   "rgba(52,211,153,0.08)",
      emeraldBorder:"rgba(52,211,153,0.2)",
  
      // Nav
      navBg:       "rgba(8,11,9,0.97)",
      navBorder:   "rgba(255,255,255,0.06)",
  
      // Scrollbar
      scrollTrack: "#0d1210",
      scrollThumb: "rgba(52,211,153,0.25)",
      scrollThumbHover: "#34d399",
    },
  
    light: {
      // Backgrounds
      bgPrimary:   "#f5f7f5",   // soft off-white with a hint of green
      bgSurface:   "#ffffff",
      bgCard:      "rgba(0,0,0,0.03)",
      bgCardHover: "rgba(0,0,0,0.05)",
  
      // Borders
      border:      "rgba(0,0,0,0.08)",
      borderMid:   "rgba(0,0,0,0.14)",
      borderBright:"rgba(0,0,0,0.22)",
  
      // Text
      textPrimary: "#0a0f0d",
      textMuted:   "rgba(10,15,13,0.55)",
      textFaint:   "rgba(10,15,13,0.38)",
      textLabel:   "rgba(10,15,13,0.45)",
  
      // Brand — same emerald, slightly deeper for light bg legibility
      emerald:     "#059669",
      emeraldGlow: "rgba(5,150,105,0.18)",
      emeraldBg:   "rgba(5,150,105,0.08)",
      emeraldBorder:"rgba(5,150,105,0.22)",
  
      // Nav
      navBg:       "rgba(245,247,245,0.97)",
      navBorder:   "rgba(0,0,0,0.06)",
  
      // Scrollbar
      scrollTrack: "#e8ede9",
      scrollThumb: "rgba(5,150,105,0.3)",
      scrollThumbHover: "#059669",
    },
  } as const;
  
  export type ThemeMode = "dark" | "light";
  export type ThemeColors = typeof COLORS.dark;