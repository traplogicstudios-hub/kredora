# Kredora Enterprise Repositioning Plan

> **Implementation source of truth** for the TechEx Intelligent Enterprise Solutions Hackathon final submission pass.
> Follow these sections in order. Cursor agents should reference this document as the canonical spec.

---

## 1. Project Summary

| Field | Value |
|---|---|
| **Product name** | Kredora |
| **Subtitle** | AI Funding Readiness Intelligence |
| **Hackathon** | TechEx Intelligent Enterprise Solutions Hackathon by lablab.ai |
| **Product positioning** | Enterprise-focused AI funding readiness intelligence platform for business support organizations and the entrepreneurs they serve |
| **Primary users** | Chambers of commerce, nonprofits, grant consultants, accelerators, community lenders, economic development teams, small business support programs |
| **End beneficiary** | Small business owners and entrepreneurs seeking funding |
| **Demo profile** | Autonomyx Solutions — AI automation and tech services, Riverside CA, 1 year in business |
| **Submission window** | Under 24 hours from repositioning start |

---

## 2. Core Product Thesis

Most entrepreneurs do not just need a list of grants. They need to know whether they are funding-ready, what documents are missing, which funding paths may fit, and what steps to take next.

Business support organizations — chambers of commerce, CDFIs, accelerators, nonprofits, and economic development offices — work with dozens or hundreds of entrepreneurs at once. Their advisors spend significant time manually assessing businesses, identifying gaps, and writing action plans. This work is slow, inconsistent, and hard to scale.

**Kredora turns a business intake conversation into a structured funding readiness intelligence report in minutes.** Organizations get an advisor-ready report they can act on. Entrepreneurs get a plain-language summary of what they need to do before applying.

This is not a grant database. This is not a chatbot. This is a structured AI intelligence layer built specifically for the organizations that support entrepreneurs.

---

## 3. Hackathon Judging Alignment

| Criterion | How Kredora addresses it |
|---|---|
| **Application of Technology** | Gemini AI analyzes business profiles and generates structured funding readiness reports with scoring, gap detection, and path recommendations. The readiness scoring engine weights five categories of business strength. |
| **Presentation** | The demo flow is clean and linear: landing page → advisor dashboard → assessment form → Gemini analysis loading → full funding readiness report. Each screen has a clear purpose. |
| **Business Value** | Advisor organizations save hours per assessment. Entrepreneurs get clarity instead of confusion. The B2B2C model creates value at the organizational level while preserving the consumer benefit. |
| **Originality** | "Funding readiness intelligence" is a novel framing. Not a grant finder, not a chatbot, not a loan marketplace — a structured readiness scoring and advisory system built for the organizations that support entrepreneurs. |

---

## 4. Required Demo Flow

The final demo must show these screens in this order:

1. **Advisor / Organization Dashboard** — org-level metrics, status badges, "New Assessment" CTA
2. **Business Funding Assessment Form** — intake fields, "Load Demo Profile" button
3. **AI Analysis / Loading Flow** — animated Gemini analysis steps (5 steps with progress)
4. **Funding Readiness Report** — the main deliverable
5. **Capital Readiness Score** — 68/100 circular gauge with label
6. **Score Breakdown** — 5 sub-scores with labels
7. **Funding Path Recommendations** — 4 funding path cards with match levels
8. **Readiness Gap Analysis** — completed items, needs work items, risk flags
9. **Required Document Checklist** — embedded in gap analysis and funding path cards
10. **Advisor Notes** — distinct advisor-facing card with italic styling
11. **Entrepreneur-Friendly Summary** — plain language card for the business owner
12. **Copy / Export Advisor Report** — action bar at the bottom of the report

The full demo should be completable in under 3 minutes.

---

## 5. Required App Language

All visible copy must use this terminology. Replace old language everywhere — in nav, headings, button labels, cards, and badges.

