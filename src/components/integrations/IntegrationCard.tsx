import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings, RefreshCw, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

export default function IntegrationCard({ integration }: { integration: any }) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'connected':
        return {
          label: 'Conectado',
          color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          icon: CheckCircle2,
        }
      case 'error':
        return {
          label: 'Falha Sinc.',
          color: 'bg-red-500/10 text-red-500 border-red-500/20',
          icon: AlertCircle,
        }
      case 'pending':
        return {
          label: 'Pendente',
          color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          icon: Clock,
        }
      default:
        return { label: 'Desconhecido', color: 'bg-muted text-muted-foreground', icon: Clock }
    }
  }

  const info = getStatusInfo(integration.status)
  const StatusIcon = info.icon

  return (
    <Card className="flex flex-col shadow-sm hover:shadow-md transition-shadow border-muted">
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center font-bold text-xl border shadow-inner text-foreground/80">
            {integration.name.charAt(0)}
          </div>
          <h3 className="font-semibold text-lg mt-3">{integration.name}</h3>
          <span className="text-xs font-medium text-muted-foreground">{integration.category}</span>
        </div>
        <Badge variant="outline" className={`flex gap-1 items-center px-2.5 py-1 ${info.color}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {info.label}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mt-2">
          Último sync realizado ao Data Core há 2 horas. Nenhum gargalo reportado.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t bg-muted/10 mt-auto">
        <Button variant="outline" size="sm" className="flex-1 bg-background hover:bg-muted">
          <Settings className="h-4 w-4 mr-2" /> Configurar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="px-3 hover:bg-primary hover:text-primary-foreground"
          title="Forçar Sincronização"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
