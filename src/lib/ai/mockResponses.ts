import type { GeneratedDocument, EnterpriseDashboard } from '../types'
import { countWords } from '../utils'

const COVER_LETTER = `
To the Contracting Officer,

Prime Clean Solutions is pleased to submit this letter of interest in response to the Riverside County Public Facilities Janitorial Services solicitation. As a locally based commercial cleaning company operating out of Riverside, California, we are uniquely positioned to deliver reliable, high-quality custodial services with the responsiveness and local accountability that county facilities demand.

Founded in 2024, Prime Clean Solutions has rapidly established a reputation for dependable service, strict attention to detail, and full regulatory compliance. We carry active general liability insurance, maintain a professional team of four trained cleaning technicians, and operate under all applicable California labor and licensing requirements. Our owner-operated model means that accountability is never delegated — the person who wins your contract is the person who shows up.

Our core service capabilities include daily and periodic janitorial cleaning for office environments, restroom sanitation and supply replenishment, floor care including sweeping, mopping, and buffing, window and surface disinfection per CDC standards, and post-event and deep cleaning services. We have served commercial properties across the Inland Empire region, building a track record of on-time performance and client satisfaction.

As a Riverside-based business, we understand the community we serve. Selecting Prime Clean Solutions means investing in a local employer who hires locally, buys locally, and is committed to the long-term wellbeing of Riverside County. We welcome the opportunity to demonstrate our capabilities and are fully prepared to meet the bonding, insurance, and compliance requirements of this contract.

We would welcome the opportunity to discuss this opportunity further. Please do not hesitate to contact our office at your convenience.

Respectfully submitted,

[Owner Name]
Prime Clean Solutions
Riverside, California
[Phone] | [Email]
`.trim()

const CAPABILITY_STATEMENT = `
PRIME CLEAN SOLUTIONS
Commercial Cleaning & Facility Services | Riverside, CA

CORE COMPETENCIES:
Prime Clean Solutions specializes in professional janitorial and facility maintenance services for commercial, government, and institutional clients. Our areas of expertise include: daily and periodic janitorial services, office and workspace sanitation, restroom maintenance and supply management, hard floor care (strip, wax, buff, and refinish), green and eco-friendly cleaning protocols, post-construction and post-renovation cleanup, and scheduled deep cleaning and disinfection.

DIFFERENTIATORS:
What sets Prime Clean Solutions apart is our owner-operated model, local Riverside presence, and unwavering commitment to compliance and quality. Every contract receives direct oversight from company leadership. We are fully insured, background-checked, and trained in OSHA-compliant cleaning procedures. Our rapid response capability and flexible scheduling mean we can accommodate emergency requests and after-hours service needs. We prioritize long-term relationships over one-time transactions.

PAST PERFORMANCE:
In our first year of operation, Prime Clean Solutions has successfully completed cleaning contracts for commercial office buildings, retail centers, and light industrial facilities across the Inland Empire region. Key engagements include recurring weekly service for a 12,000 sq ft professional services office in Riverside, monthly deep cleaning for a Moreno Valley warehouse complex, and post-renovation cleanup for a commercial tenant improvement project in Ontario.

COMPANY DATA:
Business Name: Prime Clean Solutions
Location: Riverside, California 92501
Business Structure: Limited Liability Company (LLC)
NAICS Codes: 561720 (Janitorial Services), 561740 (Carpet and Upholstery Cleaning Services)
Years in Operation: 1
Employees: 4
Insurance: Active General Liability ($1M per occurrence)
Certifications: Pursuing SBE and MBE certifications
`.trim()

const EXECUTIVE_SUMMARY = `
Prime Clean Solutions offers Riverside County a trusted, locally rooted commercial cleaning partner with the agility of a small business and the professionalism of an established service provider.

Founded in 2024 and operating from Riverside, California, Prime Clean Solutions has built a focused, high-performance team dedicated to delivering consistent, compliant janitorial services for commercial and government facilities. With active general liability insurance, OSHA-trained staff, and owner-directed quality control, the company brings accountability that larger contractors cannot match.

In its first year of operation, Prime Clean Solutions has demonstrated the operational capacity, client responsiveness, and compliance orientation required of public sector contracts. The company is actively pursuing SBE and MBE certification, positioning itself for expanded public procurement eligibility in the near term. With a growing portfolio of Inland Empire clients and a strong referral network, Prime Clean Solutions is prepared to scale operations in response to contract requirements.

The company's strategic growth plan centers on government and institutional contracts as the cornerstone of a sustainable, long-term business. Winning this contract would represent a meaningful step in that trajectory — and Riverside County would gain a responsive, compliant, and locally accountable service partner.
`.trim()

