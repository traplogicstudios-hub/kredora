# Prompt Architecture

AccessBridge AI uses a structured AI workflow instead of a generic chatbot.

## Agent 1: Profile Analysis Agent

### Purpose

Analyze the business profile and extract eligibility signals.

### Inputs

- Business name
- Industry
- Location
- Years in business
- Business goal
- Revenue stage
- Available documents

### Output JSON Shape

```json
{
  "businessSummary": "string",
  "eligibilitySignals": ["string"],
  "riskFactors": ["string"],
  "recommendedOpportunityTypes": ["string"]
}
```

## Agent 2: Opportunity Matching Agent

### Purpose

Compare the business profile against available opportunities.

### Output JSON Shape

```json
{
  "matches": [
    {
      "opportunityId": "string",
      "matchScore": 92,
      "matchReasons": ["string"],
      "concerns": ["string"]
    }
  ]
}
```

## Agent 3: Readiness Scoring Agent

### Purpose

Score how ready the business is to pursue an opportunity.

### Readiness Categories

- Business structure
- Documentation
- Insurance
- Experience
- References
- Location fit
- Industry fit
- Submission readiness

### Output JSON Shape

```json
{
  "readinessScore": 68,
  "breakdown": [
    {
      "category": "Insurance",
      "status": "Missing",
      "score": 0,
      "reason": "General liability insurance is required but not listed."
    }
  ],
  "missingRequirements": ["General liability insurance", "Client references"],
  "nextBestAction": "Obtain general liability insurance and gather two references."
}
```

## Agent 4: Application Builder Agent

### Purpose

Generate the application package.

### Outputs

- Capability statement
- Proposal draft
- Execution plan
- Assumptions and confidence notes

### Guardrails

- Do not guarantee funding or contract awards.
- Do not claim certifications the business did not provide.
- Mark missing information as assumptions or placeholders.
- Keep output professional and editable.

## Agent 5: Enterprise Insight Agent

### Purpose

Aggregate readiness blockers into institutional insight.

### Output JSON Shape

```json
{
  "topBlockers": [
    {
      "name": "Insurance",
      "percentage": 68,
      "recommendation": "Host insurance-readiness workshop."
    }
  ],
  "averageReadinessScore": 64,
  "recommendedInterventions": ["Vendor registration clinic", "Capability statement workshop"]
}
```

## MVP AI Strategy

For hackathon speed, the MVP can start with deterministic mock data and structured simulated AI outputs. Gemini integration can be added as a progressive enhancement once the UI flow is stable.

## Prompt Style

- Structured
- Practical
- No hype
- No guarantees
- Output should be understandable by small business owners
- Output should also feel credible to enterprise partners
