# UI Implementation Spec

Source: AccessBridge AI design PDF from Claude Design.

## Design Direction

AccessBridge AI should feel like a serious opportunity readiness platform, not a generic grant finder.

Visual system:

- Font direction: Geist-style clean sans with mono captions
- Palette direction: civic blue, warm off-white, black/near-black utility bars
- Icon style: monoline icons
- Layout style: enterprise SaaS dashboard with strong spacing and high contrast
- Tone: civic tech, economic development, practical AI infrastructure

## Global UI Elements

### Header

- AccessBridge AI logo/mark
- Subtitle: Opportunity Readiness Platform
- Nav links: Opportunities, Enterprise
- User/profile pill: Prime Clean Solutions, Riverside, CA, Demo Profile

### Demo Mode Banner

Display across app pages after landing:

"DEMO MODE You're viewing Prime Clean Solutions, a sample profile loaded for the TechEx hackathon demo. All data, opportunities, and AI outputs are illustrative. v0.1 · mock-safe"

### AI Analysis Bar

Use for AI insight sections:

- Label: ACCESSBRIDGE AI · ANALYSIS
- Confidence percentage on right
- Black/near-black border or header treatment

### Legal/Safety Note

Generated outputs must include:

"NO GUARANTEE OF FUNDING OR AWARD · ALWAYS REVIEW BEFORE SUBMISSION"

## Screen 1: Landing Page

### Purpose

Explain the product in under 10 seconds.

### Main Headline

Opportunity should not depend on insider knowledge.

### Supporting Copy

AccessBridge AI helps small businesses find, qualify for, and apply to real opportunities — grants, contracts, supplier programs, and business funding — by closing the readiness gaps that block most applications before they're sent.

### Primary CTA

Start opportunity scan

### Secondary CTA

View enterprise insights

### Differentiator Section

Most tools help users discover opportunities.
AccessBridge AI helps them become ready to win them.

Three-step flow:

1. Find — Match against grants, contracts, and supplier programs.
2. Qualify — Readiness scoring against opportunity requirements.
3. Apply — Generate cover letters, capability statements, action plans, and checklists.

### Audience Section

Small Business Owner:

- Stop guessing what you qualify for.
- See every opportunity you actually match.
- Understand exactly what's blocking each application.
- Generate the documents you need quickly.

City / Nonprofit / Supplier Diversity:

- See where businesses are getting stuck.
- Aggregate readiness data across business communities.
- Identify blockers costing contract dollars.
- Target support programs where they move the needle.

### Hero Data Cards

- $24.6M Pipeline Tracked
- 412 Businesses Analyzed
- 14 sources: State, Federal, Supplier

### Mini Opportunity Preview

Show Prime Clean Solutions with three opportunities:

- Riverside County Public Facilities — match 92, readiness 74
- City of Riverside Recovery Grant — match 95, readiness 88
- Kaiser Permanente Supplier Diversity — match 78, readiness 52

## Screen 2: Business Profile Form

### Purpose

Guided intake to collect business identity, readiness, and goals.

### Structure

Step indicator:

1. Identity
2. Readiness
3. Goals

### Copy

Tell us about your business.

We use this to match you against opportunities and score your readiness for each. Everything stays safe for the demo.

### Demo Action

Button: Load demo profile

### Identity Fields

- Business name: Prime Clean Solutions
- Industry: Commercial Cleaning & Facility Services
- City: Riverside
- State: California
- Years in business: 1
- Business structure: LLC
- Short business description

### Security Note

We never expose API keys in your browser. AI generation runs server-side with mock-safe fallbacks for the demo.

## Screen 3: Opportunity Dashboard

### Purpose

Show matched opportunities and prioritize the best next actions.

### Page Heading

8 opportunities matched. 4 look like strong fits.

### Supporting Copy

Sorted by match strength. Each opportunity is scored against the requirements published by the issuing source. Open one to see readiness gaps and generate an application package.

### Summary Metrics

- Opportunities identified: 8 across 6 funding categories
- Strong matches: 4 with match score 80+
- Ready to apply: 5 with readiness score 60+
- Pipeline value: $335K if qualified set wins
- Average readiness: 68

### AI Recommendation Panel

Heading: Your highest-leverage move this week

Recommendation:
Start with Riverside County Public Facilities and City of Riverside Recovery Grant. Both are local and reward current strengths. Then file California SBE certification to unlock preference points on five more state contracts within 30–60 days.

Actions:

- Open top match
- See all recommended actions

### Filters

- All
- State Contract
- Federal Contract
- Grant
- Supplier Diversity
- Loan
- Bonding

Sort options:

- Match
- Readiness
- Deadline

### Opportunity Cards

Each card should include:

- Type/source eyebrow
- Title
- Description
- Tags
- Value
- Deadline
- Region
- Match score badge
- Readiness score badge
- Gap summary
- View breakdown CTA

### Demo Opportunities

1. City of Riverside Small Business Recovery Grant — match 95, readiness 88
2. Riverside County Public Facilities Janitorial Services — match 92, readiness 74
3. California Clean Business Initiative — Small Business Grant — match 84, readiness 81
4. Contract Surety Bond Program — Inland Empire SBDC — match 81, readiness 76
5. Kaiser Permanente Supplier Diversity — Facility Maintenance — match 78, readiness 52
6. SBA Microloan Program — Inland Empire — match 76, readiness 72
7. California State University System — Janitorial Services RFP — match 64, readiness 38
8. GSA Schedule 61 — Janitorial Supplies & Services — match 41, readiness 22

