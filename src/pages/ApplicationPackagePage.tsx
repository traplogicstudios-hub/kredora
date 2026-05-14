import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '../lib/constants'
import { useOpportunity } from '../hooks/useOpportunities'
import { useGeneratePackage } from '../hooks/useAI'
import type { GeneratedDocument } from '../lib/types'
import PageShell from '../components/layout/PageShell'

const DOC_CONFIDENCE: Record<string, { pct: number; note: string }> = {
  cover_letter: { pct: 88, note: 'Boilerplate sections high confidence. Verify owner contact details before sending.' },
  capability_statement: { pct: 92, note: 'Company data pulled from profile. Verify past performance details.' },
  executive_summary: { pct: 90, note: 'Tailored to the opportunity requirements. Review for accuracy.' },
  gap_action_plan: { pct: 85, note: 'Action items based on gap analysis. Timeline is an estimate.' },
  compliance_checklist: { pct: 95, note: 'Checklist is generalized. Cross-reference the actual RFP document.' },
}

const DOC_META: Record<string, { pages: number; subtitle: string }> = {
  cover_letter: { pages: 2, subtitle: 'On company letterhead' },
  capability_statement: { pages: 2, subtitle: '1–2 page summary' },
  executive_summary: { pages: 1, subtitle: 'For evaluation committee' },
  gap_action_plan: { pages: 3, subtitle: 'Execution timeline' },
  compliance_checklist: { pages: 1, subtitle: 'Submission readiness' },
}

