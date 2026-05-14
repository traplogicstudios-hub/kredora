import { useState, useCallback } from 'react'
import {
  useAppStore,
  selectPackage,
  selectEnterpriseDashboard,
  selectProfile,
} from '../store/appStore'
import { generateDocuments, generateEnterpriseInsights } from '../lib/ai/gemini'
import type { ApplicationPackage } from '../lib/types'

// ── Package generation for a specific opportunity ─────────────────────────────

export function useGeneratePackage(opportunityId: string) {
  const profile = useAppStore(selectProfile)
  const setPackage = useAppStore(s => s.setPackage)
  const clearPackage = useAppStore(s => s.clearPackage)
  const pkg = useAppStore(selectPackage(opportunityId))

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async () => {
    if (isGenerating) return
    setIsGenerating(true)
    setError(null)

    const pending: ApplicationPackage = {
      id: `pkg-${opportunityId}-${Date.now()}`,
      opportunityId,
      generatedAt: new Date().toISOString(),
      status: 'generating',
      documents: [],
    }
    setPackage(opportunityId, pending)

    try {
      const documents = await generateDocuments(profile, opportunityId)
      setPackage(opportunityId, {
        ...pending,
        status: 'ready',
        documents,
        generatedAt: new Date().toISOString(),
      })
    } catch (err) {
      setPackage(opportunityId, { ...pending, status: 'error' })
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setIsGenerating(false)
    }
  }, [opportunityId, profile, isGenerating, setPackage])

  const reset = useCallback(() => {
    clearPackage(opportunityId)
    setError(null)
  }, [opportunityId, clearPackage])

  return { generate, reset, isGenerating, error, pkg }
}

// ── Enterprise insights generation ────────────────────────────────────────────

export function useGenerateInsights() {
  const profile = useAppStore(selectProfile)
  const setEnterpriseDashboard = useAppStore(s => s.setEnterpriseDashboard)
  const clearEnterpriseDashboard = useAppStore(s => s.clearEnterpriseDashboard)
  const dashboard = useAppStore(selectEnterpriseDashboard)

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async () => {
    if (isGenerating) return
    setIsGenerating(true)
    setError(null)
    try {
      const result = await generateEnterpriseInsights(profile)
      setEnterpriseDashboard(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate insights')
    } finally {
      setIsGenerating(false)
    }
  }, [profile, isGenerating, setEnterpriseDashboard])

  const reset = useCallback(() => {
    clearEnterpriseDashboard()
    setError(null)
  }, [clearEnterpriseDashboard])

  return { generate, reset, isGenerating, error, dashboard }
}
