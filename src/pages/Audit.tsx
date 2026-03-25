import { useState, useEffect } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShieldAlert, Database, BrainCircuit, UserCog, Activity } from 'lucide-react'
import useMainStore from '@/stores/useMainStore'
import { ApiGateway } from '@/utils/apiGateway'
import { Auditoria, LogIa, LogHumanOverride, SecurityAlert } from '@/types/entities'
import { cn } from '@/lib/utils'

export default function Audit() {
  const tenantId = useMainStore((state) => state.tenantId)

  const [logs, setLogs] = useState<Auditoria[]>([])
  const [iaLogs, setIaLogs] = useState<LogIa[]>([])
  const [overrideLogs, setOverrideLogs] = useState<LogHumanOverride[]>([])
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])

  useEffect(() => {
    ApiGateway.get('/audit/logs')
      .then((res) => res.json())
      .then(setLogs)
    ApiGateway.get('/audit/ia')
      .then((res) => res.json())
      .then(setIaLogs)
    ApiGateway.get('/audit/human-override')
      .then((res) => res.json())
      .then(setOverrideLogs)
    ApiGateway.get('/security/alerts')
      .then((res) => res.json())
      .then(setAlerts)
  }, [tenantId]) // Re-fetch on tenant change

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-primary" /> Auditoria e Segurança
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Trilha imutável de logs, decisões de IA, overrides humanos e alertas de segurança (Tenant
          Isolado:{' '}
          <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">{tenantId}</span>).
        </p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 h-11">
          <TabsTrigger value="geral" className="gap-2">
            <Database className="h-4 w-4" /> Geral
          </TabsTrigger>
          <TabsTrigger value="ia" className="gap-2">
            <BrainCircuit className="h-4 w-4" /> IA Brain
          </TabsTrigger>
          <TabsTrigger value="human" className="gap-2">
            <UserCog className="h-4 w-4" /> Human Override
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2 relative">
            <Activity className="h-4 w-4" /> Alertas
            {alerts.filter((a) => !a.resolved).length > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive" />
            )}
          </TabsTrigger>
        </TabsList>

        {/* --- GENERAL LOGS --- */}
        <TabsContent value="geral" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-xl">Modificações de Banco de Dados</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="pl-6">Data/Hora</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Entidade</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>IP Origem</TableHead>
                    <TableHead className="text-right pr-6">Mudança</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{log.target_entity}</TableCell>
                      <TableCell className="text-sm">{log.user_id}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.ip_origin}
                      </TableCell>
                      <TableCell
                        className="text-right pr-6 text-xs text-muted-foreground truncate max-w-[200px]"
                        title={JSON.stringify(log.valor_depois)}
                      >
                        {JSON.stringify(log.valor_depois)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- IA LOGS --- */}
        <TabsContent value="ia" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-xl">Auditoria de Decisões do RelAiA</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="pl-6">Data/Hora</TableHead>
                    <TableHead>Thread ID</TableHead>
                    <TableHead>Decisão</TableHead>
                    <TableHead>Contexto / Raciocínio</TableHead>
                    <TableHead className="text-right">Tokens</TableHead>
                    <TableHead className="text-right pr-6">Confiança</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {iaLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{log.thread_id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300"
                        >
                          {log.decision}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="text-sm text-muted-foreground max-w-[300px] truncate"
                        title={log.reasoning_context}
                      >
                        {log.reasoning_context}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {log.token_usage}
                      </TableCell>
                      <TableCell className="text-right pr-6 text-emerald-600 font-medium">
                        {Math.round(log.confidence * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- HUMAN OVERRIDE LOGS --- */}
        <TabsContent value="human" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-xl">Registro de Intervenções Humanas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="pl-6">Data/Hora</TableHead>
                    <TableHead>Thread ID</TableHead>
                    <TableHead>Corretor / Analista</TableHead>
                    <TableHead>Motivo da Intervenção</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overrideLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{log.thread_id}</TableCell>
                      <TableCell className="font-medium">{log.user_id}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- SECURITY ALERTS --- */}
        <TabsContent value="alerts" className="mt-6">
          <Card className="shadow-sm border-destructive/20">
            <CardHeader className="pb-4 border-b bg-destructive/5">
              <CardTitle className="text-xl text-destructive flex items-center gap-2">
                <Activity className="h-5 w-5" /> Alertas de Segurança em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="pl-6">Data/Hora</TableHead>
                    <TableHead>Severidade</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>IP Origem</TableHead>
                    <TableHead className="text-right pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id} className={cn(!alert.resolved && 'bg-destructive/5')}>
                      <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                        {new Date(alert.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            alert.severity === 'critical'
                              ? 'bg-red-100 text-red-700 border-red-200'
                              : alert.severity === 'high'
                                ? 'bg-orange-100 text-orange-700 border-orange-200'
                                : 'bg-amber-100 text-amber-700 border-amber-200',
                          )}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{alert.type}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {alert.message}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{alert.ip_origin}</TableCell>
                      <TableCell className="text-right pr-6">
                        {alert.resolved ? (
                          <span className="text-emerald-600 text-xs font-semibold">RESOLVIDO</span>
                        ) : (
                          <span className="text-destructive text-xs font-semibold">PENDENTE</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
