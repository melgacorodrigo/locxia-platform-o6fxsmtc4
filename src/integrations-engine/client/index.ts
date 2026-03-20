import { IntegrationProvider } from '@/types/integrations'

// External API configurations and connection logic
export const IntegrationClients: Record<IntegrationProvider, { baseUrl: string; apiKey: string }> =
  {
    Tecimob: {
      baseUrl: 'https://api.tecimob.com.br/v1',
      apiKey: import.meta.env.VITE_TECIMOB_KEY || 'mock',
    },
    CanalPro: {
      baseUrl: 'https://api.canalpro.com.br/v1',
      apiKey: import.meta.env.VITE_CANALPRO_KEY || 'mock',
    },
    Superlogica: {
      baseUrl: 'https://api.superlogica.net/v2',
      apiKey: import.meta.env.VITE_SUPERLOGICA_KEY || 'mock',
    },
    PJBank: {
      baseUrl: 'https://api.pjbank.com.br',
      apiKey: import.meta.env.VITE_PJBANK_KEY || 'mock',
    },
    Cora: {
      baseUrl: 'https://api.cora.com.br/v1',
      apiKey: import.meta.env.VITE_CORA_KEY || 'mock',
    },
    Alude: {
      baseUrl: 'https://api.alude.com.br',
      apiKey: import.meta.env.VITE_ALUDE_KEY || 'mock',
    },
    Serasa: {
      baseUrl: 'https://api.serasa.com.br',
      apiKey: import.meta.env.VITE_SERASA_KEY || 'mock',
    },
    PortoSeguro: {
      baseUrl: 'https://api.portoseguro.com.br',
      apiKey: import.meta.env.VITE_PORTO_KEY || 'mock',
    },
    Dihub: {
      baseUrl: 'https://api.dihub.com.br',
      apiKey: import.meta.env.VITE_DIHUB_KEY || 'mock',
    },
    RiosVistorias: {
      baseUrl: 'https://api.riosvistorias.com.br',
      apiKey: import.meta.env.VITE_RIOS_KEY || 'mock',
    },
  }

export async function requestExternalApi(
  provider: IntegrationProvider,
  endpoint: string,
  options: RequestInit = {},
) {
  const client = IntegrationClients[provider]
  console.log(`[IntegrationClient] Fetching ${client.baseUrl}${endpoint}`)

  // Mocking network latency and valid response for frontend architecture demo
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    success: true,
    provider,
    endpoint,
    mockData: true,
    timestamp: new Date().toISOString(),
  }
}
