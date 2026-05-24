'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import modular dashboard components
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { SubmissionsTable } from '@/components/dashboard/SubmissionsTable';
import { SubmissionDetailModal } from '@/components/dashboard/SubmissionDetailModal';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Raw Submissions Data State
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [investorSubmissions, setInvestorSubmissions] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [langFilter, setLangFilter] = useState('all');

  // Interaction Modal States
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [submissionType, setSubmissionType] = useState<
    'contact' | 'investor' | null
  >(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // 1. Authenticate session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabaseBrowserClient.auth.getSession();
        if (!session) {
          router.push('/login');
        } else {
          setUser(session.user);
          await fetchSubmissions();
        }
      } catch (err: any) {
        console.error('Auth check failed:', err);
        router.push('/login');
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();

    // Listen to changes in auth state (e.g. logout elsewhere)
    const {
      data: { subscription },
    } = supabaseBrowserClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        router.push('/login');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // 2. Fetch submission logs from Supabase
  const fetchSubmissions = async () => {
    setDataLoading(true);
    setErrorMsg(null);
    try {
      const [contactRes, investorRes] = await Promise.all([
        supabaseBrowserClient
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false }),
        supabaseBrowserClient
          .from('investor_submissions')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (contactRes.error) throw contactRes.error;
      if (investorRes.error) throw investorRes.error;

      setContactSubmissions(contactRes.data || []);
      setInvestorSubmissions(investorRes.data || []);
    } catch (err: any) {
      console.error('Database fetch failed:', err);
      setErrorMsg(err.message || 'Failed to load submission lists.');
    } finally {
      setDataLoading(false);
    }
  };

  // 3. Logout trigger
  const handleLogout = async () => {
    try {
      await supabaseBrowserClient.auth.signOut();
      router.push('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // 4. Calculate dynamic summary statistics
  const stats = useMemo(() => {
    const totalContacts = contactSubmissions.length;
    const totalInvestors = investorSubmissions.length;
    const grandTotal = totalContacts + totalInvestors;

    const pendingContacts = contactSubmissions.filter(
      (c) => c.status === 'pending',
    ).length;
    const pendingInvestors = investorSubmissions.filter(
      (i) => i.status === 'pending',
    ).length;
    const totalPending = pendingContacts + pendingInvestors;

    return {
      grandTotal,
      totalContacts,
      totalInvestors,
      totalPending,
    };
  }, [contactSubmissions, investorSubmissions]);

  // 5. Apply filters to contacts
  const filteredContacts = useMemo(() => {
    return contactSubmissions.filter((item) => {
      const matchesSearch =
        item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter;
      const matchesLang = langFilter === 'all' || item.lang === langFilter;

      return matchesSearch && matchesStatus && matchesLang;
    });
  }, [contactSubmissions, searchQuery, statusFilter, langFilter]);

  // 6. Apply filters to investors
  const filteredInvestors = useMemo(() => {
    return investorSubmissions.filter((item) => {
      const matchesSearch =
        item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.investor_type?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter;
      const matchesLang = langFilter === 'all' || item.lang === langFilter;

      return matchesSearch && matchesStatus && matchesLang;
    });
  }, [investorSubmissions, searchQuery, statusFilter, langFilter]);

  // 7. Open row details callback
  const handleRowClick = (submission: any, type: 'contact' | 'investor') => {
    setSelectedSubmission(submission);
    setSubmissionType(type);
    setShowDeleteConfirm(false);
    setActionError(null);
  };

  // 8. Save updated note/status details
  const handleSaveModalDetails = async (status: string, notes: string) => {
    if (!selectedSubmission || !submissionType) return;
    setIsSaving(true);
    setActionError(null);

    const table =
      submissionType === 'contact'
        ? 'contact_submissions'
        : 'investor_submissions';

    try {
      const { error } = await supabaseBrowserClient
        .from(table)
        .update({
          status,
          notes: notes.trim() || null,
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      // Reactively update local view state
      if (submissionType === 'contact') {
        setContactSubmissions((prev) =>
          prev.map((item) =>
            item.id === selectedSubmission.id
              ? { ...item, status, notes: notes.trim() || null }
              : item,
          ),
        );
      } else {
        setInvestorSubmissions((prev) =>
          prev.map((item) =>
            item.id === selectedSubmission.id
              ? { ...item, status, notes: notes.trim() || null }
              : item,
          ),
        );
      }

      setSelectedSubmission(null);
      setSubmissionType(null);
    } catch (err: any) {
      console.error('Save submission error:', err);
      setActionError(err.message || 'Failed to update record.');
    } finally {
      setIsSaving(false);
    }
  };

  // 9. Delete entry callback
  const handleDeleteModalEntry = async () => {
    if (!selectedSubmission || !submissionType) return;
    setIsSaving(true);
    setActionError(null);

    const table =
      submissionType === 'contact'
        ? 'contact_submissions'
        : 'investor_submissions';

    try {
      const { error } = await supabaseBrowserClient
        .from(table)
        .delete()
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      // Reactively remove deleted entry
      if (submissionType === 'contact') {
        setContactSubmissions((prev) =>
          prev.filter((item) => item.id !== selectedSubmission.id),
        );
      } else {
        setInvestorSubmissions((prev) =>
          prev.filter((item) => item.id !== selectedSubmission.id),
        );
      }

      setSelectedSubmission(null);
      setSubmissionType(null);
      setShowDeleteConfirm(false);
    } catch (err: any) {
      console.error('Delete submission error:', err);
      setActionError(err.message || 'Failed to delete record.');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper formatting methods passed to children
  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/15 rounded-none font-medium">
            Pending
          </Badge>
        );
      case 'reviewed':
      case 'contacted':
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/15 rounded-none font-medium">
            Reviewed
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/15 rounded-none font-medium">
            Approved
          </Badge>
        );
      case 'declined':
      case 'archived':
        return (
          <Badge className="bg-white/10 text-white/50 border-white/10 hover:bg-white/15 rounded-none font-medium">
            Archived
          </Badge>
        );
      default:
        return (
          <Badge className="bg-white/10 text-white/60 border-white/10 rounded-none font-medium">
            {status}
          </Badge>
        );
    }
  };

  // Load screen for user authentication confirmation
  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#E03A3A] mb-4" />
        <span className="text-xs uppercase tracking-[3px] text-white/50">
          Securing Session...
        </span>
      </main>
    );
  }

  // Dashboard Page Assembly
  return (
    <div className="dark min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans">
      <DashboardHeader userEmail={user?.email} onLogout={handleLogout} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Intro Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-2 border-[#E03A3A] pl-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">
              Submissions{' '}
              <b className="font-medium" style={{ color: '#E03A3A' }}>
                Dashboard
              </b>
            </h1>
            <p className="text-xs text-white/50 font-light mt-1 max-w-[600px] tracking-[0.5px]">
              Manage contact queries and investor applications received from the
              main landing page. Review submissions, update internal process
              status, and log administrator notes.
            </p>
          </div>
          <Button
            onClick={fetchSubmissions}
            disabled={dataLoading}
            className="rounded-none bg-[#141414] border border-white/10 hover:border-[#E03A3A]/40 text-white hover:bg-[#1E1E1E] text-xs uppercase tracking-[2px] px-4 cursor-pointer font-semibold flex items-center h-10"
          >
            <RefreshCw
              className={cn(
                'w-3.5 h-3.5 mr-2 text-[#E03A3A]',
                dataLoading && 'animate-spin',
              )}
            />
            Refresh Database
          </Button>
        </div>

        {/* Database Statistics */}
        <DashboardStats stats={stats} dataLoading={dataLoading} />

        {/* Global Error Notice */}
        {errorMsg && (
          <Alert
            variant="destructive"
            className="bg-[#E03A3A]/10 border-[#E03A3A]/30 text-red-400 rounded-none"
          >
            <AlertCircle className="w-4 h-4 text-red-500" />
            <AlertDescription className="text-sm font-light">
              {errorMsg}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Layout Container */}
        <div className="bg-[#141414]/30 border border-white/5 rounded-none shadow-lg p-6 md:p-8 space-y-6">
          {/* Query Filter panel */}
          <DashboardFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            langFilter={langFilter}
            setLangFilter={setLangFilter}
          />

          {/* Submissions Tables Tabs */}
          {dataLoading ? (
            <div className="py-20 flex flex-col justify-center items-center text-white/45">
              <Loader2 className="w-8 h-8 animate-spin text-[#E03A3A] mb-3" />
              <span className="text-xs uppercase tracking-[2px]">
                Fetching data records...
              </span>
            </div>
          ) : (
            <SubmissionsTable
              filteredContacts={filteredContacts}
              filteredInvestors={filteredInvestors}
              onRowClick={handleRowClick}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
            />
          )}
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 text-center text-white/20 text-[10px] tracking-[1.5px] uppercase">
        © 2026 SKYSAFE. ALL RIGHTS RESERVED.
      </footer>

      {/* Details/Actions Dialog Modal */}
      <SubmissionDetailModal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        submission={selectedSubmission}
        type={submissionType}
        onSave={handleSaveModalDetails}
        onDelete={handleDeleteModalEntry}
        isSaving={isSaving}
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        actionError={actionError}
        formatDate={formatDate}
      />
    </div>
  );
}
