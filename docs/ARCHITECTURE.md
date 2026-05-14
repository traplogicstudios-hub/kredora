# AccessBridge AI Architecture

## Status

Architecture draft created after Claude architecture review. UI implementation is paused until Claude Design produces the approved visual direction.

## Architecture Decision

AccessBridge AI will use a logic-first architecture with UI implementation delayed until design approval.

The logic layer may be built before UI as long as it does not lock the final visual layout, component styling, navigation treatment, or page composition.

## Planned Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- TanStack Query
- React Router v6
- Radix UI primitives
- Lucide icons
- Gemini API or mock fallback

## Planned Project Structure

```text
src/
  index.css
  lib/
    utils.ts
    types/
      index.ts
    data/
      demoProfile.ts
      opportunities.ts
    scoring/
      readinessEngine.ts
    ai/
      prompts.ts
      mockResponses.ts
      gemini.ts
  store/
    appStore.ts
  hooks/
    useProfile.ts
    useOpportunities.ts
    useAI.ts
```

UI files are intentionally paused until Claude Design is complete:

```text
src/App.tsx
src/main.tsx
src/components/*
src/pages/*
src/api/generate.ts
```

## Core Data Models

### BusinessProfile

Represents the entrepreneur or small business.

Key fields:

- name
- NAICS codes
- city
- state
- years in business
- certifications
- goals
- insurance status
- DUNS or UEI status

### Opportunity

Represents a grant, contract, supplier diversity program, loan, bond, or related opportunity.

The MVP uses a static opportunity dataset instead of live scraping or external procurement APIs.

### ReadinessScore

Represents how prepared the business is to pursue an opportunity.

Key fields:

- overall score from 0 to 100
- score label
- category breakdown
- gap list
- strengths

### Gap

Represents a missing requirement or weakness.

Key fields:

- severity: blocking, major, or minor
- action item
- estimated resolution time

### ApplicationPackage

Represents generated application materials.

Document types:

- Capability statement
- Proposal draft
- Execution plan
- Assumptions and confidence notes
- Optional supporting summary

### EnterpriseDashboard

Represents institutional insight for cities, nonprofits, economic development teams, and supplier diversity programs.

Key fields:

- market score
- pipeline stats
- readiness insights
- common blockers
- competitor or benchmark data

## Readiness Scoring Logic

The readiness engine should be a pure function so it is easy to test, explain, and demo.

Recommended weights:

- Certifications: 25%
- Registration: 20%
- Financial readiness: 20%
- Experience: 20%
- Documentation: 15%

Blocking rule:

If any unmet critical requirement exists, cap the overall readiness score at 40.

Gaps should be sorted in this order:

1. Blocking
2. Major
3. Minor

Each gap should include a plain-English action item.

## Demo Profile Note

Claude created a draft demo profile called Prime Clean Solutions.

The locked project demo business from the PRD is:

- Autonomyx Solutions
- Riverside, CA
- Commercial Cleaning
- 1 year in business
- Goal: contracts and funding

Decision: keep the architecture pattern, but align the final demo profile with Autonomyx Solutions unless we intentionally choose a fictional company later.

## Opportunity Dataset

The MVP should include approximately 10 to 14 mock opportunities across these categories:

- Local contract
- Federal or state contract
- Small business grant
- Supplier diversity program
- Loan or funding program
- Bonding or readiness program

At least three should be polished for the live demo:

1. City or county janitorial services contract
2. Corporate supplier diversity cleaning vendor program
3. Small business growth grant

## AI Workflow

### Profile Analysis

Extract business eligibility signals and risk factors.

### Opportunity Matching

Compare the business profile against mock opportunity requirements.

### Readiness Scoring

Score each opportunity and explain missing requirements.

### Application Generation

Generate capability statement, proposal draft, execution plan, and assumptions.

### Enterprise Insight

Aggregate readiness blockers into useful institutional recommendations.

## AI Implementation Strategy

For hackathon stability:

1. Use mock AI outputs first.
2. Add Gemini only after the core demo flow works.
3. Ensure the demo works even if the API fails.

## Security Decision

Do not expose a real Gemini API key in the browser bundle for the public hackathon repo.

Acceptable options:

- Use mock AI mode for the public demo.
- Use a Vercel or Netlify serverless function for Gemini calls.
- Keep `.env.example` but never commit real secrets.

A browser-visible `VITE_GEMINI_API_KEY` may be useful for quick local testing, but it should not be treated as the final deployment strategy.

## State Management

Use Zustand for lightweight app state.

Persist only safe profile completion data if needed. Scores can be recomputed and generated packages can reset between sessions.

## Design Blockers

The following decisions are blocked until Claude Design produces the approved UI direction:

- Navbar style
- Demo banner style
- Readiness score visual treatment
- Opportunity card layout
- Opportunity detail gauge treatment
- Gap list layout
- Document viewer style
- Enterprise dashboard chart/layout style
- Landing page hero layout

## Implementation Guardrail

Claude or any coding agent may continue only on non-visual logic files until the design direction is approved.

Allowed before design approval:

- Types
- Mock data
- Scoring utilities
- AI service interface
- Prompt templates
- Mock generated outputs
- Store shape
- Hooks that do not define UI

Blocked before design approval:

- Final page layouts
- Styled components
- Navigation UI
- Dashboard visuals
- Tailwind theme finalization
- Chart design
- Landing page composition

## Next Step

Run Claude Design using the approved product context and this architecture. After the design direction is approved, build the React/Tailwind UI in one focused pass.