const GAP_ACTION_PLAN = `
60-DAY READINESS ACTION PLAN
Prime Clean Solutions — Path to Contract Readiness

WEEK 1–2: Foundation Fixes
1. Register on SAM.gov to obtain your Unique Entity ID (UEI). This is required for all federal and many state contracts. The registration is free and takes 10–14 business days. Go to SAM.gov > Create Account > Entity Registration.
2. Contact your insurance broker to request a Certificate of Insurance naming the contracting agency as an additional insured. Most brokers can issue this in 24–48 hours at no cost.
3. Compile your financial records: business bank statements (last 12 months), most recent tax return, and any profit & loss statements. Keep these organized in a digital folder for quick submission.

WEEK 3–4: Certification Kickoff
1. Apply for California SBE (Small Business Enterprise) certification through CalTrans. The application is free, takes 30–60 days, and opens eligibility for preference points on state contracts. Visit dot.ca.gov/programs/civil-rights/dbe-sbe-program.
2. Attend a free SBDC workshop on government contracting. The Inland Empire SBDC offers monthly sessions. Visit iessbdc.org to register — these sessions also give you access to free one-on-one advisors.
3. Request your DUNS number or confirm your UEI is active. If your SAM.gov registration is complete, your UEI is your identifier.

WEEK 5–8: Documentation & Submission Readiness
1. Create a professional capability statement (use the generated version in your AccessBridge AI package as a starting point). Have it reviewed at your SBDC session.
2. Gather 2–3 client references from past or current cleaning contracts. Even informal arrangements count — document the client name, scope, dates, and approximate value.
3. Review the Riverside County vendor portal at countyofriverside.us/procurement and create a vendor profile if you haven't already. Set up alerts for new janitorial solicitations.

QUICK WINS (Do These This Week):
- Register on SAM.gov today — every day without a UEI is a day you can't bid federal or many state contracts
- Call your insurance broker and confirm your liability limits meet the $1M minimum required by most county contracts
- Join the Riverside Chamber of Commerce — members get early access to local procurement notices and networking with procurement officers
`.trim()

const COMPLIANCE_CHECKLIST = `
APPLICATION COMPLIANCE CHECKLIST
Prime Clean Solutions | Riverside County Facilities RFP

REQUIRED DOCUMENTS (Must Submit)
☐ Completed RFP Response Form (per issuing agency template)
☐ Certificate of Insurance — General Liability ($1M minimum per occurrence)
☐ Business License — City of Riverside or County of Riverside
☐ W-9 Form (IRS) — current year
☐ Cover Letter on company letterhead
☐ Capability Statement (1–2 pages max)
☐ References — minimum 2 client references with contact information
☐ Signed Non-Collusion Affidavit (form typically included in RFP packet)

PREFERRED / SCORED DOCUMENTS (Submit for Evaluation Points)
☐ SBE, MBE, or WBE Certification Letter (if applicable)
☐ DVBE Certification (if applicable — adds preference points)
☐ Financial Statement or most recent business tax return
☐ List of current active contracts or clients

STAFF & COMPLIANCE REQUIREMENTS
☐ Confirm all cleaning staff have completed background checks
☐ Confirm all staff are I-9 verified (work authorization documented)
☐ Confirm OSHA Hazard Communication training is completed
☐ Confirm you carry Workers' Compensation insurance (required if you have employees)

SUBMISSION CHECKLIST
☐ All pages numbered and organized per RFP instructions
☐ Submitted by deadline (verify time zone — Pacific Time)
☐ Submitted via correct channel (online portal, email, or physical delivery per RFP)
☐ Confirmation of receipt obtained

NOTES:
- SAM.gov registration is NOT required for this county contract but is required for state and federal bids
- If pursuing SBE preference: certification must be active at time of submission
- Contact the Procurement Office for questions — do NOT contact evaluation committee members directly
`.trim()

function makeDoc(
  type: GeneratedDocument['type'],
  title: string,
  content: string
): GeneratedDocument {
  return {
    id: `doc-${type}`,
    type,
    title,
    content,
    wordCount: countWords(content),
    isAIGenerated: false,
  }
}

