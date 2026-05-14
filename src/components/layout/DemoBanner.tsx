import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../lib/constants'

export default function DemoBanner() {
  const navigate = useNavigate()

  return (
    <div className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2.5">
          <span className="rounded bg-amber-400 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-900">
            Demo Mode
          </span>
          <p className="text-xs text-slate-400">
            You're viewing{' '}
            <span className="font-semibold text-white">Prime Clean Solutions</span>, a sample profile loaded for the TechEx hackathon demo.
            All data, opportunities, and AI outputs are illustrative.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[
              { label: 'Profile', path: ROUTES.ONBOARD },
              { label: 'Dashboard', path: ROUTES.DASHBOARD },
              { label: 'Breakdown', path: ROUTES.OPPORTUNITY('opp-riv-county-001') },
              { label: 'Package', path: ROUTES.APPLY('opp-riv-county-001') },
              { label: 'Enterprise', path: ROUTES.ENTERPRISE },
            ].map(({ label, path }) => (
              <button
                key={label}
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
