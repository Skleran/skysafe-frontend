"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

// SkySafe Logo component matching navigation bar
const SkySafeLogo = () => (
  <svg viewBox="0 0 120 120" className="w-8 h-8 shrink-0">
    <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="2" />
    <line x1="22" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="98" y1="100" x2="60" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="22" y1="100" x2="98" y2="100" stroke="white" strokeWidth="2" opacity="0.4" />
    <circle cx="60" cy="16" r="12" fill="#E03A3A" />
  </svg>
);

interface DashboardHeaderProps {
  userEmail?: string;
  onLogout: () => void;
}

export function DashboardHeader({ userEmail, onLogout }: DashboardHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 border-b border-white/5 bg-[#0A0A0A]/95 backdrop-blur-md"
      style={{ borderColor: "rgba(224,58,58,0.12)" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <SkySafeLogo />
          <div>
            <div className="font-medium text-white tracking-[6px] text-sm uppercase">SKYSAFE</div>
            <div className="text-[7.5px] font-semibold uppercase tracking-[2px] mt-0.5 text-[#E03A3A]">
              Console Management
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userEmail && (
            <div className="text-right hidden sm:block">
              <div className="text-xs text-white/80 font-medium">{userEmail}</div>
              <div className="text-[9px] text-[#E03A3A] font-medium tracking-[1.5px] uppercase">Administrator</div>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-white/10 hover:border-[#E03A3A] hover:bg-[#E03A3A]/10 text-white rounded-none cursor-pointer text-xs h-9 tracking-[1px] uppercase font-semibold px-3"
          >
            <LogOut className="w-3.5 h-3.5 mr-2 text-[#E03A3A]" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
