import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../lib/constants'
import Header from '../components/layout/Header'

const DEMO_OPPORTUNITIES = [
  { type: 'STATE CONTRACT', title: 'Riverside County Public Facilities', match: 92, readiness: 75, readinessLabel: 'almost ready', color: 'text-lime-600 bg-lime-50' },
  { type: 'GRANT', title: 'City of Riverside Recovery Grant', match: 95, readiness: 88, readinessLabel: 'strong match', color: 'text-green-600 bg-green-50' },
  { type: 'SUPPLIER', title: 'Kaiser Permanente Supplier Diversity', match: 78, readiness: 52, readinessLabel: 'needs work', color: 'text-amber-600 bg-amber-50' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-500">
                For Small Businesses + Economic Development Teams
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-900">
              Opportunity should<br />
              not depend on<br />
              <span className="italic text-primary-600">insider knowledge.</span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-slate-500">
              AccessBridge AI helps small businesses find, qualify for, and apply to real opportunities —
              grants, contracts, supplier programs, and business funding — by closing the readiness gaps
              that block most applications before they're sent.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(ROUTES.ONBOARD)}
                className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Start opportunity scan
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate(ROUTES.ENTERPRISE)}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View enterprise insights
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center gap-10">
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900">$24.6M</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Pipeline Tracked</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900">412</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Businesses Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900">14 sources</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">State · Federal · Supplier</div>
              </div>
            </div>
          </div>

          {/* Right — mock UI preview */}
          <div className="relative">
            <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 font-mono text-[10px] text-slate-400">app.accessbridge.ai / opportunities</span>
              </div>

              {/* Mock content */}
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Prime Clean Solutions</div>
                    <div className="text-sm font-semibold text-slate-900">14 opportunities matched</div>
                  </div>
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <svg viewBox="0 0 48 48" className="absolute h-full w-full -rotate-90">
                      <circle cx="24" cy="24" r="18" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                      <circle cx="24" cy="24" r="18" fill="none" stroke="#4f46e5" strokeWidth="4"
                        strokeDasharray="113.1" strokeDashoffset="29" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs font-bold text-slate-900">68</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {DEMO_OPPORTUNITIES.map((opp) => (
                    <div key={opp.title} className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2.5">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{opp.type}</div>
                        <div className="text-xs font-medium text-slate-800">{opp.title}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{opp.match}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${opp.color}`}>
                          {opp.readiness}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">The Difference</div>
            <p className="text-2xl font-semibold text-slate-800">
              Most tools help users <span className="text-slate-400">discover opportunities.</span><br />
              AccessBridge AI helps them{' '}
              <span className="text-primary-600">become ready to win them.</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Find', desc: "Match against 1,000s of grants, contracts, and supplier programs." },
              { num: '02', title: 'Qualify', desc: "Readiness scoring against each opportunity's real requirements." },
              { num: '03', title: 'Apply', desc: "Generate cover letters, capability statements, action plans, and checklists." },
            ].map((step) => (
              <div key={step.num}>
                <div className="mb-2 font-mono text-xs font-medium text-slate-400">{step.num}</div>
                <div className="mb-1 text-base font-semibold text-slate-900">{step.title}</div>
                <div className="text-sm leading-relaxed text-slate-500">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">Built for Two Audiences</div>
          <h2 className="text-3xl font-bold leading-snug tracking-tight text-slate-900">
            A single platform connecting underserved<br />
            entrepreneurs with the institutions that want them ready.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Small business card — dark */}
          <div className="rounded-xl bg-slate-900 p-8 text-white">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">Small Business Owner</div>
            <h3 className="mb-5 text-2xl font-bold">Stop guessing what you qualify for.</h3>
            <ul className="mb-8 space-y-3">
              {[
                'See every opportunity you actually match — not a generic feed',
                'Understand exactly what\'s blocking each application',
                'Generate the documents you need in minutes, not weeks',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" stroke="currentColor" strokeWidth="2">
                    <polyline points="2,8 6,12 14,4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate(ROUTES.ONBOARD)}
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
            >
              Start opportunity scan
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Enterprise card — light */}
          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-400">City · Nonprofit · Supplier Diversity</div>
            <h3 className="mb-5 text-2xl font-bold text-slate-900">See where your businesses are getting stuck.</h3>
            <ul className="mb-8 space-y-3">
              {[
                'Aggregate readiness data across your business community',
                'Identify which blockers cost the most contract dollars',
                "Target your support programs where they'll actually move the needle",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" stroke="currentColor" strokeWidth="2">
                    <polyline points="2,8 6,12 14,4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate(ROUTES.ENTERPRISE)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              View enterprise dashboard
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-700">
              <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
                <rect x="3" y="9" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
                <path d="M1 9.5L10 2l9 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="7.5" y="13" width="5" height="5" rx="0.5" fill="white" />
              </svg>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              © 2026 AccessBridge AI · Built for TechEx Hackathon
            </span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Security', 'Data Sources'].map((link) => (
              <span key={link} className="font-mono text-[10px] uppercase tracking-widest text-slate-600 cursor-pointer hover:text-slate-400">
                {link}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
