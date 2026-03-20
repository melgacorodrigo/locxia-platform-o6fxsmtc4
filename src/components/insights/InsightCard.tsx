import { Insight } from '@/types/aiBrain'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, Clock } from 'lucide-react'
import useAIBrainStore from '@/stores/useAIBrainStore'

interface InsightCardProps {
  insight: Insight
}

export default function InsightCard({ insight }: InsightCardProps) {
  const markAsRead = useAIBrainStore((state) => state.markAsRead)

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return {
          icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
          border: 'border-red-500/50',
          bg: 'bg-red-500/5',
          badge: 'bg-red-500/10 text-red-500 border-red-500/20',
        }
      case 'High':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          border: 'border-amber-500/50',
          bg: 'bg-amber-500/5',
          badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        }
      case 'Medium':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-blue-500" />,
          border: 'border-blue-500/50',
          bg: 'bg-blue-500/5',
          badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        }
      default:
        return {
          icon: <Info className="h-5 w-5 text-emerald-500" />,
          border: 'border-emerald-500/50',
          bg: 'bg-emerald-500/5',
          badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        }
    }
  }

  const styles = getSeverityStyles(insight.severity)

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${!insight.isRead ? styles.border : 'border-border opacity-70'} ${!insight.isRead ? styles.bg : ''}`}
    >
      {!insight.isRead && (
        <div className="absolute top-0 right-0 w-2 h-full bg-primary/20 animate-pulse" />
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {styles.icon}
            <CardTitle className="text-lg font-semibold leading-tight">{insight.title}</CardTitle>
          </div>
          <Badge variant="outline" className={`capitalize shrink-0 ${styles.badge}`}>
            {insight.severity} Priority
          </Badge>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(insight.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span className="uppercase tracking-wider font-semibold opacity-70">
            {insight.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90 leading-relaxed mb-4">{insight.description}</p>
        <div className="bg-background rounded-md p-3 border shadow-sm mb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Recomendação da IA
          </p>
          <p className="text-sm font-medium">{insight.recommendation}</p>
        </div>
        {!insight.isRead && (
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => markAsRead(insight.id)}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Marcar como Resolvido
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
