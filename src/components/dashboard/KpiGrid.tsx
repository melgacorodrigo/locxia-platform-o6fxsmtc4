import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, AlertTriangle, FileSignature, Building2, Loader2 } from 'lucide-react'
import useMainStore from '@/stores/useMainStore'
import { DashboardController } from '@/controllers/dashboardController'

interface KpiData {
  totalLeads: number
  activeContracts: number
  propertiesAvailable: number
  pendingCreditRequests: number
}

export default function KpiGrid() {
  const { tenantId } = useMainStore()
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
      title: 'Total Leads',
      value: data?.totalLeads,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Pending Credit',
      value: data?.pendingCreditRequests,
      icon: AlertTriangle,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Active Contracts',
      value: data?.activeContracts,
      icon: FileSignature,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Properties Available',
      value: data?.propertiesAvailable,
      icon: Building2,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <div className={`h-8 w-8 rounded-full ${kpi.bg} flex items-center justify-center`}>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <div className="text-2xl font-bold">{kpi.value?.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