## Screen 4: Opportunity Breakdown

### Selected Opportunity

Riverside County Public Facilities Janitorial Services

### Key Details

- Type: State Contract
- Source: Riverside County Procurement
- Value: $120,000 / year
- Deadline: Jun 29, 2026
- Days remaining: 48
- Region: Riverside County, CA
- Match score: 92
- Readiness score: 74 almost ready

### Readiness Summary

- Blocking gaps: 0
- Major gaps: 1
- Minor gaps: 2

### Why This Matches

Four signals:

1. Headquartered in Riverside — local vendor preference applies
2. NAICS 561720 is an exact match for the solicitation scope
3. Active liability insurance meets the $1M minimum requirement
4. Owner-operated model fits small business evaluation criteria

### Category Breakdown

- Certifications: 35/100
- Financial: 88/100
- Experience: 70/100
- Documentation: 78/100
- Registration: 85/100

### Requirements & Gaps

Met:

- Minimum 1 year in business
- Active general liability insurance ($1M minimum)
- Business bank account on file
- W-9 and business license

Unmet:

- SBE or MBE certification preferred

### Strategic Read Panel

This is the highest-confidence near-term opportunity. The county favors local vendors, the NAICS aligns, and critical insurance and tenure requirements are clear. The biggest lift is filing an SBE certification application this week.

Estimated effort: 6 hours of paperwork + 2 weeks of waiting.

### Next Step Panel

CTA: Generate application package

Generated package should include:

- Cover Letter
- Capability Statement
- Executive Summary
- 60-Day Action Plan
- Compliance Checklist

### Action Items

- Major: SBE or MBE certification not on file — apply for California SBE certification via CalTrans
- Minor: No formal capability statement on record — generate and review AccessBridge draft
- Minor: Only 1 of 3 client references documented — compile 2 additional references

## Screen 5: Generated Application Package

### Purpose

Show the AI output as editable, reviewable documents.

### Heading

5 documents drafted, ready for your review.

### Supporting Copy

Pulled from your business profile and the requirements published by the issuing source. Edit anything inline. Confidence notes flag where to double-check.

### Status

Generated · Mock-safe

### Top Actions

- Regenerate all
- Export package

### Document Tabs/List

1. Cover Letter — 2 pages, 312 words
2. Capability Statement — 2 pages, 348 words
3. Executive Summary — 1 page, 218 words
4. 60-Day Readiness Action Plan — 3 pages, 412 words
5. Compliance Checklist — 1 page, 186 words

### Package Summary

- Documents: 5
- Pages: 9
- Words: 1,476
- Average confidence: 90%

### Document Viewer

Viewer should feel editable and professional.

Include:

- Document title
- Draft status
- Confidence note
- Regenerate action
- Copy action
- Download action
- Mark as reviewed action
- Safety warning

## Screen 6: Enterprise Intelligence Dashboard

### Purpose

Show enterprise value for cities, nonprofits, and supplier diversity teams.

### Header Context

City of Riverside Economic Development · viewing all tracked small businesses

### Page Heading

See where your small businesses are getting stuck.

### Supporting Copy

Aggregate readiness data across 412 businesses in Riverside County. Identify the blockers costing the most contract dollars and target your support programs where they'll move the needle.

### KPI Cards

- Businesses tracked: 412, +12%, active in last 90 days
- Avg readiness score: 47, +4
- Ready to apply: 32%, +6%, readiness ≥ 60
- Opportunity pipeline value: $24.6M, +18% YoY

### AI Community Pattern Panel

Many businesses are interested in contracts but are blocked by missing insurance documentation, no SAM.gov registration, and absent capability statements. 72% of tracked businesses do not have a capability statement on file, yet it costs nothing to produce and unlocks an estimated $8.2M in pipeline.

Actions:

- Launch capability statement workshop
- View detailed breakdown

### Top Blockers

- No SAM.gov / UEI: 58%
- Missing insurance documentation: 41%
- No SBE/MBE certification: 67%
- No capability statement: 72%
- Under 1 year in business: 23%

### Readiness Distribution

- Not Ready: 142, 34%
- Needs Work: 138, 33%
- Almost Ready: 92, 22%
- Strong Match: 40, 10%

### Opportunity Demand by Industry

- Commercial cleaning: 86, 21%
- Construction & trades: 71, 17%
- Professional services: 64, 16%
- Food & catering: 48, 12%
- Transportation: 39, 10%
- Other: 104, 24%

### Strategic Insights

1. Register on SAM.gov this week — unlocks 5 opportunities and $3M+ in eligibility
2. Government janitorial spend up 18% in Southern California
3. SBE certification equals 34% more bid wins
4. Thin local competition under $200K
5. Stack SBE + MBE for maximum access

### Recommended Support Programs

- SAM.gov Registration Clinic — fits 238 businesses, +24 readiness points average
- SBE Certification Cohort — fits 276 businesses, +18 readiness points average
- Capability Statement Workshop — fits 296 businesses, +11 readiness points average
- Insurance Cost-Share Program — fits 169 businesses, removes blocker for 41% of vendors

## Implementation Notes

- Build a clean responsive desktop-first app for demo.
- Mobile responsive is good, but desktop demo polish is the priority.
- Use mock-safe labels clearly.
- Keep all copy concise and readable.
- Make CTA flow obvious: landing -> profile -> opportunities -> breakdown -> package -> enterprise dashboard.
- Keep the logic layer separated from presentation components.
- Do not expose API keys in browser.
- Use mock AI outputs until serverless Gemini integration is ready.
