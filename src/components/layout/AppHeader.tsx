import { Bell, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useMainStore from '@/stores/useMainStore'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function AppHeader() {
  const { tenantId, setTenantId, tenants } = useMainStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="hidden md:flex relative w-64 lg:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar leads, imóveis, contratos..."
            className="w-full bg-muted/50 pl-9 border-none focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1 text-sm font-medium">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </div>
          <span className="hidden sm:inline-block text-muted-foreground">RelAiA Core: Ativa</span>
        </div>

        <Select value={tenantId} onValueChange={setTenantId}>
          <SelectTrigger className="w-[200px] hidden sm:flex border-none bg-muted/30">
            <SelectValue placeholder="Selecione o Tenant" />
          </SelectTrigger>
          <SelectContent>
            {tenants.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive"></span>
        </Button>

        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=female" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
