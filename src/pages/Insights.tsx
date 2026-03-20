import { useParams, useNavigate, Link } from 'react-router-dom'
import { BrainCircuit, Activity, CheckSquare } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import useAIBrainStore from '@/stores/useAIBrainStore'
import InsightCard from '@/components/insights/InsightCard'
import { InsightCategory } from '@/types/aiBrain'
import { AIBrainOrchestrator } from '@/modules/AIBrain/orchestrator'

const CATEGORIES = [
  { id: 'todos', label: 'Todos os Insights' },
  { id: 'operacional', label: 'Operacional' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'credito', label: 'Crédito (FIALO)' },
  { id: 'seguranca', label: 'Segurança & Fraude' },
]

export default function Insights() {
  const { category = 'todos' } = useParams()
  const navigate = useNavigate()
  const store = useAIBrainStore()

  const insights =
    category === 'todos' ? store.insights : store.getInsightsByCategory(category as InsightCategory)

  const handleSimulateEvent = () => {
    const events = ['inadimplencia', 'fraude_detectada', 'lead_sem_atendimento']
    const randomEvent = events[Math.floor(Math.random() * events.length)] as any
    AIBrainOrchestrator.simulateEvent(randomEvent, { simulate: true })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-[1600px] mx-auto pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-primary" />
            Central de Insights (AI Brain)
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Monitoramento inteligente e recomendações ativas geradas pelo motor de IA.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSimulateEvent}>
            <Activity className="mr-2 h-4 w-4 text-primary" /> Simular Evento
          </Button>
          <Button variant="secondary" onClick={() => store.markAllAsRead()}>
            <CheckSquare className="mr-2 h-4 w-4" /> Marcar todos lidos
          </Button>
        </div>
      </div>

      <Tabs
        value={category}
        onValueChange={(val) => navigate(`/insights/${val}`)}
        className="w-full"
      >
        <TabsList className="bg-muted/50 p-1 flex-wrap h-auto justify-start">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="px-6 py-2">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={category} className="mt-6 focus-visible:outline-none">
          {insights.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-xl border border-dashed">
              <BrainCircuit className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground">
                Nenhum insight nesta categoria
              </h3>
              <p className="text-muted-foreground mt-1">O sistema está operando normalmente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
