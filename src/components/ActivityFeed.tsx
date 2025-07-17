import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Mail, 
  Truck,
  Clock,
  ExternalLink,
  HardHat,
  Wrench,
  MapPin,
  AlertTriangle,
  Camera,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

interface ActivityItem {
  id: string
  type: 'equipment' | 'safety' | 'upload' | 'maintenance' | 'inspection' | 'alert' | 'delivery'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'info'
  details?: {
    site?: string
    operator?: string
    equipment?: string
    location?: string
    severity?: string
    file?: string
    notes?: string
  }
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'alert',
    title: 'SAFETY INCIDENT REPORTED',
    description: 'Minor injury reported at Site Alpha - immediate response initiated',
    timestamp: '3 minutes ago',
    status: 'error',
    details: {
      site: 'Site Alpha - Downtown Construction',
      operator: 'Maria Santos',
      severity: 'Minor - First Aid Required',
      location: 'Zone 3 - Foundation Area'
    }
  },
  {
    id: '2',
    type: 'equipment',
    title: 'Excavator CAT-320 Online',
    description: 'Heavy equipment resumed operations after maintenance',
    timestamp: '8 minutes ago',
    status: 'success',
    details: {
      site: 'Site Beta - Highway Extension',
      operator: 'Jake Thompson',
      equipment: 'CAT-320 Excavator (Unit #EX-007)',
      notes: 'Hydraulic system maintenance completed'
    }
  },
  {
    id: '3',
    type: 'upload',
    title: 'Daily Progress Photos Uploaded',
    description: 'Site documentation automatically synced to project database',
    timestamp: '15 minutes ago',
    status: 'success',
    details: {
      site: 'Site Gamma - Residential Complex',
      operator: 'David Kim',
      file: 'progress_photos_2024_01_15.zip (47 images)',
      location: 'All active zones'
    }
  },
  {
    id: '4',
    type: 'maintenance',
    title: 'CRANE MAINTENANCE OVERDUE',
    description: 'Tower crane TC-150 requires immediate inspection',
    timestamp: '22 minutes ago',
    status: 'error',
    details: {
      site: 'Site Alpha - Downtown Construction',
      equipment: 'Tower Crane TC-150 (Unit #CR-003)',
      severity: 'Critical - Operations Suspended',
      notes: 'Last inspection: 89 days ago (limit: 90 days)'
    }
  },
  {
    id: '5',
    type: 'delivery',
    title: 'Material Delivery Confirmed',
    description: 'Steel reinforcement bars delivered and quality checked',
    timestamp: '35 minutes ago',
    status: 'success',
    details: {
      site: 'Site Delta - Industrial Warehouse',
      operator: 'Carlos Rodriguez',
      equipment: 'Delivery Truck DT-042',
      notes: '15 tons steel rebar - Grade 60'
    }
  },
  {
    id: '6',
    type: 'inspection',
    title: 'Safety Inspection Completed',
    description: 'Weekly safety audit passed with minor recommendations',
    timestamp: '1 hour ago',
    status: 'warning',
    details: {
      site: 'Site Beta - Highway Extension',
      operator: 'Inspector Sarah Wilson',
      severity: 'Minor Issues Found',
      notes: '3 safety violations - corrective action required'
    }
  },
  {
    id: '7',
    type: 'equipment',
    title: 'Bulldozer D6T Offline',
    description: 'Equipment failure detected - maintenance team dispatched',
    timestamp: '1.5 hours ago',
    status: 'error',
    details: {
      site: 'Site Gamma - Residential Complex',
      equipment: 'Caterpillar D6T (Unit #BD-012)',
      operator: 'Mike Johnson',
      notes: 'Engine overheating - coolant system failure'
    }
  },
  {
    id: '8',
    type: 'upload',
    title: 'Quality Control Report Filed',
    description: 'Concrete pour inspection results uploaded to system',
    timestamp: '2 hours ago',
    status: 'success',
    details: {
      site: 'Site Alpha - Downtown Construction',
      operator: 'QC Inspector Lisa Chen',
      file: 'concrete_pour_qc_report_zone2.pdf',
      notes: 'All specifications met - approved for next phase'
    }
  }
]

