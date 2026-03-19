import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  AlertTriangle,
  ShieldCheck,
  Building2,
  Loader2,
  MessageCircle,
  TrendingDown,
} from 'lucide-react'
import useMainStore from '@/stores/useMainStore'
import { DashboardController } from '@/controllers/dashboardController'

interface KpiData {
  totalLeads: number
  activeChats: number
  relaiaPendencies: number
  creditApprovals: number
  vacant: number
  leased: number
  delinquencyRate: number
}

export default function KpiGrid() {
  const tenantId = useMainStore((state) => state.tenantId)
  const [data, setData] = useState<KpiData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    DashboardController.getOverview(tenantId).then((res) => {
      if (mounted) {
        setData(res as KpiData)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [tenantId])

  const kpis = [
    {
      title: 'Total Leads (Mês)',
      value: data?.totalLeads,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Sessões RelAiA Ativas',
      value: data?.activeChats,
      icon: MessageCircle,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Pendências Humanas IA',
      value: data?.relaiaPendencies,
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      title: 'Aprovações FIALO',
      value: data?.creditApprovals,
      icon: ShieldCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Imóveis Vagos / Locados',
      value: data ? `${data.vacant} / ${data.leased}` : '',
      icon: Building2,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
    },
    {
      title: 'Inadimplência',
      value: data ? `${data.delinquencyRate}%` : '',
      icon: TrendingDown,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <div
              className={`h-8 w-8 rounded-full ${kpi.bg} flex items-center justify-center shrink-0`}
            >
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <div className="text-xl font-bold">{kpi.value?.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