function DocSidebarItem({
  doc, index, isActive, onClick,
}: { doc: GeneratedDocument; index: number; isActive: boolean; onClick: () => void }) {
  const meta = DOC_META[doc.type]
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg px-4 py-3 text-left transition-colors ${
        isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-700'
      }`}
    >
      <div className={`font-mono text-[9px] uppercase tracking-widest ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
        {String(index + 1).padStart(2, '0')} · {meta.pages}pp · {doc.wordCount}w
      </div>
      <div className={`text-sm font-semibold mt-0.5 ${isActive ? 'text-white' : 'text-slate-800'}`}>
        {doc.title}
      </div>
      <div className={`text-xs ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
        {meta.subtitle}
      </div>
    </button>
  )
}

export default function ApplicationPackagePage() {
  const { id } = useParams<{ id: string }>()
  const scoredOpp = useOpportunity(id ?? '')
  const { generate, isGenerating, pkg, error: generateError } = useGeneratePackage(id ?? '')
  const [activeDocIndex, setActiveDocIndex] = useState(0)
  const [reviewed, setReviewed] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!pkg || pkg.status === 'idle') {
      generate()
    }
  }, [])

  if (!scoredOpp) {
    return (
      <PageShell>
        <div className="py-20 text-center text-slate-400">Opportunity not found.</div>
      </PageShell>
    )
  }

  const opp = scoredOpp.opportunity
  const docs = pkg?.documents ?? []
  const activeDoc = docs[activeDocIndex]
  const totalWords = docs.reduce((s, d) => s + d.wordCount, 0)
  const totalPages = docs.reduce((s, d) => s + (DOC_META[d.type]?.pages ?? 1), 0)
  const avgConfidence = Math.round(
    Object.values(DOC_CONFIDENCE).reduce((s, c) => s + c.pct, 0) / Object.keys(DOC_CONFIDENCE).length
  )

  const handleCopy = () => {
    if (activeDoc) {
      navigator.clipboard.writeText(activeDoc.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleExport = () => {
    if (!activeDoc) return
    const blob = new Blob([activeDoc.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeDoc.type}_prime_clean_solutions.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PageShell>
      {/* Back */}
      <div className="mb-4">
        <Link
          to={ROUTES.OPPORTUNITY(opp.id)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
            <path d="M13 8H3M7 12l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to opportunity
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-slate-400">
          Application Package · {opp.title}
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {isGenerating ? 'Generating your documents…' : '5 documents drafted, ready for your review.'}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Pulled from your business profile and the requirements published by the issuing source.
              Edit anything inline. Confidence notes flag where to double-check.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 ml-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
              Generated · Mock-safe
            </span>
            <button
              onClick={() => generate()}
              disabled={isGenerating}
              className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} stroke="currentColor" strokeWidth="2">
                <path d="M2 8a6 6 0 1 1 12 0" strokeLinecap="round" />
              </svg>
              Regenerate all
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v8M5 7l3 3 3-3M2 12h12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export package
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isGenerating && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600" />
            <div className="text-sm font-medium text-slate-600">Generating your application package…</div>
            <div className="mt-1 text-xs text-slate-400">This takes about 5–10 seconds</div>
          </div>
        </div>
      )}

      {/* Main layout */}
      {!isGenerating && docs.length === 0 && pkg != null && pkg.status !== 'generating' && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-6 py-10 text-center">
          <p className="text-sm font-medium text-amber-900">
            {pkg.status === 'error'
              ? generateError ?? 'Something went wrong while generating your package.'
              : 'No documents are available yet.'}
          </p>
          <p className="mt-2 text-xs text-amber-800">
            No guarantee of funding or award — you can try again or return to the opportunity to review requirements.
          </p>
          <button
            type="button"
            onClick={() => generate()}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {!isGenerating && docs.length > 0 && (
        <div className="grid grid-cols-[260px_1fr] gap-6 items-start">
          {/* Sidebar */}
          <div className="space-y-1">
            {docs.map((doc, i) => (
              <DocSidebarItem
                key={doc.id}
                doc={doc}
                index={i}
                isActive={i === activeDocIndex}
                onClick={() => setActiveDocIndex(i)}
              />
            ))}

            {/* Package summary */}
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="mb-3 font-mono text-[9px] uppercase tracking-widest text-slate-400">Package Total</div>
              <div className="space-y-1.5">
                {[
                  { label: 'Documents', value: docs.length },
                  { label: 'Pages', value: totalPages },
                  { label: 'Words', value: totalWords.toLocaleString() },
                  { label: 'Avg confidence', value: `${avgConfidence}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{label}</span>
                    <span className="text-xs font-semibold text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Document viewer */}
          {activeDoc && (
            <div className="min-h-0">
              {/* Doc header */}
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{activeDoc.title}</h2>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    {DOC_META[activeDoc.type]?.pages} pages ·{' '}
                    {activeDoc.wordCount} words · Draft
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generate()}
                    className="flex items-center gap-1 rounded border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2">
                      <path d="M2 8a6 6 0 1 1 12 0" strokeLinecap="round" />
                    </svg>
                    Regenerate
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    {copied ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-green-600" stroke="currentColor" strokeWidth="2">
                          <polyline points="2,8 6,12 14,4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2">
                          <rect x="5" y="5" width="8" height="9" rx="1" />
                          <path d="M11 5V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1h1" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-1 rounded border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="2">
                      <path d="M8 2v8M5 7l3 3 3-3M2 12h12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>

              {/* AI confidence bar */}
              {DOC_CONFIDENCE[activeDoc.type] && (
                <div className="mb-3 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="font-mono text-[10px] font-semibold text-primary-600">
                      AI Confidence {DOC_CONFIDENCE[activeDoc.type].pct}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{DOC_CONFIDENCE[activeDoc.type].note}</span>
                </div>
              )}

              {/* Document content */}
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                {/* File header bar */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-slate-400" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="2" width="10" height="12" rx="1.5" />
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {activeDoc.type.replace('_', '_')}.draft
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Editable</span>
                    <span className="font-mono text-[10px] text-slate-400">Auto-saved · 10:31 PM</span>
                  </div>
                </div>

                {/* Scrollable document text */}
                <div className="h-[480px] overflow-y-auto px-8 py-6">
                  <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                    {activeDoc.content}
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-amber-500" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 2L2 14h12L8 2z" /><path d="M8 7v3M8 11.5v.5" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      No guarantee of funding or award · Always review before submission
                    </span>
                  </div>
                  <button
                    onClick={() => setReviewed(prev => new Set([...prev, activeDoc.id]))}
                    className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                      reviewed.has(activeDoc.id)
                        ? 'bg-green-50 text-green-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {reviewed.has(activeDoc.id) ? (
                      <>
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                          <polyline points="2,6 5,9 10,3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Reviewed
                      </>
                    ) : 'Mark as reviewed'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </PageShell>
  )
}