| Old language (remove) | New language (use) |
|---|---|
| "Grant finder" | "Funding readiness intelligence" |
| "AI summary" | "Advisor-ready report" |
| "Grant recommendations" | "Funding path recommendations" |
| "Checklist" | "Readiness gap analysis" |
| "Match score" | "Capital Readiness Score" or "Funding Readiness Score" |
| "User dashboard" | "Advisor Dashboard" or "Organization Intelligence Dashboard" |
| "Opportunity" | "Funding path" |
| "AccessBridge AI" | "Kredora" |
| "Score" alone | "Readiness score" or "Capital Readiness Score" |

Always preserve entrepreneur-facing language in the **Entrepreneur-Friendly Summary** section so the consumer benefit remains visible.

---

## 6. Landing Page Copy

### Title
**Kredora**

### Subtitle
AI Funding Readiness Intelligence

### Hero copy
> "Kredora helps business support organizations assess entrepreneurs, identify funding gaps, and generate advisor-ready action plans in minutes."

### Audience copy
> "Built for chambers of commerce, nonprofits, accelerators, grant consultants, community lenders, and economic development teams supporting small business owners."

### Primary CTAs
- "View Advisor Dashboard" → `/dashboard`
- "Start Free Assessment" → `/assess`

### Supporting sections to include on landing page
1. **Problem statement** — 3 columns: What advisors face | What entrepreneurs face | What Kredora does
2. **Audience cards** — Cards for: Chambers of Commerce, Nonprofits & CDFIs, Accelerators, Grant Consultants, Economic Development Teams
3. **How it works** — 5 numbered steps: Intake → Analyze → Score → Recommend → Report
4. **Footer** — Disclaimer: "Kredora provides funding readiness intelligence, not financial or legal advice. Results are illustrative and do not guarantee funding eligibility."

---

## 7. Advisor Dashboard Requirements

**Page title:** Organization Intelligence Dashboard

**Route:** `/dashboard`

### Status badges (display as a row of pills near the top)
- Gemini Analysis Active
- Funding Criteria Loaded
- Advisor Report Ready
- Demo Environment

### KPI metric cards (4-column grid)
| Metric | Value |
|---|---|
| Businesses Assessed | 124 |
| Readiness Gaps Found | 317 |
| Reports Generated | 86 |
| Average Readiness Score | 68% |

### Additional dashboard content
- **"New Assessment" CTA button** — prominent, links to `/assess`
- **AI insight bar** — dark background card with Gemini pattern analysis text
- **Recent assessments table** — include a row for Autonomyx Solutions (score: 68, industry: AI tech, date: today, link: "View Report")
- **Top readiness gaps** — horizontal bar chart showing most common gaps across assessed businesses
- **Score distribution** — bar chart showing how assessed businesses distribute across readiness bands
- **Recommended support programs** — cards linking to SBDC, chamber programs, microloan resources

---

## 8. Business Assessment Form Requirements

**Page title:** New Business Funding Assessment

**Route:** `/assess`

**Description text (display below the title):**
> "Enter a business profile so Kredora can evaluate funding readiness, detect documentation gaps, and generate an advisor-ready action plan."

### Form fields (in order)

| Field | Type | Options / Notes |
|---|---|---|
| Business name | Text input | Required |
| Location | Text input | "City, State" format |
| Industry | Text input or select | Free text acceptable |
| Years in business | Number input | Required |
| Business stage | Select | Pre-revenue, Early-stage, Growth, Established |
| Revenue range | Select | $0–$25K, $25K–$100K, $100K–$500K, $500K+ |
| Funding goal | Select | Under $25K, $25K–$50K, $50K–$150K, $150K+ |
| Use of funds | Textarea | What the funding will be used for |
| Documents available | Checkbox grid | EIN, Business Bank Account, Website, Business Email, Business License, Financial Projections, Business Plan, Revenue Records, Use-of-Funds Statement, Grant Narrative |
| Biggest funding challenge | Textarea | Open text |

### Buttons
- **"Load Demo Profile"** — fills form with Autonomyx Solutions data (see Section 9)
- **"Generate Funding Readiness Report"** — validates form, then navigates to `/analyzing`

---

## 9. Demo Business Profile

Use this exact data when "Load Demo Profile" is clicked, and as the default mock report subject.

