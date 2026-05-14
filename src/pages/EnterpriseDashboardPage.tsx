import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../lib/constants'
import AIAnalysisBar from '../components/layout/AIAnalysisBar'

const TOP_BLOCKERS = [
  { label: 'No capability statement', pct: 72, color: 'bg-red-500' },
  { label: 'No SBE/MBE certification', pct: 67, color: 'bg-orange-500' },
  { label: 'No SAM.gov / UEI', pct: 58, color: 'bg-amber-500' },
  { label: 'Missing insurance documentation', pct: 41, color: 'bg-yellow-500' },
  { label: 'Under 1 year in business', pct: 23, color: 'bg-slate-400' },
]

const READINESS_DISTRIBUTION = [
  { label: 'Not Ready', range: '0–39 · 34%', count: 142, color: 'bg-red-500' },
  { label: 'Needs Work', range: '40–59 · 33%', count: 138, color: 'bg-amber-500' },
  { label: 'Almost Ready', range: '60–79 · 22%', count: 92, color: 'bg-blue-500' },
  { label: 'Strong Match', range: '80–100 · 10%', count: 40, color: 'bg-green-500' },
]

const INDUSTRY_DEMAND = [
  { label: 'Commercial cleaning', count: 86, pct: 21 },
  { label: 'Construction & trades', count: 71, pct: 17 },
  { label: 'Professional services', count: 64, pct: 16 },
  { label: 'Food & catering', count: 48, pct: 12 },
  { label: 'Transportation', count: 39, pct: 10 },
  { label: 'Other', count: 104, pct: 24 },
]

const STRATEGIC_INSIGHTS = [
  {
    metric: '5 opps', metricLabel: 'Unlocked', priority: 'HIGH', category: 'QUICK WIN',
    title: 'Register on SAM.gov this week',
    body: 'Currently ineligible for 5 of 14 identified opportunities due to missing SAM.gov registration. Completing this free registration unlocks $3M+ in federal and state contract eligibility.',
  },
  {
    metric: '+18%', metricLabel: 'YoY Spend', priority: 'HIGH', category: 'MARKET TREND',
    title: 'Government janitorial spend ↑ 18% in Southern CA',
    body: 'California agencies increased facility services spending 18% YoY driven by post-pandemic hygiene standards and deferred maintenance budgets. Riverside and San Bernardino counties rank in the top 5 by active janitorial solicitations.',
  },
  {
    metric: '+34%', metricLabel: 'Win Rate', priority: 'HIGH', category: 'READINESS GAP',
    title: 'SBE certification = 34% more bid wins',
    body: 'Certified SBE vendors win 34% more state contract bids per-bid than non-certified competitors in California. Prime Clean Solutions currently has no active certifications.',
  },
  {
    metric: '8', metricLabel: 'Competitors', priority: 'MEDIUM', category: 'COMPETITOR',
    title: 'Thin local competition under $200K',
    body: 'Fewer than 8 active local SBE-certified cleaning vendors compete for Riverside County contracts under $200K. This is the strongest near-term window before the market matures.',
  },
  {
    metric: '11/14', metricLabel: 'Opps Eligible', priority: 'MEDIUM', category: 'STRATEGIC',
    title: 'Stack SBE + MBE for maximum access',
    body: 'A SBE + MBE certification stack qualifies you for preference points on 11 of 14 identified opportunities. Highest-ROI sequence: SBE first (30-day), MBE second (90-day).',
  },
]

const SUPPORT_PROGRAMS = [
  { title: 'SAM.gov Registration Clinic', fits: 238, lift: '+24 readiness pts (avg)', liftColor: 'text-green-600 bg-green-50' },
  { title: 'SBE Certification Cohort', fits: 276, lift: '+18 readiness pts (avg)', liftColor: 'text-green-600 bg-green-50' },
  { title: 'Capability Statement Workshop', fits: 296, lift: '+11 readiness pts (avg)', liftColor: 'text-blue-600 bg-blue-50' },
  { title: 'Insurance Cost-Share Program', fits: 169, lift: 'Removes blocker for 41% of vendors', liftColor: 'text-amber-700 bg-amber-50' },
]

const KPI_CARDS = [
  {
    label: 'Businesses Tracked', value: '412', trend: '+12%', trendNote: 'active in last 90 days',
    valueColor: 'text-slate-900',
  },
  {
    label: 'Avg Readiness Score', value: '47', trend: '+4', trendNote: 'across all tracked businesses',
    valueColor: 'text-amber-600',
  },
  {
    label: '% Ready to Apply', value: '32%', trend: '+6%', trendNote: 'readiness ≥ 60',
    valueColor: 'text-green-600',
  },
  {
    label: 'Opp Pipeline Value', value: '$24.6M', trend: '+18% YoY', trendNote: 'if qualified set wins',
    valueColor: 'text-slate-900',
  },
]

