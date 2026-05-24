'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  AlertTriangle,
  Loader2,
  Trash2,
  Save,
  Globe,
  Copy,
  Check,
} from 'lucide-react';
import { Separator } from '../ui/separator';

interface SubmissionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: any;
  type: 'contact' | 'investor' | null;
  onSave: (status: string, notes: string) => Promise<void>;
  onDelete: () => Promise<void>;
  isSaving: boolean;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
  actionError: string | null;
  formatDate: (dateString: string) => string;
}

export function SubmissionDetailModal({
  isOpen,
  onClose,
  submission,
  type,
  onSave,
  onDelete,
  isSaving,
  showDeleteConfirm,
  setShowDeleteConfirm,
  actionError,
  formatDate,
}: SubmissionDetailModalProps) {
  const [editStatus, setEditStatus] = useState('pending');
  const [editNotes, setEditNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync internal states when submission details change
  useEffect(() => {
    if (submission) {
      setEditStatus(submission.status || 'pending');
      setEditNotes(submission.notes || '');
      setCopied(false);
    }
  }, [submission]);

  const handleCopyEmail = () => {
    if (!submission?.email) return;
    navigator.clipboard.writeText(submission.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave(editStatus, editNotes);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {/* sm:max-w-2xl resolves the desktop restricted width issue and avoids horizontal scrolling */}
      <DialogContent className="sm:max-w-2xl bg-[#141414] border border-white/10 text-white rounded-none p-8 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2 text-[#E03A3A] text-[9.5px] font-semibold tracking-[2px] uppercase">
            <FileText className="w-4 h-4" />
            Submission Details
          </div>
          <DialogTitle className="text-xl font-normal text-white mt-1">
            {submission?.full_name}
          </DialogTitle>
          <DialogDescription className="text-white/40 text-xs">
            Received on {formatDate(submission?.created_at)}
          </DialogDescription>
        </DialogHeader>

        {/* Action Errors Inside Modal */}
        {actionError && (
          <Alert
            variant="destructive"
            className="bg-[#E03A3A]/15 border-[#E03A3A]/40 text-red-400 rounded-none mb-4 py-2 px-3"
          >
            <AlertDescription className="text-xs font-light">
              {actionError}
            </AlertDescription>
          </Alert>
        )}

        {showDeleteConfirm ? (
          /* Delete Confirmation */
          <div className="bg-[#E03A3A]/5 border border-[#E03A3A]/30 p-5 space-y-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-[#E03A3A] shrink-0" />
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.5px]">
                  Confirm Submission Deletion
                </h4>
                <p className="text-xs text-white/60 mt-1 font-light leading-relaxed">
                  This action is permanent and cannot be undone. The record will
                  be permanently deleted from the database. Are you sure you
                  wish to proceed?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isSaving}
                className="border-white/10 hover:bg-[#1E1E1E] text-white rounded-none text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onDelete}
                disabled={isSaving}
                className="bg-[#E03A3A] hover:bg-[#C82828] text-white rounded-none text-xs flex items-center"
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                )}
                Delete Permanently
              </Button>
            </div>
          </div>
        ) : null}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[1.5px] text-white/40 block font-medium">
              Email Address
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${submission?.email}`}
                className="text-white hover:text-[#E03A3A] underline break-all font-light"
              >
                {submission?.email}
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyEmail}
                className="h-7 w-auto px-2 border border-white/5 hover:border-[#E03A3A]/30 text-white/50 hover:text-white rounded-none cursor-pointer flex items-center gap-1 text-[10px] uppercase tracking-[0.5px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[1.5px] text-white/40 block font-medium">
              Organization
            </span>
            <span className="text-white font-light">
              {submission?.organization || (
                <span className="text-white/20 italic">
                  No organization specified
                </span>
              )}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[1.5px] text-white/40 block font-medium">
              Submission Language
            </span>
            <span className="text-white uppercase font-light flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#E03A3A]" />
              {submission?.lang === 'tr' ? 'Turkish (TR)' : 'English (EN)'}
            </span>
          </div>

          {type === 'investor' && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[1.5px] text-white/40 block font-medium">
                Investor Type
              </span>
              <span className="text-white uppercase font-medium">
                <Badge className="bg-[#E03A3A]/10 border border-[#E03A3A]/30 text-[#E03A3A] rounded-none py-0.5 uppercase tracking-[0.5px]">
                  {submission?.investor_type}
                </Badge>
              </span>
            </div>
          )}
        </div>

        {type === 'contact' && (
          <div className="space-y-1.5 mb-6 border-t border-white/5 pt-5">
            <span className="text-[10px] uppercase tracking-[1.5px] text-white/40 block font-medium">
              Message Body
            </span>
            <div className="bg-[#1E1E1E]/50 border border-white/5 p-4 text-white/80 font-light text-xs whitespace-pre-wrap leading-relaxed max-h-[160px] overflow-y-auto">
              {submission?.message}
            </div>
          </div>
        )}

        {/* Action Panel */}
        <div className="border-t border-white/5 pt-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Select Control using shadcn Select */}
            <div className="space-y-2">
              <Label
                htmlFor="modal-status-select"
                className="text-[10px] uppercase tracking-[1.5px] text-white/50 font-semibold"
              >
                Processing Status
              </Label>
              <Select
                value={editStatus}
                onValueChange={setEditStatus}
                disabled={isSaving || showDeleteConfirm}
              >
                <SelectTrigger
                  id="modal-status-select"
                  className="w-full bg-[#1E1E1E] border border-white/10 text-white/80 rounded-none h-10 px-3 text-xs focus-visible:border-[#E03A3A] cursor-pointer"
                >
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border border-white/10 text-white rounded-none">
                  {type === 'contact' ? (
                    <>
                      <SelectItem
                        className="focus:bg-[#E03A3A] focus:text-white cursor-pointer"
                        value="pending"
                      >
                        Pending Review
                      </SelectItem>
                      <SelectItem
                        className="focus:bg-[#E03A3A] focus:text-white cursor-pointer"
                        value="reviewed"
                      >
                        Reviewed / Logged
                      </SelectItem>
                      <SelectItem
                        className="focus:bg-[#E03A3A] focus:text-white cursor-pointer"
                        value="archived"
                      >
                        Archived
                      </SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem
                        className="focus:bg-[#E03A3A] focus:text-white cursor-pointer"
                        value="pending"
                      >
                        Pending Review
                      </SelectItem>
                      <SelectItem
                        className="focus:bg-[#E03A3A] focus:text-white cursor-pointer"
                        value="contacted"
                      >
                        Contacted / In Discussion
                      </SelectItem>
                      <SelectItem
                        className="focus:bg-[#E03A3A] focus:text-white cursor-pointer"
                        value="approved"
                      >
                        Approved
                      </SelectItem>
                      <SelectItem
                        className="focus:bg-[#E03A3A] focus:text-white cursor-pointer"
                        value="declined"
                      >
                        Declined
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes Area */}
          <div className="space-y-2">
            <Label
              htmlFor="notes-area"
              className="text-[10px] uppercase tracking-[1.5px] text-white/50 font-semibold"
            >
              Administrator Log Notes
            </Label>
            <Textarea
              id="notes-area"
              rows={3}
              placeholder="Log email logs, action tasks, or details regarding follow-ups..."
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              disabled={isSaving || showDeleteConfirm}
              className="bg-[#1E1E1E] border-white/10 text-white/90 rounded-none placeholder:text-white/20 text-xs resize-none focus-visible:ring-[#E03A3A] focus-visible:border-[#E03A3A] leading-relaxed p-3"
            />
          </div>
        </div>

        {/* Modal Controls */}
        <DialogFooter className="border-t border-white/10 pt-3 mt-6 flex flex-col sm:flex-row w-full gap-0">
          {/* Mobile view footer - only shown on screens smaller than sm */}
          <div className="flex flex-col gap-3 w-full sm:hidden">
            <div className="flex gap-3 w-full">
              {!showDeleteConfirm && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isSaving}
                  className="flex-1 border-white/5 hover:border-[#E03A3A]/40 text-red-500 hover:text-red-400 bg-red-950/10 hover:bg-red-950/20 rounded-none text-xs uppercase tracking-[1px] h-10 font-semibold cursor-pointer flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-2" strokeWidth={2.5} />
                  Delete
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={isSaving || showDeleteConfirm}
                className="flex-1 bg-[#E03A3A] hover:bg-[#C82828] text-white rounded-none text-xs uppercase tracking-[1px] h-10 font-semibold cursor-pointer shadow-md flex items-center justify-center"
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                ) : (
                  <Save className="w-3.5 h-3.5 mr-2 pt-" />
                )}
                Save Changes
              </Button>
            </div>
            <Separator />
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
              className="w-full border-white/10 hover:bg-[#1E1E1E] text-white rounded-none text-xs uppercase tracking-[1px] h-10 font-semibold cursor-pointer"
            >
              Close
            </Button>
          </div>

          {/* Desktop view footer - hidden on mobile, shown on sm and up */}
          <div className="hidden sm:flex justify-between items-center w-full">
            <div>
              {!showDeleteConfirm && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isSaving}
                  className="border-white/5 hover:border-[#E03A3A]/40 text-red-500 hover:text-red-400 bg-red-950/10 hover:bg-red-950/20 rounded-none text-xs uppercase tracking-[1px] h-10 font-semibold cursor-pointer px-4"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-2" />
                  Delete Entry
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
                className="border-white/10 hover:bg-[#1E1E1E] text-white rounded-none text-xs uppercase tracking-[1px] h-10 font-semibold cursor-pointer px-4"
              >
                Close
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || showDeleteConfirm}
                className="bg-[#E03A3A] hover:bg-[#C82828] text-white rounded-none text-xs uppercase tracking-[1px] h-10 font-semibold cursor-pointer shadow-md flex items-center px-4"
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                ) : (
                  <Save className="w-3.5 h-3.5 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
