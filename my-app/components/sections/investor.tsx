'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';
import { FormSuccess } from '@/components/ui/form-success';
import {
  submitInvestorForm,
  type InvestorFormState,
} from '@/app/actions/investor';
import { useLanguage } from '@/components/providers/language-provider';

const initialState: InvestorFormState = { status: 'idle' };

const stats = [
  {
    value: '$13B+',
    tr: 'GLOBAL FOD KAYNAKLI YILLIK KAYIP',
    en: 'GLOBAL ANNUAL FOD LOSS',
  },
  {
    value: 'TRL 5',
    tr: 'TEKNOLOJİ HAZIRLIK SEVİYESİ',
    en: 'TECHNOLOGY READINESS LEVEL',
  },
  { value: '3', tr: 'KURUMSAL PROGRAM DESTEĞİ', en: 'INSTITUTIONAL PROGRAMS' },
  {
    value: '2026',
    tr: 'PİLOT KONUŞLANDIRMA HEDEFİ',
    en: 'PILOT DEPLOYMENT TARGET',
  },
];

const investorPoints = {
  tr: [
    "Türkiye'de bu segmentte yerli üretici eksikliği — net pazar boşluğu",
    'Dual-use pozisyon: sivil havacılık + savunma alıcısı erişimi',
    'Donanım + yazılım entegre çözüm — yüksek geçiş maliyeti, defansif iş modeli',
    'TÜBİTAK & HangarBIGG validasyonu ile hibe destekli sermaye verimliliği',
  ],
  en: [
    'Lack of a domestic player in this segment in Türkiye — clear market gap',
    'Dual-use positioning: access to both civil aviation and defense buyers',
    'Integrated hardware + software solution — high switching cost, defensible model',
    'TÜBİTAK & HangarBIGG validation enabling grant-supported capital efficiency',
  ],
};

const inputClass =
  'bg-transparent border-0 border-b border-white/18 rounded-none px-0 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-[#E03A3A] transition-colors';

