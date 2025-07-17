import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Mail, 
  GitBranch,
  Clock,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

interface ActivityItem {
  id: string
  type: 'variation' | 'upload' | 'email' | 'error' | 'workflow'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'info'
  details?: {
    project?: string
    user?: string
    file?: string
    recipient?: string
    error?: string
    workflow?: string
  }
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'variation',
    title: 'Variation Order Triggered',
    description: 'New variation request submitted for Project Alpha',
    timestamp: '2 minutes ago',
    status: 'info',
    details: {
      project: 'Project Alpha - Building Extension',
      user: 'Sarah Johnson',
      workflow: 'Variation Processing v2.1'
    }
  },
  {
    id: '2',
    type: 'upload',
    title: 'Photo Uploaded to Drive',
    description: 'Site inspection photos automatically synced',
    timestamp: '5 minutes ago',
    status: 'success',
    details: {
      project: 'Project Beta - Foundation Work',
      user: 'Mike Chen',
      file: 'site_inspection_2024_01_15.zip (24 photos)'
    }
  },
  {
    id: '3',
    type: 'email',
    title: 'Email Notification Sent',
    description: 'Weekly progress report delivered to stakeholders',
    timestamp: '12 minutes ago',
    status: 'success',
    details: {
      project: 'Project Gamma - Renovation',
      recipient: '8 stakeholders',
      workflow: 'Weekly Reporting'
    }
  },
  {
    id: '4',
    type: 'error',
    title: 'Drive Connection Expired',
    description: 'Google Drive integration requires re-authentication',
    timestamp: '18 minutes ago',
    status: 'error',
    details: {
      error: 'OAuth token expired',
      workflow: 'Document Sync Service'
    }
  },
  {
    id: '5',
    type: 'workflow',
    title: 'Workflow Completed',
    description: 'Material order processing finished successfully',
    timestamp: '25 minutes ago',
    status: 'success',
    details: {
      project: 'Project Delta - Steel Framework',
      workflow: 'Material Procurement v1.8',
      user: 'Alex Rodriguez'
    }
  },
  {
    id: '6',
    type: 'upload',
    title: 'Document Upload Failed',
    description: 'Contract document could not be processed',
    timestamp: '32 minutes ago',
    status: 'error',
    details: {
      project: 'Project Echo - Commercial Build',
      file: 'contract_amendment_v3.pdf',
      error: 'File format not supported'
    }
  },
  {
    id: '7',
    type: 'email',
    title: 'Reminder Email Sent',
    description: 'Safety inspection reminder sent to site manager',
    timestamp: '45 minutes ago',
    status: 'success',
    details: {
      project: 'Project Alpha - Building Extension',
      recipient: 'David Wilson',
      workflow: 'Safety Compliance'
    }
  },
  {
    id: '8',
    type: 'variation',
    title: 'Variation Approved',
    description: 'Change order #VO-2024-003 approved by client',
    timestamp: '1 hour ago',
    status: 'success',
    details: {
      project: 'Project Beta - Foundation Work',
      user: 'Emma Thompson',
      workflow: 'Client Approval Process'
    }
  }
]

function ActivityItem({ activity }: { activity: ActivityItem }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getIcon = () => {
    switch (activity.type) {
      case 'variation':
        return <GitBranch className="h-4 w-4" />
      case 'upload':
        return <Upload className="h-4 w-4" />
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'error':
        return <AlertCircle className="h-4 w-4" />
      case 'workflow':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (activity.status) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'warning':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const getStatusBadge = () => {
    switch (activity.status) {
      case 'success':
        return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Success</Badge>
      case 'warning':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Warning</Badge>
      case 'error':
        return <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">Error</Badge>
      default:
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Info</Badge>
    }
  }

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <div 
        className="flex items-start space-x-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={cn("p-2 rounded-lg border", getStatusColor())}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-900 truncate">
              {activity.title}
            </h4>
            <div className="flex items-center space-x-2 ml-4">
              {getStatusBadge()}
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {activity.timestamp}
              </span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
        </div>
      </div>

      {isExpanded && activity.details && (
        <div className="px-4 pb-4 ml-11">
          <div className="bg-slate-50 rounded-lg p-3 space-y-2">
            {activity.details.project && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Project:</span>
                <span className="text-slate-900 font-medium">{activity.details.project}</span>
              </div>
            )}
            {activity.details.user && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">User:</span>
                <span className="text-slate-900">{activity.details.user}</span>
              </div>
            )}
            {activity.details.workflow && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Workflow:</span>
                <span className="text-slate-900">{activity.details.workflow}</span>
              </div>
            )}
            {activity.details.file && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">File:</span>
                <span className="text-slate-900">{activity.details.file}</span>
              </div>
            )}
            {activity.details.recipient && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Recipient:</span>
                <span className="text-slate-900">{activity.details.recipient}</span>
              </div>
            )}
            {activity.details.error && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Error:</span>
                <span className="text-red-600">{activity.details.error}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200">
              <Button variant="ghost" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-slate-500">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {mockActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
        <div className="p-4 border-t border-slate-100">
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}