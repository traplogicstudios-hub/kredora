import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../lib/constants'
import PageShell from '../components/layout/PageShell'
import AIAnalysisBar from '../components/layout/AIAnalysisBar'

const STATUS_BADGES = [
  'Gemini Analysis Active',
  'Funding Criteria Loaded',
  'Advisor Report Ready',
  'Demo Environment',
]

const KPI_CARDS = [
  { label: 'Businesses Assessed', value: '124', valueColor: 'text-slate-900' },
  { label: 'Readiness Gaps Found', value: '317', valueColor: 'text-amber-600' },
  { label: 'Reports Generated', value: '86', valueColor: 'text-slate-900' },
  { label: 'Average Readiness Score', value: '68%', valueColor: 'text-amber-600' },
]

const TOP_READINESS_GAPS = [
  { label: 'Missing financial projections', pct: 68, color: 'bg-red-500' },
  { label: 'No grant narrative', pct: 61, color: 'bg-orange-500' },
  { label: 'Incomplete revenue records', pct: 54, color: 'bg-amber-500' },
  { label: 'No use-of-funds statement', pct: 49, color: 'bg-yellow-500' },
  { label: 'Formal business plan needed', pct: 44, color: 'bg-slate-400' },
]

const SCORE_DISTRIBUTION = [
  { label: 'Not Ready', range: '0–39 · 34%', count: 42, color: 'bg-red-500' },
  { label: 'Needs Work', range: '40–59 · 33%', count: 41, color: 'bg-amber-500' },
  { label: 'Almost Ready', range: '60–79 · 22%', count: 27, color: 'bg-blue-500' },
  { label: 'Strong Match', range: '80–100 · 10%', count: 14, color: 'bg-green-500' },
]

const SUPPORT_PROGRAMS = [
  {
    title: 'SBDC',
    description:
      'Free business advising, financial planning workshops, and application prep through your local Small Business Development Center.',
  },
  {
    title: 'Chamber programs',
    description:
      'Member grants, pitch nights, and local small business funds through your regional chamber of commerce.',
  },
  {
    title: 'Microloan resources',
    description:
      'Community lender and CDFI microloans for early-stage businesses with modest revenue and clear use of funds.',
  },
]

const DEMO_DATE = new Date().toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export default function EnterpriseDashboardPage() {
  const navigate = useNavigate()
  const maxGapCount = Math.max(...SCORE_DISTRIBUTION.map(d => d.count))

  return (
    <PageShell fullWidth>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-slate-400">
              Advisor Dashboard
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
              Organization Intelligence Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Aggregate funding readiness across businesses you support. Spot documentation gaps,
              track advisor reports, and launch new assessments in minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(ROUTES.ASSESS)}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
          >
            New Assessment
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_BADGES.map(badge => (
            <span
              key={badge}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-600"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {KPI_CARDS.map(kpi => (
            <div key={kpi.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{kpi.label}</div>
              <div className={`mt-1 text-3xl font-bold tracking-tight ${kpi.valueColor}`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-800">
          <AIAnalysisBar confidence={91} label="Gemini Pattern Analysis" />
          <div className="bg-slate-900 px-5 py-4">
            <div className="mb-2 text-sm font-semibold text-white">
              Funding readiness patterns across your portfolio
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Early-stage businesses most often stall on financial projections, grant narratives, and revenue
              documentation — not on basic identity items like EIN or bank accounts.{' '}
              <span className="font-semibold text-white">
                68% of recent assessments flagged missing projections before any competitive grant application.
              </span>{' '}
              Prioritize technical assistance and microloan readiness paths while entrepreneurs complete
              documentation gaps.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Recent assessments</h2>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Last 30 days</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="py-2.5 pl-4 text-left font-mono text-[9px] uppercase tracking-widest text-slate-400">
                    Business
                  </th>
                  <th className="py-2.5 px-4 text-left font-mono text-[9px] uppercase tracking-widest text-slate-400">
                    Readiness score
                  </th>
                  <th className="py-2.5 px-4 text-left font-mono text-[9px] uppercase tracking-widest text-slate-400">
                    Industry
                  </th>
                  <th className="py-2.5 px-4 text-left font-mono text-[9px] uppercase tracking-widest text-slate-400">
                    Date
                  </th>
                  <th className="py-2.5 pr-4 text-right font-mono text-[9px] uppercase tracking-widest text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 pl-4 text-sm font-medium text-slate-900">Autonomyx Solutions</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                      68
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">AI tech</td>
                  <td className="py-3 px-4 text-sm text-slate-500">{DEMO_DATE}</td>
                  <td className="py-3 pr-4 text-right">
                    <button
                      type="button"
                      onClick={() => navigate(ROUTES.REPORT)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Top readiness gaps</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                  Across assessed businesses · N = 124
                </span>
              </div>
              <div className="space-y-3">
                {TOP_READINESS_GAPS.map(gap => (
                  <div key={gap.label} className="flex items-center gap-3">
                    <div className="w-52 shrink-0 text-sm text-slate-600">{gap.label}</div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${gap.color}`} style={{ width: `${gap.pct}%` }} />
                    </div>
                    <div className="w-8 text-right font-mono text-xs font-semibold text-slate-700">
                      {gap.pct}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Score distribution</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                  Capital readiness bands
                </span>
              </div>
              <div className="flex items-end gap-3">
                {SCORE_DISTRIBUTION.map(d => {
                  const heightPct = (d.count / maxGapCount) * 100
                  return (
                    <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                      <div className="text-sm font-bold text-slate-700">{d.count}</div>
                      <div
                        className={`w-full rounded-t-md ${d.color} opacity-80`}
                        style={{ height: `${Math.max(heightPct * 1.2, 20)}px` }}
                      />
                      <div className="text-center">
                        <div className="text-xs font-semibold text-slate-700">{d.label}</div>
                        <div className="font-mono text-[9px] text-slate-400">{d.range}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-slate-900">Recommended support programs</h2>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                For businesses in your pipeline
              </span>
            </div>
            <div className="space-y-3">
              {SUPPORT_PROGRAMS.map(prog => (
                <div key={prog.title} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">{prog.title}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{prog.description}</p>
                  <button
                    type="button"
                    className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-500"
                  >
                    Learn more
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
