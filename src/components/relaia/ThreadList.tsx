import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import useRelaiaStore from '@/stores/useRelaiaStore'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react'

export default function ThreadList() {
  const { threads, activeThreadId, setActiveThreadId } = useRelaiaStore()

  return (
    <Card className="h-full flex flex-col shadow-sm border-muted bg-background">
      <CardHeader className="py-4 border-b bg-muted/10">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Inbox & Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col divide-y divide-border">
            {threads.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${activeThreadId === t.id ? 'bg-muted/30 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="font-medium text-sm text-foreground">{t.client_name}</span>
                  {t.state === 'WAITING_HUMAN' && (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  {t.state === 'HUMAN_RESOLVED' && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground truncate mb-3">
                  {t.messages[t.messages.length - 1]?.text || 'Nova conversa'}
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant={
                      t.state === 'WAITING_HUMAN' || t.state === 'HUMAN_OVERRIDE'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="text-[9px] uppercase tracking-wider"
                  >
                    {t.state}
                  </Badge>
                  {t.urgency === 'high' && (
                    <Badge variant="destructive" className="text-[9px] uppercase">
                      Urgente
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
