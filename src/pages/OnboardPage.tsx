import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES, US_STATES, BUSINESS_STRUCTURES, BUSINESS_STRUCTURE_LABELS, CERTIFICATIONS, CERTIFICATION_LABELS, GOALS, GOAL_LABELS, NAICS_OPTIONS } from '../lib/constants'
import { useProfile } from '../hooks/useProfile'
import { validateStep1, validateStep2, validateStep3 } from '../lib/validators/profileValidator'
import type { BusinessStructure, Certification, OpportunityGoal } from '../lib/types'
import Header from '../components/layout/Header'

const STEPS = [
  { num: 1, label: 'Identity' },
  { num: 2, label: 'Readiness' },
  { num: 3, label: 'Goals' },
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center gap-2">
          <div className={`flex h-7 items-center gap-2 rounded-full px-3 transition-colors ${
            step.num === current
              ? 'bg-slate-900 text-white'
              : step.num < current
              ? 'bg-slate-100 text-slate-500'
              : 'bg-slate-100 text-slate-400'
          }`}>
            <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
              step.num === current ? 'bg-white text-slate-900' : 'bg-transparent'
            }`}>
              {step.num < current ? (
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                  <polyline points="2,6 5,9 10,3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : step.num}
            </span>
            <span className="text-xs font-medium">{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-6 ${step.num < current ? 'bg-slate-300' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function FormField({ label, required, hint, error, children }: {
  label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode
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

const inputClass = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"

export default function OnboardPage() {
  const navigate = useNavigate()
  const { profile, updateProfile, loadDemoProfile } = useProfile()
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleNext = () => {
    let validation
    if (step === 1) validation = validateStep1(profile)
    else if (step === 2) validation = validateStep2(profile)
    else validation = validateStep3(profile)

    if (!validation.valid) {
      setErrors(validation.errors as Record<string, string>)
      return
    }
    setErrors({})
    if (step === 3) {
      navigate(ROUTES.DASHBOARD)
    } else {
      setStep(s => s + 1)
    }
  }

  const handleLoadDemo = () => {
    loadDemoProfile()
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Top */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
              Step {step} of 3 · Business Profile
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tell us about your business.</h1>
            <p className="mt-2 text-sm text-slate-500">
              We use this to match you against thousands of opportunities and score your readiness for each.
              Everything stays in your browser for the demo.
            </p>
          </div>
          <button
            onClick={handleLoadDemo}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
              <path d="M2 8a6 6 0 1 1 12 0" strokeLinecap="round" />
              <path d="M8 2l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Load demo profile
          </button>
        </div>

        <div className="mb-6">
          <StepIndicator current={step} />
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <div className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400">0{step}</div>
            <h2 className="text-base font-semibold text-slate-900">
              {step === 1 && 'Business identity'}
              {step === 2 && 'Readiness & certifications'}
              {step === 3 && 'Funding goals'}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {step === 1 && 'Who you are and what you do. Used for NAICS-based matching.'}
              {step === 2 && 'Your compliance posture and current certifications.'}
              {step === 3 && 'What types of opportunities are you looking for?'}
            </p>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Business name" required error={errors.businessName}>
                    <input
                      className={inputClass}
                      value={profile.businessName}
                      onChange={e => updateProfile({ businessName: e.target.value })}
                      placeholder="Prime Clean Solutions"
                    />
                  </FormField>
                  <FormField label="Industry" required hint="We'll auto-derive NAICS codes from this.">
                    <select
                      className={inputClass}
                      value={profile.naicsCodes[0] ?? ''}
                      onChange={e => updateProfile({ naicsCodes: [e.target.value].filter(Boolean) })}
                    >
                      <option value="">Select industry…</option>
                      {NAICS_OPTIONS.map(o => (
                        <option key={o.code} value={o.code}>{o.label}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="City" required error={errors.city}>
                    <input
                      className={inputClass}
                      value={profile.city}
                      onChange={e => updateProfile({ city: e.target.value })}
                      placeholder="Riverside"
                    />
                  </FormField>
                  <FormField label="State" required error={errors.state}>
                    <select
                      className={inputClass}
                      value={profile.state}
                      onChange={e => updateProfile({ state: e.target.value })}
                    >
                      <option value="">Select state…</option>
                      {US_STATES.map(s => (
                        <option key={s.code} value={s.code}>{s.name}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Years in business" required error={errors.yearsInBusiness}>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      className={inputClass}
                      value={profile.yearsInBusiness || ''}
                      onChange={e => updateProfile({ yearsInBusiness: parseInt(e.target.value) || 0 })}
                      placeholder="1"
                    />
                  </FormField>
                  <FormField label="Business structure">
                    <select
                      className={inputClass}
                      value={profile.businessStructure}
                      onChange={e => updateProfile({ businessStructure: e.target.value as BusinessStructure })}
                    >
                      {BUSINESS_STRUCTURES.map(s => (
                        <option key={s} value={s}>{BUSINESS_STRUCTURE_LABELS[s]}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label="Short business description" hint="Used as the foundation for your capability statement.">
                  <textarea
                    rows={3}
                    className={`${inputClass} resize-none`}
                    value={profile.businessDescription ?? ''}
                    onChange={e => updateProfile({ businessDescription: e.target.value })}
                    placeholder="Prime Clean Solutions is a professional commercial cleaning company based in Riverside, CA…"
                  />
                </FormField>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Compliance toggles */}
                <div className="space-y-3">
                  {[
                    { key: 'hasActiveInsurance' as const, label: 'Active general liability insurance ($1M minimum)', sub: 'Required for most government contracts' },
                    { key: 'hasBankAccount' as const, label: 'Business bank account on file', sub: 'Required for financial verification' },
                    { key: 'hasDunsOrUEI' as const, label: 'Registered on SAM.gov (UEI / DUNS)', sub: 'Required for federal contracts and many state programs' },
                  ].map(({ key, label, sub }) => (
                    <label key={key} className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        checked={profile[key] as boolean}
                        onChange={e => updateProfile({ [key]: e.target.checked })}
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-800">{label}</div>
                        <div className="text-xs text-slate-400">{sub}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Certifications */}
                <div>
                  <div className="mb-3 text-sm font-medium text-slate-700">Current certifications <span className="text-slate-400 font-normal">(select all that apply)</span></div>
                  <div className="grid grid-cols-2 gap-2">
                    {CERTIFICATIONS.map(cert => (
                      <label key={cert} className="flex cursor-pointer items-center gap-2.5 rounded-md border border-slate-200 px-3 py-2.5 hover:bg-slate-50 transition-colors">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                          checked={profile.certifications.includes(cert)}
                          onChange={e => {
                            const certs = e.target.checked
                              ? [...profile.certifications, cert]
                              : profile.certifications.filter(c => c !== cert) as Certification[]
                            updateProfile({ certifications: certs })
                          }}
                        />
                        <span className="text-xs text-slate-700">{CERTIFICATION_LABELS[cert]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                {errors.goals && <p className="text-xs text-red-500">{errors.goals}</p>}
                {GOALS.map(goal => (
                  <label key={goal} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      checked={profile.goals.includes(goal)}
                      onChange={e => {
                        const goals = e.target.checked
                          ? [...profile.goals, goal]
                          : profile.goals.filter(g => g !== goal) as OpportunityGoal[]
                        updateProfile({ goals })
                      }}
                    />
                    <span className="text-sm font-medium text-slate-800">{GOAL_LABELS[goal]}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <button
              onClick={() => step > 1 ? setStep(s => s - 1) : navigate(ROUTES.LANDING)}
              className="flex items-center gap-1.5 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M13 8H3M7 12l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <span className="font-mono text-xs text-slate-400">{step} / 3</span>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              {step === 3 ? 'Scan opportunities' : 'Continue'}
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="7" width="10" height="8" rx="1.5" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" />
          </svg>
          We never expose API keys in your browser. AI generation runs server-side with mock-safe fallbacks for the demo.
        </div>
      </div>
    </div>
  )
}