| Field | Value |
|---|---|
| Business name | Autonomyx Solutions |
| Location | Riverside, CA |
| Industry | AI automation and tech services |
| Years in business | 1 |
| Business stage | Early-stage |
| Revenue range | $25K–$100K |
| Funding goal | $25,000–$50,000 |
| Use of funds | Software tools, marketing, contractor support, client delivery systems |
| Documents available | EIN, Business Bank Account, Website, Business Email |
| Needs work | Financial Projections, Grant Narrative, Business Plan, Revenue Records, Use-of-Funds Statement |
| Biggest challenge | Lack of financial projections and formal business documentation |

---

## 10. AI Loading Flow

**Route:** `/analyzing`

**Loading body copy (display prominently):**
> "Gemini is analyzing business profile data, funding readiness signals, documentation gaps, and recommended funding paths."

### Animated steps (appear sequentially, ~600ms apart)

| # | Step label |
|---|---|
| 1 | Business profile reviewed |
| 2 | Readiness signals scored |
| 3 | Documentation gaps detected |
| 4 | Funding paths generated |
| 5 | Advisor report prepared |

Each step should animate in with a checkmark icon once complete. A progress bar should fill as steps complete. The page should auto-navigate to `/report` after the AI call resolves (or after ~4 seconds if using mock data).

---

## 11. Funding Readiness Report Requirements

**Route:** `/report`

**Page title:** Funding Readiness Report

**Subtitle:** Advisor-ready intelligence for Autonomyx Solutions

### Capital Readiness Score
Display as a large circular gauge (SVG ring):
- **Score:** 68 / 100
- **Label:** Capital Readiness Score
- **Color:** Amber / orange (needs work range)

### Score Breakdown
Display as a table or bar chart with 5 rows:

| Category | Score |
|---|---|
| Business Foundation | 82 |
| Documentation Readiness | 54 |
| Revenue Clarity | 61 |
| Funding Fit | 73 |
| Application Preparedness | 49 |

### AI Business Summary
Display in a dark background card labeled "Gemini Analysis":
> "Autonomyx Solutions has a strong business foundation with active operations, a business bank account, website, and clear service category. The biggest readiness gaps are financial projections, revenue documentation, grant narrative materials, and a clear use-of-funds statement."

---

## 12. Funding Path Cards

Display as a 2-column grid (desktop) or single column (mobile). Each card must include all fields below.

### Card A — Local Small Business Grant Readiness
- **Match level:** Medium
- **Why it fits:** Early-stage local service business with community economic activity.
- **What to verify:** City/county eligibility, location rules, revenue requirements.
- **Documents needed:** Business license, bank statements, use-of-funds statement.
- **Next step:** Prepare a one-page business summary and local impact statement.

### Card B — Microloan / Community Lender Readiness
- **Match level:** High
- **Why it fits:** Funding goal fits early-stage growth and operational support.
- **What to verify:** Credit profile, revenue history, repayment ability.
- **Documents needed:** Revenue records, bank statements, business plan, projections.
- **Next step:** Build a 12-month cash-flow projection.

### Card C — Technical Assistance Program Fit
- **Match level:** High
- **Why it fits:** Business would benefit from advisor support before competitive applications.
- **What to verify:** Local program availability and industry fit.
- **Documents needed:** Business overview, goals, challenge statement.
- **Next step:** Contact SBDC, chamber, or small business support program.

### Card D — Accelerator / Pitch Competition Readiness
- **Match level:** Medium
- **Why it fits:** AI automation business has innovation potential and a founder story.
- **What to verify:** Stage requirements, traction expectations, pitch deadlines.
- **Documents needed:** Pitch deck, demo, traction summary.
- **Next step:** Build a 5-slide funding pitch.

### Match level badge colors
- High → Green badge
- Medium → Amber/yellow badge
- Low → Slate badge

---

## 13. Readiness Gap Analysis

Display as a 3-section panel below the funding path cards.

### Completed (green checkmarks)
- EIN
- Business bank account
- Business email
- Website
- Clear business category

