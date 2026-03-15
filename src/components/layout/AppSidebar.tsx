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
} from '@/components/ui/sidebar'
import { LayoutDashboard, Cable, Wallet, Bot, Network, Building2 } from 'lucide-react'

export default function AppSidebar() {
  const location = useLocation()

  const groups = [
    {
      label: 'Operacional',
      items: [{ name: 'Dashboard 360°', path: '/', icon: LayoutDashboard }],
    },
    {
      label: 'Financeiro',
      items: [{ name: 'FIALO & Finanças', path: '/finance', icon: Wallet }],
    },
    {
      label: 'IA & Insights',
      items: [{ name: 'RelAiA Core', path: '/relaia', icon: Bot }],
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
                      isActive={location.pathname === item.path}
                      tooltip={item.name}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
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
