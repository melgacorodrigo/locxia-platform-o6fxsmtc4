import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Bot, AlertTriangle, Building2, TrendingDown } from 'lucide-react'

const kpis = [
  { title: 'Leads Ativos', value: '1.245', change: '+12% vol', icon: Users, trend: 'up' },
  {
    title: 'Atendimentos RelAiA',
    value: '432',
    change: '89% resolução',
    icon: Bot,
    trend: 'neutral',
  },
  {
    title: 'Alertas de Crédito',
    value: '12',
    change: '5 FIALO pendentes',
    icon: AlertTriangle,
    trend: 'warning',
  },
  {
    title: 'Taxa de Vacância',
    value: '8.4%',
    change: '-2.1% no mês',
    icon: Building2,
    trend: 'up',
  },
  {
    title: 'Inadimplência',
    value: '3.2%',
    change: '+0.5% risco auto',
    icon: TrendingDown,
    trend: 'down',
  },
]

export default function KpiGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="hover:border-primary/50 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <kpi.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p
              className={`text-xs mt-1 font-medium ${kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-red-500' : kpi.trend === 'warning' ? 'text-amber-500' : 'text-muted-foreground'}`}
            >
              {kpi.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
