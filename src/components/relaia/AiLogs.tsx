import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BrainCircuit, Check, Zap } from 'lucide-react'

const aiLogs = [
  {
    time: '10:01:02',
    action: 'Intent Classification',
    result: 'Interest_Property_Rent',
    confidence: '0.98',
  },
  {
    time: '10:01:05',
    action: 'Data Core Vector Query',
    result: 'Property_Found_ID_402',
    confidence: '1.00',
  },
  {
    time: '10:02:10',
    action: 'FIALO Credit Predict',
    result: 'Score_A_Estimated',
    confidence: '0.85',
  },
  {
    time: '10:02:12',
    action: 'Decision Logic Trigger',
    result: 'Schedule_Visit_Prompt',
    confidence: '0.95',
  },
]

export default function AiLogs() {
  return (
    <Card className="h-full flex flex-col bg-muted/10 shadow-sm">
      <CardHeader className="py-4 border-b bg-background">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          <BrainCircuit className="h-5 w-5" />
          Decision Layer (Logs)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4 font-mono text-xs">
            {aiLogs.map((log, i) => (
              <div
                key={i}
                className="bg-background border border-muted rounded-lg p-4 flex flex-col gap-3 shadow-sm hover:border-primary/40 transition-colors group"
              >
                <div className="flex justify-between items-center text-muted-foreground border-b pb-2">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-primary" /> {log.time}
                  </span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md font-semibold tracking-wider">
                    Conf: {log.confidence}
                  </span>
                </div>
                <div className="text-foreground font-semibold text-sm">{log.action}</div>
                <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2 py-1.5 rounded-md w-fit">
                  <Check className="h-3.5 w-3.5" /> {log.result}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
