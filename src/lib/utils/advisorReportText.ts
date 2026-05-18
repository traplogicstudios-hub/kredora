import { KREDORA_DISCLAIMER, SCORE_CATEGORY_LABELS } from '../constants'
import type { FundingReadinessReport, ScoreBreakdown } from '../types'

export function formatAdvisorReportText(
  report: FundingReadinessReport,
  businessName: string
): string {
  const breakdown = report.scoreBreakdown
  const breakdownLines = (Object.entries(breakdown) as [keyof ScoreBreakdown, number][]).map(
    ([key, value]) => `  ${SCORE_CATEGORY_LABELS[key]}: ${value}/100`
  )

  const pathSections = report.fundingPaths.map(
    path => `• ${path.name} (${path.matchLevel} match)
  Why it fits: ${path.whyItFits}
  What to verify: ${path.whatToVerify}
  Documents needed: ${path.documentsNeeded.join(', ')}
  Next step: ${path.nextStep}`
  )

  const listBlock = (title: string, items: string[]) =>
  items.length > 0 ? `${title}:\n${items.map(i => `  - ${i}`).join('\n')}` : `${title}: (none)`

  return [
    `FUNDING READINESS REPORT`,
    `Business: ${businessName}`,
    '',
    `CAPITAL READINESS SCORE: ${report.overallScore}/100`,
    '',
    'SCORE BREAKDOWN:',
    ...breakdownLines,
    '',
    'GEMINI ANALYSIS:',
    report.aiSummary,
    '',
    'FUNDING PATH RECOMMENDATIONS:',
    ...pathSections,
    '',
    listBlock('COMPLETED', report.gapAnalysis.completed),
    '',
    listBlock('NEEDS WORK', report.gapAnalysis.needsWork),
    '',
    listBlock('RISK FLAGS', report.gapAnalysis.riskFlags),
    '',
    'ADVISOR NOTES:',
    report.advisorNotes,
    '',
    'FOR THE BUSINESS OWNER:',
    report.entrepreneurSummary,
    '',
    KREDORA_DISCLAIMER,
  ].join('\n')
}
