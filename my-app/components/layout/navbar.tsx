'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MobileMenu } from './mobile-menu';
import { LogIn } from 'lucide-react';

const SkySafeLogo = () => (
  <svg viewBox="0 0 120 120" aria-label="SkySafe" className="w-8 h-8 shrink-0">
    <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="2" />
    <line
      x1="22"
      y1="100"
      x2="60"
      y2="16"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="98"
      y1="100"
      x2="60"
      y2="16"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="22"
      y1="100"
      x2="98"
      y2="100"
      stroke="white"
      strokeWidth="2"
      opacity="0.4"
    />
    <circle cx="60" cy="16" r="12" fill="#E03A3A" />
  </svg>
);

// Reduced navigation links for desktop to allow more breathing room on the right side
const navLinks = [
  { href: '#solutions', tr: 'Çözümler', en: 'Solutions' },
  { href: '#about', tr: 'Hakkımızda', en: 'About' },
  { href: '#investor', tr: 'Yatırımcı', en: 'Investors' },
  { href: '#contact', tr: 'İletişim', en: 'Contact' },
];

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar if scrolled close to top, hide if scrolling down, show if scrolling up
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1240px] z-50 h-[68px] rounded-none border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-between px-6 md:px-10 transition-all duration-300 ease-in-out shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[-150%] opacity-0',
      )}
    >
      {/* Brand Logo and Name */}
      <Link href="#top" className="flex items-center gap-3 no-underline">
        <SkySafeLogo />
        <div>
          <div
            className="font-medium text-white tracking-[6px]"
            style={{ fontSize: '14px', lineHeight: '1.1' }}
          >
            SKYSAFE
          </div>
          <div
            className="text-[8px] font-semibold uppercase tracking-[2px] mt-0.5"
            style={{ color: '#E03A3A' }}
          >
            {t('HAVACILIK GÜVENLİĞİ', 'AVIATION SAFETY')}
          </div>
        </div>
      </Link>

      {/* Nav links — hidden on mobile */}
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-white/50 no-underline text-[12px] font-medium uppercase tracking-[1.5px] transition-colors duration-250 hover:text-white/70"
            >
              {t(link.tr, link.en)}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Side Actions: Language Selector (Desktop), Login Button (Desktop), and Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        {/* Language selector — hidden on mobile */}
        <div className="hidden md:block">
          <button
            onClick={toggleLang}
            className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.08] hover:border-[#E03A3A]/40 rounded-none p-0.5 transition-all cursor-pointer"
          >
            <span
              className={cn(
                'px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-none transition-all duration-200',
                lang === 'tr'
                  ? 'bg-[#E03A3A] text-white shadow-md'
                  : 'text-white/50 hover:text-white',
              )}
            >
              TR
            </span>
            <span
              className={cn(
                'px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-none transition-all duration-200',
                lang === 'en'
                  ? 'bg-[#E03A3A] text-white shadow-md'
                  : 'text-white/50 hover:text-white',
              )}
            >
              EN
            </span>
          </button>
        </div>

        {/* Login Button — hidden on mobile */}
        <div className="hidden md:block">
          <Button
            size="sm"
            asChild
            className="border-white/10 hover:border-[#E03A3A]/40 hover:bg-[#E03A3A] hover:text-[#0A0A0A] transition-all rounded-none text-[11px] tracking-widest font-semibold px-3"
          >
            <Link href="/login" className="flex items-center gap-2">
              <LogIn />
              {t('GİRİŞ YAP', 'LOG IN')}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu portal and trigger button */}
        <MobileMenu />
      </div>
    </nav>
  );
}
