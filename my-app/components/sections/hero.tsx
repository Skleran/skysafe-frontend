'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/language-provider';
import { ScrollReveal, RevealItem } from '@/components/scroll-reveal';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex flex-col justify-center min-h-screen text-white overflow-hidden"
      style={{
        background: '#0A0A0A',
        paddingTop: '140px',
        paddingBottom: '80px',
      }}
    >
      {/* Radial glow overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(224,58,58,0.08) 0%, transparent 50%), linear-gradient(135deg, transparent 0%, transparent 60%, rgba(224,58,58,0.04) 100%)',
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <ScrollReveal
        preset={false}
        className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12 w-full"
      >
        {/* Eyebrow */}
        <RevealItem delayIndex={0} direction="up">
          <div
            className="flex items-center gap-3.5 mb-7 font-semibold uppercase"
            style={{ fontSize: '11px', letterSpacing: '6px', color: '#E03A3A' }}
          >
            <span className="w-12 h-px bg-[#E03A3A] shrink-0" />
            {t(
              'FOD ÖNLEME · HAVACILIK DONANIM & YAZILIM',
              'FOD PREVENTION · AVIATION HARDWARE & SOFTWARE',
            )}
          </div>
        </RevealItem>

        {/* H1 */}
        <RevealItem delayIndex={1} direction="up">
          <h1
            className="font-light mb-7"
            style={{
              fontSize: 'clamp(44px,6vw,72px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              maxWidth: 880,
            }}
          >
            {t(
              'Havacılığın görünmez riskini ',
              "We make aviation's invisible risk ",
            )}
            <b className="font-medium" style={{ color: '#E03A3A' }}>
              {t('görünür', 'visible')}
            </b>
            {t(' kılıyoruz.', '.')}
          </h1>
        </RevealItem>

        {/* Lead paragraph */}
        <RevealItem delayIndex={2} direction="up">
          <p
            className="font-light mb-12"
            style={{
              fontSize: '19px',
              maxWidth: 680,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
            }}
          >
            {t(
              'SkySafe, apron ve hangar operasyonlarında FOD (Foreign Object Debris) kaynaklı kayıpları önlemek için akıllı sensör donanımı ve gerçek zamanlı izleme yazılımı geliştiriyor. Sivil havacılık ve savunma için tek platform.',
              'SkySafe builds smart sensor hardware and real-time monitoring software to eliminate FOD-related losses on aprons and in hangars. One platform for civil aviation and defense.',
            )}
          </p>
        </RevealItem>

        {/* CTA buttons */}
        <RevealItem delayIndex={3} direction="up">
          <div className="flex flex-wrap gap-4 mb-24">
            <Button
              asChild
              className="rounded-none uppercase hover:bg-[#E03A3A]/80"
              style={{
                // background: '#E03A3A',
                color: '#0A0A0A',
                fontSize: '12px',
                letterSpacing: '2.5px',
                fontWeight: 600,
                padding: '18px 36px',
                height: 'auto',
              }}
            >
              <a href="#investor">
                {t('Yatırımcı Bilgileri', 'Investor Info')}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-none uppercase"
              style={{
                // background: 'transparent',
                color: '#fff',
                fontSize: '12px',
                letterSpacing: '2.5px',
                fontWeight: 600,
                padding: '18px 36px',
                height: 'auto',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <a href="#contact">{t('Demo Talep Et', 'Request Demo')}</a>
            </Button>
          </div>
        </RevealItem>

        {/* Trust row */}
        <RevealItem delayIndex={4} direction="up">
          <div
            className="flex flex-wrap items-center gap-12 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span
              className="text-[10px] font-medium uppercase"
              style={{ letterSpacing: '4px', color: 'rgba(255,255,255,0.4)' }}
            >
              {t('DESTEKLEYEN PROGRAMLAR', 'SUPPORTED BY')}
            </span>

            {[
              'TÜBİTAK',
              'Liftup',
              `HangarBIGG — ${t('1. Aşama Onaylı', 'Phase 1 Approved')}`,
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-3 text-[13px]"
                style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '1px' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: '#E03A3A' }}
                />
                {badge}
              </span>
            ))}
          </div>
        </RevealItem>
      </ScrollReveal>
    </section>
  );
}
