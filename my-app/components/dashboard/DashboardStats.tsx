'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Briefcase, CheckCircle2 } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    grandTotal: number;
    totalContacts: number;
    totalInvestors: number;
    totalPending: number;
  };
  dataLoading: boolean;
}

export function DashboardStats({ stats, dataLoading }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-[#141414]/50 border-white/5 rounded-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-6 pt-6">
          <CardTitle className="text-md font-semibold tracking-[2px] uppercase text-white/55">
            Total Applications
          </CardTitle>
          <Users className="w-4 h-4 text-[#E03A3A] opacity-80" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-4xl font-light tracking-tight">
            {dataLoading ? '—' : stats.grandTotal}
          </div>
          <p className="text-[11px] text-white/35 font-light mt-1">
            Combined entries in system
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#141414]/50 border-white/5 rounded-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-6 pt-6">
          <CardTitle className="text-md font-semibold tracking-[2px] uppercase text-white/55">
            Contact Inquiries
          </CardTitle>
          <MessageSquare className="w-4 h-4 text-[#E03A3A] opacity-80" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-4xl font-light tracking-tight">
            {dataLoading ? '—' : stats.totalContacts}
          </div>
          <p className="text-[11px] text-white/35 font-light mt-1">
            General & support queries
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#141414]/50 border-white/5 rounded-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-6 pt-6">
          <CardTitle className="text-md font-semibold tracking-[2px] uppercase text-white/55">
            Investor Proposals
          </CardTitle>
          <Briefcase className="w-4 h-4 text-[#E03A3A] opacity-80" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-4xl font-light tracking-tight">
            {dataLoading ? '—' : stats.totalInvestors}
          </div>
          <p className="text-[11px] text-white/35 font-light mt-1">
            Venture Capital / Angel queries
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#141414]/50 border-white/5 rounded-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-6 pt-6">
          <CardTitle className="text-md font-semibold tracking-[2px] uppercase text-white/55">
            Action Required
          </CardTitle>
          <CheckCircle2 className="w-4 h-4 text-yellow-500 opacity-80" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-4xl font-light tracking-tight text-yellow-500">
            {dataLoading ? '—' : stats.totalPending}
          </div>
          <p className="text-[11px] text-white/35 font-light mt-1">
            Submissions marked as Pending
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
