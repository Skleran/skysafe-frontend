"use client";

import { useEffect, useRef } from "react";

interface FormSuccessProps {
  title: string;
  subtitle: string;
  /**
   * "dark"  → transparent wrapper, white text (for dark section backgrounds like Investor)
   * "light" → cream card with border, dark text (for light section backgrounds like Contact)
   */
  variant?: "dark" | "light";
}

export function FormSuccess({ title, subtitle, variant = "light" }: FormSuccessProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "scale(1) translateY(0)";
    });
  }, []);

  const isLight = variant === "light";

  const wrapStyle: React.CSSProperties = isLight
    ? {
        background: "#FAF8F8",
        border: "1px solid rgba(224,58,58,0.2)",
        padding: "56px 48px",
      }
    : {
        padding: "40px 0",
      };

  const titleColor = isLight ? "#0A0A0A" : "#ffffff";
  const subtitleColor = isLight ? "#6B6B6B" : "rgba(255,255,255,0.5)";

  // Split title on the trailing period so we can color it red
  const dotIndex = title.lastIndexOf(".");
  const titleText = dotIndex !== -1 ? title.slice(0, dotIndex) : title;
  const hasDot = dotIndex !== -1;

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center text-center w-full"
      style={{
        opacity: 0,
        transform: "scale(0.94) translateY(16px)",
        transition:
          "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        ...wrapStyle,
      }}
    >
      {/* Concentric rings + checkmark */}
      <div
        className="relative flex items-center justify-center mb-8"
        style={{ width: 120, height: 120 }}
      >
        {/* Outer pulse ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            border: `1px solid ${isLight ? "rgba(224,58,58,0.18)" : "rgba(224,58,58,0.2)"}`,
            animation: "ss-ring-pulse 2.4s ease-in-out infinite",
          }}
        />
        {/* Middle ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 92,
            height: 92,
            border: `1px solid ${isLight ? "rgba(224,58,58,0.32)" : "rgba(224,58,58,0.35)"}`,
            animation: "ss-ring-pulse 2.4s ease-in-out 0.3s infinite",
          }}
        />
        {/* Inner filled circle */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: 64,
            height: 64,
            background: "#E03A3A",
            animation: "ss-scale-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          }}
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            style={{ width: 28, height: 28, overflow: "visible" }}
          >
            <polyline
              points="6,14 12,20 22,9"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="30"
              strokeDashoffset="30"
              style={{
                animation:
                  "ss-check-draw 0.45s cubic-bezier(0.16,1,0.3,1) 0.45s forwards",
              }}
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-light mb-3"
        style={{
          fontSize: "clamp(24px,3vw,32px)",
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
          color: titleColor,
          animation: "ss-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.5s both",
        }}
      >
        {titleText}
        {hasDot && (
          <b className="font-medium" style={{ color: "#E03A3A" }}>
            .
          </b>
        )}
      </h3>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "14px",
          color: subtitleColor,
          fontWeight: 300,
          letterSpacing: "0.2px",
          animation: "ss-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.65s both",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
