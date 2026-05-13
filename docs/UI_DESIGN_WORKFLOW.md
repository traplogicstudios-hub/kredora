# UI Design Workflow

AccessBridge AI will use Claude Design as the primary UI design exploration step before implementation.

## Purpose

Claude Design will be used to quickly generate and refine polished UI directions for the hackathon demo before translating the approved direction into React, Vite, TypeScript, and Tailwind CSS.

## Design Goals

The interface should feel:

- Enterprise-ready
- Clean and modern
- Trustworthy
- Mission-driven
- Easy to demo
- More like opportunity infrastructure than a basic grant finder

## Visual Direction

Avoid generic AI visuals, heavy purple gradients, and overly playful startup design.

Preferred feel:

- Modern SaaS dashboard
- Civic tech / economic development intelligence
- Dark or light premium interface
- Strong contrast
- Clear cards and scoring visuals
- Professional document output sections
- Data-driven enterprise dashboard

## Design Process

1. Create Claude Design prompt using PRD and hackathon strategy.
2. Generate first UI direction for all MVP screens.
3. Review for clarity, demo flow, and judge impact.
4. Refine the selected design direction.
5. Convert final UI into React/Tailwind components.
6. Keep the implementation close to the approved design.

## Required Screens

1. Landing Page
2. Business Profile Form
3. Opportunity Dashboard
4. Opportunity Breakdown
5. Generated Application Package
6. Enterprise Intelligence Dashboard

## Design Acceptance Criteria

- A judge can understand the product within 10 seconds of landing page view.
- Opportunity cards clearly show match score, readiness score, and missing requirements.
- Application package page feels like the AI created real professional outputs.
- Enterprise dashboard clearly communicates scalable business value.
- UI feels polished enough for a hackathon finalist demo.

## Implementation Notes

Claude Design output should not replace code quality. The final product must still use maintainable React components, reusable data structures, and clean Tailwind styling.