export function Investor() {
  const { t, lang } = useLanguage();
  const [state, formAction, isPending] = useActionState(
    submitInvestorForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  // We need a controlled value for the Select so we can reset it
  const selectRef = useRef<HTMLInputElement>(null);

  // Reset the hidden investor_type input on success
  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section
      id="investor"
      className="py-28 text-white"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3.5 text-[11px] font-semibold uppercase mb-5"
          style={{ letterSpacing: '5px', color: '#E03A3A' }}
        >
          <span className="w-8 h-px bg-[#E03A3A] shrink-0" />
          {t('YATIRIMCI İLİŞKİLERİ', 'INVESTOR RELATIONS')}
        </div>

        <h2
          className="font-light mb-6 text-white"
          style={{
            fontSize: 'clamp(32px,4vw,48px)',
            letterSpacing: '-0.8px',
            lineHeight: 1.1,
            maxWidth: 780,
          }}
        >
          {t('Büyüyen bir ', 'Join a growing ')}
          <b className="font-medium" style={{ color: '#E03A3A' }}>
            {t('derin teknoloji', 'deep-tech')}
          </b>
          {t(' fırsatına ortak olun.', ' opportunity.')}
        </h2>

        <p
          className="mb-6 font-light"
          style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 680,
          }}
        >
          {t(
            'SkySafe; havacılık güvenliği, IoT donanımı ve veri analitiği kesişimindeki en kritik fırsatlardan birini hedeflemektedir. Tohum yatırım turu için pitch deck paylaşımı yapıyoruz.',
            'SkySafe targets one of the most critical opportunities at the intersection of aviation safety, IoT hardware and data analytics. Pitch deck available upon request for the seed round.',
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[72px] mt-6">
          {/* Left: stats + bullet points */}
          <div>
            <div
              className="grid grid-cols-2 gap-px mb-10"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="p-8"
                  style={{ background: '#0A0A0A' }}
                >
                  <div
                    className="font-light"
                    style={{
                      fontSize: '38px',
                      color: '#E03A3A',
                      letterSpacing: '-1px',
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[11px] mt-1.5"
                    style={{
                      letterSpacing: '3px',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {t(s.tr, s.en)}
                  </div>
                </div>
              ))}
            </div>

            <ul className="list-none">
              {(lang === 'tr' ? investorPoints.tr : investorPoints.en).map(
                (point) => (
                  <li
                    key={point}
                    className="flex gap-3.5 items-start py-4 font-light"
                    style={{
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.82)',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span
                      className="shrink-0 mt-2.5 w-1.5 h-1.5"
                      style={{ background: '#E03A3A' }}
                    />
                    {point}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Right: pitch deck form OR success */}
          <div
            className="p-12"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(224,58,58,0.3)',
            }}
          >
            {state.status === 'success' ? (
              <FormSuccess
                variant="dark"
                title={t('Talebiniz Alındı.', 'Request Received.')}
                subtitle={t(
                  '48 saat içinde ekibimiz size dönüş yapacak.',
                  'Our team will get back to you within 48 hours.',
                )}
              />
            ) : (
              <>
                <h3
                  className="text-[24px] font-normal mb-3"
                  style={{ letterSpacing: '-0.3px' }}
                >
                  {t('Pitch Deck Talep Et', 'Request Pitch Deck')}
                </h3>
                <p
                  className="font-light mb-7"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6,
                  }}
                >
                  {t(
                    'KVKK uyumlu paylaşım. Talebiniz iletildiğinde 48 saat içinde dönüş yapıyoruz.',
                    'GDPR/KVKK-compliant. We respond within 48 hours of your request.',
                  )}
                </p>

                <form ref={formRef} action={formAction} className="space-y-5">
                  {/* Hidden fields */}
                  <input type="hidden" name="lang" value={lang} />

                  <div className="space-y-2">
                    <Label
                      htmlFor="inv-name"
                      className="text-[10px] font-semibold uppercase"
                      style={{
                        letterSpacing: '3px',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {t('AD SOYAD', 'FULL NAME')}
                    </Label>
                    <Input
                      id="inv-name"
                      name="full_name"
                      placeholder="—"
                      required
                      disabled={isPending}
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="inv-org"
                      className="text-[10px] font-semibold uppercase"
                      style={{
                        letterSpacing: '3px',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {t('KURUM', 'ORGANIZATION')}
                    </Label>
                    <Input
                      id="inv-org"
                      name="organization"
                      placeholder="—"
                      disabled={isPending}
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="inv-email"
                      className="text-[10px] font-semibold uppercase"
                      style={{
                        letterSpacing: '3px',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {t('E-POSTA', 'EMAIL')}
                    </Label>
                    <Input
                      id="inv-email"
                      name="email"
                      type="email"
                      placeholder="—"
                      required
                      disabled={isPending}
                      className={inputClass}
                    />
                  </div>

                  {/*
                shadcn Select does not natively post its value through a <form>.
                We render a visible Select for UX, and sync it to a hidden <input name="investor_type">.
              */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="inv-type"
                      className="text-[10px] font-semibold uppercase"
                      style={{
                        letterSpacing: '3px',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {t('YATIRIMCI TİPİ', 'INVESTOR TYPE')}
                    </Label>
                    <input ref={selectRef} type="hidden" name="investor_type" />
                    <Select
                      disabled={isPending}
                      onValueChange={(val) => {
                        if (selectRef.current) selectRef.current.value = val;
                      }}
                    >
                      <SelectTrigger
                        id="inv-type"
                        className="w-full bg-transparent border-0 border-b border-white/18 rounded-none px-0 text-white focus:ring-0 data-[placeholder]:text-white/30"
                      >
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                        <SelectItem value="angel">
                          {t('Melek Yatırımcı', 'Angel')}
                        </SelectItem>
                        <SelectItem value="vc">
                          {t('Risk Sermayesi', 'VC')}
                        </SelectItem>
                        <SelectItem value="corporate">
                          {t('Kurumsal', 'Corporate')}
                        </SelectItem>
                        <SelectItem value="family">
                          {t('Aile Ofisi', 'Family Office')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {state.status === 'error' && (
                    <Alert variant="destructive" className="rounded-none">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-[13px]">
                        {state.error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 rounded-none uppercase"
                    style={{
                      background: '#E03A3A',
                      color: '#0A0A0A',
                      fontSize: '12px',
                      letterSpacing: '2.5px',
                      fontWeight: 600,
                      padding: '18px 36px',
                      height: 'auto',
                      opacity: isPending ? 0.7 : 1,
                    }}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('Gönderiliyor...', 'Sending...')}
                      </>
                    ) : (
                      t('Pitch Deck Talep Et', 'Request Pitch Deck')
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
