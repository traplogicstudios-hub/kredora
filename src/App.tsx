import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ROUTES } from './lib/constants'
import LandingPage from './pages/LandingPage'
import OnboardPage from './pages/OnboardPage'
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage'
import AnalysisPage from './pages/AnalysisPage'
import FundingReadinessReportPage from './pages/FundingReadinessReportPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.ASSESS} element={<OnboardPage />} />
        <Route path={ROUTES.ONBOARD} element={<Navigate to={ROUTES.ASSESS} replace />} />
        <Route path={ROUTES.DASHBOARD} element={<EnterpriseDashboardPage />} />
        <Route path={ROUTES.ENTERPRISE} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.ANALYZING} element={<AnalysisPage />} />
        <Route path={ROUTES.REPORT} element={<FundingReadinessReportPage />} />
        <Route path={ROUTES.OPPORTUNITIES} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="/opportunity/:id" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="/apply/:id" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
