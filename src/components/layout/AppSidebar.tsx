import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Cable,
  Wallet,
  Bot,
  Network,
  Building2,
  ShieldAlert,
  Building,
  BrainCircuit,
} from 'lucide-react'
import useAIBrainStore from '@/stores/useAIBrainStore'

export default function AppSidebar() {
  const location = useLocation()
  const unreadInsights = useAIBrainStore((state) => state.getUnreadCount())

  const groups = [
    {
      label: 'Operacional',
      items: [
        { name: 'Dashboard 360°', path: '/', icon: LayoutDashboard },
        { name: 'Portfolio Imóveis', path: '/portfolio', icon: Building },
      ],
    },
    {
      label: 'Financeiro',
      items: [{ name: 'FIALO & Finanças', path: '/finance', icon: Wallet }],
    },
    {
      label: 'IA & Inteligência',
      items: [
        {
          name: 'Central de Insights',
          path: '/insights',
          icon: BrainCircuit,
          badge: unreadInsights > 0 ? unreadInsights : undefined,
        },
        { name: 'RelAiA Core', path: '/relaia', icon: Bot },
        { name: 'Auditoria & Logs', path: '/audit', icon: ShieldAlert },
      ],
    },
    {
      label: 'Configurações',
      items: [
        { name: 'Integrações', path: '/integrations', icon: Cable },
        { name: 'Arquitetura', path: '/architecture', icon: Network },
      ],
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex h-16 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Building2 className="h-6 w-6" />
          <span className="truncate group-data-[collapsible=icon]:hidden">LOCXIA</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        location.pathname === item.path ||
                        (item.path === '/insights' && location.pathname.startsWith('/insights'))
                      }
                      tooltip={item.name}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="bg-primary text-primary-foreground">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
