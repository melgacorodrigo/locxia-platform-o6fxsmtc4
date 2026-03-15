import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Bot, User } from 'lucide-react'
import { useState } from 'react'

const mockChat = [
  { sender: 'user', text: 'Olá, tenho interesse no apto 402 do Centro.', time: '10:00' },
  {
    sender: 'ai',
    text: 'Olá! Sou a RelAiA, sua assistente virtual. Que ótimo! Para adiantarmos a análise FIALO, qual a sua faixa de renda aproximada?',
    time: '10:01',
  },
  { sender: 'user', text: 'Cerca de R$ 8.000,00 mês.', time: '10:02' },
  {
    sender: 'ai',
    text: 'Perfeito. Seu perfil pré-aprova para este imóvel segundo nosso motor de crédito! Gostaria de agendar uma visita para amanhã à tarde?',
    time: '10:02',
  },
]

export default function ChatMonitor() {
  const [humanMode, setHumanMode] = useState(false)

  return (
    <Card className="h-full flex flex-col shadow-sm border-muted">
      <CardHeader className="flex flex-row items-center justify-between py-4 border-b bg-muted/10">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Monitor WhatsApp
          <span className="text-xs font-normal bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
            Lead #8492
          </span>
        </CardTitle>
        <div className="flex items-center space-x-3 bg-background border px-3 py-1.5 rounded-full">
          <Label
            htmlFor="human-mode"
            className={`text-xs uppercase tracking-wider ${humanMode ? 'text-primary font-bold' : 'text-muted-foreground'}`}
          >
            {humanMode ? 'Humano Override' : 'IA Autônoma'}
          </Label>
          <Switch id="human-mode" checked={humanMode} onCheckedChange={setHumanMode} />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-background">
        <ScrollArea className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            {mockChat.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'self-start' : 'self-end flex-row-reverse'}`}
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground ring-2 ring-primary/30'}`}
                >
                  {msg.sender === 'user' ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div
                  className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-secondary/50 text-foreground' : 'bg-primary/10 border border-primary/20 text-foreground'}`}
                >
                  {msg.text}
                  <span
                    className={`text-[10px] block mt-2 opacity-70 ${msg.sender === 'ai' ? 'text-right' : ''}`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-muted/20">
          <div className="flex gap-2">
            <Input
              disabled={!humanMode}
              placeholder={
                humanMode
                  ? 'Assumindo o chat: digite sua mensagem...'
                  : 'RelAiA está conduzindo a negociação...'
              }
              className="flex-1 bg-background border-muted"
            />
            <Button disabled={!humanMode} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
