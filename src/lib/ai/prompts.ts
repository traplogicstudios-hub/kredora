import type { BusinessProfile } from '../types'
import { OPPORTUNITIES } from '../data/opportunities'

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
