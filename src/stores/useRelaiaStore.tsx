import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { RelaiaThread, HumanTask, RelaiaLog, RelaiaMessage } from '@/types/relaia'
import { RelaiaAPI } from '@/services/api/relaiaApi'
import { RelaiaEngine } from '@/services/ai/relaiaEngine'

interface RelaiaStateContext {
  threads: RelaiaThread[]
  activeThreadId: string | null
  tasks: HumanTask[]
  logs: RelaiaLog[]
  setActiveThreadId: (id: string | null) => void
  sendMessage: (threadId: string, text: string, sender: 'user' | 'human') => void
  startHumanOverride: (threadId: string) => void
  resolveHumanOverride: (threadId: string) => void
  addLog: (log: Omit<RelaiaLog, 'id'>) => void
}

const mockThreads: RelaiaThread[] = [
  {
    id: 'th_1',
    tenant_id: 't1',
    client_id: 'c1',
    client_name: 'João Silva',
    state: 'IDENTIFY',
    urgency: 'low',
    updated_at: new Date().toISOString(),
    messages: [
      {
        id: 'm1',
        thread_id: 'th_1',
        sender: 'user',
        text: 'Olá, tenho interesse no apto 402 do Centro.',
        timestamp: '10:00:00',
      },
      {
        id: 'm2',
        thread_id: 'th_1',
        sender: 'ai',
        text: 'Olá, João! Sou a RelAiA. Que ótimo! Para adiantarmos a análise FIALO, qual a sua faixa de renda aproximada?',
        timestamp: '10:01:10',
      },
    ],
  },
  {
    id: 'th_2',
    tenant_id: 't1',
    client_id: 'c2',
    client_name: 'Maria Oliveira',
    state: 'WAITING_HUMAN',
    urgency: 'high',
    updated_at: new Date().toISOString(),
    messages: [
      {
        id: 'm3',
        thread_id: 'th_2',
        sender: 'user',
        text: 'Meu score está muito baixo, vocês aceitam fiador?',
        timestamp: '09:15:00',
      },
      {
        id: 'm4',
        thread_id: 'th_2',
        sender: 'ai',
        text: 'Entendo, Maria. Como se trata de uma exceção nas políticas padrão, vou transferir para um de nossos especialistas analisar seu caso.',
        timestamp: '09:16:00',
      },
      {
        id: 'm5',
        thread_id: 'th_2',
        sender: 'system',
        text: '--- Transferido para atendimento humano (Task Prioritization) ---',
        timestamp: '09:16:05',
      },
    ],
  },
]

const mockLogs: RelaiaLog[] = [
  {
    id: 'l1',
    thread_id: 'th_1',
    time: '10:01:02',
    action: 'Intent Classification',
    result: 'Interest_Property_Rent',
    confidence: '0.98',
    type: 'LOGS_IA_DECISIONS',
  },
  {
    id: 'l2',
    thread_id: 'th_1',
    time: '10:01:05',
    action: 'Data Core Vector Query',
    result: 'Property_Found_ID_402',
    confidence: '1.00',
    type: 'LOGS_RELAIA',
  },
  {
    id: 'l3',
    thread_id: 'th_2',
    time: '09:16:01',
    action: 'Escalation Logic',
    result: 'Trigger_Human_Handoff',
    confidence: '0.95',
    type: 'LOGS_IA_DECISIONS',
  },
]

const RelaiaContext = createContext<RelaiaStateContext | null>(null)

