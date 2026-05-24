"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

const SkySafeLogo = () => (
  <svg viewBox="0 0 120 120" aria-label="SkySafe" className="w-9 h-9 shrink-0">
    <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="2" />
    <line x1="22" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="98" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="22" y1="100" x2="98" y2="100" stroke="white" strokeWidth="2" opacity="0.4" />
    <circle cx="60" cy="16" r="12" fill="#E03A3A" />
  </svg>
);

const footerSolutions = [
  { href: "#solutions", tr: "FOD Önleme", en: "FOD Prevention" },
  { href: "#solutions", tr: "Donanım", en: "Hardware" },
  { href: "#solutions", tr: "Yazılım", en: "Software" },
  { href: "#dualuse", tr: "Dual-Use", en: "Dual-Use" },
];

const footerCompany = [
  { href: "#about", tr: "Hakkımızda", en: "About" },
  { href: "#partners", tr: "Ortaklıklar", en: "Partners" },
  { href: "#investor", tr: "Yatırımcı", en: "Investors" },
  { href: "#contact", tr: "İletişim", en: "Contact" },
];

const footerLegal = [
  { href: "#", tr: "KVKK Aydınlatma", en: "Privacy Notice" },
  { href: "#", tr: "Çerez Politikası", en: "Cookie Policy" },
  { href: "#", tr: "Kullanım Koşulları", en: "Terms" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(224,58,58,0.15)",
      }}
      className="text-white/60 pt-16 pb-8"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3.5">
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
            </div>
            <p className="text-[13px] text-white/55 mt-4 font-light leading-relaxed">
              {t(
                "Havacılık operasyonlarında FOD önleme için entegre donanım ve yazılım çözümleri. TÜBİTAK, Liftup ve HangarBIGG destekli.",
                "Integrated hardware and software solutions for FOD prevention in aviation operations. Supported by TÜBİTAK, Liftup and HangarBIGG."
              )}
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h5
              className="text-[11px] font-semibold uppercase text-[#E03A3A] mb-4"
              style={{ letterSpacing: "3px" }}
            >
              {t("ÇÖZÜMLER", "SOLUTIONS")}
            </h5>
            {footerSolutions.map((item) => (
              <a
                key={item.href + item.tr}
                href={item.href}
                className="block text-[13px] text-white/55 mb-2.5 no-underline hover:text-white transition-colors"
              >
                {t(item.tr, item.en)}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h5
              className="text-[11px] font-semibold uppercase text-[#E03A3A] mb-4"
              style={{ letterSpacing: "3px" }}
            >
              {t("KURUMSAL", "COMPANY")}
            </h5>
            {footerCompany.map((item) => (
              <a
                key={item.href + item.tr}
                href={item.href}
                className="block text-[13px] text-white/55 mb-2.5 no-underline hover:text-white transition-colors"
              >
                {t(item.tr, item.en)}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h5
              className="text-[11px] font-semibold uppercase text-[#E03A3A] mb-4"
              style={{ letterSpacing: "3px" }}
            >
              {t("YASAL", "LEGAL")}
            </h5>
            {footerLegal.map((item) => (
              <a
                key={item.tr}
                href={item.href}
                className="block text-[13px] text-white/55 mb-2.5 no-underline hover:text-white transition-colors"
              >
                {t(item.tr, item.en)}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between gap-2 text-[11px] text-white/35"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            letterSpacing: "2px",
          }}
        >
          <span>
            © 2026 SKYSAFE —{" "}
            {t("TÜM HAKLARI SAKLIDIR", "ALL RIGHTS RESERVED")}
          </span>
          <span>MADE IN TÜRKİYE · DUAL-USE READY</span>
        </div>
      </div>
    </footer>
  );
}
