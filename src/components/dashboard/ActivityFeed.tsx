import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import useMainStore from '@/stores/useMainStore'
import { DashboardController } from '@/controllers/dashboardController'
import { Bot, Shield, FileText, Database } from 'lucide-react'

export default function ActivityFeed() {
  const tenantId = useMainStore((state) => state.tenantId)
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    DashboardController.getActivityFeed(tenantId).then((res) => {
      if (mounted) setActivities(res)
    })
    return () => {
      mounted = false
    }
  }, [tenantId])

  const getIconInfo = (type: string) => {
    switch (type) {
      case 'relaia':
        return { icon: Bot, color: 'bg-primary text-primary-foreground' }
      case 'audit':
        return { icon: FileText, color: 'bg-emerald-500 text-white' }
      case 'fialo':
        return { icon: Shield, color: 'bg-amber-500 text-white' }
      case 'erp':
        return { icon: Database, color: 'bg-indigo-500 text-white' }
      default:
        return { icon: Bot, color: 'bg-muted text-muted-foreground' }
    }
  }

  return (
    <Card className="h-full flex flex-col shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">RelAiA & Audit Feed</CardTitle>
        <CardDescription>Decisões da IA e intervenções manuais.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[350px] lg:h-[400px] px-6 pb-6">
          <div className="relative space-y-6 mt-2">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border z-0"></div>
            {activities.map((act) => {
              const { icon: Icon, color } = getIconInfo(act.type)
              return (
                <div key={act.id} className="relative z-10 flex gap-4">
                  <div
                    className={`mt-0.5 shrink-0 h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-background ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground/90">{act.title}</span>
                    <span className="text-xs font-medium text-muted-foreground mt-0.5">
                      {act.time}
                    </span>
                    <span className="text-sm mt-1 text-muted-foreground/80 leading-snug">
                      {act.desc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
