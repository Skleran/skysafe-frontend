"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  langFilter: string;
  setLangFilter: (lang: string) => void;
}

export function DashboardFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  langFilter,
  setLangFilter,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <Input
          type="text"
          placeholder="Search by name, email, organization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#1E1E1E]/40 border-white/10 hover:border-white/20 text-white rounded-none pl-10 focus-visible:ring-[#E03A3A] focus-visible:border-[#E03A3A] placeholder:text-white/25 h-10 text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* shadcn UI Select Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[1px] text-white/40 font-semibold">Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-[#1E1E1E]/80 border border-white/10 text-white/80 rounded-none h-10 px-3 text-xs focus-visible:border-b-[#E03A3A] focus-visible:ring-[#E03A3A] cursor-pointer">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#141414] border-white/10 text-white rounded-none">
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="all">All Statuses</SelectItem>
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="pending">Pending</SelectItem>
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="reviewed">Reviewed / Contacted</SelectItem>
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="approved">Approved</SelectItem>
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="declined">Declined</SelectItem>
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[1px] text-white/40 font-semibold">Lang:</span>
          <Select value={langFilter} onValueChange={setLangFilter}>
            <SelectTrigger className="w-[140px] bg-[#1E1E1E]/80 border border-white/10 text-white/80 rounded-none h-10 px-3 text-xs focus-visible:border-b-[#E03A3A] focus-visible:ring-[#E03A3A] cursor-pointer">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-[#141414] border-white/10 text-white rounded-none">
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="all">All Languages</SelectItem>
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="tr">TR</SelectItem>
              <SelectItem className="focus:bg-[#E03A3A] focus:text-white cursor-pointer" value="en">EN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
