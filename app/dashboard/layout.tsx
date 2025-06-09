// app/dashboard/layout.tsx
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import DashboardSidebar from '@/components/dashboard-sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn("min-h-screen bg-gray-100", inter.className)}>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}