### Needs Work (amber warning icons)
- Financial projections
- Grant narrative
- Revenue documentation
- Use-of-funds statement
- Formal business plan
- Business credit profile

### Risk Flags (red alert icons)
- Competitive grant applications may be weak without financial projections.
- Revenue documentation should be organized before loan or grant review.
- Use-of-funds statement needs to be specific and measurable.

---

## 14. Advisor Notes

Display as a distinct card with:
- Left border accent (4px, indigo-500)
- Label: "Advisor Notes" in small caps
- Italic body text
- Separate visually from the AI summary

**Content:**
> "This business is not blocked from pursuing funding, but it should complete readiness materials before applying to competitive grants. The best immediate path is microloan readiness, technical assistance, and local small business programs while preparing stronger financial documentation."

---

## 15. Entrepreneur-Friendly Summary

Display as a distinct card with:
- Light indigo-50 or blue-50 background
- Label: "For the Business Owner" in small caps
- Plain English, no jargon
- Separate visually from the advisor section

**Content:**
> "Your business has a strong foundation, but you are not fully application-ready yet. Before applying for competitive funding, focus on organizing your revenue records, writing a clear use-of-funds statement, preparing basic financial projections, and creating a short business story that explains your impact."

---

## 16. AI / Gemini Prompt Structure

Use this prompt in `src/lib/ai/prompts.ts` as `fundingReadinessPrompt(profile)`.

```
You are a senior funding readiness advisor for a business support organization.
Analyze this business profile and return a structured funding readiness report.

Business Profile:
- Name: {businessName}
- Location: {location}
- Industry: {industry}
- Years in Business: {yearsInBusiness}
- Stage: {businessStage}
- Revenue Range: {revenueRange}
- Funding Goal: {fundingGoal}
- Use of Funds: {useOfFunds}
- Documents Available: {documentsAvailable joined by comma}
- Biggest Challenge: {biggestChallenge}

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
```

### Safety language (enforce in prompt and guardrail checks)
- Do not guarantee funding eligibility or approval
- Do not claim that any funding path is certain or confirmed
- Use language like "potential fit," "readiness indicator," "what to verify," and "recommended next steps"
- This output is not financial advice, legal advice, or a grant guarantee
- Risk flags should describe preparation gaps, not predictions of rejection

---

## 17. Implementation Order for Cursor Agents

Follow this order exactly. Do not skip ahead or parallelize steps that share the same files.

1. **Create checkpoint commit** — commit current state before any changes
2. **Inspect repo structure** — confirm all referenced files exist before editing
3. **Branding and copy updates** — update index.html title, Header.tsx wordmark and nav, DemoBanner.tsx badges, AIAnalysisBar.tsx label
4. **Types and constants** — update `src/lib/types/index.ts` with new types (FundingPath, ReadinessReport, updated BusinessProfile); update `src/lib/constants/index.ts` with new enums and labels
5. **Data files** — create `src/lib/data/kredoraDemoProfile.ts` (Autonomyx Solutions), create `src/lib/data/fundingPaths.ts` (4 paths from Section 12)
6. **Mock AI output** — add `MOCK_READINESS_REPORT` to `src/lib/ai/mockResponses.ts` using all values from Sections 11–15
7. **AI prompt** — add `fundingReadinessPrompt()` to `src/lib/ai/prompts.ts`
8. **Store update** — add `readinessReport` state and `setReadinessReport` action to `src/store/appStore.ts`
9. **Route update** — update `src/App.tsx`: add `/assess`, `/analyzing`, `/report`; redirect `/onboard` → `/assess` and `/enterprise` → `/dashboard`
10. **Landing page rewrite** — rewrite `src/pages/LandingPage.tsx` with Kredora enterprise copy (see Section 6)
11. **Assessment form** — transform `src/pages/OnboardPage.tsx` using fields from Section 8; wire "Load Demo Profile" and form submit → `/analyzing`
12. **Analysis loading page** — create `src/pages/AnalysisPage.tsx` with 5 animated steps, auto-navigate to `/report`
13. **Funding readiness report** — create `src/pages/FundingReadinessReportPage.tsx` with all sections from Sections 11–15
14. **Advisor dashboard** — transform `src/pages/EnterpriseDashboardPage.tsx` using values from Section 7
15. **Hide old pages** — remove `/dashboard` (opportunity list), `/opportunity/:id`, `/apply/:id` from nav links; keep routes but do not link to them
16. **Final QA** — run dev server, walk the full demo flow end to end

