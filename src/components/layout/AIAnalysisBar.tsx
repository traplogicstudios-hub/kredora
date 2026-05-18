interface AIAnalysisBarProps {
  confidence?: number
  label?: string
}

export default function AIAnalysisBar({ confidence = 90, label = 'GEMINI ANALYSIS' }: AIAnalysisBarProps) {
  return (
    <div className="flex items-center justify-between rounded-t-md border border-slate-800 bg-slate-900 px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-300">
          Kredora · {label}
        </span>
      </div>
      <span className="font-mono text-[10px] text-slate-400">
        Confidence <span className="font-bold text-slate-200">{confidence}%</span>
      </span>
    </div>
  )
}
