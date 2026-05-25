'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const ScrollRevealContext = createContext<{ isVisible: boolean }>({
  isVisible: false,
});

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  preset?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  preset = false,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(preset);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const finalRootMargin = isMobile ? '0px 0px 20px 0px' : rootMargin;

  useEffect(() => {
    if (preset) {
      // Schedule a 50ms delay on mount to trigger the preset transitions
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: finalRootMargin },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [preset, threshold, rootMargin]);

  return (
    <ScrollRevealContext.Provider value={{ isVisible }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ScrollRevealContext.Provider>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  direction?: 'none' | 'up' | 'down' | 'left' | 'right';
  preset?: boolean;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}

export function RevealItem({
  children,
  className = '',
  delayIndex = 0,
  direction = 'none',
  preset = false,
}: RevealItemProps) {
  const context = useContext(ScrollRevealContext);
  const isVisible = preset || context.isVisible;
  const prefersReducedMotion = usePrefersReducedMotion();

  // Stagger items by 150ms
  const delay = delayIndex * 150;

  const directionClasses = {
    none: 'translate-x-0 translate-y-0',
    up: 'translate-y-6',
    down: '-translate-y-6',
    left: 'translate-x-6',
    right: '-translate-x-6',
  };

  // If the user prefers reduced motion, disable transitions, transforms, and blurs
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialStyle: React.CSSProperties = {
    opacity: 0,
    filter: 'blur(8px)',
    transform: direction === 'none' ? 'none' : directionClasses[direction],
    transition:
      'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, filter, transform',
  };

  const activeStyle: React.CSSProperties = {
    opacity: 1,
    filter: 'blur(0px)',
    transform: 'translate-x-0 translate-y-0',
    transition:
      'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, filter, transform',
  };

  return (
    <div className={className} style={isVisible ? activeStyle : initialStyle}>
      {children}
    </div>
  );
}
