import ChatMonitor from '@/components/relaia/ChatMonitor'
import AiLogs from '@/components/relaia/AiLogs'
import ThreadList from '@/components/relaia/ThreadList'

export default function RelAiA() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-8rem)] animate-fade-in">
      <div className="flex flex-col shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">RelAiA Core</h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Monitoramento da inteligência artificial operando sobre o Data Core com Human Override
          ("Uber-model").
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 h-full">
          <ThreadList />
        </div>
        <div className="lg:col-span-2 h-full">
          <ChatMonitor />
        </div>
        <div className="lg:col-span-1 h-full">
          <AiLogs />
        </div>
      </div>
    </div>
  )
}
