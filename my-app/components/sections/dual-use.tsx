"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";


const civilItems = {
  tr: [
    "Havalimanı apron & runway FOD denetimi",
    "Hangar bakım operasyonları izleme",
    "Yer hizmetleri vardiya yönetimi",
    "SHGM / EASA uyumlu raporlama",
  ],
  en: [
    "Airport apron & runway FOD inspection",
    "Hangar maintenance operations monitoring",
    "Ground services shift management",
    "DGCA / EASA-compliant reporting",
  ],
};

const defenseItems = {
  tr: [
    "Askeri üs pist güvenliği",
    "Sertleştirilmiş hangar ekipman izleme",
    "Mühimmat & alet kaybı önleme",
    "Sınıflandırılmış ortam için on-prem",
  ],
  en: [
    "Military base runway security",
    "Hardened hangar equipment monitoring",
    "Munitions & tool loss prevention",
    "On-prem for classified environments",
  ],
};

const SealIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 mx-auto">
    <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" stroke="#E03A3A" strokeWidth="1.4" />
    <polygon points="40,12 64,26 64,54 40,68 16,54 16,26" stroke="#E03A3A" strokeWidth="0.6" opacity="0.45" />
    <path d="M28 42 L36 50 L52 32" stroke="#E03A3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function DualUse() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="dualuse"
      className="py-28 relative overflow-hidden text-white"
      style={{ background: "#0A0A0A" }}
    >
      {/* Diagonal stripe overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(-45deg, transparent, transparent 38px, rgba(224,58,58,0.04) 38px, rgba(224,58,58,0.04) 39px)",
          right: "-10%",
          width: "60%",
          left: "auto",
        }}
      />

      <ScrollReveal className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <RevealItem delayIndex={0}>
          <div
            className="flex items-center gap-3.5 text-[11px] font-semibold uppercase mb-5"
            style={{ letterSpacing: "5px", color: "#E03A3A" }}
          >
            <span className="w-8 h-px bg-[#E03A3A] shrink-0" />
            {t("DUAL-USE TEKNOLOJİ", "DUAL-USE TECHNOLOGY")}
          </div>
        </RevealItem>

        <RevealItem delayIndex={1}>
          <h2
            className="font-light mb-6 text-white"
            style={{ fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.8px", lineHeight: 1.1, maxWidth: 780 }}
          >
            {t("Sivil havacılık ve savunma için ", "The same core for civil aviation ")}
            <b className="font-medium" style={{ color: "#E03A3A" }}>
              {t("aynı çekirdek", "and defense")}
            </b>
            .
          </h2>
        </RevealItem>

        <RevealItem delayIndex={2}>
          <p
            className="mb-6 font-light"
            style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", maxWidth: 680 }}
          >
            {t(
              "SkySafe'in çekirdek mimarisi, ticari havalimanlarından askeri üs operasyonlarına kadar uyarlanabilir. HangarBIGG 1. Aşama onayımız bu pozisyonun doğrulamasıdır.",
              "SkySafe's core architecture adapts from commercial airports to military base operations. Our HangarBIGG Phase 1 approval validates this positioning."
            )}
          </p>
        </RevealItem>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-20 mt-6">
          {/* Left: Civil + Defense columns */}
          <RevealItem delayIndex={3} direction="left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {/* Civil */}
              <div>
                <h4
                  className="text-[11px] font-semibold uppercase mb-5 pb-3.5"
                  style={{
                    letterSpacing: "4px",
                    color: "#E03A3A",
                    borderBottom: "1px solid rgba(224,58,58,0.25)",
                  }}
                >
                  {t("SİVİL HAVACILIK", "CIVIL AVIATION")}
                </h4>
                <ul className="list-none space-y-0">
                  {(lang === "tr" ? civilItems.tr : civilItems.en).map((item) => (
                    <li
                      key={item}
                      className="py-3.5 font-light"
                      style={{
                        fontSize: "14.5px",
                        color: "rgba(255,255,255,0.82)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{ color: "#E03A3A" }}>—&nbsp;&nbsp;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Defense */}
              <div>
                <h4
                  className="text-[11px] font-semibold uppercase mb-5 pb-3.5"
                  style={{
                    letterSpacing: "4px",
                    color: "#E03A3A",
                    borderBottom: "1px solid rgba(224,58,58,0.25)",
                  }}
                >
                  {t("SAVUNMA", "DEFENSE")}
                </h4>
                <ul className="list-none space-y-0">
                  {(lang === "tr" ? defenseItems.tr : defenseItems.en).map((item) => (
                    <li
                      key={item}
                      className="py-3.5 font-light"
                      style={{
                        fontSize: "14.5px",
                        color: "rgba(255,255,255,0.82)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{ color: "#E03A3A" }}>—&nbsp;&nbsp;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealItem>

          {/* Right: Hangar seal card */}
          <RevealItem delayIndex={4} direction="right" className="flex">
            <div
              className="text-center p-12 w-full"
              style={{
                border: "1px solid rgba(224,58,58,0.35)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                className="inline-block px-3.5 py-1.5 text-[10px] font-bold uppercase mb-6"
                style={{
                  letterSpacing: "3px",
                  background: "#E03A3A",
                  color: "#0A0A0A",
                }}
              >
                {t("HANGARBIGG · 1. AŞAMA ONAYLI", "HANGARBIGG · PHASE 1 APPROVED")}
              </div>

              <SealIcon />

              <h3
                className="text-[24px] font-normal mt-6 mb-3.5"
                style={{ letterSpacing: "-0.3px" }}
              >
                {t("Dual-Use Doğrulaması", "Dual-Use Validation")}
              </h3>
              <p
                className="font-light leading-relaxed"
                style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}
              >
                {t(
                  "HangarBIGG programı kapsamında 1. Aşama onayı alan SkySafe, sivil ve savunma operasyonlarında kullanılabilir teknoloji statüsünde değerlendirilmektedir.",
                  "With HangarBIGG Phase 1 approval, SkySafe is recognized as a technology applicable to both civil and defense operations."
                )}
              </p>
            </div>
          </RevealItem>
        </div>
      </ScrollReveal>
    </section>
  );
}
