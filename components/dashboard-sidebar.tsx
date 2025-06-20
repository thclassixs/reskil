"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/contexts/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  LayoutDashboard,
  BookOpen,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Users,
  Settings,
  LogOut,
  Bell,
  Trophy,
  Calendar,
  HelpCircle,
  Star,
  Bookmark,
  AlertCircle
} from 'lucide-react'

const sidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Courses & Updates',
    badge: '3'
  },
  {
    title: 'Quiz',
    href: '/dashboard/quiz',
    icon: Trophy,
    description: 'Tests & Assessments',
    badge: '2'
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: Mail,
    description: 'Chat & Communication',
    badge: '3',
    urgent: true
  },
  {
    title: 'Community',
    href: '/dashboard/community',
    icon: Users,
    description: 'Connect & Collaborate'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircle,
    description: 'Account Settings'
  },
  {
    title: 'Bookmarks',
    href: '/dashboard/bookmarks',
    icon: Bookmark,
    description: 'Saved Content'
  }
]

const bottomLinks = [
  {
    title: 'Help Center',
    href: '/dashboard/help',
    icon: HelpCircle
  },
  {
    title: 'Announcements',
    href: '/dashboard/announcements',
    icon: AlertCircle,
    badge: '1'
  }
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={cn(
      "flex flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out relative",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Logo Section */}
      <div className="flex h-20 items-center border-b border-gray-200 px-6 bg-white">
        {!collapsed ? (
          <Link href="/dashboard" className="flex items-center group">
            <img
              src="/REL.png"
              alt="Reskil Logo"
              className="w-10 h-10 mr-3 group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Reskil
              </span>
              <div className="text-xs text-gray-500 -mt-1">Learning Platform</div>
            </div>
          </Link>
        ) : (
          <Link href="/dashboard" className="flex items-center justify-center w-full group">
            <img
              src="/favicon.ico"
              alt="Reskil Logo"
              className="w-10 h-10 group-hover:scale-105 transition-transform"
            />
          </Link>
        )}
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 py-6">
        <nav className="px-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || 
                           (link.href !== '/dashboard' && pathname?.startsWith(link.href))

            return (
              <div key={link.href} className="relative group">
                <Link href={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-12 transition-all duration-200 relative overflow-hidden",
                      collapsed ? "px-3" : "px-4",
                      isActive 
                        ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-sm border border-blue-200" 
                        : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                    )}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-r-full"></div>
                    )}
                    
                    <div className="flex items-center w-full">
                      <Icon className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                      )} />
                      
                      {!collapsed && (
                        <>
                          <div className="ml-3 flex-1 text-left">
                            <div className="font-medium">{link.title}</div>
                            <div className="text-xs text-gray-500">{link.description}</div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {link.badge && (
                              <span className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                                link.urgent 
                                  ? "bg-red-100 text-red-600 animate-pulse" 
                                  : "bg-blue-100 text-blue-600"
                              )}>
                                {link.badge}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </Button>
                </Link>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                    <div className="font-medium">{link.title}</div>
                    <div className="text-xs text-gray-300">{link.description}</div>
                    {link.badge && (
                      <div className="text-xs mt-1 text-blue-300">{link.badge} new</div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="my-6 mx-4 border-t border-gray-200"></div>

        {/* Bottom Navigation */}
        <nav className="px-4 space-y-2">
          {bottomLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <div key={link.href} className="relative group">
                <Link href={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 transition-all duration-200",
                      collapsed ? "px-3" : "px-4",
                      isActive 
                        ? "bg-gray-100 text-gray-900" 
                        : "hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {!collapsed && (
                      <>
                        <span className="ml-3 flex-1 text-left text-sm">{link.title}</span>
                        {link.badge && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">
                            {link.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                </Link>
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                    {link.title}
                    {link.badge && ` (${link.badge} new)`}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer Section */}
      <div className="border-t border-gray-200 p-4 bg-white">
        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full mb-3 hover:bg-gray-100 transition-colors"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center">
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-2 text-sm">Collapse</span>
            </div>
          )}
        </Button>

        {/* Logout Button */}
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2 text-sm">Sign Out</span>}
          </Button>
        </Link>
      </div>
    </div>
  )
}