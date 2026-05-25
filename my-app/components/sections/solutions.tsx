"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

const FodIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
    <circle cx="30" cy="30" r="26" stroke="#E03A3A" strokeWidth="1.4" />
    <circle cx="30" cy="30" r="18" stroke="#E03A3A" strokeWidth="0.8" opacity="0.4" />
    <circle cx="30" cy="30" r="10" stroke="#E03A3A" strokeWidth="0.6" opacity="0.25" />
    <circle cx="30" cy="30" r="3" fill="#E03A3A" />
    <path d="M30 6 L30 12 M30 48 L30 54 M6 30 L12 30 M48 30 L54 30" stroke="#E03A3A" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const HardwareIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
    <rect x="10" y="14" width="40" height="32" stroke="#E03A3A" strokeWidth="1.4" rx="2" />
    <rect x="16" y="20" width="28" height="14" stroke="#E03A3A" strokeWidth="0.8" />
    <circle cx="22" cy="40" r="1.6" fill="#E03A3A" />
    <circle cx="30" cy="40" r="1.6" fill="#E03A3A" opacity="0.4" />
    <circle cx="38" cy="40" r="1.6" fill="#E03A3A" opacity="0.4" />
    <line x1="14" y1="10" x2="14" y2="14" stroke="#E03A3A" strokeWidth="1.2" />
    <line x1="46" y1="10" x2="46" y2="14" stroke="#E03A3A" strokeWidth="1.2" />
  </svg>
);

const SoftwareIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
    <rect x="8" y="14" width="44" height="30" stroke="#E03A3A" strokeWidth="1.4" rx="1.5" />
    <line x1="8" y1="22" x2="52" y2="22" stroke="#E03A3A" strokeWidth="0.8" />
    <circle cx="12" cy="18" r="0.9" fill="#E03A3A" />
    <circle cx="15.5" cy="18" r="0.9" fill="#E03A3A" opacity="0.5" />
    <circle cx="19" cy="18" r="0.9" fill="#E03A3A" opacity="0.5" />
    <polyline points="14,38 20,32 26,34 32,28 38,30 44,26" stroke="#E03A3A" strokeWidth="1.6" fill="none" />
    <line x1="14" y1="40" x2="46" y2="40" stroke="#E03A3A" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

const solutions = [
  {
    num: "01",
    Icon: FodIcon,
    tr: {
      title: "FOD Önleme Sistemleri",
      body: "Pist ve apron üzerindeki yabancı cisimleri (FOD) milimetre hassasiyetiyle tespit eden çok modlu sensör ağı. Anlık uyarı, otomatik konum kaydı, kanıt arşivi.",
      more: "Detay",
    },
    en: {
      title: "FOD Prevention Systems",
      body: "Multi-modal sensor network detecting Foreign Object Debris on runways and aprons with millimeter accuracy. Live alerts, automatic geolocation, audit-grade evidence trail.",
      more: "Details",
    },
  },
  {
    num: "02",
    Icon: HardwareIcon,
    tr: {
      title: "Havacılık Donanımı",
      body: "Hangar ve apron koşullarına uyumlu, MIL-STD uyumluluk hedefli sertleştirilmiş edge sensör modülleri. IP67 koruma, düşük güç tüketimi, mesh haberleşme.",
      more: "Detay",
    },
    en: {
      title: "Aviation Hardware",
      body: "Ruggedized edge sensor modules targeting MIL-STD compliance for hangar and apron environments. IP67 protected, low power, mesh communication.",
      more: "Details",
    },
  },
  {
    num: "03",
    Icon: SoftwareIcon,
    tr: {
      title: "Havacılık Yazılımı",
      body: "Gerçek zamanlı izleme paneli, vardiya raporları, anomali analitiği ve havalimanı SMS/QMS sistemleriyle entegrasyon. Bulut + on-prem konuşlandırma.",
      more: "Detay",
    },
    en: {
      title: "Aviation Software",
      body: "Real-time monitoring dashboard, shift reports, anomaly analytics and integration with airport SMS/QMS systems. Cloud + on-prem deployment.",
      more: "Details",
    },
  },
];

export function Solutions() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="solutions"
      className="py-28"
      style={{ background: "var(--ss-cream, #F5F0F0)" }}
    >
      <ScrollReveal className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <RevealItem delayIndex={0}>
          <div
            className="flex items-center gap-3.5 text-[11px] font-semibold uppercase mb-5"
            style={{ letterSpacing: "5px", color: "#C82828" }}
          >
            <span className="w-8 h-px bg-[#C82828] shrink-0" />
            {t("ÇÖZÜMLERİMİZ", "OUR SOLUTIONS")}
          </div>
        </RevealItem>

        <RevealItem delayIndex={1}>
          <h2
            className="font-light mb-6"
            style={{ fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.8px", lineHeight: 1.1, maxWidth: 780, color: "#0A0A0A" }}
          >
            {t("Tek platform, üç entegre ", "One platform, three integrated ")}
            <b className="font-medium" style={{ color: "#C82828" }}>
              {t("katman", "layers")}
            </b>
            .
          </h2>
        </RevealItem>

        <RevealItem delayIndex={2}>
          <p
            className="mb-16 font-light"
            style={{ fontSize: "17px", color: "#6B6B6B", maxWidth: 680 }}
          >
            {t(
              "Sensör donanımından operasyon yazılımına kadar uçtan uca bir güvenlik mimarisi sunuyoruz. Pist, apron ve hangar genelinde tek bir gerçeklik akışı.",
              "An end-to-end safety architecture from sensor hardware to operations software. A single source of truth across runways, aprons, and hangars."
            )}
          </p>
        </RevealItem>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          {solutions.map((sol, index) => {
            const content = lang === "tr" ? sol.tr : sol.en;
            return (
              <RevealItem
                key={sol.num}
                delayIndex={index + 3}
                direction="up"
                className="flex"
              >
                <div
                  className="group flex flex-col gap-5 transition-colors duration-250 w-full"
                  style={{ background: "#FAF8F8", padding: "48px 36px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FAF8F8")}
                >
                  <div className="text-[11px] font-semibold" style={{ letterSpacing: "4px", color: "#C82828" }}>
                    {sol.num}
                  </div>
                  <div className="w-[54px] h-[54px]">
                    <sol.Icon />
                  </div>
                  <h3 className="text-[22px] font-medium" style={{ letterSpacing: "-0.2px", color: "#0A0A0A" }}>
                    {content.title}
                  </h3>
                  <p className="font-light leading-relaxed" style={{ fontSize: "14.5px", color: "#6B6B6B", lineHeight: 1.65 }}>
                    {content.body}
                  </p>
                  <a
                    href="#contact"
                    className="mt-auto pt-6 text-[11px] font-semibold uppercase no-underline transition-colors"
                    style={{
                      letterSpacing: "3px",
                      color: "#0A0A0A",
                      borderTop: "1px solid rgba(224,58,58,0.3)",
                    }}
                  >
                    {content.more}
                    <span style={{ color: "#C82828" }}> →</span>
                  </a>
                </div>
              </RevealItem>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
