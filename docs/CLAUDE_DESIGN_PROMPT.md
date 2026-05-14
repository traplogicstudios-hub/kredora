# Claude Design Prompt

Use this prompt in Claude Design to create the approved UI direction for AccessBridge AI.

---

You are designing the UI for AccessBridge AI, an AI-powered opportunity readiness platform built for the TechEx Intelligent Enterprise Solutions Hackathon.

## Product Mission

AccessBridge AI helps small businesses find, qualify for, and apply to grants, contracts, supplier diversity programs, and business funding.

The product does not just find opportunities. It helps entrepreneurs understand their readiness gaps, identify missing requirements, and generate the documents needed to take action.

## Core Differentiator

Most tools help users discover opportunities.

AccessBridge AI helps users become ready to win them.

## Target Users

### Primary User

Small business owners and underserved entrepreneurs trying to access contracts, grants, supplier programs, and funding.

### Enterprise User

Cities, nonprofits, economic development organizations, workforce organizations, and supplier diversity teams that want to understand where businesses are getting stuck.

## Locked Demo Business

Use this demo business throughout the UI:

- Business Name: Prime Clean Solutions
- Location: Riverside, CA
- Industry: Commercial Cleaning
- Years in Business: 1
- Goal: Get contracts and funding
- Current status: Growing commercial cleaning business with limited contract-readiness documentation
- Readiness context: no certifications yet, no SAM registration yet, limited documentation, needs stronger contract-readiness assets

## Design Style

Create a polished, hackathon-finalist-level interface.

The design should feel:

- Enterprise-ready
- Clean
- Modern
- Trustworthy
- Civic-tech inspired
- Economic-development focused
- Practical for small business owners
- Strong enough for enterprise buyers and judges

Avoid:

- Generic purple AI gradients
- Overly playful startup visuals
- Cartoon graphics
- Cluttered dashboards
- Anything that feels like a basic grant finder

Preferred visual direction:

- Modern SaaS dashboard
- Strong contrast
- Premium but simple
- Clear score cards
- Professional document output areas
- Data-driven enterprise insight panel
- Clean typography
- Confident spacing

## Required Screens

Design the following MVP screens:

1. Landing Page
2. Business Profile Form
3. Opportunity Dashboard
4. Opportunity Breakdown Page
5. Generated Application Package Page
6. Enterprise Intelligence Dashboard

## Screen Requirements

### 1. Landing Page

Purpose: Explain the product fast.

Main headline:
Opportunity should not depend on insider knowledge.

Supporting copy:
AccessBridge AI helps small businesses find, qualify for, and apply to real opportunities like grants, contracts, supplier programs, and business funding.

Primary CTA:
Start Opportunity Scan

Secondary CTA:
View Enterprise Insights

### 2. Business Profile Form

Show a clean guided intake experience.

Fields should include:

- Business name
- Industry
- Location
- Years in business
- Business goal
- Current documents available
- Insurance status
- Registration status
- Certifications

Include an option to preload demo profile for Prime Clean Solutions.

### 3. Opportunity Dashboard

Show opportunity cards with:

- Opportunity title
- Opportunity type
- Match score
- Readiness score
- Deadline
- Missing requirements
- CTA to view breakdown

Example opportunities:

- Riverside County Janitorial Services Contract
- Corporate Supplier Diversity Cleaning Vendor Program
- Small Business Growth Grant

### 4. Opportunity Breakdown Page

Show:

- Why this opportunity matches
- Large readiness score
- Category breakdown
- Missing requirements
- Severity labels: blocking, major, minor
- AI recommendation panel
- CTA: Generate Application Package

### 5. Generated Application Package Page

Show generated documents in a professional interface:

- Capability Statement
- Proposal Draft
- Execution Plan
- Assumptions and Confidence Notes

The output should feel editable, professional, and ready for review.

Do not imply guaranteed funding or contract approval.

### 6. Enterprise Intelligence Dashboard

Show how this product helps cities, nonprofits, and supplier diversity teams understand opportunity gaps.

Include:

- Average readiness score
- Top blockers
- Opportunity demand by industry
- Recommended support programs
- Pipeline stats
- Insight summary

Example insight:
Many businesses are interested in contracts but are blocked by insurance, registration, and missing capability statements.

## Key UI Components To Design

- Navbar
- Demo profile banner
- Readiness score badge
- Match score badge
- Opportunity card
- Readiness gauge
- Gap list
- AI insight panel
- Document viewer
- Enterprise insight cards
- Dashboard charts or clean benchmark panels

## Technical Constraints

The design will be implemented in:

- React
- Vite
- TypeScript
- Tailwind CSS

Design components should be realistic to build quickly in a hackathon.

Avoid overly complex animations or custom visuals that will slow implementation.

## Architecture Context

The app already has or will have:

- BusinessProfile model
- Opportunity model
- ReadinessScore model
- Gap model
- ApplicationPackage model
- EnterpriseDashboard model
- Mock opportunity dataset
- Pure readiness scoring function
- Mock AI fallback outputs
- Optional Gemini serverless integration later

Mock-first is acceptable for demo stability.

## Security Constraint

Do not design anything that requires exposing an API key in the browser.

AI generation can be shown through a loading state and mock-safe output first.

## Desired Output

Create a complete UI concept for all six screens.

For each screen, include:

1. Layout direction
2. Main sections
3. Key UI components
4. Suggested copy
5. Visual hierarchy
6. Notes for React/Tailwind implementation

The final design should make judges understand three things quickly:

1. The problem is real.
2. The AI does more than suggest; it helps execute.
3. The enterprise impact is measurable and scalable.