export const RelaiaProvider = ({ children }: { children: ReactNode }) => {
  const [threads, setThreads] = useState<RelaiaThread[]>(mockThreads)
  const [activeThreadId, setActiveThreadId] = useState<string | null>('th_1')
  const [tasks, setTasks] = useState<HumanTask[]>([])
  const [logs, setLogs] = useState<RelaiaLog[]>(mockLogs)

  const addLog = useCallback((log: Omit<RelaiaLog, 'id'>) => {
    setLogs((prev) => [...prev, { ...log, id: Math.random().toString(36).substr(2, 9) }])
  }, [])

  const startHumanOverride = useCallback(
    async (threadId: string) => {
      await RelaiaAPI.startHumanOverride(threadId)
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === threadId) {
            return {
              ...t,
              state: 'HUMAN_OVERRIDE',
              messages: [
                ...t.messages,
                {
                  id: Math.random().toString(),
                  thread_id: threadId,
                  sender: 'system',
                  text: '--- Assumido pelo corretor (Human Override Engine) ---',
                  timestamp: new Date().toLocaleTimeString(),
                },
              ],
            }
          }
          return t
        }),
      )
      addLog({
        thread_id: threadId,
        time: new Date().toLocaleTimeString(),
        action: 'API /override/start',
        result: 'Human Overriding Started',
        confidence: '1.00',
        type: 'LOGS_WEBHOOKS',
      })
    },
    [addLog],
  )

  const resolveHumanOverride = useCallback(
    async (threadId: string) => {
      await RelaiaAPI.resolveThread(threadId)
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === threadId) {
            return {
              ...t,
              state: 'HUMAN_RESOLVED',
              messages: [
                ...t.messages,
                {
                  id: Math.random().toString(),
                  thread_id: threadId,
                  sender: 'system',
                  text: '--- Atendimento humano resolvido. IA retomando o contexto... ---',
                  timestamp: new Date().toLocaleTimeString(),
                },
              ],
            }
          }
          return t
        }),
      )

      addLog({
        thread_id: threadId,
        time: new Date().toLocaleTimeString(),
        action: 'Prompt: Summarization',
        result: 'Context Resumed',
        confidence: '0.92',
        type: 'LOGS_IA_DECISIONS',
      })

      setTimeout(() => {
        setThreads((prev) =>
          prev.map((t) => {
            if (t.id === threadId) {
              return {
                ...t,
                state: 'CONTRACT_STAGE',
                messages: [
                  ...t.messages,
                  {
                    id: Math.random().toString(),
                    thread_id: threadId,
                    sender: 'ai',
                    text: 'Olá novamente! Como o especialista já resolveu as pendências, podemos seguir com o fluxo. Posso enviar o link de assinatura?',
                    timestamp: new Date().toLocaleTimeString(),
                  },
                ],
              }
            }
            return t
          }),
        )
      }, 2000)
    },
    [addLog],
  )

  const sendMessage = useCallback(
    async (threadId: string, text: string, sender: 'user' | 'human') => {
      const newMessage: RelaiaMessage = {
        id: Math.random().toString(),
        thread_id: threadId,
        sender,
        text,
        timestamp: new Date().toLocaleTimeString(),
      }

      setThreads((prev) =>
        prev.map((t) => (t.id === threadId ? { ...t, messages: [...t.messages, newMessage] } : t)),
      )

      if (sender === 'user') {
        const thread = threads.find((t) => t.id === threadId)
        if (thread && thread.state !== 'WAITING_HUMAN' && thread.state !== 'HUMAN_OVERRIDE') {
          const response = await RelaiaEngine.processMessage(text, thread.state)
          response.logs.forEach((l) =>
            addLog({ ...l, thread_id: threadId, time: new Date().toLocaleTimeString() }),
          )

          setTimeout(() => {
            setThreads((prev) =>
              prev.map((t) => {
                if (t.id === threadId) {
                  const newAiMsg: RelaiaMessage = {
                    id: Math.random().toString(),
                    thread_id: threadId,
                    sender: 'ai',
                    text: response.reply,
                    timestamp: new Date().toLocaleTimeString(),
                  }
                  const systemMsg =
                    response.newState === 'WAITING_HUMAN'
                      ? [
                          {
                            id: Math.random().toString(),
                            thread_id: threadId,
                            sender: 'system' as const,
                            text: '--- Transferido para atendimento humano ---',
                            timestamp: new Date().toLocaleTimeString(),
                          },
                        ]
                      : []
                  return {
                    ...t,
                    state: response.newState,
                    messages: [...t.messages, newAiMsg, ...systemMsg],
                  }
                }
                return t
              }),
            )
          }, 1500)
        }
      }
    },
    [threads, addLog],
  )

  return (
    <RelaiaContext.Provider
      value={{
        threads,
        activeThreadId,
        tasks,
        logs,
        setActiveThreadId,
        sendMessage,
        startHumanOverride,
        resolveHumanOverride,
        addLog,
      }}
    >
      {children}
    </RelaiaContext.Provider>
  )
}

export default function useRelaiaStore() {
  const ctx = useContext(RelaiaContext)
  if (!ctx) throw new Error('useRelaiaStore must be used within RelaiaProvider')
  return ctx
}
