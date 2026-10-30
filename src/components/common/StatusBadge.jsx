import React from 'react';
import {
  CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck,
  FileText, HelpCircle, Check
} from 'lucide-react';

const STATUS_MAP = {
  // Application statuses
  approved: { label: 'Approved', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  'under review': { label: 'Under Review', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },
  'initial scrutiny': { label: 'Initial Scrutiny', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: Clock },
  'deficiency review': { label: 'Deficiency Review', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: AlertTriangle },
  'application submitted': { label: 'Submitted', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', icon: FileText },
  rejected: { label: 'Rejected', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: XCircle },

  // Deficiency statuses
  'pending response': { label: 'Pending Response', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: AlertTriangle },
  'submitted / under review': { label: 'Submitted / In Review', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },
  'resolved & verified': { label: 'Resolved & Verified', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: ShieldCheck },
  resolved: { label: 'Resolved', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: Check },

  // Document & Lease statuses
  verified: { label: 'Verified', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: ShieldCheck },
  valid: { label: 'Valid', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  'expiring soon': { label: 'Expiring Soon', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', icon: AlertTriangle },
  expired: { label: 'Expired', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: XCircle },
  'under scrutiny': { label: 'Under Scrutiny', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },

  // Compliance / Undertaking statuses
  compliant: { label: 'Compliant', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: ShieldCheck },
  'needs attention': { label: 'Needs Attention', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: AlertTriangle },
  'non-compliant': { label: 'Non-Compliant', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: XCircle },
  overdue: { label: 'Overdue', bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', icon: AlertTriangle },
  submitted: { label: 'Submitted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Check },
  pending: { label: 'Pending', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', icon: Clock },

  // Priority
  critical: { label: 'Critical', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: AlertTriangle },
  high: { label: 'High', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: AlertTriangle },
  medium: { label: 'Medium', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Clock },
  low: { label: 'Low', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', icon: Clock },
};

export default function StatusBadge({ status, customLabel, size = 'md', className = '' }) {
  if (!status) return null;
  const key = String(status).toLowerCase().trim();
  const config = STATUS_MAP[key] || {
    label: status,
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
    icon: HelpCircle,
  };

  const Icon = config.icon;
  const label = customLabel || config.label;

  const sizeClasses = size === 'sm'
    ? 'text-xs px-2 py-0.5 gap-1'
    : size === 'lg'
    ? 'text-sm px-3 py-1 gap-1.5 font-medium'
    : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{label}</span>
    </span>
  );
}
