import type {
  BusinessProfile,
  Opportunity,
  ReadinessScore,
  ReadinessBreakdown,
  Gap,
  RequirementCategory,
  GapSeverity,
} from '../types'
import { scoreToLabel } from '../utils'

const WEIGHTS: Record<RequirementCategory, number> = {
  certification: 0.25,
  registration: 0.20,
  financial: 0.20,
  experience: 0.20,
  documentation: 0.15,
}

function extractRequiredYears(label: string): number {
  const match = label.match(/(\d+)\s*year/)
  return match ? parseInt(match[1], 10) : 0
}

function satisfiesRequirement(profile: BusinessProfile, req: { category: RequirementCategory; label: string }): boolean {
  const label = req.label.toLowerCase()

  switch (req.category) {
    case 'certification': {
      if (profile.certifications.length === 0) return false
      const certAliases: Record<string, string[]> = {
        mbe: ['MBE'],
        wbe: ['WBE'],
        dbe: ['DBE'],
        sbe: ['SBE'],
        sdvosb: ['SDVOSB'],
        'hub zone': ['HUBZone'],
        hubzone: ['HUBZone'],
        '8(a)': ['SBA_8a'],
        lgbtbe: ['LGBTBE'],
        aabe: ['AABE'],
      }
      for (const [keyword, certTypes] of Object.entries(certAliases)) {
        if (label.includes(keyword)) {
          if (certTypes.some(ct => profile.certifications.includes(ct as typeof profile.certifications[0]))) {
            return true
          }
        }
      }
      // "preferred" certifications are always partially satisfied
      if (label.includes('preferred')) return false
      return false
    }

    case 'registration':
      if (label.includes('sam') || label.includes('uei')) return profile.hasDunsOrUEI
      return true

    case 'financial':
      if (label.includes('bank account')) return profile.hasBankAccount
      if (label.includes('tax return') && label.includes('2 year')) {
        return profile.yearsInBusiness >= 2 && profile.hasBankAccount
      }
      if (label.includes('tax return') && label.includes('3 year')) {
        return profile.yearsInBusiness >= 3
      }
      if (label.includes('revenue') && label.includes('500k')) {
        return (profile.annualRevenue ?? 0) < 500000
      }
      if (label.includes('credit score') || label.includes('credit check')) {
        return profile.hasBankAccount && profile.yearsInBusiness >= 1
      }
      if (label.includes('financial record') || label.includes('financial statement') || label.includes('p&l')) {
        return profile.yearsInBusiness >= 1 && profile.hasBankAccount
      }
      if (label.includes('annual revenue')) {
        return profile.annualRevenue != null
      }
      return profile.hasBankAccount

    case 'experience': {
      const required = extractRequiredYears(req.label)
      if (label.includes('any') || label.includes('0+') || label.includes('startup')) return true
      return profile.yearsInBusiness >= required
    }

    case 'documentation':
      if (label.includes('insurance')) return profile.hasActiveInsurance
      if (label.includes('employee') && label.includes('fewer than 10')) {
        return (profile.employeeCount ?? 0) < 10
      }
      if (label.includes('business license')) return true
      if (label.includes('hipaa')) return false
      if (label.includes('osha')) return false
      if (label.includes('security clearance')) return false
      if (label.includes('background check')) return profile.hasActiveInsurance
      if (label.includes('llc') || label.includes('operating agreement')) {
        return profile.businessStructure === 'llc' || profile.businessStructure === 'corporation'
      }
      if (label.includes('business plan')) return false
      if (label.includes('past performance') || label.includes('references')) {
        return profile.yearsInBusiness >= 2
      }
      if (label.includes('w-9') || label.includes('formation')) return true
      if (label.includes('sbdc')) return false
      if (label.includes('proof of') && label.includes('certification')) {
        return profile.certifications.length > 0
      }
      return profile.yearsInBusiness >= 1
  }
}

function toGapSeverity(critical: boolean, met: boolean): GapSeverity {
  if (!met && critical) return 'blocking'
  if (!met) return 'major'
  return 'minor'
}

