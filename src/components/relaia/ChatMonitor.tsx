import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Bot, User, UserCog, Info } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import useRelaiaStore from '@/stores/useRelaiaStore'
import { Badge } from '@/components/ui/badge'

export default function ChatMonitor() {
  const { threads, activeThreadId, sendMessage, startHumanOverride, resolveHumanOverride } =
    useRelaiaStore()
  const [inputText, setInputText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const thread = threads.find((t) => t.id === activeThreadId)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [thread?.messages])

  if (!thread) {
    return (
      <Card className="h-full flex items-center justify-center bg-muted/5 shadow-sm border-muted">
        <div className="text-center flex flex-col items-center gap-3 text-muted-foreground">
          <Bot className="h-10 w-10 opacity-20" />
          <p>Selecione uma conversa para monitorar</p>
        </div>
      </Card>
    )
  }

  const isHumanActive = thread.state === 'WAITING_HUMAN' || thread.state === 'HUMAN_OVERRIDE'

  const handleToggle = (checked: boolean) => {
    if (checked) startHumanOverride(thread.id)
    else resolveHumanOverride(thread.id)
  }

  const handleSend = () => {
    if (!inputText.trim()) return
    const sender = isHumanActive ? 'human' : 'user'
    sendMessage(thread.id, inputText, sender)
    setInputText('')
  }

  return (
    <Card className="h-full flex flex-col shadow-sm border-muted">
      <CardHeader className="flex flex-row items-center justify-between py-4 border-b bg-background">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          WhatsApp: {thread.client_name}
          <Badge variant="secondary" className="font-mono text-[10px] ml-2 px-1.5">
            #{thread.id}
          </Badge>
          <Badge
            variant={isHumanActive ? 'destructive' : 'default'}
            className="ml-1 uppercase text-[10px] tracking-wider"
          >
            {thread.state}
          </Badge>
        </CardTitle>
        <div className="flex items-center space-x-3 bg-muted/20 border px-3 py-1.5 rounded-full shadow-sm">
          <Label
            htmlFor="human-mode"
            className={`text-xs uppercase tracking-wider ${isHumanActive ? 'text-destructive font-bold' : 'text-muted-foreground'}`}
          >
            {isHumanActive ? 'Human Override Ativo' : 'IA Autônoma'}
          </Label>
          <Switch
            id="human-mode"
            checked={isHumanActive}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-destructive"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-background/50">
        <ScrollArea className="flex-1 p-6">
          <div className="flex flex-col gap-6 pb-4">
            {thread.messages.map((msg) => (
              <div key={msg.id}>
                {msg.sender === 'system' ? (
                  <div className="flex justify-center my-4">
                    <span className="bg-muted text-muted-foreground text-[10px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Info className="h-3 w-3" /> {msg.text}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'}`}
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-secondary text-secondary-foreground'
                          : msg.sender === 'human'
                            ? 'bg-destructive text-destructive-foreground ring-2 ring-destructive/30'
                            : 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : msg.sender === 'human' ? (
                        <UserCog className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-secondary/50 text-foreground rounded-tl-sm'
                          : msg.sender === 'human'
                            ? 'bg-destructive/10 border border-destructive/20 text-foreground rounded-tr-sm'
                            : 'bg-primary/10 border border-primary/20 text-foreground rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                      <span
                        className={`text-[10px] block mt-2 opacity-50 ${msg.sender !== 'user' ? 'text-right' : ''}`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                isHumanActive
                  ? 'Assumindo o chat: digite sua mensagem como corretor...'
                  : 'Simule a resposta do cliente (usuário)...'
              }
              className={`flex-1 ${isHumanActive ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
            <Button
              onClick={handleSend}
              size="icon"
              variant={isHumanActive ? 'destructive' : 'default'}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
