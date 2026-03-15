import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreditAnalysis from '@/components/finance/CreditAnalysis'
import FinancialControl from '@/components/finance/FinancialControl'

export default function Finance() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">FIALO & Finanças</h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Central de aprovação de garantias e motor de splits de pagamento.
        </p>
      </div>

      <Tabs defaultValue="credit" className="w-full">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="credit" className="px-6">
            Análise de Crédito IA
          </TabsTrigger>
          <TabsTrigger value="financial" className="px-6">
            Painel de Repasses
          </TabsTrigger>
        </TabsList>
        <TabsContent value="credit" className="mt-6">
          <CreditAnalysis />
        </TabsContent>
        <TabsContent value="financial" className="mt-6">
          <FinancialControl />
        </TabsContent>
      </Tabs>
    </div>
  )
}
