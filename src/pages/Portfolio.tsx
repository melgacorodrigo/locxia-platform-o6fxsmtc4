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
import { Building, MapPin, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useMainStore from '@/stores/useMainStore'

const properties = [
  {
    id: 'PROP-01',
    address: 'Edifício Infinity, Apto 402',
    city: 'São Paulo',
    status: 'Vago',
    price: 'R$ 4.500',
    daysVacant: 12,
  },
  {
    id: 'PROP-02',
    address: 'Condomínio Vale Verde, Casa 15',
    city: 'Campinas',
    status: 'Locado',
    price: 'R$ 8.200',
    daysVacant: 0,
  },
  {
    id: 'PROP-03',
    address: 'Galpão Logístico Industrial',
    city: 'Guarulhos',
    status: 'Em Negociação',
    price: 'R$ 25.000',
    daysVacant: 45,
  },
  {
    id: 'PROP-04',
    address: 'Residencial Acácias, Apto 101',
    city: 'São Paulo',
    status: 'Vago',
    price: 'R$ 3.100',
    daysVacant: 5,
  },
]

export default function Portfolio() {
  const tenantId = useMainStore((state) => state.tenantId)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Portfolio Imobiliário</h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Gestão de imóveis captados, métricas de vacância e status de comercialização (Tenant:{' '}
          {tenantId}).
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Catálogo de Imóveis
            </CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar por endereço..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Imóvel / Endereço</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Valor Locação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tempo de Vacância</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell>
                    <div className="font-semibold">{prop.address}</div>
                    <div className="text-xs text-muted-foreground">{prop.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {prop.city}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{prop.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        prop.status === 'Vago'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : prop.status === 'Locado'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }
                    >
                      {prop.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`text-sm ${prop.daysVacant > 30 ? 'text-red-500 font-semibold' : 'text-muted-foreground'}`}
                    >
                      {prop.daysVacant === 0 ? '-' : `${prop.daysVacant} dias`}
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
