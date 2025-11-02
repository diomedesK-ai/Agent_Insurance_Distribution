"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Users, TrendingUp, ShoppingCart, BarChart3, MessageSquare, Home, Sparkles, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import ChatDrawer from "./chat-drawer"

interface LayoutProps {
  children: ReactNode
  location?: 'singapore' | 'hongkong'
}

export default function DashboardLayout({ children, location = 'singapore' }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const pathname = usePathname()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    badge,
    isGreen,
  }: {
    href: string
    icon: any
    children: React.ReactNode
    badge?: string
    isGreen?: boolean
  }) {
    const isActive = pathname === href
    
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center justify-between px-3 py-2 text-sm rounded-full transition-colors ${
          isActive
            ? isGreen ? "bg-green-600 text-white" : "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        <div className="flex items-center">
          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
          {children}
        </div>
        {badge && (
          <span className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
            isGreen && isActive ? "bg-green-700 text-white" : "bg-primary/10"
          }`}>
            {badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <nav className="hidden md:flex w-64 border-r border-border flex-col bg-card">
        <div className="h-16 px-6 flex items-center border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-br from-blue-500 to-blue-600">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-blue-500 font-bold text-sm">AD</span>
              </div>
            </div>
            <span className="text-lg font-semibold text-foreground">
              Agency Platform
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4">
          <div className="space-y-6">
            <div>
              <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overview
              </div>
              <div className="space-y-1">
                <NavItem href="/" icon={Home}>
                  Dashboard
                </NavItem>
                      <button
                        onClick={() => setIsChatOpen(true)}
                        className="flex items-center justify-between px-3 py-2 text-sm rounded-full transition-colors text-muted-foreground hover:text-foreground hover:bg-accent w-full"
                      >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                    AI Assistant
                  </div>
                  <span className="ml-auto px-2 py-0.5 text-xs bg-primary/10 rounded-full">
                    AI
                  </span>
                </button>
              </div>
            </div>

            <div>
              <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Operations
              </div>
              <div className="space-y-1">
                <NavItem href="/recruitment" icon={Users}>
                  Recruitment
                </NavItem>
                <NavItem href="/leads" icon={TrendingUp}>
                  Leads
                </NavItem>
                <NavItem href="/sell" icon={ShoppingCart}>
                  Sell
                </NavItem>
                <NavItem href="/performance" icon={BarChart3}>
                  Performance
                </NavItem>
                <NavItem href="/whatsapp" icon={MessageCircle} badge="AI" isGreen>
                  Agent Companion
                </NavItem>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

          {/* AI Chat Button - Bottom Right */}
          <div className="fixed bottom-4 right-4 flex items-center space-x-3 z-30">
            <button
              onClick={() => setIsChatOpen(true)}
              className="h-10 w-10 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-all relative group"
              aria-label="Open AI Assistant"
            >
              <span className="text-xs font-bold text-foreground">AI</span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" style={{ animationDuration: '2s' }}></span>
              </span>
            </button>
          </div>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        location={location}
      />
    </div>
  )
}