export function getMockDocuments(): GeneratedDocument[] {
  return [
    makeDoc('cover_letter', 'Cover Letter', COVER_LETTER),
    makeDoc('capability_statement', 'Capability Statement', CAPABILITY_STATEMENT),
    makeDoc('executive_summary', 'Executive Summary', EXECUTIVE_SUMMARY),
    makeDoc('gap_action_plan', '60-Day Readiness Action Plan', GAP_ACTION_PLAN),
    makeDoc('compliance_checklist', 'Compliance Checklist', COMPLIANCE_CHECKLIST),
  ]
}

export const MOCK_ENTERPRISE_DASHBOARD: EnterpriseDashboard = {
  generatedAt: new Date().toISOString(),
  marketOpportunityScore: 71,
  pipelineStats: {
    totalIdentified: 14,
    qualified: 6,
    highPriority: 2,
    estimatedPipelineValue: 1430000,
  },
  insights: [
    {
      id: 'ins-1',
      category: 'quick_win',
      title: 'Register on SAM.gov This Week',
      body: 'You are currently ineligible for 5 of 14 identified opportunities due to the absence of SAM.gov registration. Completing this free registration unlocks $3M+ in federal and state contract eligibility. The process takes 10–14 business days.',
      metric: '5 opps unlocked',
      priority: 'high',
    },
    {
      id: 'ins-2',
      category: 'market_trend',
      title: 'Government Janitorial Spend ↑ 18% in Southern CA',
      body: 'California government agencies increased facility services spending by 18% year-over-year driven by post-pandemic hygiene standards and deferred maintenance budgets. Riverside and San Bernardino counties are among the top 5 counties by active janitorial solicitations.',
      metric: '↑ 18% YoY',
      priority: 'high',
    },
    {
      id: 'ins-3',
      category: 'readiness_gap',
      title: 'SBE Certification = 34% More Bid Wins',
      body: 'Certified SBE vendors win 34% more state contract bids on a per-bid basis than non-certified competitors in California. Prime Clean Solutions currently lacks any active certifications — applying for California SBE now would create a competitive moat within 60 days.',
      metric: '+34% win rate',
      priority: 'high',
    },
    {
      id: 'ins-4',
      category: 'competitor',
      title: 'Local Competition Is Thin for <$200K Contracts',
      body: 'Analysis of Riverside County procurement records shows fewer than 8 active local SBE-certified cleaning vendors competing for contracts under $200K. This thin competitive field represents Prime Clean Solutions\' strongest near-term opportunity window — before the market matures.',
      metric: '8 local competitors',
      priority: 'medium',
    },
    {
      id: 'ins-5',
      category: 'strategic',
      title: 'Stack Certifications for Maximum Contract Access',
      body: 'A certification stack of SBE + MBE would qualify Prime Clean Solutions for preference points on 11 of 14 identified opportunities. Prioritize SBE (30-day process) first, then begin MBE application (90-day process) immediately after. This two-cert strategy is the highest-ROI action available.',
      metric: '11 of 14 opps',
      priority: 'medium',
    },
  ],
  benchmarks: [
    {
      metric: 'Years in Business',
      yourValue: 1,
      industryAvg: 4.2,
      topQuartile: 8,
      status: 'below',
    },
    {
      metric: 'Active Certifications',
      yourValue: 0,
      industryAvg: 1.8,
      topQuartile: 3,
      status: 'below',
    },
    {
      metric: 'Insured & Compliant',
      yourValue: 'Yes',
      industryAvg: '78%',
      topQuartile: '100%',
      status: 'above',
    },
    {
      metric: 'SAM.gov Registered',
      yourValue: 'No',
      industryAvg: '42%',
      topQuartile: '100%',
      status: 'below',
    },
    {
      metric: 'Annual Revenue',
      yourValue: '$85K',
      industryAvg: '$420K',
      topQuartile: '$1.2M',
      status: 'below',
    },
    {
      metric: 'Local Market Presence',
      yourValue: 'Riverside',
      industryAvg: 'Multi-city',
      topQuartile: 'Regional',
      status: 'at',
    },
  ],
  topOpportunityIds: ['opp-riv-county-001', 'opp-riverside-small-014', 'opp-microloan-009', 'opp-bond-ie-012'],
}

/** Re-export for AI-related imports; source of truth is kredoraMockReport.ts */
export { MOCK_READINESS_REPORT } from '../data/kredoraMockReport'
