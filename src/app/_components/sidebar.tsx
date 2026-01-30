'use client'

import { Home, Scissors, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from './ui/sidebar'

const menuItems = [
  {
    icon: <Home className="h-5 w-5" />,
    label: 'Dashboard',
    href: '/dashboard',
    active: true,
  },
  {
    icon: <Scissors className="h-5 w-5" />,
    label: 'Barbershop',
    href: '/dashboard/barbershop',
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: 'Clients',
    href: '/dashboard/clients',
  },
]

const SidebarDashboard = () => {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarTrigger
            size={'lg'}
            variant="outline"
            className="hover:bg-white"
          />

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default SidebarDashboard
