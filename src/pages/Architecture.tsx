import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Database, Network, Bot, LayoutTemplate, ArrowDown } from 'lucide-react'

export default function Architecture() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-5xl mx-auto w-full">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Arquitetura Modular LOCXIA
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Visão estrutural do SaaS AI-First: da camada de UI até a persistência.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 py-4">
        <ArchLayer
          icon={LayoutTemplate}
          title="SaaS Application (Frontend Layer)"
          desc="React, Vite, Shadcn UI. Interface modular para corretores e gestores."
          color="border-primary/50 text-primary hover:border-primary shadow-primary/10"
          bg="bg-primary/5"
        />

        <ArrowDown className="text-primary/50 h-8 w-8 animate-pulse my-2" />

        <ArchLayer
          icon={Bot}
          title="IA Engine (RelAiA Core)"
          desc="Agentes cognitivos que tomam decisões, pontuam crédito FIALO e operam WhatsApp."
          color="border-indigo-500/50 text-indigo-500 hover:border-indigo-500 shadow-indigo-500/10"
          bg="bg-indigo-500/5"
        />

        <ArrowDown className="text-indigo-500/50 h-8 w-8 animate-pulse my-2" />

        <ArchLayer
          icon={Database}
          title="Data Core (Central DB / Supabase)"
          desc="Single source of truth. Armazena tenants, imóveis, contratos em ledger imutável."
          color="border-emerald-500/50 text-emerald-500 hover:border-emerald-500 shadow-emerald-500/10"
          bg="bg-emerald-500/5"
        />

        <ArrowDown className="text-emerald-500/50 h-8 w-8 animate-pulse my-2" />

        <ArchLayer
          icon={Network}
          title="Integration Engine"
          desc="Workers isolados para sincronização com Tecimob, Serasa, PJBank e Superlógica."
          color="border-amber-500/50 text-amber-500 hover:border-amber-500 shadow-amber-500/10"
          bg="bg-amber-500/5"
        />
      </div>
    </div>
  )
}

function ArchLayer({ icon: Icon, title, desc, color, bg }: any) {
  return (
    <Card
      className={`w-full md:w-3/4 border-2 ${color} transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-default bg-background/50 backdrop-blur`}
    >
      <CardHeader className="flex flex-row items-center gap-5 pb-5">
        <div className={`p-4 rounded-2xl border-2 ${color} ${bg} shadow-inner`}>
          <Icon className="h-10 w-10" />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-foreground/70 mt-1.5 text-base">{desc}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
