import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const insights = [
  {
    id: 1,
    text: 'IA detectou aumento de 15% na inadimplência no Condomínio Vale Verde. Sugestão: Iniciar régua de renegociação automática via RelAiA.',
    action: 'Ativar Régua',
  },
  {
    id: 2,
    text: '3 Leads FIALO de alto padrão aguardando retorno há mais de 2h. RelAiA pausou o fluxo por falta de contexto em documentos de renda.',
    action: 'Revisar Docs',
  },
]

export default function AiInsights() {
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary text-lg">
          <Lightbulb className="h-5 w-5" />
          Insights IA Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-lg bg-background p-4 border border-border/50 shadow-sm transition-all hover:shadow"
          >
            <p className="text-sm text-foreground/90 leading-relaxed">{insight.text}</p>
            <Button
              size="sm"
              variant="secondary"
              className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {insight.action} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
