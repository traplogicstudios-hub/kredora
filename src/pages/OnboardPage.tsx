import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ROUTES,
  BUSINESS_STAGES,
  REVENUE_RANGES,
  FUNDING_GOAL_RANGES,
  FUNDING_DOCUMENT_OPTIONS,
} from '../lib/constants'
import { useAssessment } from '../hooks/useAssessment'
import { validateAssessment } from '../lib/validators/assessmentValidator'
import type { FundingAssessmentProfile, FundingDocumentId } from '../lib/types'
import PageShell from '../components/layout/PageShell'

function FormField({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-[10px] font-medium text-primary-500">required</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500'

export default function OnboardPage() {
  const navigate = useNavigate()
  const { assessment, updateAssessment, loadKredoraDemoProfile } = useAssessment()
  const [errors, setErrors] = useState<Partial<Record<keyof FundingAssessmentProfile, string>>>({})

  const handleLoadDemo = () => {
    loadKredoraDemoProfile()
    setErrors({})
  }

  const toggleDocument = (id: FundingDocumentId, checked: boolean) => {
    const docs = checked
      ? [...assessment.documentsAvailable, id]
      : assessment.documentsAvailable.filter(d => d !== id)
    updateAssessment({ documentsAvailable: docs })
  }

  const handleSubmit = () => {
    const validation = validateAssessment(assessment)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }
    setErrors({})
    navigate(ROUTES.ANALYZING)
  }

  return (
    <PageShell className="max-w-2xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          New Business Funding Assessment
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter a business profile so Kredora can evaluate funding readiness, detect documentation gaps,
          and generate an advisor-ready action plan.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-5 p-6">
          <FormField label="Business name" required error={errors.businessName}>
            <input
              className={inputClass}
              value={assessment.businessName}
              onChange={e => updateAssessment({ businessName: e.target.value })}
              placeholder="Autonomyx Solutions"
            />
          </FormField>

          <FormField label="Location" required error={errors.location} hint="City, State">
            <input
              className={inputClass}
              value={assessment.location}
              onChange={e => updateAssessment({ location: e.target.value })}
              placeholder="Riverside, CA"
            />
          </FormField>

          <FormField label="Industry" required error={errors.industry}>
            <input
              className={inputClass}
              value={assessment.industry}
              onChange={e => updateAssessment({ industry: e.target.value })}
              placeholder="AI automation and tech services"
            />
          </FormField>

          <FormField label="Years in business" required error={errors.yearsInBusiness}>
            <input
              type="number"
              min={0}
              max={99}
              className={inputClass}
              value={assessment.yearsInBusiness || ''}
              onChange={e =>
                updateAssessment({ yearsInBusiness: parseInt(e.target.value, 10) || 0 })
              }
              placeholder="1"
            />
          </FormField>

          <FormField label="Business stage" required error={errors.businessStage}>
            <select
              className={inputClass}
              value={assessment.businessStage}
              onChange={e => updateAssessment({ businessStage: e.target.value as typeof assessment.businessStage })}
            >
              <option value="">Select stage…</option>
              {BUSINESS_STAGES.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </FormField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Revenue range" required error={errors.revenueRange}>
              <select
                className={inputClass}
                value={assessment.revenueRange}
                onChange={e => updateAssessment({ revenueRange: e.target.value as typeof assessment.revenueRange })}
              >
                <option value="">Select range…</option>
                {REVENUE_RANGES.map(r => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Funding goal" required error={errors.fundingGoal}>
              <select
                className={inputClass}
                value={assessment.fundingGoal}
                onChange={e => updateAssessment({ fundingGoal: e.target.value as typeof assessment.fundingGoal })}
              >
                <option value="">Select goal…</option>
                {FUNDING_GOAL_RANGES.map(g => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Use of funds" required error={errors.useOfFunds}>
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={assessment.useOfFunds}
              onChange={e => updateAssessment({ useOfFunds: e.target.value })}
              placeholder="Software tools, marketing, contractor support, client delivery systems"
            />
          </FormField>

          <div>
            <div className="mb-3 text-sm font-medium text-slate-700">
              Documents available{' '}
              <span className="font-normal text-slate-400">(select all that apply)</span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FUNDING_DOCUMENT_OPTIONS.map(doc => (
                <label
                  key={doc.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md border border-slate-200 px-3 py-2.5 hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    checked={assessment.documentsAvailable.includes(doc.id)}
                    onChange={e => toggleDocument(doc.id, e.target.checked)}
                  />
                  <span className="text-xs text-slate-700">{doc.label}</span>
                </label>
              ))}
            </div>
          </div>

          <FormField label="Biggest funding challenge">
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={assessment.biggestChallenge}
              onChange={e => updateAssessment({ biggestChallenge: e.target.value })}
              placeholder="Lack of financial projections and formal business documentation"
            />
          </FormField>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleLoadDemo}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M2 8a6 6 0 1 1 12 0" strokeLinecap="round" />
              <path d="M8 2l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Load Demo Profile
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Generate Funding Readiness Report
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Assessment data stays in your browser for this demo. No backend persistence.
      </p>
    </PageShell>
  )
}
