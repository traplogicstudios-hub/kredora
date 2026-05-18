import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../lib/constants'
import { MOCK_READINESS_REPORT } from '../lib/ai/mockResponses'
import { useAssessment } from '../hooks/useAssessment'
import PageShell from '../components/layout/PageShell'

const STEPS = [
  'Business profile reviewed',
  'Readiness signals scored',
  'Documentation gaps detected',
  'Funding paths generated',
  'Advisor report prepared',
]

const STEP_MS = 600
const FINISH_BUFFER_MS = 800

export default function AnalysisPage() {
  const navigate = useNavigate()
  const { setReadinessReport } = useAssessment()
  const [completedCount, setCompletedCount] = useState(0)
  const hasFinished = useRef(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((_, i) => {
      timers.push(
        setTimeout(() => setCompletedCount(i + 1), (i + 1) * STEP_MS)
      )
    })

    timers.push(
      setTimeout(() => {
        if (hasFinished.current) return
        hasFinished.current = true
        setReadinessReport(MOCK_READINESS_REPORT)
        navigate(ROUTES.REPORT, { replace: true })
      }, STEPS.length * STEP_MS + FINISH_BUFFER_MS)
    )

    return () => timers.forEach(clearTimeout)
  }, [navigate, setReadinessReport])

  const progress = (completedCount / STEPS.length) * 100

  return (
    <PageShell className="max-w-xl py-20 text-center">
      <h1 className="mb-3 text-2xl font-bold text-slate-900">
        Analyzing funding readiness
      </h1>
      <p className="mb-10 text-slate-600">
        Gemini is analyzing business profile data, funding readiness signals,
        documentation gaps, and recommended funding paths.
      </p>

      <div className="mb-8 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-3 text-left">
        {STEPS.map((label, i) => {
          const done = i < completedCount
          return (
            <li
              key={label}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300 ${
                done
                  ? 'border-green-200 bg-green-50 text-slate-800'
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 12 12" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                    <polyline points="2,6 5,9 10,3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="text-sm font-medium">{label}</span>
            </li>
          )
        })}
      </ul>
    </PageShell>
  )
}
