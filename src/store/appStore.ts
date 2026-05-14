/**
 * Global application store (Zustand).
 *
 * Persistence strategy:
 *   - sessionStorage persists `profile` and `profileComplete` across page refreshes
 *     within the same browser session (clears on tab close — correct for a demo).
 *   - `scores` and `packages` are NOT persisted because:
 *       • Map is not JSON-serializable by default
 *       • Scores recompute in <5ms from the profile, so there's no cost to recomputing
 *   - `onRehydrateStorage` fires after sessionStorage is read and recomputes scores
 *     so the dashboard is immediately populated on refresh.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  BusinessProfile,
  ReadinessScore,
  ApplicationPackage,
  EnterpriseDashboard,
} from '../lib/types'
import { DEMO_PROFILE, EMPTY_PROFILE } from '../lib/data/demoProfile'
import { OPPORTUNITIES } from '../lib/data/opportunities'
import { scoreAllOpportunities } from '../lib/scoring/readinessEngine'
import { isProfileComplete } from '../lib/validators/profileValidator'

// ── State shape ───────────────────────────────────────────────────────────────

interface AppState {
  // Profile
  profile: BusinessProfile
  profileComplete: boolean
  setProfile: (profile: BusinessProfile) => void
  updateProfile: (partial: Partial<BusinessProfile>) => void
  resetProfile: () => void
  loadDemoProfile: () => void

  // Readiness scores — keyed by opportunity ID
  scores: Map<string, ReadinessScore>
  recomputeScores: () => void

  // Generated application packages — keyed by opportunity ID
  packages: Map<string, ApplicationPackage>
  setPackage: (opportunityId: string, pkg: ApplicationPackage) => void
  getPackage: (opportunityId: string) => ApplicationPackage | undefined
  clearPackage: (opportunityId: string) => void

  // Enterprise dashboard (generated or mock)
  enterpriseDashboard: EnterpriseDashboard | null
  setEnterpriseDashboard: (dashboard: EnterpriseDashboard) => void
  clearEnterpriseDashboard: () => void

  // Onboarding step tracker (not persisted — resets on refresh)
  onboardStep: number
  setOnboardStep: (step: number) => void
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Profile ─────────────────────────────────────────────────────────────
      profile: EMPTY_PROFILE,
      profileComplete: false,

      setProfile: (profile) => {
        const complete = isProfileComplete(profile)
        set({ profile, profileComplete: complete })
        get().recomputeScores()
      },

      updateProfile: (partial) => {
        const updated = { ...get().profile, ...partial }
        const complete = isProfileComplete(updated)
        set({ profile: updated, profileComplete: complete })
        // Recompute immediately so dashboard stays in sync as user edits
        get().recomputeScores()
      },

      resetProfile: () => {
        set({
          profile: EMPTY_PROFILE,
          profileComplete: false,
          scores: new Map(),
          packages: new Map(),
          enterpriseDashboard: null,
          onboardStep: 0,
        })
      },

      loadDemoProfile: () => {
        set({ profile: DEMO_PROFILE, profileComplete: true })
        get().recomputeScores()
      },

      // ── Scores ──────────────────────────────────────────────────────────────
      scores: new Map(),

      recomputeScores: () => {
        const { profile } = get()
        if (!profile.businessName) return
        const scores = scoreAllOpportunities(profile, OPPORTUNITIES)
        set({ scores })
      },

      // ── Packages ────────────────────────────────────────────────────────────
      packages: new Map(),

      setPackage: (opportunityId, pkg) => {
        set(state => {
          const packages = new Map(state.packages)
          packages.set(opportunityId, pkg)
          return { packages }
        })
      },

      getPackage: (opportunityId) => get().packages.get(opportunityId),

      clearPackage: (opportunityId) => {
        set(state => {
          const packages = new Map(state.packages)
          packages.delete(opportunityId)
          return { packages }
        })
      },

      // ── Enterprise Dashboard ─────────────────────────────────────────────────
      enterpriseDashboard: null,
      setEnterpriseDashboard: (dashboard) => set({ enterpriseDashboard: dashboard }),
      clearEnterpriseDashboard: () => set({ enterpriseDashboard: null }),

      // ── Onboarding ──────────────────────────────────────────────────────────
      onboardStep: 0,
      setOnboardStep: (step) => set({ onboardStep: step }),
    }),
    {
      name: 'accessbridge-session',
      storage: createJSONStorage(() => sessionStorage),

      // Only persist the profile — everything else is derived or ephemeral
      partialize: (state) => ({
        profile: state.profile,
        profileComplete: state.profileComplete,
      }),

      // After sessionStorage is read, recompute scores so the dashboard is ready
      onRehydrateStorage: () => (state) => {
        if (state?.profileComplete && state.profile.businessName) {
          // Tiny setTimeout so the store is fully initialized before we read from it
          setTimeout(() => state.recomputeScores(), 0)
        }
      },
    }
  )
)

// ── Selectors (memoization helpers for components) ────────────────────────────

export const selectProfile = (s: AppState) => s.profile
export const selectProfileComplete = (s: AppState) => s.profileComplete
export const selectScores = (s: AppState) => s.scores
export const selectScore = (id: string) => (s: AppState) => s.scores.get(id)
export const selectPackage = (id: string) => (s: AppState) => s.packages.get(id)
export const selectEnterpriseDashboard = (s: AppState) => s.enterpriseDashboard
export const selectOnboardStep = (s: AppState) => s.onboardStep
