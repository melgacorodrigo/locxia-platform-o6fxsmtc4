import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const logs = [
  {
    id: '1',
    service: 'Tecimob',
    type: 'Webhook (Lead)',
    status: 'success',
    time: '14:32:01',
    detail: 'Lead ID 932 sincronizado e mapeado no Data Core.',
  },
  {
    id: '2',
    service: 'Serasa',
    type: 'API Request',
    status: 'error',
    time: '14:30:12',
    detail: 'Timeout connection. Retry agendado pela Engine.',
  },
  {
    id: '3',
    service: 'PJBank',
    type: 'Webhook (Pgto)',
    status: 'success',
    time: '14:15:45',
    detail: 'Boleto 882 baixado. Split financeiro iniciado.',
  },
  {
    id: '4',
    service: 'WhatsApp',
    type: 'Webhook (Msg)',
    status: 'success',
    time: '14:10:00',
    detail: 'Msg ID 12x2 recebida e encaminhada para RelAiA.',
  },
  {
    id: '5',
    service: 'Superlógica',
    type: 'API Sync',
    status: 'success',
    time: '14:05:33',
    detail: 'Lote de 45 contratos validados.',
  },
]

export default function LogsTable() {
  return (
    <Card className="shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[120px]">Hora</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detalhes no Data Core</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">{log.time}</TableCell>
              <TableCell className="font-semibold">{log.service}</TableCell>
              <TableCell className="text-sm">{log.type}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    log.status === 'success'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }
                >
                  {log.status === 'success' ? '200 OK' : '500 ERROR'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{log.detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
