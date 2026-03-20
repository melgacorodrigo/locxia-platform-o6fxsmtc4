import { create } from 'zustand'
import { Insight, InsightCategory, InsightSeverity } from '@/types/aiBrain'

interface AIBrainState {
  insights: Insight[]
  addInsight: (insight: Insight) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  getInsightsByCategory: (category: InsightCategory) => Insight[]
  getUnreadCount: () => number
}

const mockInsights: Insight[] = [
  {
    id: 'ins_1',
    tenant_id: 't1',
    title: 'Risco de Inadimplência Elevado',
    description:
      'Detectamos que 3 inquilinos do Condomínio Vale Verde atrasaram o pagamento nos últimos 2 meses consecutivos.',
    severity: 'High',
    category: 'financeiro',
    recommendation: 'Ativar régua de cobrança preventiva via RelAiA WhatsApp.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: false,
  },
  {
    id: 'ins_2',
    tenant_id: 't1',
    title: 'Lead FIALO sem retorno',
    description:
      'O prospect João Silva (Score A) está aguardando resposta humana há mais de 2 horas na fase de Contrato.',
    severity: 'Medium',
    category: 'operacional',
    recommendation: 'Designar corretor disponível imediatamente ou acionar fallback automatizado.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    isRead: false,
  },
  {
    id: 'ins_3',
    tenant_id: 't1',
    title: 'Tentativa de Fraude Documental',
    description:
      'OCR detectou inconsistências severas e indícios de manipulação digital em um comprovante de renda enviado.',
    severity: 'Critical',
    category: 'seguranca',
    recommendation: 'Bloquear fluxo de aprovação e acionar equipe de auditoria imediatamente.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isRead: false,
  },
]

const useAIBrainStore = create<AIBrainState>((set, get) => ({
  insights: mockInsights,

  addInsight: (insight) => {
    set((state) => ({
      insights: [insight, ...state.insights],
    }))
  },

  markAsRead: (id) => {
    set((state) => ({
      insights: state.insights.map((ins) => (ins.id === id ? { ...ins, isRead: true } : ins)),
    }))
  },

  markAllAsRead: () => {
    set((state) => ({
      insights: state.insights.map((ins) => ({ ...ins, isRead: true })),
    }))
  },

  getInsightsByCategory: (category) => {
    return get()
      .insights.filter((ins) => ins.category === category)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },

  getUnreadCount: () => {
    return get().insights.filter((ins) => !ins.isRead).length
  },
}))

export default useAIBrainStore
