import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const splits = [
  {
    id: '501',
    contract: '#4920',
    total: 'R$ 3.500,00',
    prop: 'R$ 3.150,00',
    imob: 'R$ 280,00',
    fialo: 'R$ 70,00',
    status: 'Liquidado',
  },
  {
    id: '502',
    contract: '#4921',
    total: 'R$ 2.100,00',
    prop: 'R$ 1.890,00',
    imob: 'R$ 168,00',
    fialo: 'R$ 42,00',
    status: 'Agendado PJBank',
  },
  {
    id: '503',
    contract: '#4922',
    total: 'R$ 4.200,00',
    prop: 'R$ 3.780,00',
    imob: 'R$ 336,00',
    fialo: 'R$ 84,00',
    status: 'Atrasado',
  },
]

export default function FinancialControl() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Arrecadação Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">R$ 142.500,00</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Repasses Realizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">R$ 128.250,00</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Inadimplência FIALO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">R$ 4.200,00</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Splits Automáticos & Repasses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Contrato Ref.</TableHead>
                <TableHead>Valor Locação</TableHead>
                <TableHead>Repasse Proprietário</TableHead>
                <TableHead>Taxa Adm Imobiliária</TableHead>
                <TableHead>Fundo FIALO</TableHead>
                <TableHead>Status Engine</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {splits.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-bold text-primary">{s.contract}</TableCell>
                  <TableCell className="font-semibold">{s.total}</TableCell>
                  <TableCell className="text-muted-foreground">{s.prop}</TableCell>
                  <TableCell className="text-muted-foreground">{s.imob}</TableCell>
                  <TableCell className="text-muted-foreground font-medium">{s.fialo}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        s.status === 'Liquidado'
                          ? 'bg-emerald-500 text-white'
                          : s.status === 'Atrasado'
                            ? 'bg-red-500 text-white'
                            : 'bg-blue-500 text-white'
                      }
                    >
                      {s.status}
                    </Badge>
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
