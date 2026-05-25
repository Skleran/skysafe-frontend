'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/providers/language-provider';
import { ScrollReveal, RevealItem } from '@/components/scroll-reveal';

const partners = [
  {
    tag: { tr: 'AR-GE DESTEĞİ', en: 'R&D SUPPORT' },
    logo: '/images/tubitak-logo.webp',
    name: 'TÜBİTAK',
    tr: 'Türkiye Bilimsel ve Teknolojik Araştırma Kurumu projemizi araştırma-geliştirme destek programı kapsamına almıştır.',
    en: 'The Scientific and Technological Research Council of Türkiye has included our project in its R&D support program.',
  },
  {
    tag: { tr: 'HIZLANDIRMA', en: 'ACCELERATION' },
    logo: '/images/liftup-logo.png',
    name: 'Liftup',
    tr: 'Liftup girişim hızlandırma programı kapsamında mentorluk, yatırımcı ağı ve operasyonel destek almaktayız.',
    en: 'Through the Liftup startup acceleration program, we receive mentorship, investor network access, and operational support.',
  },
  {
    tag: { tr: 'DUAL-USE · 1. AŞAMA', en: 'DUAL-USE · PHASE 1' },
    logo: '/images/hangar-bigg.png',
    name: 'HangarBIGG',
    tr: 'Dual-use teknolojiler için HangarBIGG programının 1. Aşama onayını alan ekosistem üyesiyiz; ileri aşamalara hazırlık sürmektedir.',
    en: 'An ecosystem member with HangarBIGG Phase 1 approval for dual-use technologies; preparation for further phases is ongoing.',
  },
];

export function Partners() {
  const { t } = useLanguage();

  return (
    <section
      id="partners"
      className="py-28"
      style={{ background: 'var(--ss-cream, #F5F0F0)' }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          {/* Eyebrow */}
          <RevealItem direction="up" delayIndex={0}>
            <div
              className="flex items-center gap-3.5 text-[11px] font-semibold uppercase mb-5"
              style={{ letterSpacing: '5px', color: '#C82828' }}
            >
              <span className="w-8 h-px bg-[#C82828] shrink-0" />
              {t('ORTAKLIKLAR & DESTEKLER', 'PARTNERS & SUPPORT')}
            </div>
          </RevealItem>

          <RevealItem direction="up" delayIndex={1}>
            <h2
              className="font-light mb-16"
              style={{
                fontSize: 'clamp(32px,4vw,48px)',
                letterSpacing: '-0.8px',
                lineHeight: 1.1,
                maxWidth: 780,
                color: '#0A0A0A',
              }}
            >
              {t("Türkiye'nin önde gelen ", "Backed by Türkiye's leading ")}
              <b className="font-medium" style={{ color: '#C82828' }}>
                {t('kurumsal programları', 'institutional programs')}
              </b>
              {t(' tarafından destekleniyoruz.', '.')}
            </h2>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((p, i) => (
              <RevealItem key={p.name} direction="up" delayIndex={i + 2}>
                <div
                  className="relative flex flex-col gap-4 items-start h-full"
                  style={{
                    background: '#FAF8F8',
                    padding: '48px 36px',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Red left border accent */}
                  <div
                    className="absolute top-0 left-0 w-[3px] h-full"
                    style={{ background: '#C82828' }}
                  />

                  <Badge
                    variant="secondary"
                    className="rounded-none text-[10px] font-semibold uppercase"
                    style={{
                      letterSpacing: '3px',
                      background: '#0A0A0A',
                      color: '#E03A3A',
                      padding: '4px 10px',
                    }}
                  >
                    {t(p.tag.tr, p.tag.en)}
                  </Badge>

                  {/* Logo Image */}
                  <div className="w-full h-20 flex items-center justify-center relative">
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2"
                    />
                  </div>

                  <h3
                    className="text-[20px] font-medium"
                    style={{ color: '#0A0A0A' }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="text-[14px] leading-relaxed font-light"
                    style={{ color: '#6B6B6B' }}
                  >
                    {t(p.tr, p.en)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
