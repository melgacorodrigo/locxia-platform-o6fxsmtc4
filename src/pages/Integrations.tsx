import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import IntegrationCard from '@/components/integrations/IntegrationCard'
import LogsTable from '@/components/integrations/LogsTable'

const integrations = [
  { id: 'tecimob', name: 'Tecimob', category: 'CRM & Imóveis', status: 'connected' },
  { id: 'superlogica', name: 'Superlógica', category: 'Financeiro ERP', status: 'connected' },
  { id: 'pjbank', name: 'PJBank', category: 'Gateway Bancário', status: 'connected' },
  { id: 'serasa', name: 'Serasa', category: 'Análise de Crédito', status: 'error' },
  { id: 'whatsapp', name: 'Meta WhatsApp', category: 'Mensageria IA', status: 'connected' },
  { id: 'alude', name: 'Alude', category: 'Assinatura & Docs', status: 'pending' },
  { id: 'portoseguro', name: 'Porto Seguro', category: 'Garantidora', status: 'connected' },
  { id: 'canalpro', name: 'Canal PRO', category: 'Portais Imobiliários', status: 'connected' },
]

export default function Integrations() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Integration Engine</h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Gerenciamento dos conectores externos e saúde do Data Core.
        </p>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="grid" className="px-6">
            Serviços Conectados
          </TabsTrigger>
          <TabsTrigger value="logs" className="px-6">
            Logs & Webhooks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {integrations.map((integ) => (
              <IntegrationCard key={integ.id} integration={integ} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="logs" className="mt-6">
          <LogsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
