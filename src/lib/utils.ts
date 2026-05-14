import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ReadinessLabel, OpportunityType, GapSeverity } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scoreToLabel(score: number): ReadinessLabel {
  if (score >= 80) return 'Strong Match'
  if (score >= 60) return 'Almost Ready'
  if (score >= 40) return 'Needs Work'
  return 'Not Ready'
}

export function scoreToColor(score: number): string {
  if (score >= 80) return 'text-score-strong'
  if (score >= 60) return 'text-score-almost'
  if (score >= 40) return 'text-score-needs'
  return 'text-score-notready'
}

export function scoreToBgColor(score: number): string {
  if (score >= 80) return 'bg-green-50 border-green-200'
  if (score >= 60) return 'bg-lime-50 border-lime-200'
  if (score >= 40) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}

export function scoreToRingColor(score: number): string {
  if (score >= 80) return '#16a34a'
  if (score >= 60) return '#65a30d'
  if (score >= 40) return '#d97706'
  return '#dc2626'
}

export function opportunityTypeLabel(type: OpportunityType): string {
  const labels: Record<OpportunityType, string> = {
    federal_contract: 'Federal Contract',
    state_contract: 'State Contract',
    grant: 'Grant',
    supplier_diversity: 'Supplier Diversity',
    loan: 'SBA Loan',
    bond: 'Bonding',
  }
  return labels[type]
}

export function opportunityTypeBadgeColor(type: OpportunityType): string {
  const colors: Record<OpportunityType, string> = {
    federal_contract: 'bg-blue-100 text-blue-800',
    state_contract: 'bg-indigo-100 text-indigo-800',
    grant: 'bg-purple-100 text-purple-800',
    supplier_diversity: 'bg-teal-100 text-teal-800',
    loan: 'bg-orange-100 text-orange-800',
    bond: 'bg-slate-100 text-slate-700',
  }
  return colors[type]
}

export function severityColor(severity: GapSeverity): string {
  if (severity === 'blocking') return 'text-red-700 bg-red-50 border-red-200'
  if (severity === 'major') return 'text-amber-700 bg-amber-50 border-amber-200'
  return 'text-slate-600 bg-slate-50 border-slate-200'
}

export function severityLabel(severity: GapSeverity): string {
  if (severity === 'blocking') return 'Blocking'
  if (severity === 'major') return 'Major'
  return 'Minor'
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}

export function formatDeadline(iso?: string): string {
  if (!iso) return 'Rolling'
  const d = new Date(iso)
  const now = new Date()
  const diffDays = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'Closed'
  if (diffDays <= 7) return `${diffDays}d left`
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}w left`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}