function ActivityItem({ activity }: { activity: ActivityItem }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getIcon = () => {
    switch (activity.type) {
      case 'equipment':
        return <Truck className="h-4 w-4" />
      case 'safety':
        return <HardHat className="h-4 w-4" />
      case 'upload':
        return <Camera className="h-4 w-4" />
      case 'maintenance':
        return <Wrench className="h-4 w-4" />
      case 'inspection':
        return <FileText className="h-4 w-4" />
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />
      case 'delivery':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (activity.status) {
      case 'success':
        return 'bg-success/10 text-success border-success/20'
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20'
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      default:
        return 'bg-primary/10 text-primary border-primary/20'
    }
  }

  const getStatusBadge = () => {
    switch (activity.status) {
      case 'success':
        return <Badge className="bg-success/10 text-success hover:bg-success/20 mono">OPERATIONAL</Badge>
      case 'warning':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20 mono">ATTENTION</Badge>
      case 'error':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 mono safety-glow">CRITICAL</Badge>
      default:
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mono">INFO</Badge>
    }
  }

  const getBorderClass = () => {
    switch (activity.status) {
      case 'success': return 'success-border'
      case 'warning': return 'border-l-4 border-l-warning'
      case 'error': return 'alert-border'
      default: return 'equipment-status'
    }
  }

  return (
    <div className={`border-b border-border last:border-b-0 ${getBorderClass()}`}>
      <div 
        className="flex items-start space-x-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={cn("p-2 rounded border", getStatusColor())}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground truncate mono">
              {activity.title}
            </h4>
            <div className="flex items-center space-x-2 ml-4">
              {getStatusBadge()}
              <span className="text-xs text-muted-foreground whitespace-nowrap mono">
                {activity.timestamp}
              </span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
        </div>
      </div>

      {isExpanded && activity.details && (
        <div className="px-4 pb-4 ml-11">
          <div className="bg-muted/30 rounded p-3 space-y-2 industrial-shadow">
            {activity.details.site && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground mono">SITE:</span>
                <span className="text-foreground font-medium mono">{activity.details.site}</span>
              </div>
            )}
            {activity.details.operator && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground mono">OPERATOR:</span>
                <span className="text-foreground mono">{activity.details.operator}</span>
              </div>
            )}
            {activity.details.equipment && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground mono">EQUIPMENT:</span>
                <span className="text-foreground mono">{activity.details.equipment}</span>
              </div>
            )}
            {activity.details.location && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground mono">LOCATION:</span>
                <span className="text-foreground mono">{activity.details.location}</span>
              </div>
            )}
            {activity.details.severity && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground mono">SEVERITY:</span>
                <span className={cn("mono font-medium", 
                  activity.status === 'error' ? 'text-destructive' : 
                  activity.status === 'warning' ? 'text-warning' : 'text-foreground'
                )}>
                  {activity.details.severity}
                </span>
              </div>
            )}
            {activity.details.file && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground mono">FILE:</span>
                <span className="text-foreground mono">{activity.details.file}</span>
              </div>
            )}
            {activity.details.notes && (
              <div className="pt-2 border-t border-border">
                <span className="text-muted-foreground mono text-xs">NOTES:</span>
                <p className="text-foreground text-sm mt-1">{activity.details.notes}</p>
              </div>
            )}
            <div className="pt-2 border-t border-border">
              <Button variant="ghost" size="sm" className="text-xs mono">
                <ExternalLink className="h-3 w-3 mr-1" />
                VIEW FULL REPORT
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
    <Card className="industrial-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold mono">LIVE SITE ACTIVITY</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-slow"></div>
            <span className="text-sm text-muted-foreground mono">REAL-TIME</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {mockActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full mono">
            VIEW ALL ACTIVITY LOGS
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}