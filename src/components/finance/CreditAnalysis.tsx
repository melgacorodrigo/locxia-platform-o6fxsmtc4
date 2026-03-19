import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, CheckCircle, XCircle, Shield, FileText } from 'lucide-react'

const applications = [
  {
    id: '101',
    name: 'Carlos Albuquerque',
    property: 'Apto 402 - Centro',
    score: 'A',
    serasa: '750',
    porto: 'Aprovado',
    ocr: 'Validado',
    status: 'Aprovado',
  },
  {
    id: '102',
    name: 'Mariana Costa',
    property: 'Casa - Jd Botanico',
    score: 'C',
    serasa: '420',
    porto: 'Negado',
    ocr: 'Revisão Manual',
    status: 'Pendente FIALO',
  },
  {
    id: '103',
    name: 'Empresa XYZ Ltda',
    property: 'Galpão - Distrito Ind.',
    score: 'B',
    serasa: '680',
    porto: 'Condicionado',
    ocr: 'Validado',
    status: 'Em Análise',
  },
  {
    id: '104',
    name: 'Julio Cesar',
    property: 'Apto 101 - Sul',
    score: 'D',
    serasa: '300',
    porto: 'Negado',
    ocr: 'Rejeitado',
    status: 'Negado',
  },
]

export default function CreditAnalysis() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Aplicações de Garantia FIALO & Análise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Candidato</TableHead>
              <TableHead>Score RelAiA</TableHead>
              <TableHead>Serasa Score</TableHead>
              <TableHead>Porto Seguro</TableHead>
              <TableHead>Docs (OCR)</TableHead>
              <TableHead>Status Engine</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <div className="font-semibold text-foreground/90">{app.name}</div>
                  <div className="text-xs text-muted-foreground">{app.property}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      app.score === 'A'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : app.score === 'B'
                          ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          : app.score === 'C'
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }
                  >
                    Score {app.score}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">{app.serasa}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm ${app.porto === 'Aprovado' ? 'text-emerald-500' : app.porto === 'Negado' ? 'text-red-500' : 'text-amber-500'}`}
                  >
                    {app.porto}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span
                      className={`text-xs font-medium ${app.ocr === 'Validado' ? 'text-emerald-500' : app.ocr === 'Revisão Manual' ? 'text-amber-500' : 'text-red-500'}`}
                    >
                      {app.ocr}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-primary/20 hover:text-primary"
                    title="Ver Docs Versionados"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-emerald-500 hover:bg-emerald-500/20"
                    title="Aprovação Expressa"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-500/20"
                    title="Rejeitar Aplicação"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
