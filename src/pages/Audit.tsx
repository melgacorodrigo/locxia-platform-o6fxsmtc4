import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, FileText, Database, ShieldAlert } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useMainStore from '@/stores/useMainStore'

const auditLogs = [
  {
    id: '1001',
    type: 'LOGS_IA',
    action: 'Handoff to Human',
    entity: 'Thread #th_2',
    user: 'System IA',
    date: '2023-10-25 14:30:12',
    status: 'Success',
  },
  {
    id: '1002',
    type: 'LOGS_WEBHOOKS',
    action: 'Lead Sync',
    entity: 'Tecimob Webhook',
    user: 'API Gateway',
    date: '2023-10-25 14:28:00',
    status: 'Success',
  },
  {
    id: '1003',
    type: 'LOGS_INTEGRACOES',
    action: 'Credit Check',
    entity: 'Serasa API',
    user: 'FIALO Engine',
    date: '2023-10-25 14:20:05',
    status: 'Failed',
  },
  {
    id: '1004',
    type: 'LOGS_IA',
    action: 'Document OCR',
    entity: 'Doc ID 55',
    user: 'RelAiA Core',
    date: '2023-10-25 14:15:33',
    status: 'Success',
  },
]

export default function Audit() {
  const tenantId = useMainStore((state) => state.tenantId)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Auditoria & Logs</h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Trilha de auditoria imutável para decisões de IA, integrações e webhooks (Tenant:{' '}
          {tenantId}).
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Eventos do Sistema
            </CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar logs, entidades..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Data/Hora</TableHead>
                <TableHead>Tipo de Log</TableHead>
                <TableHead>Ação / Evento</TableHead>
                <TableHead>Entidade Alvo</TableHead>
                <TableHead>Ator / Origem</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1.5">
                      {log.type === 'LOGS_IA' && <FileText className="h-3 w-3 text-amber-500" />}
                      {log.type === 'LOGS_WEBHOOKS' && (
                        <Database className="h-3 w-3 text-blue-500" />
                      )}
                      {log.type === 'LOGS_INTEGRACOES' && (
                        <ShieldAlert className="h-3 w-3 text-purple-500" />
                      )}
                      {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="text-sm">{log.entity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.user}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`text-sm font-medium ${log.status === 'Success' ? 'text-emerald-500' : 'text-red-500'}`}
                    >
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
