import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'
import { useAssessment } from '../../hooks/useAssessment'

function profileInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { assessment, assessmentComplete } = useAssessment()
  const isLanding = pathname === ROUTES.LANDING
  const assessPath = ROUTES.ASSESS
  const isAdvisorActive =
    pathname === ROUTES.DASHBOARD ||
    pathname === ROUTES.ENTERPRISE ||
    pathname === ROUTES.REPORT ||
    pathname === ROUTES.ANALYZING

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link to={ROUTES.LANDING} className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <rect x="3" y="9" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
              <path d="M1 9.5L10 2l9 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="7.5" y="13" width="5" height="5" rx="0.5" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-slate-900">Kredora</span>
            <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-slate-400">
              AI Funding Readiness Intelligence
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {!isLanding && (
            <>
              <Link
                to={ROUTES.DASHBOARD}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isAdvisorActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Advisor Dashboard
              </Link>
              <Link
                to={assessPath}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === ROUTES.ASSESS || pathname === ROUTES.ONBOARD
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Assessment
              </Link>
            </>
          )}
        </nav>

        {isLanding ? (
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.DASHBOARD}
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              View Advisor Dashboard
            </Link>
            <button
              onClick={() => navigate(ROUTES.ASSESS)}
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Start Free Assessment
              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white">
              {assessmentComplete ? profileInitials(assessment.businessName) : '?'}
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-semibold text-slate-800">
                {assessmentComplete ? assessment.businessName : 'No profile'}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                {assessmentComplete ? `${assessment.location} · Demo Profile` : 'Set up profile'}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
