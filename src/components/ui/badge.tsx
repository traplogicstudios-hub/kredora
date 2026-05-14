import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        default: 'bg-primary-50 text-primary-700 ring-primary-200',
        secondary: 'bg-slate-100 text-slate-700 ring-slate-200',
        success: 'bg-green-50 text-green-700 ring-green-200',
        warning: 'bg-amber-50 text-amber-700 ring-amber-200',
        error: 'bg-red-50 text-red-700 ring-red-200',
        outline: 'bg-transparent text-slate-700 ring-slate-300',
        dark: 'bg-slate-900 text-white ring-slate-800',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
