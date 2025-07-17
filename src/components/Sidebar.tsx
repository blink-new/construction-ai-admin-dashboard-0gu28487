import { useState } from 'react'
import { 
  BarChart3, 
  GitBranch, 
  Home, 
  Menu, 
  Settings, 
  Users, 
  Zap,
  X,
  HardHat,
  Truck,
  AlertTriangle,
  Activity,
  Wrench,
  MapPin
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { cn } from '../lib/utils'

type ActivePage = 'dashboard' | 'workflows' | 'integrations' | 'activity' | 'users' | 'settings'

interface SidebarProps {
  className?: string
  activePage: ActivePage
  onPageChange: (page: ActivePage) => void
}

const navigation = [
  { name: 'Operations Center', key: 'dashboard' as const, icon: Home, badge: null },
  { name: 'Site Workflows', key: 'workflows' as const, icon: GitBranch, badge: '12' },
  { name: 'Equipment Status', key: 'integrations' as const, icon: Truck, badge: '4/6' },
  { name: 'Live Activity', key: 'activity' as const, icon: Activity, badge: null },
  { name: 'Crew Management', key: 'users' as const, icon: Users, badge: null },
  { name: 'System Config', key: 'settings' as const, icon: Settings, badge: null },
]

export function Sidebar({ className, activePage, onPageChange }: SidebarProps) {
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
          "fixed left-0 top-0 z-40 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 industrial-shadow",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                  <HardHat className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-sidebar-foreground mono">CONSTRUCTAI</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isCurrent = activePage === item.key
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onPageChange(item.key)
                    setIsMobileOpen(false)
                  }}
                  className={cn(
                    "group flex items-center rounded px-3 py-3 text-sm font-medium transition-all w-full text-left equipment-status",
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isCurrent ? "text-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                    )}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 truncate mono">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant={isCurrent ? "secondary" : "outline"} 
                          className="ml-auto text-xs mono"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Safety Status */}
          <div className="border-t border-sidebar-border p-4">
            <div className={cn(
              "flex items-center space-x-3 rounded bg-sidebar-accent p-3 alert-border",
              isCollapsed && "justify-center"
            )}>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground mono">SAFETY ALERT</p>
                    <p className="text-xs text-sidebar-foreground/70">3 incidents require attention</p>
                  </div>
                )}
              </div>
            </div>
            
            {!isCollapsed && (
              <div className="mt-3 flex items-center space-x-3 rounded bg-sidebar-accent p-3 success-border">
                <div className="flex items-center space-x-2">
                  <Wrench className="h-4 w-4 text-success" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground mono">EQUIPMENT</p>
                    <p className="text-xs text-sidebar-foreground/70">4 of 6 units operational</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}