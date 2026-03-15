import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { stage: 'Leads Captados', count: 1200 },
  { stage: 'Visitas Agendadas', count: 850 },
  { stage: 'Propostas Feitas', count: 420 },
  { stage: 'Análise de Crédito', count: 310 },
  { stage: 'Assinatura', count: 180 },
  { stage: 'Contrato Ativo', count: 155 },
]

export default function PipelineChart() {
  return (
    <Card className="flex flex-col shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Pipeline Operacional & FIALO</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ChartContainer
          config={{ count: { label: 'Volume', color: 'hsl(var(--primary))' } }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="stage"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
