import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'

const QUICK_LINKS = [
  { label: 'Assessment', path: ROUTES.ASSESS },
  { label: 'Advisor Dashboard', path: ROUTES.DASHBOARD },
  { label: 'Report', path: ROUTES.REPORT },
] as const

export default function DemoBanner() {
  const navigate = useNavigate()

  return (
    <div className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-2 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-2.5 md:items-center">
          <span className="shrink-0 rounded bg-amber-400 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-900">
            Demo Mode
          </span>
          <p className="text-xs leading-relaxed text-slate-400">
            You&apos;re viewing{' '}
            <span className="font-semibold text-white">Autonomyx Solutions</span>, a sample business profile
            for the TechEx hackathon demo. All funding readiness data and AI outputs are illustrative.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-1 md:flex">
            {QUICK_LINKS.map(({ label, path }) => (
              <button
                key={label}
                type="button"
                onClick={() => navigate(path)}
                className="rounded px-2 py-0.5 font-mono text-[10px] text-slate-500 transition-colors hover:bg-slate-700 hover:text-slate-200"
              >
                {label}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] text-slate-600">v0.1 · mock-safe</span>
        </div>
      </div>
    </div>
  )
}
