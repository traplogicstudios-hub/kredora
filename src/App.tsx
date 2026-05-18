import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ROUTES } from './lib/constants'
import LandingPage from './pages/LandingPage'
import OnboardPage from './pages/OnboardPage'
import DashboardPage from './pages/DashboardPage'
import OpportunityDetailPage from './pages/OpportunityDetailPage'
import ApplicationPackagePage from './pages/ApplicationPackagePage'
import EnterpriseDashboardPage from './pages/EnterpriseDashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.ONBOARD} element={<OnboardPage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path="/opportunity/:id" element={<OpportunityDetailPage />} />
        <Route path="/apply/:id" element={<ApplicationPackagePage />} />
        <Route path={ROUTES.ENTERPRISE} element={<EnterpriseDashboardPage />} />
        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
