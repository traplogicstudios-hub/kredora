# Kredora

**AI Funding Readiness Intelligence** — an enterprise-focused platform for business support organizations and the entrepreneurs they serve.

Built for the [TechEx Intelligent Enterprise Solutions Hackathon](https://lablab.ai) with the theme: **Transforming Enterprise Through AI**.

> This repository began as **AccessBridge AI**, an opportunity-readiness MVP prototype. The hackathon submission is **Kredora**, repositioned for funding readiness intelligence. Legacy opportunity-matching modules remain in the codebase but are not part of the demo flow.

## What Kredora Does

Kredora helps chambers of commerce, nonprofits, accelerators, grant consultants, community lenders, and economic development teams assess entrepreneurs, identify funding gaps, and generate advisor-ready action plans in minutes.

## Core Demo Flow

1. **Landing** (`/`) — product overview and CTAs
2. **Advisor Dashboard** (`/dashboard`) — organization metrics and recent assessments
3. **Business Funding Assessment** (`/assess`) — intake form with **Load Demo Profile** (Autonomyx Solutions)
4. **AI Analysis** (`/analyzing`) — five-step Gemini-style loading flow
5. **Funding Readiness Report** (`/report`) — capital readiness score, funding paths, gap analysis, advisor notes, **Copy Advisor Report**

Demo profile: **Autonomyx Solutions** — AI automation and tech services, Riverside CA.

## Tech Stack

- React, Vite, TypeScript, Tailwind CSS
- Zustand (session persistence for demo)
- Gemini API / Google AI Studio (mock-safe fallback for hackathon demo)

## Source of Truth

**[docs/KREDORA_ENTERPRISE_REPOSITIONING_PLAN.md](docs/KREDORA_ENTERPRISE_REPOSITIONING_PLAN.md)** — product positioning, copy specs, demo flow, and definition of done.

## Build

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Status

Hackathon demo ready — see [docs/KREDORA_FINAL_QA_REPORT_2026-05-17.md](docs/KREDORA_FINAL_QA_REPORT_2026-05-17.md) for QA details.
