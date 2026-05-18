import type { BusinessProfile, FundingAssessmentProfile } from '../types'
import { OPPORTUNITIES } from '../data/opportunities'
import {
  BUSINESS_STAGES,
  REVENUE_RANGES,
  FUNDING_GOAL_RANGES,
  FUNDING_DOCUMENT_OPTIONS,
} from '../constants'

function profileContext(profile: BusinessProfile): string {
  return `
Business Name: ${profile.businessName}
Location: ${profile.city}, ${profile.state}
Industry: Commercial Cleaning & Janitorial Services (NAICS ${profile.naicsCodes.join(', ')})
Years in Business: ${profile.yearsInBusiness}
Annual Revenue: $${(profile.annualRevenue ?? 0).toLocaleString()}
Employees: ${profile.employeeCount ?? 'N/A'}
Business Structure: ${profile.businessStructure.toUpperCase()}
Certifications: ${profile.certifications.length > 0 ? profile.certifications.join(', ') : 'None currently'}
Insurance: ${profile.hasActiveInsurance ? 'Active general liability insurance' : 'No insurance on file'}
SAM/UEI Registered: ${profile.hasDunsOrUEI ? 'Yes' : 'No'}
`.trim()
}

export function coverLetterPrompt(profile: BusinessProfile, opportunityId: string): string {
  const opp = OPPORTUNITIES.find(o => o.id === opportunityId)
  const oppTitle = opp?.title ?? 'the opportunity'
  const oppSource = opp?.source ?? 'the contracting agency'

  return `Write a professional cover letter for a small business applying to a government/corporate opportunity.

${profileContext(profile)}

Opportunity: ${oppTitle}
Issuing Agency/Organization: ${oppSource}

Instructions:
- Write a formal business cover letter (400–500 words)
- Address it "To Whom It May Concern" or to the contracting officer
- Highlight the company's relevant experience, reliability, and local presence
- Mention their commitment to quality and compliance
- Express clear interest in the specific opportunity
- Include a call to action (invite for follow-up, provide contact info placeholder)
- Tone: professional, confident, and competent
- Do NOT make guarantees about winning or pricing
- End with a professional closing

Return ONLY the letter text, no preamble or commentary.`
}

export function capabilityStatementPrompt(profile: BusinessProfile): string {
  return `Write a one-page capability statement for a small business.

${profileContext(profile)}

Instructions:
- Write a professional capability statement (350–450 words)
- Include these sections clearly labeled: Core Competencies, Past Performance (use placeholder if <2 yrs), Differentiators, Company Data
- Core Competencies: janitorial services, facility maintenance, post-construction cleanup, green cleaning
- Past Performance: reference general commercial clients in Riverside CA (use plausible but generic names)
- Differentiators: local presence, responsive communication, owner-operated, insured and compliant
- Company Data: include NAICS codes, business structure, city/state, years in business
- Tone: polished, factual, third-person
- Format as clean structured text (use section headers with colons)

Return ONLY the capability statement text, no preamble or commentary.`
}

export function executiveSummaryPrompt(profile: BusinessProfile, opportunityId: string): string {
  const opp = OPPORTUNITIES.find(o => o.id === opportunityId)
  const oppTitle = opp?.title ?? 'the contract opportunity'

  return `Write a concise executive summary for a small business bid/grant application.

${profileContext(profile)}

Opportunity: ${oppTitle}

Instructions:
- Write a focused executive summary (250–300 words)
- Open with a strong value proposition sentence
- Explain why this company is uniquely positioned for this opportunity
- Reference their local presence, reliability, and commitment to compliance
- Mention growth trajectory and future vision
- Tone: confident, compelling, executive-level
- Third-person perspective

Return ONLY the executive summary text, no preamble or commentary.`
}

