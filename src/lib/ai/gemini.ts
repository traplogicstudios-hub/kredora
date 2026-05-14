/**
 * AI generation client.
 *
 * All real Gemini calls go through /api/generate (Vercel serverless function)
 * so the API key never reaches the browser bundle.
 *
 * Mock mode is active when:
 *   - VITE_USE_MOCK_AI=true  (always set this in .env.local during dev)
 *   - or /api/generate is unreachable (automatic fallback)
 */

import type { BusinessProfile, GeneratedDocument, EnterpriseDashboard } from '../types'
import {
  coverLetterPrompt,
  capabilityStatementPrompt,
  executiveSummaryPrompt,
  gapActionPlanPrompt,
  enterpriseInsightsPrompt,
} from './prompts'
import { getMockDocuments, MOCK_ENTERPRISE_DASHBOARD } from './mockResponses'
import { countWords } from '../utils'
import { scoreOpportunity } from '../scoring/readinessEngine'
import { OPPORTUNITIES } from '../data/opportunities'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AI === 'true'

async function callGenerateAPI(prompt: string, timeoutMs = 20_000): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    if (!res.ok) {
      throw new Error(`/api/generate responded with ${res.status}`)
    }

    const data = await res.json()
    return typeof data.text === 'string' ? data.text : ''
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Calls the generate API, falling back to the provided mock string on any error.
 * Never throws — callers always get a usable string back.
 */
async function safeGenerate(prompt: string, fallback: string): Promise<{ text: string; isAI: boolean }> {
  if (USE_MOCK) return { text: fallback, isAI: false }

  try {
    const text = await callGenerateAPI(prompt)
    return { text: text.trim() || fallback, isAI: true }
  } catch {
    return { text: fallback, isAI: false }
  }
}

function makeDoc(
  type: GeneratedDocument['type'],
  title: string,
  content: string,
  isAIGenerated: boolean
): GeneratedDocument {
  return {
    id: `doc-${type}`,
    type,
    title,
    content,
    wordCount: countWords(content),
    isAIGenerated,
  }
}

export async function generateDocuments(
  profile: BusinessProfile,
  opportunityId: string
): Promise<GeneratedDocument[]> {
  const mocks = getMockDocuments()
  const fallback = (type: GeneratedDocument['type']) => mocks.find(m => m.type === type)?.content ?? ''

  const opp = OPPORTUNITIES.find(o => o.id === opportunityId)
  const score = opp ? scoreOpportunity(profile, opp) : null
  const gapLabels = score?.gaps?.map(g => g.label) ?? []

  const [coverResult, capResult, execResult, gapResult] = await Promise.all([
    safeGenerate(coverLetterPrompt(profile, opportunityId), fallback('cover_letter')),
    safeGenerate(capabilityStatementPrompt(profile), fallback('capability_statement')),
    safeGenerate(executiveSummaryPrompt(profile, opportunityId), fallback('executive_summary')),
    safeGenerate(gapActionPlanPrompt(profile, opportunityId, gapLabels), fallback('gap_action_plan')),
  ])

  return [
    makeDoc('cover_letter', 'Cover Letter', coverResult.text, coverResult.isAI),
    makeDoc('capability_statement', 'Capability Statement', capResult.text, capResult.isAI),
    makeDoc('executive_summary', 'Executive Summary', execResult.text, execResult.isAI),
    makeDoc('gap_action_plan', '60-Day Readiness Action Plan', gapResult.text, gapResult.isAI),
    // Compliance checklist is always derived from structured data, never AI-generated
    makeDoc('compliance_checklist', 'Compliance Checklist', fallback('compliance_checklist'), false),
  ]
}

export async function generateEnterpriseInsights(
  profile: BusinessProfile
): Promise<EnterpriseDashboard> {
  if (USE_MOCK) return MOCK_ENTERPRISE_DASHBOARD

  const { text, isAI } = await safeGenerate(
    enterpriseInsightsPrompt(profile),
    ''
  )

  if (!isAI || !text) return MOCK_ENTERPRISE_DASHBOARD

  try {
    // Strip markdown code fences if Gemini wraps output
    const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/```\s*$/m, '').trim()
    const insights = JSON.parse(cleaned)

    if (!Array.isArray(insights) || insights.length === 0) return MOCK_ENTERPRISE_DASHBOARD

    return {
      ...MOCK_ENTERPRISE_DASHBOARD,
      generatedAt: new Date().toISOString(),
      insights,
    }
  } catch {
    return MOCK_ENTERPRISE_DASHBOARD
  }
}
