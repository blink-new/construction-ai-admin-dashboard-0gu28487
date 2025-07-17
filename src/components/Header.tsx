import { Bell, Search, Settings, User, HardHat, AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 industrial-shadow">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded bg-primary flex items-center justify-center">
              <HardHat className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground mono">CONSTRUCTAI</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">OPERATIONS CENTER</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search equipment, sites, alerts..."
              className="pl-10 bg-input border-border focus:border-primary mono text-sm"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Critical Alerts */}
          <Button variant="ghost" size="sm" className="relative">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs safety-glow">
              3
            </Badge>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              7
            </Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded">
                <Avatar className="h-9 w-9 rounded">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground rounded">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Mike Rodriguez</p>
                  <p className="text-xs leading-none text-muted-foreground mono">
                    m.rodriguez@constructai.com
                  </p>
                  <Badge variant="outline" className="w-fit mt-1 text-xs">
                    Site Supervisor
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Safety Protocols
              </DropdownMenuItem>
              <DropdownMenuItem>
                Equipment Access
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}