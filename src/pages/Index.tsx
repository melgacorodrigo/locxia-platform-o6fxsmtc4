import KpiGrid from '@/components/dashboard/KpiGrid'
import PipelineChart from '@/components/dashboard/PipelineChart'
import AiInsights from '@/components/dashboard/AiInsights'
import ActivityFeed from '@/components/dashboard/ActivityFeed'

export default function Index() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard 360°</h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Visão geral unificada da operação, finanças e inteligência artificial.
        </p>
      </div>

      <KpiGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PipelineChart />
          <AiInsights />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