export function gapActionPlanPrompt(profile: BusinessProfile, opportunityId: string, gaps: string[]): string {
  const opp = OPPORTUNITIES.find(o => o.id === opportunityId)
  const oppTitle = opp?.title ?? 'the target opportunity'

  return `Create a practical 60-day action plan to help a small business close their readiness gaps for an opportunity.

${profileContext(profile)}

Target Opportunity: ${oppTitle}

Current Readiness Gaps:
${gaps.map((g, i) => `${i + 1}. ${g}`).join('\n')}

Instructions:
- Create a clear 60-day action plan (400–500 words)
- Organize into Week 1–2, Week 3–4, Week 5–8 phases
- For each phase, list 2–3 specific, actionable steps
- Include free or low-cost resources (SBA.gov, SBDC, SAM.gov, CalTrans for SBE)
- Be realistic about timelines
- End with a "Quick Wins" section of 3 things they can do this week
- Tone: encouraging, practical, specific

Return ONLY the action plan text, no preamble or commentary.`
}

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: T | ''
): string {
  if (!value) return 'Not specified'
  return options.find(o => o.value === value)?.label ?? value
}

function documentsLabel(ids: FundingAssessmentProfile['documentsAvailable']): string {
  if (ids.length === 0) return 'None listed'
  return ids
    .map(id => FUNDING_DOCUMENT_OPTIONS.find(o => o.id === id)?.label ?? id)
    .join(', ')
}

export function fundingReadinessPrompt(profile: FundingAssessmentProfile): string {
  return `You are a senior funding readiness advisor for a business support organization.
Analyze this business profile and return a structured funding readiness report.

Business Profile:
- Name: ${profile.businessName}
- Location: ${profile.location}
- Industry: ${profile.industry}
- Years in Business: ${profile.yearsInBusiness}
- Stage: ${labelFor(BUSINESS_STAGES, profile.businessStage)}
- Revenue Range: ${labelFor(REVENUE_RANGES, profile.revenueRange)}
- Funding Goal: ${labelFor(FUNDING_GOAL_RANGES, profile.fundingGoal)}
- Use of Funds: ${profile.useOfFunds || 'Not specified'}
- Documents Available: ${documentsLabel(profile.documentsAvailable)}
- Biggest Challenge: ${profile.biggestChallenge || 'Not specified'}

Return ONLY valid JSON matching this schema:

{
  "overallScore": number (0–100),
  "scoreBreakdown": {
    "businessFoundation": number,
    "documentationReadiness": number,
    "revenueClarity": number,
    "fundingFit": number,
    "applicationPreparedness": number
  },
  "aiSummary": "string — 2 sentences summarizing strengths and gaps",
  "fundingPaths": [
    {
      "id": "string",
      "name": "string",
      "matchLevel": "High" | "Medium" | "Low",
      "whyItFits": "string",
      "whatToVerify": "string",
      "documentsNeeded": ["string"],
      "nextStep": "string"
    }
  ],
  "gapAnalysis": {
    "completed": ["string"],
    "needsWork": ["string"],
    "riskFlags": ["string"]
  },
  "advisorNotes": "string — 2 sentences, advisor-facing",
  "entrepreneurSummary": "string — 3 sentences, plain English for business owner"
}

Safety requirements:
- Do not guarantee funding eligibility or approval
- Do not claim that any funding path is certain or confirmed
- Use language like "potential fit," "readiness indicator," "what to verify," and "recommended next steps"
- This output is not financial advice, legal advice, or a grant guarantee
- Risk flags should describe preparation gaps, not predictions of rejection`
}

export function enterpriseInsightsPrompt(profile: BusinessProfile): string {
  return `Analyze the market position and business readiness of a small commercial cleaning company and provide strategic intelligence insights.

${profileContext(profile)}

Business Goals: ${profile.goals.join(', ')}

Instructions:
- Provide exactly 5 strategic insights as a JSON array
- Each insight must have: id (string), category (one of: market_trend, competitor, readiness_gap, quick_win, strategic), title (string, max 60 chars), body (string, 2–3 sentences), metric (optional short string like "↑ 34% YoY"), priority ("high", "medium", or "low")
- Make insights specific to commercial cleaning in California / Riverside
- Include at least 1 quick_win (something actionable this month)
- Include at least 1 market_trend (real trend in facility services market)
- Include at least 1 strategic (longer-term positioning advice)
- Be honest about challenges and opportunities
- Do NOT include any text outside the JSON array

Return ONLY valid JSON array, no markdown code blocks, no commentary.`
}
