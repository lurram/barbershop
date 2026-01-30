import HeaderMobile from '../_components/header-mobile'
import SidebarDashboard from '../_components/sidebar'
import { SidebarProvider } from '../_components/ui/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-1">
        <SidebarDashboard />
        <div className="space-y-4 w-full">
          <HeaderMobile />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
