"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { ModeToggle } from "@/components/theme-selector";

const SkySafeLogo = () => (
  <svg viewBox="0 0 120 120" aria-label="SkySafe" className="w-9 h-9 shrink-0">
    <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="2" />
    <line x1="22" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="98" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="22" y1="100" x2="98" y2="100" stroke="white" strokeWidth="2" opacity="0.4" />
    <circle cx="60" cy="16" r="12" fill="#E03A3A" />
  </svg>
);

const navLinks = [
  { href: "#solutions", tr: "Çözümler", en: "Solutions" },
  { href: "#dualuse", tr: "Dual-Use", en: "Dual-Use" },
  { href: "#about", tr: "Hakkımızda", en: "About" },
  { href: "#partners", tr: "Ortaklıklar", en: "Partners" },
  { href: "#investor", tr: "Yatırımcı", en: "Investors" },
  { href: "#contact", tr: "İletişim", en: "Contact" },
];

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "rgba(10,10,10,0.94)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(224,58,58,0.15)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
        {/* Brand */}
        <Link href="#top" className="flex items-center gap-3.5 no-underline">
          <SkySafeLogo />
          <div>
            <div
              className="font-medium text-white"
              style={{ letterSpacing: "8px", fontSize: "15px" }}
            >
              SKYSAFE
            </div>
            <div
              className="text-[8px] font-semibold uppercase mt-0.5"
              style={{ letterSpacing: "3px", color: "#E03A3A" }}
            >
              {t("HAVACILIK GÜVENLİĞİ", "AVIATION SAFETY")}
            </div>
          </div>
        </Link>

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-[34px] list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/78 no-underline text-[12.5px] font-medium uppercase transition-colors duration-200 hover:text-[#E03A3A]"
                style={{ letterSpacing: "1.5px" }}
              >
                {t(link.tr, link.en)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLang}
            className="border-[rgba(224,58,58,0.4)] bg-transparent text-white hover:border-[#E03A3A] hover:bg-transparent hover:text-white rounded-sm px-3"
            style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: 600 }}
          >
            <span style={{ color: lang === "tr" ? "#E03A3A" : "rgba(255,255,255,0.55)" }}>TR</span>
            <span className="mx-1 opacity-40">/</span>
            <span style={{ color: lang === "en" ? "#E03A3A" : "rgba(255,255,255,0.55)" }}>EN</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
