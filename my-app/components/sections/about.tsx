"use client";

import { useLanguage } from "@/components/providers/language-provider";

const milestones = [
  {
    year: "2024",
    tr: { event: "Kuruluş", desc: "SkySafe AR-GE çekirdek ekibi" },
    en: { event: "Founded", desc: "SkySafe R&D core team" },
  },
  {
    year: "2025",
    tr: { event: "TÜBİTAK Desteği", desc: "Proje desteği sağlandı" },
    en: { event: "TÜBİTAK Support", desc: "Project support secured" },
  },
  {
    year: "2025",
    tr: { event: "Liftup Programı", desc: "Girişim hızlandırma" },
    en: { event: "Liftup Program", desc: "Startup acceleration" },
  },
  {
    year: "2026",
    tr: { event: "HangarBIGG 1. Aşama", desc: "Dual-use onayı alındı" },
    en: { event: "HangarBIGG Phase 1", desc: "Dual-use approval received" },
  },
];

export function About() {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="py-28 bg-background">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3.5 text-[11px] font-semibold uppercase mb-5"
          style={{ letterSpacing: "5px", color: "#C82828" }}
        >
          <span className="w-8 h-px bg-[#C82828] shrink-0" />
          {t("HAKKIMIZDA", "ABOUT US")}
        </div>

        <h2
          className="font-light mb-6"
          style={{
            fontSize: "clamp(32px,4vw,48px)",
            letterSpacing: "-0.8px",
            lineHeight: 1.1,
            maxWidth: 780,
          }}
        >
          {t("Havacılığın ", "Not a ")}
          <b className="font-medium" style={{ color: "#C82828" }}>
            {t("tek bir saniyesi", "single second")}
          </b>
          {t(" bile şansa bırakılmamalı.", " of aviation should be left to chance.")}
        </h2>

        <p
          className="mb-20 font-light"
          style={{ fontSize: "17px", color: "var(--ss-muted, #6B6B6B)", maxWidth: 680 }}
        >
          {t(
            "SkySafe, Türkiye'nin havacılık güvenliği teknolojilerinde dünyaca tanınan bir oyuncu olması hedefiyle kurulmuş bir derin teknoloji girişimidir.",
            "SkySafe is a deep-tech venture founded to position Türkiye as a globally recognized player in aviation safety technology."
          )}
        </p>

        {/* Vision / Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
          <div>
            <h3
              className="text-[13px] font-semibold uppercase mb-4"
              style={{ letterSpacing: "4px", color: "#C82828" }}
            >
              {t("VİZYON", "VISION")}
            </h3>
            <p
              className="text-[20px] leading-relaxed font-light"
              style={{ lineHeight: 1.55, color: "var(--foreground)" }}
            >
              {t(
                "Sıfır FOD kaynaklı kayıp ile çalışan, tam izlenebilir bir küresel havacılık operasyonu standardı oluşturmak.",
                "To establish a global aviation operations standard that runs with zero FOD-related losses and full traceability."
              )}
            </p>
          </div>
          <div>
            <h3
              className="text-[13px] font-semibold uppercase mb-4"
              style={{ letterSpacing: "4px", color: "#C82828" }}
            >
              {t("MİSYON", "MISSION")}
            </h3>
            <p
              className="text-[20px] leading-relaxed font-light"
              style={{ lineHeight: 1.55, color: "var(--foreground)" }}
            >
              {t(
                "Havayolu, havalimanı ve savunma operatörlerine; veri ile kanıtlanmış, kanıt kalitesinde ve karar verici hızında güvenlik teknolojisi sunmak.",
                "To deliver data-proven, evidence-grade, decision-speed safety technology to airline, airport and defense operators."
              )}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: "1px solid rgba(224,58,58,0.3)" }}
        >
          {milestones.map((ms, i) => {
            const content = lang === "tr" ? ms.tr : ms.en;
            return (
              <div
                key={i}
                className="relative pt-8 pb-6 px-6"
                style={{
                  borderRight: i < milestones.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                }}
              >
                {/* Dot on timeline */}
                <div
                  className="absolute -top-[5px] left-6 w-[9px] h-[9px] rounded-full"
                  style={{ background: "#E03A3A" }}
                />
                <div
                  className="text-[11px] font-bold mb-2"
                  style={{ letterSpacing: "3px", color: "#C82828" }}
                >
                  {ms.year}
                </div>
                <div className="text-[15px] font-medium">{content.event}</div>
                <div className="text-[13px] font-light mt-1.5" style={{ color: "#6B6B6B" }}>
                  {content.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
