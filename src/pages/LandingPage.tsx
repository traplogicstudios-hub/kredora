import { useNavigate } from 'react-router-dom'
import { ROUTES, KREDORA_DISCLAIMER } from '../lib/constants'
import Header from '../components/layout/Header'

const DEMO_FUNDING_PATHS = [
  { name: 'Microloan / Community Lender', matchLevel: 'High', color: 'text-green-700 bg-green-50' },
  { name: 'Technical Assistance Program', matchLevel: 'High', color: 'text-green-700 bg-green-50' },
  { name: 'Local Small Business Grant Readiness', matchLevel: 'Medium', color: 'text-amber-700 bg-amber-50' },
] as const

const PROBLEM_COLUMNS = [
  {
    title: 'What advisors face',
    body: 'Manual assessments, inconsistent gap analysis, and hours spent drafting action plans for every entrepreneur.',
  },
  {
    title: 'What entrepreneurs face',
    body: 'Unclear readiness, missing documents, and no plain-language path before applying for funding.',
  },
  {
    title: 'What Kredora does',
    body: 'Turns a business intake into structured funding readiness intelligence — advisor-ready reports in minutes.',
  },
] as const

const AUDIENCE_CARDS = [
  'Chambers of Commerce',
  'Nonprofits & CDFIs',
  'Accelerators',
  'Grant Consultants',
  'Economic Development Teams',
] as const

const HOW_IT_WORKS = [
  { num: '01', title: 'Intake', desc: 'Capture business profile, goals, and available documentation.' },
  { num: '02', title: 'Analyze', desc: 'Gemini evaluates readiness signals and documentation gaps.' },
  { num: '03', title: 'Score', desc: 'Generate a Capital Readiness Score with category breakdown.' },
  { num: '04', title: 'Recommend', desc: 'Surface funding path recommendations with match levels and next steps.' },
  { num: '05', title: 'Report', desc: 'Deliver an advisor-ready report and entrepreneur-friendly summary.' },
] as const

const ENTREPRENEUR_BENEFITS = [
  'Understand what to fix before you apply — in plain language',
  'See which funding paths may be a potential fit and what to verify',
  'Get a clear next-step plan instead of a generic program list',
] as const

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20">
        <div className="grid grid-cols-2 items-center gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-500">
                For business support organizations & entrepreneurs
              </span>
            </div>

            <h1 className="mb-2 text-5xl font-bold tracking-tight text-slate-900">Kredora</h1>
            <p className="mb-6 text-xl font-medium text-primary-600">AI Funding Readiness Intelligence</p>

            <p className="mb-8 text-lg leading-relaxed text-slate-500">
              Kredora helps business support organizations assess entrepreneurs, identify funding gaps,
              and generate advisor-ready action plans in minutes.
            </p>

            <p className="mb-8 text-sm leading-relaxed text-slate-500">
              Built for chambers of commerce, nonprofits, accelerators, grant consultants, community lenders,
              and economic development teams supporting small business owners.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View Advisor Dashboard
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ASSESS)}
                className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Start Free Assessment
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mt-10 flex items-center gap-10">
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900">124</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Businesses Assessed</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900">68%</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Avg Readiness Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900">86</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Reports Generated</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 font-mono text-[10px] text-slate-400">app.kredora.ai / report</span>
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                      Autonomyx Solutions
                    </div>
                    <div className="text-sm font-semibold text-slate-900">Funding Readiness Report</div>
                  </div>
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="absolute h-full w-full -rotate-90">
                      <circle cx="24" cy="24" r="18" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        fill="none"
                        stroke="#d97706"
                        strokeWidth="4"
                        strokeDasharray="113.1"
                        strokeDashoffset="36"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-xs font-bold text-slate-900">68</span>
                  </div>
                </div>
                <div className="mb-3 font-mono text-[9px] uppercase tracking-widest text-slate-400">
                  Capital Readiness Score
                </div>

                <div className="space-y-2">
                  {DEMO_FUNDING_PATHS.map((path) => (
                    <div
                      key={path.name}
                      className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2.5"
                    >
                      <div className="text-xs font-medium text-slate-800">{path.name}</div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${path.color}`}>
                        {path.matchLevel} fit
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">The problem</div>
          <div className="mb-10 grid grid-cols-3 gap-8">
            {PROBLEM_COLUMNS.map((col) => (
              <div key={col.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="mb-2 text-base font-semibold text-slate-900">{col.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">Who it&apos;s for</div>
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-slate-900">
          Funding readiness intelligence for the teams that support entrepreneurs
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {AUDIENCE_CARDS.map((name) => (
            <div
              key={name}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm font-medium text-slate-700"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">How it works</div>
          <div className="grid grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.num}>
                <div className="mb-2 font-mono text-xs font-medium text-slate-400">{step.num}</div>
                <div className="mb-1 text-base font-semibold text-slate-900">{step.title}</div>
                <div className="text-sm leading-relaxed text-slate-500">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-slate-900 p-8 text-white">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">For the business owner</div>
            <h3 className="mb-5 text-2xl font-bold">Clarity before you apply.</h3>
            <ul className="mb-8 space-y-3">
              {ENTREPRENEUR_BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary-400"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="2,8 6,12 14,4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate(ROUTES.ASSESS)}
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
            >
              Start Free Assessment
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">
              For advisors & program teams
            </div>
            <h3 className="mb-5 text-2xl font-bold text-slate-900">Scale consistent funding readiness support.</h3>
            <ul className="mb-8 space-y-3">
              {[
                'Organization-level view of assessed businesses and readiness gaps',
                'Advisor-ready reports you can act on in minutes',
                'Illustrative intelligence — not financial or legal advice',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="2,8 6,12 14,4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              View Advisor Dashboard
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-400">{KREDORA_DISCLAIMER}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-700">
                <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
                  <rect x="3" y="9" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
                  <path
                    d="M1 9.5L10 2l9 7.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="7.5" y="13" width="5" height="5" rx="0.5" fill="white" />
                </svg>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                © 2026 Kredora · Built for TechEx Hackathon
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
