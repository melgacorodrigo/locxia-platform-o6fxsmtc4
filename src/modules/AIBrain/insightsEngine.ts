import { Insight, InsightCategory, InsightSeverity } from '@/types/aiBrain'
import useAIBrainStore from '@/stores/useAIBrainStore'
import { AuditoriaService } from '@/services/core/auditoriaService'

export class AIBrainInsightsEngine {
  static async analyzeEvent(event: string, payload: any) {
    console.log(`[AIBrain] 🧠 Analyzing event for insights: ${event}`)

    let insight: Partial<Insight> | null = null

    switch (event) {
      case 'inadimplencia':
        insight = {
          title: 'Alerta de Inadimplência Detectada',
          description: `Identificamos um pagamento em atraso para o contrato ${payload?.contractId || 'N/A'}.`,
          severity: 'High',
          category: 'financeiro',
          recommendation: 'Acionar a trilha de cobrança amigável via RelAiA WhatsApp.',
        }
        break

      case 'fraude_detectada':
        insight = {
          title: 'Risco de Fraude Crítico',
          description: `O motor OCR rejeitou o documento do lead ${payload?.leadId || 'N/A'} por indícios de manipulação.`,
          severity: 'Critical',
          category: 'seguranca',
          recommendation: 'Suspender aprovação e bloquear o perfil até revisão manual.',
        }
        break

      case 'lead_sem_atendimento':
        insight = {
          title: 'Lead Prioritário Aguardando',
          description: `Um lead qualificado como Score A está sem interação há mais de 1 hora.`,
          severity: 'Medium',
          category: 'operacional',
          recommendation: 'Notificar o gestor da equipe de corretores via push.',
        }
        break

      case 'doc_invalido':
        insight = {
          title: 'Gargalo Documental',
          description: `O documento enviado falhou na extração de dados.`,
          severity: 'Low',
          category: 'operacional',
          recommendation: 'A IA já solicitou um novo reenvio com melhor iluminação.',
        }
        break

      case 'credito_reprovado':
        insight = {
          title: 'Alta Taxa de Reprovação FIALO',
          description: `Notamos um aumento na reprovação de crédito nas últimas horas.`,
          severity: 'Medium',
          category: 'credito',
          recommendation: 'Revisar os parâmetros de score mínimos da matriz de risco.',
        }
        break
    }

    if (insight) {
      const fullInsight: Insight = {
        id: `ins_${Math.random().toString(36).substring(2, 9)}`,
        tenant_id: payload?.tenant_id || 't1',
        title: insight.title!,
        description: insight.description!,
        severity: insight.severity as InsightSeverity,
        category: insight.category as InsightCategory,
        recommendation: insight.recommendation!,
        timestamp: new Date().toISOString(),
        isRead: false,
      }

      // Persist Insight in UI Store
      useAIBrainStore.getState().addInsight(fullInsight)

      // Audit log the generation of the insight
      await AuditoriaService.log(
        fullInsight.tenant_id,
        'INSIGHT_GENERATED',
        'ai_insights',
        fullInsight,
      )
    }
  }
}
