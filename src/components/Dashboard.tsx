import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SummaryCards } from './SummaryCards'
import { ActivityFeed } from './ActivityFeed'
import { WorkflowManagement } from './WorkflowManagement'

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
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-600 mt-1">
                Monitor your construction AI workflows and system performance
              </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Activity Feed */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ActivityFeed />
              </div>
              
              {/* Quick Actions Sidebar */}
              <div className="space-y-6">
                {/* System Status */}
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">API Response Time</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-slate-900">142ms</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Database Health</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-slate-900">Optimal</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Storage Usage</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span className="text-sm font-medium text-slate-900">68%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Active Connections</span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-slate-900">247</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActivePage('workflows')}
                      className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                    >
                      Create New Workflow
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                      Add Integration
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                      View System Logs
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                      Generate Report
                    </button>
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Projects</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <div className="h-3 w-3 bg-blue-600 rounded-sm"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">Project Alpha</p>
                        <p className="text-xs text-slate-500">Building Extension</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <div className="h-3 w-3 bg-green-600 rounded-sm"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">Project Beta</p>
                        <p className="text-xs text-slate-500">Foundation Work</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <div className="h-3 w-3 bg-amber-600 rounded-sm"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">Project Gamma</p>
                        <p className="text-xs text-slate-500">Renovation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
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