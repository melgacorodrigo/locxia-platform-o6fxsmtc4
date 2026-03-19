import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Bot, User, Loader2 } from 'lucide-react'
import useMainStore from '@/stores/useMainStore'
import { DashboardController } from '@/controllers/dashboardController'

export default function RecentLeads() {
  const { tenantId } = useMainStore()
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    DashboardController.getRecentLeads(tenantId).then((res) => {
      if (mounted) {
        setLeads(res)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [tenantId])

  return (
    <Card className="h-full shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          Lead & Qualification View
        </CardTitle>
        <CardDescription>Últimos leads capturados e filtrados pelo RelAiA Core.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Qualificação IA</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                      <span className="text-sm">{lead.qualification}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={lead.status === 'qualified' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
