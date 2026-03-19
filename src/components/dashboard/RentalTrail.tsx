import {
  UserPlus,
  Bot,
  FileText,
  ShieldCheck,
  PenTool,
  Key,
  Database,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const STAGES = [
  { id: 'lead', title: 'Lead Entry', icon: UserPlus, state: 'done' },
  { id: 'qual', title: 'Qualification', icon: Bot, state: 'done' },
  { id: 'docs', title: 'Documentation', icon: FileText, state: 'done' },
  { id: 'credit', title: 'Credit Analysis', icon: ShieldCheck, state: 'done' },
  { id: 'sign', title: 'Contract Signature', icon: PenTool, state: 'done' },
  { id: 'keys', title: 'Key Delivery', icon: Key, state: 'done' },
  { id: 'erp', title: 'ERP Management', icon: Database, state: 'done', syncBadge: true },
]

export default function RentalTrail() {
  return (
    <Card className="shadow-sm border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Trilha de Locação
          <Badge
            variant="secondary"
            className="ml-2 bg-primary/10 text-primary hover:bg-primary/20"
          >
            Imóvel #492 (João Silva)
          </Badge>
        </CardTitle>
        <CardDescription>
          Acompanhamento do ciclo de vida completo do processo ativo mais recente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col md:flex-row justify-between w-full pt-4 pb-2">
          {/* Background Connecting Line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-[2px] md:w-[calc(100%-40px)] md:h-[2px] md:left-[20px] md:top-[28px] bg-muted z-0" />

          {STAGES.map((s, i) => (
            <div
              key={s.id}
              className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-3 mb-6 md:mb-0 last:mb-0 group"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 bg-background transition-all duration-300 shadow-sm',
                  s.state === 'done'
                    ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5 group-hover:scale-110'
                    : s.state === 'current'
                      ? 'border-primary bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : 'border-muted-foreground/30 text-muted-foreground',
                )}
              >
                <s.icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start md:items-center text-left md:text-center mt-1 md:mt-0">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    s.state === 'current' ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {s.title}
                </span>
                {s.syncBadge && s.state === 'done' && (
                  <Badge className="mt-1.5 bg-emerald-500/15 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/25 flex gap-1 items-center px-1.5 py-0">
                    <CheckCircle2 className="h-3 w-3" /> ERP Synced
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
