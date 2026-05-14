import { useAppStore, selectProfile, selectProfileComplete } from '../store/appStore'

export function useProfile() {
  const profile = useAppStore(selectProfile)
  const profileComplete = useAppStore(selectProfileComplete)
  const setProfile = useAppStore(s => s.setProfile)
  const updateProfile = useAppStore(s => s.updateProfile)
  const resetProfile = useAppStore(s => s.resetProfile)
  const loadDemoProfile = useAppStore(s => s.loadDemoProfile)

  return { profile, profileComplete, setProfile, updateProfile, resetProfile, loadDemoProfile }
}
