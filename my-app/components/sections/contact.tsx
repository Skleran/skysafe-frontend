"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/components/providers/language-provider";

const contactBlocks = [
  {
    tr: { lab: "GENEL İLETİŞİM", val: "hello@skysafe.tech", sub: "Tüm genel sorularınız için" },
    en: { lab: "GENERAL", val: "hello@skysafe.tech", sub: "For all general inquiries" },
  },
  {
    tr: { lab: "YATIRIMCI İLETİŞİM", val: "investors@skysafe.tech", sub: "Pitch deck ve yatırımcı görüşmeleri" },
    en: { lab: "INVESTOR CONTACT", val: "investors@skysafe.tech", sub: "Pitch deck and investor meetings" },
  },
  {
    tr: { lab: "BASIN & İŞ ORTAKLIĞI", val: "partners@skysafe.tech", sub: "Havalimanı, havayolu ve savunma kurumları" },
    en: { lab: "PRESS & PARTNERSHIPS", val: "partners@skysafe.tech", sub: "Airport, airline and defense agencies" },
  },
  {
    tr: { lab: "MERKEZ", val: "Türkiye", sub: "Açık adres pilot konuşlanma sonrası ilan edilecektir" },
    en: { lab: "HEADQUARTERS", val: "Türkiye", sub: "Address to be announced after pilot deployment" },
  },
];

export function Contact() {
  const { t, lang } = useLanguage();

  return (
    <section id="contact" className="py-28" style={{ background: "var(--ss-cream, #F5F0F0)" }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3.5 text-[11px] font-semibold uppercase mb-5"
          style={{ letterSpacing: "5px", color: "#C82828" }}
        >
          <span className="w-8 h-px bg-[#C82828] shrink-0" />
          {t("İLETİŞİM", "CONTACT")}
        </div>

        <h2
          className="font-light mb-16"
          style={{
            fontSize: "clamp(32px,4vw,48px)",
            letterSpacing: "-0.8px",
            lineHeight: 1.1,
            maxWidth: 780,
            color: "#0A0A0A",
          }}
        >
          {t("Operasyonunuz için ", "Let's discuss how ")}
          <b className="font-medium" style={{ color: "#C82828" }}>
            {t("SkySafe", "SkySafe")}
          </b>
          {t("'in nasıl çalışacağını konuşalım.", " will work for your operation.")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[72px] items-start">
          {/* Left: contact info blocks */}
          <div className="flex flex-col gap-8">
            {contactBlocks.map((block) => {
              const c = lang === "tr" ? block.tr : block.en;
              return (
                <div
                  key={c.lab}
                  className="pl-5"
                  style={{ borderLeft: "2px solid #C82828" }}
                >
                  <div
                    className="text-[10px] font-semibold uppercase mb-2"
                    style={{ letterSpacing: "3px", color: "#C82828" }}
                  >
                    {c.lab}
                  </div>
                  <div className="text-[17px]" style={{ color: "#0A0A0A" }}>
                    {c.val}
                  </div>
                  <div className="text-[13px] mt-1" style={{ color: "#6B6B6B" }}>
                    {c.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: contact form */}
          <form className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="ct-name"
                className="text-[10px] font-semibold uppercase"
                style={{ letterSpacing: "3px", color: "#6B6B6B" }}
              >
                {t("AD SOYAD", "FULL NAME")}
              </Label>
              <Input
                id="ct-name"
                placeholder="—"
                className="bg-transparent border-0 border-b border-black/15 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C82828]"
                style={{ color: "#0A0A0A" }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="ct-org"
                className="text-[10px] font-semibold uppercase"
                style={{ letterSpacing: "3px", color: "#6B6B6B" }}
              >
                {t("KURUM", "ORGANIZATION")}
              </Label>
              <Input
                id="ct-org"
                placeholder="—"
                className="bg-transparent border-0 border-b border-black/15 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C82828]"
                style={{ color: "#0A0A0A" }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="ct-email"
                className="text-[10px] font-semibold uppercase"
                style={{ letterSpacing: "3px", color: "#6B6B6B" }}
              >
                {t("E-POSTA", "EMAIL")}
              </Label>
              <Input
                id="ct-email"
                type="email"
                placeholder="—"
                className="bg-transparent border-0 border-b border-black/15 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C82828]"
                style={{ color: "#0A0A0A" }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="ct-message"
                className="text-[10px] font-semibold uppercase"
                style={{ letterSpacing: "3px", color: "#6B6B6B" }}
              >
                {t("MESAJ", "MESSAGE")}
              </Label>
              <Textarea
                id="ct-message"
                placeholder="—"
                rows={4}
                className="bg-transparent border-0 border-b border-black/15 rounded-none px-0 resize-none focus-visible:ring-0 focus-visible:border-[#C82828]"
                style={{ color: "#0A0A0A" }}
              />
            </div>

            <Button
              type="submit"
              className="mt-2 rounded-none uppercase"
              style={{
                background: "#0A0A0A",
                color: "#E03A3A",
                fontSize: "12px",
                letterSpacing: "2.5px",
                fontWeight: 600,
                padding: "18px 36px",
                height: "auto",
              }}
            >
              {t("Mesaj Gönder", "Send Message")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
