import { RelaiaState } from '@/types/relaia'
import { Prompts } from './prompts'

export class RelaiaEngine {
  static async processMessage(text: string, currentState: RelaiaState) {
    console.log('[RelAiA Engine] Processing message with state:', currentState)
    console.log('[RelAiA Engine] Using Prompts:', Prompts.system.substring(0, 30) + '...')

    let newState = currentState
    let reply = ''
    const logs = []

    logs.push({
      action: 'Webhook Received',
      result: 'Message Parsed',
      confidence: '1.00',
      type: 'LOGS_WEBHOOKS' as const,
    })

    const textLower = text.toLowerCase()

    if (currentState === 'IDENTIFY' || currentState === 'START') {
      logs.push({
        action: 'Prompt: Classification',
        result: 'Intent_Property',
        confidence: '0.94',
        type: 'LOGS_IA_DECISIONS' as const,
      })
      newState = 'QUALIFY'
      reply = 'Perfeito! Qual a sua faixa de renda aproximada para verificarmos as garantias FIALO?'
    } else if (currentState === 'QUALIFY') {
      if (
        textLower.includes('problema') ||
        textLower.includes('score baixo') ||
        textLower.includes('negativado') ||
        textLower.includes('fiador')
      ) {
        logs.push({
          action: 'Risk Review',
          result: 'High_Risk_Detected',
          confidence: '0.98',
          type: 'LOGS_IA_DECISIONS' as const,
        })
        logs.push({
          action: 'Escalation Logic',
          result: 'Trigger_Human_Handoff',
          confidence: '1.00',
          type: 'LOGS_RELAIA' as const,
        })
        newState = 'WAITING_HUMAN'
        reply =
          'Entendo. Nesse caso, vou transferir o atendimento para um de nossos especialistas analisar a melhor opção para você.'
      } else {
        logs.push({
          action: 'FIALO Credit Predict',
          result: 'Score_A_Estimated',
          confidence: '0.88',
          type: 'LOGS_IA_DECISIONS' as const,
        })
        newState = 'COLLECT_DOCS'
        reply =
          'Ótimo! Seu perfil pré-aprova para nossas garantias. Por favor, envie uma foto do seu RG ou CNH para eu validar (OCR).'
      }
    } else if (currentState === 'COLLECT_DOCS') {
      logs.push({
        action: 'OCR Validation Engine',
        result: 'Doc_Identity_Valid',
        confidence: '0.99',
        type: 'LOGS_RELAIA' as const,
      })
      newState = 'CREDIT_CHECK'
      reply =
        'Documento validado com sucesso! Já estou rodando a análise de crédito oficial na Serasa. Só um instante.'
    } else {
      logs.push({
        action: 'Prompt: Next Step',
        result: 'Continue_Flow',
        confidence: '0.90',
        type: 'LOGS_IA_DECISIONS' as const,
      })
      reply = 'Entendido. Estou processando as informações nas nossas bases...'
    }

    return { newState, reply, logs }
  }
}
