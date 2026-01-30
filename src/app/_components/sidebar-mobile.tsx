// components/mobile-sidebar.tsx
'use client'

import { Home, Scissors, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '../_lib/utils'
import { SheetContent } from './ui/sheet'

interface SidebarItem {
  icon: ReactNode
  label: string
  href: string
  badge?: number
  active?: boolean
}

export function MobileSidebar({
  setOpen,
}: {
  setOpen: (open: boolean) => void
}) {
  const pathname = usePathname()
  const menuItems: SidebarItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Dashboard',
      href: '/dashboard',
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

  return (
    <SheetContent side="top" className="w-full">
      <div className="flex flex-col h-full">
        <div className="p-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                onClick={() => setOpen(false)}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </SheetContent>
  )
}
