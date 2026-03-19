import { Link } from 'react-router-dom'
import { ArrowRight, Settings2 } from 'lucide-react'
import KpiGrid from '@/components/dashboard/KpiGrid'
import RentalTrail from '@/components/dashboard/RentalTrail'
import RecentLeads from '@/components/dashboard/RecentLeads'
import ErpSyncWidget from '@/components/dashboard/ErpSyncWidget'
import PropertyContractList from '@/components/dashboard/PropertyContractList'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import { Button } from '@/components/ui/button'

export default function Index() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-[1600px] mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard 360°</h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Monitoramento completo do ciclo de locação e performance da plataforma.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/integrations">
              <Settings2 className="mr-2 h-4 w-4" /> Configurar Data Core
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview KPIs */}
      <KpiGrid />

      {/* Main Trail Stepper */}
      <RentalTrail />

      {/* Two Column Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="flex items-center justify-end px-1">
            <Link
              to="/relaia"
              className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
            >
              Acessar RelAiA Core <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <RecentLeads />
        </div>
        <div className="lg:col-span-1 pt-7">
          <ErpSyncWidget />
        </div>
      </div>

      {/* Two Column Section 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="flex items-center justify-end px-1">
            <Link
              to="/finance"
              className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
            >
              Gerenciar Contratos & FIALO <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <PropertyContractList />
        </div>
        <div className="lg:col-span-1 pt-7">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