---

## 18. Suggested Cursor Agent Split

Split work across agents to parallelize where possible. One main implementation agent should own final consistency and merge.

| Agent | Owns |
|---|---|
| **Main Implementation Agent** | App.tsx routing, store, types, constants, final consistency pass, merge |
| **Branding / Copy Agent** | index.html, Header.tsx, DemoBanner.tsx, AIAnalysisBar.tsx — copy and visible language only |
| **Dashboard / Intake Agent** | EnterpriseDashboardPage.tsx (advisor dashboard), OnboardPage.tsx (assessment form), demo profile data |
| **Report Agent** | FundingReadinessReportPage.tsx, AnalysisPage.tsx, mockResponses.ts, prompts.ts |

**Warning:** Do not let multiple agents edit the same file at the same time. Coordinate on `src/App.tsx`, `src/lib/types/index.ts`, and `src/store/appStore.ts` — these are shared dependencies. Assign one agent to own each of these files and have other agents wait until those are stable before referencing the new types or routes.

---

## 19. What to Cut or Avoid

Do not build or include any of the following in the hackathon submission:

| Item | Reason |
|---|---|
| Authentication / login | Out of scope for demo; adds complexity without demo value |
| Payments or subscriptions | Not part of MVP, not asked for in judging |
| Complex database or backend | Mock data is sufficient; no time to wire a live DB |
| Live grant scraping | Data freshness is not a hackathon concern |
| Full multi-user workspace | Single org demo is sufficient |
| Admin portal | Not part of the demo flow |
| Any broken feature | Remove broken UI elements from the visible flow entirely |
| "Guaranteed funding" language | Violates product safety rules; never include |
| "You are eligible for..." language | Use "potential fit" and "what to verify" instead |
| Old "Prime Clean Solutions" data | Replace entirely with Autonomyx Solutions |
| Old "grant finder" copy | Replace entirely with "funding readiness intelligence" |
| NAICS code selector | Not relevant to new form; remove from assessment form |
| SAM.gov / UEI registration field | Government contracting context; not relevant |
| Certification checkboxes (MBE/WBE/DBE etc.) | Replaced by documents available checklist |
| Bonding and supplier diversity paths | Not part of Kredora's funding path scope |

---

## 20. Definition of Done

The repositioning pass is complete when all of the following are true:

- [ ] App says "Kredora" everywhere — no visible "AccessBridge AI" copy remains
- [ ] App clearly reads as enterprise / B2B2C — not a consumer grant finder
- [ ] Entrepreneur benefit is still visible — Entrepreneur-Friendly Summary section present
- [ ] Advisor Dashboard exists at `/dashboard` with KPI cards, status badges, and "New Assessment" button
- [ ] Assessment Form exists at `/assess` with all required fields and "Load Demo Profile" button
- [ ] Gemini-style analysis loading flow exists at `/analyzing` with 5 animated steps
- [ ] Funding Readiness Report exists at `/report` with all required sections
- [ ] Report includes: Capital Readiness Score, score breakdown, AI summary, 4 funding paths, gap analysis, advisor notes, entrepreneur summary
- [ ] Copy / export button present on report page
- [ ] Demo can be completed smoothly in under 3 minutes
- [ ] No broken visible buttons or links
- [ ] No old "grant finder" language anywhere in the visible UI
- [ ] No "guaranteed funding" or "guaranteed eligibility" language anywhere
- [ ] Disclaimer present on report page: "Kredora provides funding readiness intelligence, not financial or legal advice. Results are illustrative."

---

*Document owner: TrapLogic Studios — Kredora Hackathon Build*
*Last updated: 2026-05-17*
