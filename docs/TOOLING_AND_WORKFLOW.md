# Tooling and Build Workflow

## Purpose

This document defines the tools used to build AccessBridge AI and what each tool is responsible for.

The goal is to move fast without losing structure during the hackathon.

## Tool Stack

### ChatGPT

Role: Product architect, technical strategist, workflow manager, prompt planner, and repo coordinator.

Responsibilities:

- Keep the project aligned with the hackathon strategy
- Define product requirements
- Define architecture
- Create build milestones
- Maintain docs and devlogs
- Help write prompts for Claude Design, Claude/Cursor/Codex, and Gemini
- Review technical decisions
- Keep scope controlled

### Claude

Role: Architecture review and reasoning support.

Responsibilities:

- Review product architecture
- Help refine component structure
- Stress-test the app flow
- Review data model and agent workflow
- Suggest improvements before implementation

Claude should be used before UI design for a lightweight architecture pass.

### Claude Design

Role: UI design exploration and visual direction.

Responsibilities:

- Generate polished UI concepts
- Explore layout direction for all MVP screens
- Create a clear interface direction before implementation
- Help make the product feel enterprise-ready and demo-worthy

Claude Design should not replace architecture. It comes after the architecture pass.

### Cursor / Coding Agent

Role: Primary code implementation environment.

Responsibilities:

- Build the React, Vite, TypeScript, and Tailwind application
- Implement screens and components
- Add mock data
- Add AI integration or fallback generation
- Run local tests and fixes

### GitHub

Role: Source control and project tracking.

Responsibilities:

- Store all code and docs
- Track milestones through issues
- Preserve devlog history
- Provide public repo for hackathon submission

### Gemini API / Google AI Studio

Role: AI generation layer for the application.

Responsibilities:

- Generate opportunity analysis
- Generate readiness explanations
- Generate capability statements
- Generate proposal drafts
- Generate execution plans

For MVP stability, simulated outputs can be used first, then Gemini can be added after the UI flow works.

### Vercel or Netlify

Role: Deployment platform.

Responsibilities:

- Host live demo
- Provide submission-ready demo URL
- Make the app accessible to judges

## Correct Build Order

1. Product direction and PRD
2. Lightweight technical architecture
3. Claude architecture review
4. Claude Design UI direction
5. React/Vite/Tailwind implementation
6. Mock data and scoring logic
7. Application package generation
8. Gemini integration or reliable fallback
9. Enterprise dashboard
10. Demo polish and submission assets

## Key Rule

Do not let visual design lead the product. Architecture comes first, then UI design, then implementation.
