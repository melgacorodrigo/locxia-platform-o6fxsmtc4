import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const activities = [
  {
    id: 1,
    type: 'ia',
    title: 'RelAiA qualificou Lead',
    time: 'Há 5 min',
    desc: 'João Silva classificado como Score A. Agendamento proposto.',
  },
  {
    id: 2,
    type: 'sync',
    title: 'Sincronização Tecimob',
    time: 'Há 12 min',
    desc: '4 novos imóveis importados com sucesso para o Data Core.',
  },
  {
    id: 3,
    type: 'fialo',
    title: 'Aprovação FIALO',
    time: 'Há 30 min',
    desc: 'Garantia aprovada automaticamente para Contrato #492.',
  },
  {
    id: 4,
    type: 'finance',
    title: 'Split de Pagamento',
    time: 'Há 1h',
    desc: 'Repasse efetuado c/ sucesso via PJBank para Proprietário X.',
  },
  {
    id: 5,
    type: 'ia',
    title: 'RelAiA agendou visita',
    time: 'Há 2h',
    desc: 'Visita confirmada presencialmente para o Imóvel #102.',
  },
  {
    id: 6,
    type: 'sync',
    title: 'Webhooks Superlógica',
    time: 'Há 3h',
    desc: 'Sincronização de 12 boletos baixados.',
  },
]

export default function ActivityFeed() {
  return (
    <Card className="h-full flex flex-col shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Data Core: Eventos</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px] lg:h-[500px] px-6 pb-6">
          <div className="relative border-l-2 border-muted pl-5 ml-2 space-y-6 mt-2">
            {activities.map((act) => (
              <div key={act.id} className="relative group">
                <div
                  className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-background ring-2 ring-background transition-transform group-hover:scale-125 ${act.type === 'ia' ? 'bg-primary' : act.type === 'sync' ? 'bg-emerald-500' : act.type === 'finance' ? 'bg-blue-500' : 'bg-amber-500'}`}
                ></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground/90">{act.title}</span>
                  <span className="text-xs font-medium text-muted-foreground mt-0.5">
                    {act.time}
                  </span>
                  <span className="text-sm mt-1 text-muted-foreground/80 leading-snug">
                    {act.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
