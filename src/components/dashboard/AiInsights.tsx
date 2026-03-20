import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { BrainCircuit, ArrowRight, ShieldAlert, AlertTriangle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import useAIBrainStore from '@/stores/useAIBrainStore'

export default function AiInsights() {
  const insights = useAIBrainStore((state) => state.insights).slice(0, 3)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <ShieldAlert className="h-4 w-4 text-red-500" />
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case 'Medium':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-emerald-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'border-red-500/20 bg-red-500/5'
      case 'High':
        return 'border-amber-500/20 bg-amber-500/5'
      case 'Medium':
        return 'border-blue-500/20 bg-blue-500/5'
      default:
        return 'border-emerald-500/20 bg-emerald-500/5'
    }
  }

  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-primary text-lg">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            AI Brain Insights
          </div>
          <Badge variant="outline" className="bg-background text-xs">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 flex-1">
        {insights.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Nenhum insight no momento.
          </div>
        ) : (
          insights.map((insight) => (
            <div
              key={insight.id}
              className={`flex flex-col gap-2 rounded-lg p-3 border shadow-sm transition-all hover:shadow ${getSeverityColor(insight.severity)}`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">{getSeverityIcon(insight.severity)}</div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground/90">{insight.title}</span>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="outline"
          className="w-full bg-background hover:bg-primary hover:text-primary-foreground"
          asChild
        >
          <Link to="/insights">
            Ver Central de Insights <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
