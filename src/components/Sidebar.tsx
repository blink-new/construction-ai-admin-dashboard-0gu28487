import { useState } from 'react'
import { 
  BarChart3, 
  GitBranch, 
  Home, 
  Menu, 
  Settings, 
  Users, 
  Zap,
  X
} from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

interface SidebarProps {
  className?: string
}

const navigation = [
  { name: 'Dashboard', href: '#', icon: Home, current: true },
  { name: 'Workflows', href: '#', icon: GitBranch, current: false },
  { name: 'Integrations', href: '#', icon: Zap, current: false },
  { name: 'Activity', href: '#', icon: BarChart3, current: false },
  { name: 'Users', href: '#', icon: Users, current: false },
  { name: 'Settings', href: '#', icon: Settings, current: false },
]

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-white border-r border-slate-200 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-lg font-semibold text-slate-900">ConstructAI</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    item.current
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      item.current ? "text-blue-600" : "text-slate-500 group-hover:text-slate-700"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                  {item.current && !isCollapsed && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-blue-600"></div>
                  )}
                </a>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4">
            <div className={cn(
              "flex items-center space-x-3 rounded-lg bg-slate-50 p-3",
              isCollapsed && "justify-center"
            )}>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">System Status</p>
                  <p className="text-xs text-slate-500">All systems operational</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}