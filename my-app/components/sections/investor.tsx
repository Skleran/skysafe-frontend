"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/providers/language-provider";

const stats = [
  {
    value: "$13B+",
    tr: "GLOBAL FOD KAYNAKLI YILLIK KAYIP",
    en: "GLOBAL ANNUAL FOD LOSS",
  },
  {
    value: "TRL 5",
    tr: "TEKNOLOJİ HAZIRLIK SEVİYESİ",
    en: "TECHNOLOGY READINESS LEVEL",
  },
  {
    value: "3",
    tr: "KURUMSAL PROGRAM DESTEĞİ",
    en: "INSTITUTIONAL PROGRAMS",
  },
  {
    value: "2026",
    tr: "PİLOT KONUŞLANDIRMA HEDEFİ",
    en: "PILOT DEPLOYMENT TARGET",
  },
];

const investorPoints = {
  tr: [
    "Türkiye'de bu segmentte yerli üretici eksikliği — net pazar boşluğu",
    "Dual-use pozisyon: sivil havacılık + savunma alıcısı erişimi",
    "Donanım + yazılım entegre çözüm — yüksek geçiş maliyeti, defansif iş modeli",
    "TÜBİTAK & HangarBIGG validasyonu ile hibe destekli sermaye verimliliği",
  ],
  en: [
    "Lack of a domestic player in this segment in Türkiye — clear market gap",
    "Dual-use positioning: access to both civil aviation and defense buyers",
    "Integrated hardware + software solution — high switching cost, defensible model",
    "TÜBİTAK & HangarBIGG validation enabling grant-supported capital efficiency",
  ],
};

export function Investor() {
  const { t, lang } = useLanguage();

  return (
    <section id="investor" className="py-28 text-white" style={{ background: "#0A0A0A" }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3.5 text-[11px] font-semibold uppercase mb-5"
          style={{ letterSpacing: "5px", color: "#E03A3A" }}
        >
          <span className="w-8 h-px bg-[#E03A3A] shrink-0" />
          {t("YATIRIMCI İLİŞKİLERİ", "INVESTOR RELATIONS")}
        </div>

        <h2
          className="font-light mb-6 text-white"
          style={{ fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.8px", lineHeight: 1.1, maxWidth: 780 }}
        >
          {t("Büyüyen bir ", "Join a growing ")}
          <b className="font-medium" style={{ color: "#E03A3A" }}>
            {t("derin teknoloji", "deep-tech")}
          </b>
          {t(" fırsatına ortak olun.", " opportunity.")}
        </h2>

        <p
          className="mb-6 font-light"
          style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", maxWidth: 680 }}
        >
          {t(
            "SkySafe; havacılık güvenliği, IoT donanımı ve veri analitiği kesişimindeki en kritik fırsatlardan birini hedeflemektedir. Tohum yatırım turu için pitch deck paylaşımı yapıyoruz.",
            "SkySafe targets one of the most critical opportunities at the intersection of aviation safety, IoT hardware and data analytics. Pitch deck available upon request for the seed round."
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[72px] mt-6">
          {/* Left: stats + bullet points */}
          <div>
            {/* Stats grid */}
            <div
              className="grid grid-cols-2 gap-px mb-10"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {stats.map((s) => (
                <div key={s.value} className="p-8" style={{ background: "#0A0A0A" }}>
                  <div
                    className="font-light"
                    style={{ fontSize: "38px", color: "#E03A3A", letterSpacing: "-1px" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[11px] mt-1.5"
                    style={{ letterSpacing: "3px", color: "rgba(255,255,255,0.5)" }}
                  >
                    {t(s.tr, s.en)}
                  </div>
                </div>
              ))}
            </div>

            {/* Bullet points */}
            <ul className="list-none">
              {(lang === "tr" ? investorPoints.tr : investorPoints.en).map((point) => (
                <li
                  key={point}
                  className="flex gap-3.5 items-start py-4 font-light"
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.82)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="shrink-0 mt-2.5 w-1.5 h-1.5"
                    style={{ background: "#E03A3A" }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Pitch deck form */}
          <div
            className="p-12"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(224,58,58,0.3)",
            }}
          >
            <h3
              className="text-[24px] font-normal mb-3"
              style={{ letterSpacing: "-0.3px" }}
            >
              {t("Pitch Deck Talep Et", "Request Pitch Deck")}
            </h3>
            <p
              className="font-light mb-7"
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}
            >
              {t(
                "KVKK uyumlu paylaşım. Talebiniz iletildiğinde 48 saat içinde dönüş yapıyoruz.",
                "GDPR/KVKK-compliant. We respond within 48 hours of your request."
              )}
            </p>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="inv-name"
                  className="text-[10px] font-semibold uppercase"
                  style={{ letterSpacing: "3px", color: "rgba(255,255,255,0.5)" }}
                >
                  {t("AD SOYAD", "FULL NAME")}
                </Label>
                <Input
                  id="inv-name"
                  placeholder="—"
                  className="bg-transparent border-0 border-b border-white/18 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-[#E03A3A]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="inv-org"
                  className="text-[10px] font-semibold uppercase"
                  style={{ letterSpacing: "3px", color: "rgba(255,255,255,0.5)" }}
                >
                  {t("KURUM", "ORGANIZATION")}
                </Label>
                <Input
                  id="inv-org"
                  placeholder="—"
                  className="bg-transparent border-0 border-b border-white/18 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-[#E03A3A]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="inv-email"
                  className="text-[10px] font-semibold uppercase"
                  style={{ letterSpacing: "3px", color: "rgba(255,255,255,0.5)" }}
                >
                  {t("E-POSTA", "EMAIL")}
                </Label>
                <Input
                  id="inv-email"
                  type="email"
                  placeholder="—"
                  className="bg-transparent border-0 border-b border-white/18 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-[#E03A3A]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="text-[10px] font-semibold uppercase"
                  style={{ letterSpacing: "3px", color: "rgba(255,255,255,0.5)" }}
                >
                  {t("YATIRIMCI TİPİ", "INVESTOR TYPE")}
                </Label>
                <Select>
                  <SelectTrigger
                    id="inv-type"
                    className="bg-transparent border-0 border-b border-white/18 rounded-none px-0 text-white focus:ring-0"
                  >
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                    <SelectItem value="angel">{t("Melek Yatırımcı", "Angel")}</SelectItem>
                    <SelectItem value="vc">{t("Risk Sermayesi", "VC")}</SelectItem>
                    <SelectItem value="corporate">{t("Kurumsal", "Corporate")}</SelectItem>
                    <SelectItem value="family">{t("Aile Ofisi", "Family Office")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full mt-2 rounded-none uppercase"
                style={{
                  background: "#E03A3A",
                  color: "#0A0A0A",
                  fontSize: "12px",
                  letterSpacing: "2.5px",
                  fontWeight: 600,
                  padding: "18px 36px",
                  height: "auto",
                }}
              >
                {t("Pitch Deck Talep Et", "Request Pitch Deck")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