export default function EnterpriseDashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Custom header area with enterprise context */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        {/* Main header */}
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <button onClick={() => navigate(ROUTES.LANDING)} className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <rect x="3" y="9" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
                <path d="M1 9.5L10 2l9 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="7.5" y="13" width="5" height="5" rx="0.5" fill="white" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-slate-900">
                AccessBridge <span className="text-primary-600">AI</span>
              </span>
              <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-slate-400">
                Opportunity Readiness Platform
              </span>
            </div>
          </button>
          <nav className="flex items-center gap-1">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              Opportunities
            </button>
            <button className="rounded-md px-3 py-1.5 text-sm font-semibold text-slate-900">
              Enterprise
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white">PC</div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-semibold text-slate-800">Prime Clean Solutions</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Riverside, CA · Demo Profile</span>
            </div>
          </div>
        </div>
        {/* Enterprise sub-header */}
        <div className="border-t border-slate-100 bg-slate-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-900">
                <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" stroke="white" strokeWidth="1.5">
                  <rect x="1" y="4" width="10" height="7" rx="0.5" />
                  <path d="M1 6.5L6 2l5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-600">Enterprise Intelligence</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">
                <span className="font-medium text-slate-700">City of Riverside Economic Development</span> · viewing all tracked small businesses
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
              {['City view', 'By sector', 'By program'].map((tab, i) => (
                <button
                  key={tab}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    i === 0 ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-2.5">
            <span className="rounded bg-amber-400 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-900">Demo Mode</span>
            <p className="text-xs text-slate-400">You're viewing <span className="font-semibold text-white">Prime Clean Solutions</span>, a sample profile for the TechEx hackathon demo. All data is illustrative.</p>
          </div>
          <span className="font-mono text-[10px] text-slate-600">v0.1 · mock-safe</span>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div className="mb-6">
          <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-slate-400">Economic Development Intelligence</div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
            See where your small businesses<br />are getting stuck.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Aggregate readiness data across <span className="font-semibold text-slate-700">412 businesses</span> in Riverside County.
            Identify the blockers costing the most contract dollars and target your support programs where they'll move the needle.
          </p>
        </div>

        {/* KPI cards */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {KPI_CARDS.map((kpi) => (
            <div key={kpi.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{kpi.label}</div>
              <div className={`mt-1 text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                {kpi.value}{' '}
                <span className="text-sm font-semibold text-green-600">{kpi.trend}</span>
              </div>
              <div className="text-xs text-slate-400">{kpi.trendNote}</div>
            </div>
          ))}
        </div>

        {/* AI Community Pattern */}
        <div className="mb-8 overflow-hidden rounded-lg border border-slate-800">
          <AIAnalysisBar confidence={92} label="ANALYSIS" />
          <div className="bg-slate-900 px-5 py-4">
            <div className="mb-2 text-sm font-semibold text-white">The pattern across your community</div>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              Many businesses are interested in contracts but are blocked by three things: missing insurance documentation,
              no SAM.gov registration, and absent capability statements.{' '}
              <span className="font-semibold text-white">72% of tracked businesses don't have a capability statement on file</span>{' '}
              — yet it costs nothing to produce and unlocks an estimated $8.2M in pipeline.
              This is the highest-ROI program to fund this quarter.
            </p>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-primary-500 transition-colors">
                Launch capability statement workshop
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="rounded-md border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                View detailed breakdown
              </button>
            </div>
          </div>
        </div>

        {/* Two-column section */}
        <div className="grid grid-cols-[1fr_360px] gap-8">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Top blockers */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Top blockers across the community</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">% of businesses blocked by each gap · N = 412</span>
              </div>
              <div className="space-y-3">
                {TOP_BLOCKERS.map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <div className="w-48 shrink-0 text-sm text-slate-600">{b.label}</div>
                    <div className="flex-1 overflow-hidden rounded-full bg-slate-100 h-2">
                      <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                    </div>
                    <div className="w-8 text-right font-mono text-xs font-semibold text-slate-700">{b.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness distribution */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Readiness distribution</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">How ready are your businesses, bucketed</span>
              </div>
              <div className="flex items-end gap-3">
                {READINESS_DISTRIBUTION.map((d) => {
                  const maxCount = Math.max(...READINESS_DISTRIBUTION.map(x => x.count))
                  const heightPct = (d.count / maxCount) * 100
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

            {/* Industry demand */}
            <div>
              <div className="mb-4">
                <h2 className="text-base font-semibold text-slate-900">Opportunity demand by industry</h2>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Where your businesses are looking for help</div>
              </div>
              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="py-2 pl-4 text-left font-mono text-[9px] uppercase tracking-widest text-slate-400">Industry</th>
                      <th className="py-2 px-4 text-right font-mono text-[9px] uppercase tracking-widest text-slate-400">Businesses</th>
                      <th className="py-2 px-4 text-right font-mono text-[9px] uppercase tracking-widest text-slate-400">Share</th>
                      <th className="py-2 pr-4 font-mono text-[9px] uppercase tracking-widest text-slate-400">Distribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INDUSTRY_DEMAND.map((row, i) => (
                      <tr key={row.label} className={`${i < INDUSTRY_DEMAND.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <td className="py-2.5 pl-4 text-sm text-slate-700">{row.label}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-sm font-medium text-slate-900">{row.count}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-500">{row.pct}%</td>
                        <td className="py-2.5 pr-4">
                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-primary-500" style={{ width: `${row.pct * 4}%` }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Strategic insights */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Strategic insights</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">AI-generated · Confidence 88%</span>
              </div>
              <div className="space-y-3">
                {STRATEGIC_INSIGHTS.map((insight) => (
                  <div key={insight.title} className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-lg font-bold leading-none text-slate-900">{insight.metric}</div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{insight.metricLabel}</div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className={`inline-block rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                          insight.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {insight.priority}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{insight.category}</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{insight.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-slate-500">{insight.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended support programs */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Recommended support programs</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Ranked by expected readiness lift</span>
              </div>
              <div className="space-y-2">
                {SUPPORT_PROGRAMS.map((prog) => (
                  <div key={prog.title} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{prog.title}</div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                        Fits {prog.fits} businesses
                      </div>
                    </div>
                    <span className={`rounded px-2 py-1 text-[10px] font-semibold ${prog.liftColor}`}>
                      {prog.lift}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
