import Header from './Header'
import DemoBanner from './DemoBanner'

interface PageShellProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export default function PageShell({ children, className = '', fullWidth = false }: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <DemoBanner />
      <main className={fullWidth ? className : `mx-auto max-w-7xl px-6 py-8 ${className}`}>
        {children}
      </main>
    </div>
  )
}
