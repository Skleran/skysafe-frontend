'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, ChevronRight, Globe } from 'lucide-react';

interface SubmissionsTableProps {
  filteredContacts: any[];
  filteredInvestors: any[];
  onRowClick: (item: any, type: 'contact' | 'investor') => void;
  formatDate: (dateString: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function SubmissionsTable({
  filteredContacts,
  filteredInvestors,
  onRowClick,
  formatDate,
  getStatusBadge,
}: SubmissionsTableProps) {
  return (
    <Tabs defaultValue="contacts" className="w-full">
      {/* Responsive Tabs Selector: Stack vertically on mobile, horizontally on tablet/desktop */}
      <TabsList className="bg-[#1E1E1E]/50 border border-white/5 rounded-none p-1  flex flex-col sm:flex-row w-full sm:w-fit h-auto min-h-24 sm:min-h-auto sm:h-12 mb-6 gap-1.5">
        <TabsTrigger
          value="contacts"
          className="rounded-none w-full sm:w-auto data-[state=active]:bg-[#E03A3A] data-[state=active]:text-white text-white/60 cursor-pointer uppercase text-[10.5px] font-semibold tracking-[1.5px] px-6 py-2.5 text-center transition-colors"
        >
          General Inquiries ({filteredContacts.length})
        </TabsTrigger>
        <TabsTrigger
          value="investors"
          className="rounded-none w-full sm:w-auto data-[state=active]:bg-[#E03A3A] data-[state=active]:text-white text-white/60 cursor-pointer uppercase text-[10.5px] font-semibold tracking-[1.5px] px-6 py-2.5 text-center transition-colors"
        >
          Investor Applications ({filteredInvestors.length})
        </TabsTrigger>
      </TabsList>

      {/* Contacts Submissions Tab */}
      <TabsContent value="contacts" className="mt-0 outline-none">
        {filteredContacts.length === 0 ? (
          <div className="border border-dashed border-white/10 py-16 text-center text-white/45">
            <FileText className="w-10 h-10 mx-auto text-[#E03A3A]/40 mb-3" />
            <p className="text-sm font-light">
              No general inquiry submissions found.
            </p>
            <p className="text-xs text-white/30 font-light mt-1">
              Try resetting search queries or database filters.
            </p>
          </div>
        ) : (
          <div className="border border-white/5 overflow-hidden w-full overflow-x-auto">
            <div className="min-w-[800px] w-full">
              <Table>
                <TableHeader className="bg-[#1E1E1E]/40 border-b border-white/10">
                  <TableRow className="border-b border-white/5 hover:bg-transparent">
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Date
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Name
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Email
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Organization
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12 text-center">
                      Lang
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Status
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12 text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                      onClick={() => onRowClick(item, 'contact')}
                    >
                      <TableCell className="font-light text-xs text-white/70 h-14">
                        {formatDate(item.created_at)}
                      </TableCell>
                      <TableCell className="font-medium text-xs text-white h-14">
                        {item.full_name}
                      </TableCell>
                      <TableCell className="font-light text-xs text-white/70 h-14">
                        {item.email}
                      </TableCell>
                      <TableCell className="font-light text-xs text-white/65 h-14">
                        {item.organization || (
                          <span className="opacity-30">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center h-14">
                        <Badge
                          variant="outline"
                          className="border-white/10 text-white/50 text-[9px] uppercase tracking-[0.5px] font-normal rounded-none"
                        >
                          {item.lang || 'tr'}
                        </Badge>
                      </TableCell>
                      <TableCell className="h-14">
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="text-right h-14">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group-hover:text-[#E03A3A] text-white/50 hover:bg-transparent p-0 flex items-center gap-1.5 ml-auto text-xs"
                        >
                          View
                          <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </TabsContent>

      {/* Investors Submissions Tab */}
      <TabsContent value="investors" className="mt-0 outline-none">
        {filteredInvestors.length === 0 ? (
          <div className="border border-dashed border-white/10 py-16 text-center text-white/45">
            <FileText className="w-10 h-10 mx-auto text-[#E03A3A]/40 mb-3" />
            <p className="text-sm font-light">No investor submissions found.</p>
            <p className="text-xs text-white/30 font-light mt-1">
              Try resetting search queries or database filters.
            </p>
          </div>
        ) : (
          <div className="border border-white/5 overflow-hidden w-full overflow-x-auto">
            <div className="min-w-[850px] w-full">
              <Table>
                <TableHeader className="bg-[#1E1E1E]/40 border-b border-white/10">
                  <TableRow className="border-b border-white/5 hover:bg-transparent">
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Date
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Name
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Email
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Organization
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Investor Type
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12 text-center">
                      Lang
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12">
                      Status
                    </TableHead>
                    <TableHead className="text-white/60 text-[10px] tracking-[1.5px] uppercase font-semibold h-12 text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestors.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                      onClick={() => onRowClick(item, 'investor')}
                    >
                      <TableCell className="font-light text-xs text-white/70 h-14">
                        {formatDate(item.created_at)}
                      </TableCell>
                      <TableCell className="font-medium text-xs text-white h-14">
                        {item.full_name}
                      </TableCell>
                      <TableCell className="font-light text-xs text-white/70 h-14">
                        {item.email}
                      </TableCell>
                      <TableCell className="font-light text-xs text-white/65 h-14">
                        {item.organization || (
                          <span className="opacity-30">—</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-xs text-white/80 h-14">
                        <Badge className="bg-white/5 border border-white/10 text-white/80 rounded-none py-0.5 uppercase text-[9px] tracking-[0.5px]">
                          {item.investor_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center h-14">
                        <Badge
                          variant="outline"
                          className="border-white/10 text-white/50 text-[9px] uppercase tracking-[0.5px] font-normal rounded-none"
                        >
                          {item.lang || 'tr'}
                        </Badge>
                      </TableCell>
                      <TableCell className="h-14">
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="text-right h-14">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group-hover:text-[#E03A3A] text-white/50 hover:bg-transparent p-0 flex items-center gap-1.5 ml-auto text-xs"
                        >
                          View
                          <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
