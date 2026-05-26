'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ChevronRight, LogIn } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '#solutions', tr: 'Çözümler', en: 'Solutions' },
    { href: '#dualuse', tr: 'Dual-Use', en: 'Dual-Use' },
    { href: '#about', tr: 'Hakkımızda', en: 'About' },
    { href: '#partners', tr: 'Ortaklıklar', en: 'Partners' },
    { href: '#investor', tr: 'Yatırımcı', en: 'Investors' },
    { href: '#contact', tr: 'İletişim', en: 'Contact' },
  ];

  return (
    <div className="md:hidden flex items-center">
      {/* Animated Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-none border border-white/10 bg-white/[0.04] transition-all hover:border-[#E03A3A]/40 active:scale-95"
      >
        <div className="relative w-4 h-3">
          <span
            className={cn(
              'absolute left-0 top-0 h-[1.8px] w-full bg-white transition-all duration-300 ease-out rounded-none',
              isOpen && 'top-1 rotate-45 bg-[#E03A3A]',
            )}
          />
          <span
            className={cn(
              'absolute left-0 bottom-0 h-[1.8px] w-full bg-white transition-all duration-300 ease-out rounded-none',
              isOpen && 'bottom-1 -rotate-45 bg-[#E03A3A]',
            )}
          />
        </div>
        <span className="sr-only">Toggle Menu</span>
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[40] flex flex-col">
            {/* Blurred Backdrop */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Drawer Content */}
            <div className="relative w-[calc(100%-2rem)] mx-auto mt-24 flex flex-col rounded-none border border-white/[0.08] bg-[#0A0A0A]/95 p-6 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-6">
              {/* Mobile Login Button */}
              <div className="mb-4">
                <Button
                  asChild
                  className="w-full h-11 bg-[#E03A3A] hover:bg-[#E03A3A]/80 text-[#0A0A0A] font-bold text-xs tracking-widest uppercase transition-all rounded-none cursor-pointer flex items-center justify-center"
                >
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="no-underline flex items-center gap-2"
                  >
                    <LogIn />
                    {t('GİRİŞ YAP', 'LOG IN')}
                  </Link>
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col divide-y divide-white/[0.04]">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-between py-4 text-xs font-medium tracking-widest text-white/80 uppercase no-underline hover:text-white transition-colors group"
                    style={{
                      animationDelay: `${idx * 50}ms`,
                    }}
                  >
                    <span>{t(link.tr, link.en)}</span>
                    <ChevronRight className="w-4 h-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#E03A3A]" />
                  </Link>
                ))}
              </nav>

              {/* Language Selector at the Bottom */}
              <div className="flex items-center justify-between pt-6 pb-2 border-t border-white/[0.08] mt-4">
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  {t('DİL SEÇİMİ', 'SELECT LANGUAGE')}
                </span>
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.08] hover:border-[#E03A3A]/40 rounded-none p-0.5 transition-all"
                >
                  <span
                    className={cn(
                      'px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-none transition-all duration-200',
                      lang === 'tr'
                        ? 'bg-[#E03A3A] text-white shadow-md'
                        : 'text-white/50 hover:text-white',
                    )}
                  >
                    TR
                  </span>
                  <span
                    className={cn(
                      'px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-none transition-all duration-200',
                      lang === 'en'
                        ? 'bg-[#E03A3A] text-white shadow-md'
                        : 'text-white/50 hover:text-white',
                    )}
                  >
                    EN
                  </span>
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
