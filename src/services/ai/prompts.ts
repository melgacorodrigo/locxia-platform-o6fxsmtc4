export const Prompts = {
  system: `Você é a RelAiA, assistente virtual da LOCXIA. Responda de forma clara e objetiva, focando em aluguel e garantias imobiliárias.`,
  classification: `Classifique a intenção do usuário nas seguintes categorias: Interest_Property, Support, General, Risk_Assessment.`,
  escalation: `Analise se a mensagem requer intervenção humana. Palavras-chave de risco: procon, justiça, score muito baixo, exceção.`,
  summarization: `Resuma a interação humana para que a IA possa retomar o contexto sem se perder. Extraia as decisões tomadas pelo corretor/humano.`,
  nextStepDecision: `Determine o próximo estado do fluxo (START, IDENTIFY, QUALIFY, COLLECT_DOCS, CREDIT_CHECK, RISK_REVIEW, CONTRACT_STAGE, FINALIZATION, DONE).`,
}
