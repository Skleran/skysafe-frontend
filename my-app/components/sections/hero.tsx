'use client';

import { Button } from '@/components/ui/button';
import styles from './hero.module.css';
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
      <div className={styles.glow} />

      {/* Grid lines */}
      <div className={styles.grid} />

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
              className="rounded-none uppercase hover:bg-[#E03A3A]/80 w-full sm:w-auto"
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
              className="rounded-none uppercase hover:bg-neutral-800/25 dark:hover:bg-neutral-800/25 w-full sm:w-auto"
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
            className="flex flex-wrap items-center gap-12 pt-8 justify-center sm:justify-start"
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
