import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SummaryCards } from './SummaryCards'
import { ActivityFeed } from './ActivityFeed'
import { WorkflowManagement } from './WorkflowManagement'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Server, 
  Database, 
  HardDisk, 
  Users, 
  MapPin, 
  Truck, 
  HardHat,
  Wrench,
  AlertTriangle,
  Plus
} from 'lucide-react'

type ActivePage = 'dashboard' | 'workflows' | 'integrations' | 'activity' | 'users' | 'settings'

export function Dashboard() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard')

  const renderPageContent = () => {
    switch (activePage) {
      case 'workflows':
        return <WorkflowManagement />
      case 'dashboard':
      default:
        return (
          <>
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mono">OPERATIONS CENTER</h1>
              <p className="text-muted-foreground mt-2 mono">
                Real-time monitoring and control of construction site operations
              </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Activity Feed */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ActivityFeed />
              </div>
              
              {/* Control Panel Sidebar */}
              <div className="space-y-6">
                {/* System Status */}
                <Card className="industrial-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold mono flex items-center">
                      <Server className="h-5 w-5 mr-2 text-primary" />
                      SYSTEM STATUS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground mono">API RESPONSE</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                        <span className="text-sm font-medium text-foreground mono">89ms</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground mono">DATABASE</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                        <span className="text-sm font-medium text-foreground mono">OPTIMAL</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground mono">STORAGE</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-warning"></div>
                        <span className="text-sm font-medium text-foreground mono">73%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground mono">CONNECTIONS</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                        <span className="text-sm font-medium text-foreground mono">156</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="industrial-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold mono flex items-center">
                      <Wrench className="h-5 w-5 mr-2 text-primary" />
                      QUICK ACTIONS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start mono text-sm"
                      onClick={() => setActivePage('workflows')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      NEW SITE WORKFLOW
                    </Button>
                    <Button variant="ghost" className="w-full justify-start mono text-sm">
                      <Truck className="h-4 w-4 mr-2" />
                      ADD EQUIPMENT
                    </Button>
                    <Button variant="ghost" className="w-full justify-start mono text-sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      SAFETY REPORT
                    </Button>
                    <Button variant="ghost" className="w-full justify-start mono text-sm">
                      <HardHat className="h-4 w-4 mr-2" />
                      CREW ASSIGNMENT
                    </Button>
                  </CardContent>
                </Card>

                {/* Active Sites */}
                <Card className="industrial-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold mono flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      ACTIVE SITES
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3 equipment-status p-3 rounded">
                      <div className="h-10 w-10 rounded bg-success/10 flex items-center justify-center">
                        <HardHat className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mono truncate">SITE ALPHA</p>
                        <p className="text-xs text-muted-foreground mono">Downtown Construction</p>
                        <Badge variant="outline" className="mt-1 text-xs mono">24 CREW</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 equipment-status p-3 rounded">
                      <div className="h-10 w-10 rounded bg-warning/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-warning" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mono truncate">SITE BETA</p>
                        <p className="text-xs text-muted-foreground mono">Highway Extension</p>
                        <Badge variant="outline" className="mt-1 text-xs mono">18 CREW</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 alert-border p-3 rounded">
                      <div className="h-10 w-10 rounded bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mono truncate">SITE GAMMA</p>
                        <p className="text-xs text-muted-foreground mono">Residential Complex</p>
                        <Badge variant="destructive" className="mt-1 text-xs mono">INCIDENT</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderPageContent()}
          </div>
        </main>
      </div>
    </div>
  )
}