function buildGapActionItem(label: string, category: RequirementCategory): string {
  const l = label.toLowerCase()
  if (l.includes('sam') || l.includes('uei')) return 'Register on SAM.gov — free, takes 2–4 weeks'
  if (l.includes('mbe') || l.includes('wbe') || l.includes('dbe')) return 'Apply for NMSDC MBE or WBENC WBE certification — 60–90 days'
  if (l.includes('sbe')) return 'Apply for California SBE certification via CalTrans — 30–60 days'
  if (l.includes('insurance')) return 'Obtain or increase general liability insurance through your broker'
  if (l.includes('tax return') && l.includes('2')) return 'Continue operations — you\'ll meet this requirement in ~1 year'
  if (l.includes('tax return') && l.includes('3')) return 'Continue operations — you\'ll meet this requirement in ~2 years'
  if (l.includes('2 years') || l.includes('minimum 2')) return 'Continue operating — this requirement is met at your 2-year anniversary'
  if (l.includes('3 years') || l.includes('minimum 3')) return 'Continue operating — this requirement is met at your 3-year anniversary'
  if (l.includes('credit score')) return 'Build business credit via net-30 accounts and secured business credit card'
  if (l.includes('business plan')) return 'Create a 1-page business plan using SBA\'s free template at SBA.gov'
  if (l.includes('hipaa')) return 'Complete free HIPAA training at HHS.gov and document your compliance policy'
  if (l.includes('security clearance')) return 'This opportunity requires federal clearance — consider other options first'
  if (l.includes('references')) return 'Document your completed projects with client name, dates, and value'
  if (l.includes('sbdc')) return 'Schedule a free SBDC advisory session at IESbdc.org'
  if (category === 'financial') return 'Gather your financial records and organize them with an accountant'
  if (category === 'documentation') return 'Prepare this document and keep it in your business file'
  return 'Research this requirement and take action within 30 days'
}

export function scoreOpportunity(profile: BusinessProfile, opportunity: Opportunity): ReadinessScore {
  const byCategory: Record<RequirementCategory, { met: number; total: number; gaps: Gap[] }> = {
    certification: { met: 0, total: 0, gaps: [] },
    registration: { met: 0, total: 0, gaps: [] },
    financial: { met: 0, total: 0, gaps: [] },
    experience: { met: 0, total: 0, gaps: [] },
    documentation: { met: 0, total: 0, gaps: [] },
  }

  const metRequirements: string[] = []
  const allGaps: Gap[] = []

  for (const req of opportunity.requirements) {
    const bucket = byCategory[req.category]
    bucket.total += 1
    const met = satisfiesRequirement(profile, req)

    if (met) {
      bucket.met += 1
      metRequirements.push(req.id)
    } else {
      const severity = toGapSeverity(req.critical, met)
      const gap: Gap = {
        requirementId: req.id,
        label: req.label,
        category: req.category,
        severity,
        actionItem: buildGapActionItem(req.label, req.category),
        estimatedResolutionWeeks: severity === 'blocking' ? 8 : severity === 'major' ? 4 : 2,
      }
      bucket.gaps.push(gap)
      allGaps.push(gap)
    }
  }

  const breakdown: ReadinessBreakdown = {
    certifications: byCategory.certification.total > 0
      ? Math.round((byCategory.certification.met / byCategory.certification.total) * 100)
      : 100,
    registration: byCategory.registration.total > 0
      ? Math.round((byCategory.registration.met / byCategory.registration.total) * 100)
      : 100,
    financial: byCategory.financial.total > 0
      ? Math.round((byCategory.financial.met / byCategory.financial.total) * 100)
      : 100,
    experience: byCategory.experience.total > 0
      ? Math.round((byCategory.experience.met / byCategory.experience.total) * 100)
      : 100,
    documentation: byCategory.documentation.total > 0
      ? Math.round((byCategory.documentation.met / byCategory.documentation.total) * 100)
      : 100,
  }

  const weighted =
    breakdown.certifications * WEIGHTS.certification +
    breakdown.registration * WEIGHTS.registration +
    breakdown.financial * WEIGHTS.financial +
    breakdown.experience * WEIGHTS.experience +
    breakdown.documentation * WEIGHTS.documentation

  const hasBlockingGap = allGaps.some(g => g.severity === 'blocking')
  const overall = hasBlockingGap ? Math.min(Math.round(weighted), 40) : Math.round(weighted)

  // Build strengths from met requirements
  const strengths: string[] = []
  if (breakdown.financial >= 80) strengths.push('Financial documentation ready')
  if (breakdown.experience >= 80) strengths.push('Experience requirement met')
  if (breakdown.documentation >= 80) strengths.push('Documentation in good shape')
  if (breakdown.registration >= 80) strengths.push('Registration requirements satisfied')
  if (breakdown.certifications >= 80) strengths.push('Certification requirements met')
  if (profile.city === 'Riverside' && opportunity.region?.includes('Riverside')) strengths.push('Local vendor preference advantage')
  if (profile.hasActiveInsurance) strengths.push('Active insurance on file')
  if (profile.yearsInBusiness >= 1) strengths.push('1+ year of operating history')

  const sortedGaps = allGaps.sort((a, b) => {
    const order: Record<GapSeverity, number> = { blocking: 0, major: 1, minor: 2 }
    return order[a.severity] - order[b.severity]
  })

  return {
    opportunityId: opportunity.id,
    overall,
    label: scoreToLabel(overall),
    breakdown,
    metRequirements,
    gaps: sortedGaps,
    strengths,
  }
}

export function scoreAllOpportunities(
  profile: BusinessProfile,
  opportunities: Opportunity[]
): Map<string, ReadinessScore> {
  const scores = new Map<string, ReadinessScore>()
  for (const opp of opportunities) {
    scores.set(opp.id, scoreOpportunity(profile, opp))
  }
  return scores
}
