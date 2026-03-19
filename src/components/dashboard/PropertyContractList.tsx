import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Building2, FileSignature, Loader2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/useMainStore'
import { DashboardController } from '@/controllers/dashboardController'

export default function PropertyContractList() {
  const { tenantId } = useMainStore()
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    DashboardController.getPropertyContracts(tenantId).then((res) => {
      if (mounted) {
        setProperties(res)
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
          <Building2 className="h-5 w-5 text-muted-foreground" />
          Property & Contract Management
        </CardTitle>
        <CardDescription>
          Gestão visual de imóveis e andamento de suas respectivas locações.
        </CardDescription>
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
                <TableHead>Imóvel</TableHead>
                <TableHead>Inquilino Prospect</TableHead>
                <TableHead className="text-right">Fase do Contrato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span>{prop.address}</span>
                        <span className="text-xs text-muted-foreground">{prop.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{prop.tenant}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="gap-1.5 py-1">
                      <FileSignature className="h-3 w-3 text-primary" />
                      {prop.phase}
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
