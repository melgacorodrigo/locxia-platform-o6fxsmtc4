import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, CheckCircle2, RefreshCw } from 'lucide-react'
import useMainStore from '@/stores/useMainStore'
import { DashboardController } from '@/controllers/dashboardController'

export default function ErpSyncWidget() {
  const { tenantId } = useMainStore()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    DashboardController.getErpStatus(tenantId).then((res) => {
      if (mounted) setData(res)
    })
    return () => {
      mounted = false
    }
  }, [tenantId])

  return (
    <Card className="h-full shadow-sm bg-muted/10 border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-foreground/80">
          <Database className="h-5 w-5" />
          Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 p-4 bg-background rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm">ERP Superlógica</span>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="h-3 w-3" /> Handoff Ativo
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-snug">
            Sincronização bidirecional operando normalmente. Contratos finalizados estão sendo
            exportados via webhook.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex flex-col items-center justify-center p-3 bg-background rounded-lg border">
            <span className="text-2xl font-bold text-foreground">
              {data?.successfulTrails || 0}
            </span>
            <span className="text-xs text-muted-foreground text-center mt-1">
              Trails Synced
              <br />
              Hoje
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-background rounded-lg border">
            <span className="text-2xl font-bold text-foreground">{data?.pendingTrails || 0}</span>
            <span className="text-xs text-muted-foreground text-center mt-1">
              Handoffs
              <br />
              Pendentes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto justify-center">
          <RefreshCw className="h-3 w-3 animate-spin-slow" />
          Último sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </CardContent>
    </Card>
  )
}
