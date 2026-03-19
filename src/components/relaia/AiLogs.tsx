import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BrainCircuit, Check, Zap, Webhook, FileText } from 'lucide-react'
import useRelaiaStore from '@/stores/useRelaiaStore'

export default function AiLogs() {
  const logs = useRelaiaStore((state) => state.logs)
  const activeThreadId = useRelaiaStore((state) => state.activeThreadId)

  const displayLogs = activeThreadId ? logs.filter((l) => l.thread_id === activeThreadId) : logs

  const getIcon = (type: string) => {
    if (type === 'LOGS_WEBHOOKS') return <Webhook className="h-3.5 w-3.5 text-blue-500" />
    if (type === 'LOGS_RELAIA') return <FileText className="h-3.5 w-3.5 text-amber-500" />
    return <Zap className="h-3.5 w-3.5 text-primary" />
  }

  return (
    <Card className="h-full flex flex-col bg-muted/5 shadow-sm border-muted">
      <CardHeader className="py-4 border-b bg-background">
        <CardTitle className="text-lg flex items-center gap-2 text-primary font-semibold">
          <BrainCircuit className="h-5 w-5" />
          Data Core Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-3 font-mono text-xs pb-4">
            {displayLogs.length === 0 && (
              <div className="text-center text-muted-foreground mt-10">
                Nenhum log para esta conversa.
              </div>
            )}
            {displayLogs.map((log) => (
              <div
                key={log.id}
                className="bg-background border border-muted rounded-lg p-3 flex flex-col gap-2 shadow-sm hover:border-primary/40 transition-colors group"
              >
                <div className="flex justify-between items-center text-muted-foreground border-b pb-1.5">
                  <span className="flex items-center gap-1.5 font-semibold">
                    {getIcon(log.type)} {log.time}
                  </span>
                  <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Conf: {log.confidence}
                  </span>
                </div>
                <div className="text-foreground font-medium">{log.action}</div>
                <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded w-fit text-[11px]">
                  <Check className="h-3 w-3" /> {log.result}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
