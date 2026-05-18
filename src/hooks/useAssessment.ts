import {
  useAppStore,
  selectAssessment,
  selectAssessmentComplete,
  selectReadinessReport,
} from '../store/appStore'

export function useAssessment() {
  const assessment = useAppStore(selectAssessment)
  const assessmentComplete = useAppStore(selectAssessmentComplete)
  const readinessReport = useAppStore(selectReadinessReport)
  const setAssessment = useAppStore(s => s.setAssessment)
  const updateAssessment = useAppStore(s => s.updateAssessment)
  const resetAssessment = useAppStore(s => s.resetAssessment)
  const loadKredoraDemoProfile = useAppStore(s => s.loadKredoraDemoProfile)
  const setReadinessReport = useAppStore(s => s.setReadinessReport)

  return {
    assessment,
    assessmentComplete,
    readinessReport,
    setAssessment,
    updateAssessment,
    resetAssessment,
    loadKredoraDemoProfile,
    setReadinessReport,
  }
}
