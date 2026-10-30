import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export default function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  trend,
  color = 'blue',
  onClick,
}) {
  const colorThemes = {
    blue: {
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#2563EB]',
      border: 'border-slate-200 hover:border-blue-300',
      highlight: 'text-[#123B70]',
    },
    navy: {
      iconBg: 'bg-indigo-50',
      iconColor: 'text-[#123B70]',
      border: 'border-slate-200 hover:border-indigo-300',
      highlight: 'text-[#123B70]',
    },
    green: {
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      border: 'border-slate-200 hover:border-emerald-300',
      highlight: 'text-emerald-950',
    },
    amber: {
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      border: 'border-slate-200 hover:border-amber-300',
      highlight: 'text-amber-950',
    },
    rose: {
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      border: 'border-slate-200 hover:border-rose-300',
      highlight: 'text-rose-950',
    },
  };

  const theme = colorThemes[color] || colorThemes.blue;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 ${
        theme.border
      } ${onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight ${theme.highlight}`}>
              {value}
            </span>
            {trend && (
              <span className="flex items-center text-xs font-semibold text-emerald-600">
                <TrendingUp className="mr-0.5 h-3 w-3" />
                {trend}
              </span>
            )}
          </div>
          {subtext && (
            <p className="mt-1 text-xs text-slate-500 truncate">
              {subtext}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconColor}`}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-400">
        <span>Sentinel Verified Demo</span>
        {onClick && (
          <span className="flex items-center gap-0.5 text-blue-600 font-medium hover:underline">
            View Details <ArrowUpRight className="h-3 w-3" />
          </span>
        )}
      </div>
    </div>
  );
}
