import type { JLPTLevel } from "./kanjiData";

export type LevelTheme = {
  page: string;
  panel: string;
  primaryButton: string;
  outlineButton: string;
  badge: string;
  soft: string;
  softAlt: string;
  text: string;
  accentText: string;
  hoverBorder: string;
  focus: string;
};

export const levelThemes: Record<JLPTLevel, LevelTheme> = {
  N5: {
    page:
      "bg-[radial-gradient(circle_at_top_left,rgba(187,247,208,0.58),transparent_28rem),radial-gradient(circle_at_top_right,rgba(191,219,254,0.42),transparent_30rem),linear-gradient(135deg,#f0fdf4_0%,#ecfeff_52%,#fffdf4_100%)]",
    panel:
      "border-emerald-200/70 bg-white/86 shadow-[0_18px_48px_rgba(5,150,105,0.11)] backdrop-blur",
    primaryButton: "bg-emerald-600 text-white hover:bg-emerald-700",
    outlineButton:
      "border-emerald-200 bg-white/85 text-emerald-900 hover:bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800",
    soft: "bg-emerald-50 text-emerald-800",
    softAlt: "bg-sky-50 text-sky-800",
    text: "text-emerald-950",
    accentText: "text-emerald-700",
    hoverBorder: "hover:border-emerald-300",
    focus: "focus:border-emerald-500 focus:ring-emerald-100",
  },
  N4: {
    page:
      "bg-[radial-gradient(circle_at_top_left,rgba(167,243,208,0.42),transparent_28rem),radial-gradient(circle_at_top_right,rgba(253,224,71,0.34),transparent_30rem),linear-gradient(135deg,#ecfdf5_0%,#fefce8_48%,#f0fdfa_100%)]",
    panel:
      "border-lime-200/70 bg-white/86 shadow-[0_18px_48px_rgba(77,124,15,0.11)] backdrop-blur",
    primaryButton: "bg-lime-700 text-white hover:bg-lime-800",
    outlineButton:
      "border-lime-200 bg-white/85 text-lime-950 hover:bg-lime-50",
    badge: "bg-lime-100 text-lime-900",
    soft: "bg-lime-50 text-lime-900",
    softAlt: "bg-emerald-50 text-emerald-800",
    text: "text-lime-950",
    accentText: "text-lime-700",
    hoverBorder: "hover:border-lime-300",
    focus: "focus:border-lime-500 focus:ring-lime-100",
  },
  N3: {
    page:
      "bg-[radial-gradient(circle_at_top_left,rgba(254,240,138,0.46),transparent_27rem),radial-gradient(circle_at_top_right,rgba(251,207,232,0.35),transparent_30rem),linear-gradient(135deg,#fff7ed_0%,#fefce8_50%,#fff1f2_100%)]",
    panel:
      "border-amber-200/70 bg-white/86 shadow-[0_18px_48px_rgba(180,83,9,0.11)] backdrop-blur",
    primaryButton: "bg-amber-600 text-white hover:bg-amber-700",
    outlineButton:
      "border-amber-200 bg-white/85 text-amber-950 hover:bg-amber-50",
    badge: "bg-amber-100 text-amber-900",
    soft: "bg-amber-50 text-amber-900",
    softAlt: "bg-rose-50 text-rose-800",
    text: "text-amber-950",
    accentText: "text-amber-700",
    hoverBorder: "hover:border-amber-300",
    focus: "focus:border-amber-500 focus:ring-amber-100",
  },
  N2: {
    page:
      "bg-[radial-gradient(circle_at_top_left,rgba(252,211,77,0.5),transparent_28rem),radial-gradient(circle_at_top_right,rgba(248,113,113,0.28),transparent_30rem),linear-gradient(135deg,#fff7ed_0%,#fffaf0_45%,#fef2f2_100%)]",
    panel:
      "border-yellow-300/70 bg-white/88 shadow-[0_18px_52px_rgba(185,28,28,0.12)] backdrop-blur",
    primaryButton: "bg-red-700 text-white hover:bg-red-800",
    outlineButton:
      "border-yellow-300 bg-white/88 text-red-950 hover:bg-yellow-50",
    badge: "bg-yellow-100 text-red-900",
    soft: "bg-yellow-50 text-red-950",
    softAlt: "bg-red-50 text-red-900",
    text: "text-red-950",
    accentText: "text-red-700",
    hoverBorder: "hover:border-yellow-400",
    focus: "focus:border-red-500 focus:ring-red-100",
  },
  N1: {
    page:
      "bg-[radial-gradient(circle_at_top_left,rgba(196,181,253,0.45),transparent_28rem),radial-gradient(circle_at_top_right,rgba(125,211,252,0.34),transparent_30rem),linear-gradient(135deg,#f5f3ff_0%,#eef2ff_48%,#f8fafc_100%)]",
    panel:
      "border-indigo-200/70 bg-white/86 shadow-[0_18px_48px_rgba(79,70,229,0.12)] backdrop-blur",
    primaryButton: "bg-indigo-700 text-white hover:bg-indigo-800",
    outlineButton:
      "border-indigo-200 bg-white/85 text-indigo-950 hover:bg-indigo-50",
    badge: "bg-indigo-100 text-indigo-800",
    soft: "bg-indigo-50 text-indigo-900",
    softAlt: "bg-slate-50 text-slate-800",
    text: "text-indigo-950",
    accentText: "text-indigo-700",
    hoverBorder: "hover:border-indigo-300",
    focus: "focus:border-indigo-500 focus:ring-indigo-100",
  },
};
