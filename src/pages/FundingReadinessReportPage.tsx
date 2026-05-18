import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'
import {
  ROUTES,
  KREDORA_DISCLAIMER,
  SCORE_CATEGORY_LABELS,
  MATCH_LEVEL_BADGE_CLASS,
} from '../lib/constants'
import { MOCK_READINESS_REPORT } from '../lib/ai/mockResponses'
import { formatAdvisorReportText } from '../lib/utils/advisorReportText'
import { useAssessment } from '../hooks/useAssessment'
import PageShell from '../components/layout/PageShell'
import type { ScoreBreakdown } from '../lib/types'

function ScoreGauge({ score }: { score: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative mx-auto h-36 w-36">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-900">{score}</span>
        <span className="text-xs text-slate-500">/ 100</span>
      </div>
    </div>
  )
}

function BreakdownTable({ breakdown }: { breakdown: ScoreBreakdown }) {
  const entries = Object.entries(breakdown) as [keyof ScoreBreakdown, number][]
  return (
    <div className="space-y-3">
      {entries.map(([key, value]) => (
        <div key={key} className="flex items-center justify-between gap-4 text-sm">
          <span className="min-w-[140px] text-slate-600">{SCORE_CATEGORY_LABELS[key]}</span>
          <div className="flex flex-1 items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary-500 transition-all duration-700"
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="w-8 text-right font-semibold text-slate-900">{value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FundingReadinessReportPage() {
  const { assessment, readinessReport } = useAssessment()
  const report = readinessReport ?? MOCK_READINESS_REPORT
  const businessName = assessment.businessName || 'Autonomyx Solutions'
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  const handleCopy = async () => {
    const text = formatAdvisorReportText(report, businessName)
    try {
      await navigator.clipboard.writeText(text)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('failed')
      setTimeout(() => setCopyState('idle'), 3000)
    }
  }

  const copyLabel =
    copyState === 'copied'
      ? 'Copied!'
      : copyState === 'failed'
        ? 'Copy unavailable'
        : 'Copy Advisor Report'

  return (
    <PageShell>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-primary-600">
            Funding Readiness Report
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Advisor-ready intelligence for {businessName}
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            to={ROUTES.ASSESS}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            New Assessment
          </Link>
          <button
            type="button"
            onClick={() => void handleCopy()}
            disabled={copyState === 'failed'}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
              copyState === 'copied'
                ? 'bg-green-700 hover:bg-green-700'
                : copyState === 'failed'
                  ? 'cursor-not-allowed bg-slate-400'
                  : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {copyLabel}
          </button>
        </div>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <ScoreGauge score={report.overallScore} />
          <p className="mt-3 text-sm font-semibold text-slate-900">Capital Readiness Score</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Score Breakdown</h2>
          <BreakdownTable breakdown={report.scoreBreakdown} />
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-slate-900 p-6 text-slate-100 shadow-sm">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Gemini Analysis
        </p>
        <p className="leading-relaxed">{report.aiSummary}</p>
      </div>

      <h2 className="mb-4 text-lg font-semibold text-slate-900">Funding Path Recommendations</h2>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {report.fundingPaths.map(path => (
          <div
            key={path.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug text-slate-900">{path.name}</h3>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${MATCH_LEVEL_BADGE_CLASS[path.matchLevel]}`}
              >
                {path.matchLevel} match
              </span>
            </div>
            <p className="mb-2 text-sm text-slate-600">
              <span className="font-medium text-slate-800">Why it fits: </span>
              {path.whyItFits}
            </p>
            <p className="mb-2 text-sm text-slate-600">
              <span className="font-medium text-slate-800">What to verify: </span>
              {path.whatToVerify}
            </p>
            <p className="mb-2 text-sm text-slate-600">
              <span className="font-medium text-slate-800">Documents needed: </span>
              {path.documentsNeeded.join(', ')}
            </p>
            <p className="text-sm text-primary-700">
              <span className="font-medium">Next step: </span>
              {path.nextStep}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-slate-900">Readiness Gap Analysis</h2>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <GapSection title="Completed" items={report.gapAnalysis.completed} variant="green" />
        <GapSection title="Needs Work" items={report.gapAnalysis.needsWork} variant="amber" />
        <GapSection title="Risk Flags" items={report.gapAnalysis.riskFlags} variant="red" />
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 border-l-4 border-l-indigo-500 bg-white p-6 pl-5 shadow-sm">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-indigo-600">
          Advisor Notes
        </p>
        <p className="italic leading-relaxed text-slate-700">{report.advisorNotes}</p>
      </div>

      <div className="mb-8 rounded-xl bg-indigo-50 p-6">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-indigo-600">
          For the Business Owner
        </p>
        <p className="leading-relaxed text-slate-800">{report.entrepreneurSummary}</p>
      </div>

      <p className="text-center text-xs text-slate-500">{KREDORA_DISCLAIMER}</p>
    </PageShell>
  )
}

function GapSection({
  title,
  items,
  variant,
}: {
  title: string
  items: string[]
  variant: 'green' | 'amber' | 'red'
}) {
  const Icon =
    variant === 'green' ? CheckCircle2 : variant === 'amber' ? AlertTriangle : AlertCircle
  const iconColor =
    variant === 'green'
      ? 'text-green-600'
      : variant === 'amber'
        ? 'text-amber-600'
        : 'text-red-600'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
      <ul className="space-y-2.5">
        {items.map(item => (
          <li key={item} className="flex gap-2 text-sm text-slate-700">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconColor}`} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
